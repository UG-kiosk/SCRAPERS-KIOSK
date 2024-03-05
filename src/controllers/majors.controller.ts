import { Request, Response, NextFunction } from 'express';
import { ScrapeErrorType } from '../types/scrapeError.type';
import { Major } from '../types/majors-scaper/major.type';
import { majorsInfoScraper } from '../services/majorsScraper.service';

export const scrapeMajors = async (
    req: Request,
    res: Response<Major[] | ScrapeErrorType>,
    next: NextFunction,
) => {
    try {
        const majors = await majorsInfoScraper();
        console.log(majors);
        return res.status(200).json(majors);
    } catch (error) {
        return res.status(500).json({
            message: `There's an ${error}. Please try again.`,
        });
    }
};
