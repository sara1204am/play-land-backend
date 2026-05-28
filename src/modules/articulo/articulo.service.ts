import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core-services/base/base.service';
import { Articulo } from './articulo.entity';
import { DatabaseService } from 'src/core-services/prisma/data-base/data-base.service';
import { Prisma } from '@prisma/client';
import { AccessToken } from 'src/modules/login/interfaces';

@Injectable()
export class ArticuloService extends BaseService<Articulo> {
  constructor(private readonly _databaseService: DatabaseService) {
    super(_databaseService, 'articulo');
  }

  override async deleteById(
    id: string | number,
    accessToken?: AccessToken,
    internalCall = false,
  ): Promise<Articulo> {
    const stringId = String(id);
    return await this._databaseService.$transaction(async (tx) => {
      // 1. Delete associated images
      await tx.imagenes.deleteMany({
        where: { id_articulo: stringId },
      });

      // 2. Delete associated physical stock
      await tx.stock_fisico.deleteMany({
        where: { articuloId: stringId },
      });

      // 3. Delete associated physical count details
      await tx.conteo_fisico_detalle.deleteMany({
        where: { articuloId: stringId },
      });

      // 4. Delete the article itself
      return await tx.articulo.delete({
        where: { id: stringId },
      });
    });
  }
  normalizeText(s: string) {
    return (s ?? '')
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
  }

  async search(search: string, includeInactive = false) {
    const q = this.normalizeText(search);
    if (!q) return [];

    const words = q.split(/\s+/).filter((w) => w.length > 0);
    if (words.length === 0) return [];

    // Normalizador SQL: reemplaza variantes comunes a ASCII + lower
    const normSql = (expr: any) => Prisma.sql`
    LOWER(
      REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
        ${expr},
        'á','a'),'à','a'),'ä','a'),'â','a'),
        'é','e'),'è','e'),'ë','e'),'ê','e'),
        'í','i'),'ì','i'),'ï','i'),'î','i'),
        'ñ','n')
    )
  `;

    const normSql2 = (expr: any) => Prisma.sql`
    REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
      ${expr},
      'ó','o'),'ò','o'),'ö','o'),'ô','o'),
      'ú','u'),'ù','u'),'ü','u'),'û','u')
  `;

    const N = (expr: any) => normSql2(normSql(expr));

    // Dynamic AND clauses for each search token
    const wordClauses = words.map((word) => {
      const likeExpr = `%${word}%`;
      return Prisma.sql`
        (
          ${N(Prisma.sql`a.nombre`)} LIKE ${likeExpr}
          OR EXISTS (
            SELECT 1
            FROM JSON_TABLE(
              COALESCE(a.chips, JSON_ARRAY()),
              '$[*]' COLUMNS (chip VARCHAR(255) PATH '$')
            ) jt
            WHERE ${N(Prisma.sql`jt.chip`)} LIKE ${likeExpr}
          )
        )
      `;
    });

    const wordsAndClause = Prisma.join(wordClauses, ' AND ');
    const activeFilter = includeInactive ? Prisma.empty : Prisma.sql`a.active = 1 AND`;

    const result = await this._databaseService.$queryRaw(
      Prisma.sql`
      SELECT
        a.*,
        COALESCE(
          JSON_ARRAYAGG(
            CASE
              WHEN i.id IS NULL THEN NULL
              ELSE JSON_OBJECT('id', i.id, 'url', i.url)
            END
          ),
          JSON_ARRAY()
        ) AS imagenes
      FROM articulos a
      LEFT JOIN imagenes i ON i.id_articulo = a.id
      WHERE ${activeFilter} (${wordsAndClause})
      GROUP BY a.id
      ORDER BY a.nombre ASC
      LIMIT 50
    `,
    );

    const rows: any[] = Array.isArray(result)
      ? result
      : Array.isArray((result as any)?.rows)
        ? (result as any).rows
        : [];

    return rows.map((r: any) => {
      let imagenes: any = r.imagenes;

      if (typeof imagenes === 'string') {
        try {
          imagenes = JSON.parse(imagenes);
        } catch {
          imagenes = [];
        }
      }

      if (!Array.isArray(imagenes)) imagenes = [];
      imagenes = imagenes.filter(Boolean);

      return { ...r, imagenes };



    });
  }
}  