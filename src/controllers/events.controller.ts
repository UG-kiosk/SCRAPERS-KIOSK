import { Request, Response, NextFunction, RequestHandler } from 'express';
import { Events } from '../types/events-scraper/events.type';
import { eventsScraper } from '../services/eventsScraper.service';
import { ScrapeErrorType } from 'types/scrapeError.type';



export const scrapeEvents: RequestHandler = async (
    req: Request,
    res: Response<Events[] | ScrapeErrorType>,
    next: NextFunction
) => {
    try {
        const events = await eventsScraper();

        if ('status' in events) {
            return res.status(events.status).json(events);
        }

        return res.send(events);
    } catch (error) {
        return res.status(500).json({
            message: `There's an ${error}. Please try again.`,
        });
    }
};
