import { Request, Response, NextFunction } from 'express';
import { staffScraper } from '../services/staffScraper.service';
import { Academic } from '../types/staff-scraper/staff.type';
import { ScrapeErrorType } from '../types/scrapeError.type';

export const scrapeStaff = async (
    req: Request,
    res: Response<Academic[] | ScrapeErrorType>,
    next: NextFunction,
) => {
    try {
        const staff = await staffScraper();
        return res.status(200).json(staff);
    } catch (error) {
        return res.status(500).json({
            message: `There's an ${error}. Please try again.`,
        });
    }
};
