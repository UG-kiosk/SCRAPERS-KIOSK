import { scrapeEvents } from '../controllers/events.controller';
import { Router } from 'express';

const eventsRouter = Router();

eventsRouter.get('/events', scrapeEvents);

export default eventsRouter;
