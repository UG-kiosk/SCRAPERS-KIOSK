import { Request, Response, NextFunction, RequestHandler } from 'express';
import { Events } from '../types/events-scraper/events.type';
import { eventsScraper } from '../services/eventsScraper.service';

export const scrapeEvents: RequestHandler = async (
    req: Request,
    res: Response<Events[] | string>,
    next: NextFunction
) => {
    const events = await eventsScraper();

    if ('status' in events) {
        return res.status(events.status).send(events.message);
    }

    return res.send(events);
};
