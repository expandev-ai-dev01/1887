/**
 * @summary
 * Vehicle listing controller with filtering, sorting, and pagination.
 * Handles all vehicle catalog operations for the car listing feature.
 *
 * @module api/v1/internal/vehicle/controller
 */

import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse, errorResponse } from '@/utils/response';
import { vehicleList } from '@/services/vehicle';

/**
 * @validation Vehicle listing parameters
 */
const listParamsSchema = z.object({
  // Filtering parameters
  marca: z.array(z.string()).optional(),
  modelo: z.array(z.string()).optional(),
  anoMin: z.coerce.number().int().min(1900).optional(),
  anoMax: z.coerce.number().int().min(1900).optional(),
  precoMin: z.coerce.number().min(0).optional(),
  precoMax: z.coerce.number().min(0).optional(),
  cambio: z.array(z.enum(['Manual', 'Automático', 'CVT', 'Semi-automático'])).optional(),

  // Sorting parameters
  ordenacao: z
    .enum([
      'Relevância',
      'Preço (menor para maior)',
      'Preço (maior para menor)',
      'Ano (mais recente)',
      'Ano (mais antigo)',
      'Modelo (A-Z)',
      'Modelo (Z-A)',
    ])
    .optional()
    .default('Relevância'),

  // Pagination parameters
  pagina: z.coerce.number().int().min(1).optional().default(1),
  itensPorPagina: z.coerce
    .number()
    .int()
    .refine((val) => [12, 24, 36, 48].includes(val), {
      message: 'Items per page must be 12, 24, 36, or 48',
    })
    .optional()
    .default(12),
});

/**
 * @summary
 * Lists vehicles with filtering, sorting, and pagination
 *
 * @function listHandler
 * @module api/v1/internal/vehicle/controller
 *
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 *
 * @returns {Promise<void>}
 */
export async function listHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    /**
     * @validation Parse and validate query parameters
     */
    const params = listParamsSchema.parse(req.query);

    /**
     * @rule {fn-order-processing}
     * Validate price range consistency
     */
    if (params.precoMin !== undefined && params.precoMax !== undefined) {
      if (params.precoMin > params.precoMax) {
        res
          .status(400)
          .json(
            errorResponse('Preço mínimo não pode ser maior que preço máximo', 'INVALID_PRICE_RANGE')
          );
        return;
      }
    }

    /**
     * @rule {fn-order-processing}
     * Validate year range consistency
     */
    if (params.anoMin !== undefined && params.anoMax !== undefined) {
      if (params.anoMin > params.anoMax) {
        res
          .status(400)
          .json(
            errorResponse('Ano mínimo não pode ser maior que ano máximo', 'INVALID_YEAR_RANGE')
          );
        return;
      }
    }

    /**
     * @rule {fn-order-processing}
     * Execute vehicle listing with filters
     */
    const result = await vehicleList(params);

    res.json(successResponse(result));
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res
        .status(400)
        .json(errorResponse('Parâmetros de consulta inválidos', 'VALIDATION_ERROR', error.errors));
    } else {
      next(error);
    }
  }
}

/**
 * @summary
 * Gets available filter options (brands, models, years, transmission types)
 *
 * @function filterOptionsHandler
 * @module api/v1/internal/vehicle/controller
 *
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 *
 * @returns {Promise<void>}
 */
export async function filterOptionsHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { vehicleFilterOptions } = await import('@/services/vehicle');
    const options = await vehicleFilterOptions();

    res.json(successResponse(options));
  } catch (error: any) {
    next(error);
  }
}
