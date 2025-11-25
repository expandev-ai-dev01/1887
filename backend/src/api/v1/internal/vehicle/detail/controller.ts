/**
 * @summary
 * Vehicle detail controller for displaying comprehensive vehicle information.
 * Handles retrieval of detailed vehicle data including specifications, photos,
 * history, and related information.
 *
 * @module api/v1/internal/vehicle/detail/controller
 */

import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse, errorResponse } from '@/utils/response';
import { vehicleGet } from '@/services/vehicle';

/**
 * @validation Vehicle detail parameters
 */
const detailParamsSchema = z.object({
  id: z.string().min(1),
});

/**
 * @summary
 * Gets detailed information for a specific vehicle
 *
 * @function getHandler
 * @module api/v1/internal/vehicle/detail/controller
 *
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 *
 * @returns {Promise<void>}
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    /**
     * @validation Parse and validate route parameters
     */
    const params = detailParamsSchema.parse(req.params);

    /**
     * @rule {fn-order-processing}
     * Execute vehicle detail retrieval
     */
    const result = await vehicleGet(params.id);

    /**
     * @validation Check if vehicle exists
     */
    if (!result) {
      res.status(404).json(errorResponse('Veículo não encontrado', 'VEHICLE_NOT_FOUND'));
      return;
    }

    res.json(successResponse(result));
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json(errorResponse('Parâmetros inválidos', 'VALIDATION_ERROR', error.errors));
    } else {
      next(error);
    }
  }
}
