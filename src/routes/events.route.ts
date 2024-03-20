import { scrapeEvents } from '../controllers/events.controller';
import { Router } from 'express';

const eventsRouter = Router();

/**
 * @swagger
 * /scrape/events:
 *   get:
 *     summary: Get all events
 *     description: Retrieve a list of all events.
 *     responses:
 *       200:
 *         description: Successful response
 */
eventsRouter.get('/events', scrapeEvents);

export default eventsRouter;
