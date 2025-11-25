/**
 * @summary
 * External API routes configuration for public endpoints.
 * Handles public access routes without authentication requirements.
 *
 * @module routes/v1/externalRoutes
 */

import { Router } from 'express';
import * as contactController from '@/api/v1/external/contact/controller';

const router = Router();

/**
 * @rule {be-route-configuration}
 * Contact form submission route
 */
router.post('/contact', contactController.postHandler);

export default router;
