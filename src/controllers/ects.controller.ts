import { Request, Response, NextFunction } from 'express';
import { ScrapeErrorType } from '../types/scrapeError.type';
import { ectsScrapper } from '../services/ects-scraper/ectsScrapper.service';
import { ectsSubject } from '../types/ects-scraper/ectsSubject';

export const scrapeEcts = async (
    req: Request,
    res: Response<ectsSubject[] | ScrapeErrorType>,
    next: NextFunction,
) => {
    try {
        const ects = await ectsScrapper();
        return res.status(200).json(ects);
    } catch (error) {
        return res.status(500).json({
            message: `There's an ${error}. Please try again.`,
        });
    }
};
