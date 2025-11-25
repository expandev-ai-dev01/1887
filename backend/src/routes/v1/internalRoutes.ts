/**
 * @summary
 * Internal API routes configuration for authenticated endpoints.
 * Handles all authenticated user operations and protected resources.
 *
 * @module routes/v1/internalRoutes
 */

import { Router } from 'express';
import * as vehicleController from '@/api/v1/internal/vehicle/controller';
import * as vehicleDetailController from '@/api/v1/internal/vehicle/detail/controller';

const router = Router();

/**
 * @rule {be-route-configuration}
 * Vehicle listing routes
 */
router.get('/vehicle', vehicleController.listHandler);
router.get('/vehicle/filter-options', vehicleController.filterOptionsHandler);

/**
 * @rule {be-route-configuration}
 * Vehicle detail routes
 */
router.get('/vehicle/:id', vehicleDetailController.getHandler);

export default router;
