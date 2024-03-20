import { Router } from 'express';
import { scrapeEcts } from '../controllers/ects.controller';

const ectsRouter = Router();

/**
 * @swagger
 * /scrape/ects:
 *   get:
 *     summary: Scrape ECTS data
 *     description: Endpoint to scrape ECTS data
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Internal server error
 */
ectsRouter.get('/ects', scrapeEcts);

export default ectsRouter;
