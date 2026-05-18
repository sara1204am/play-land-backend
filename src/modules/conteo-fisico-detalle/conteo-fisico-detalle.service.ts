import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core-services/base/base.service';
import { ConteoFisicoDetalle } from './conteo-fisico-detalle.entity';
import { DatabaseService } from 'src/core-services/prisma/data-base/data-base.service';

@Injectable()
export class ConteoFisicoDetalleService extends BaseService<ConteoFisicoDetalle> {
  constructor(private readonly _databaseService: DatabaseService) {
    super(_databaseService, 'conteo_fisico_detalle');
  }

  override async createBulk(body: any[], accessToken?: any, internalCall = false): Promise<any> {
    const result = await super.createBulk(body, accessToken, internalCall);

    const conteoId = body[0]?.conteoId;
    if (conteoId) {
      await this.syncInventoryFromPhysicalCount(conteoId);
    }

    return result;
  }

  async syncInventoryFromPhysicalCount(conteoId: string): Promise<void> {
    // 1. Fetch all count details for this conteoId, including their location names
    const detalles = await this._databaseService.conteo_fisico_detalle.findMany({
      where: { conteoId },
      include: {
        ubicacion: true,
      },
    });

    if (!detalles.length) return;

    // 2. Group the details by articuloId
    const detailsByArticle = new Map<string, typeof detalles>();
    for (const det of detalles) {
      const artId = det.articuloId;
      if (!detailsByArticle.has(artId)) {
        detailsByArticle.set(artId, []);
      }
      detailsByArticle.get(artId)!.push(det);
    }

    // 3. For each article, update its stock_by_option in the database
    for (const [articuloId, articleDetalles] of detailsByArticle.entries()) {
      // Build the new flat stock_by_option array directly from count details
      const newStockByOption = articleDetalles.map((det) => {
        return {
          id: det.id,
          color: (det.variante || '').trim() || 'No especificado',
          variante: (det.variante || '').trim() || 'No especificado',
          ubicacionId: det.ubicacionId,
          ubicacion: det.ubicacion?.nombre || 'No especificado',
          cantidad: det.cantidadContada || 0,
        };
      });

      const totalStock = newStockByOption.reduce(
        (sum, item) => sum + (item.cantidad || 0),
        0,
      );

      // Update the article
      await this._databaseService.articulo.update({
        where: { id: articuloId },
        data: {
          stock_by_option: newStockByOption,
          cantidad: totalStock,
          active: totalStock > 0,
        },
      });
    }
  }
}
