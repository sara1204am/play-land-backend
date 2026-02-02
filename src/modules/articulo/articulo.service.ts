import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core-services/base/base.service';
import { Articulo } from './articulo.entity';
import { DatabaseService } from 'src/core-services/prisma/data-base/data-base.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ArticuloService extends BaseService<Articulo> {
  constructor(private readonly _databaseService: DatabaseService) {
    super(_databaseService, 'articulo');
  }
  normalizeText(s: string) {
    return (s ?? '')
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
  }

  async search(search: string) {
    const q = this.normalizeText(search);
    if (!q) return [];

    const like = `%${q}%`;

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
      WHERE a.active = 1
        AND (
          ${N(Prisma.sql`a.nombre`)} LIKE ${like}
          OR EXISTS (
            SELECT 1
            FROM JSON_TABLE(
              COALESCE(a.chips, JSON_ARRAY()),
              '$[*]' COLUMNS (chip VARCHAR(255) PATH '$')
            ) jt
            WHERE ${N(Prisma.sql`jt.chip`)} LIKE ${like}
          )
        )
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