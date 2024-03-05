import { Request, Response, NextFunction } from 'express';
import { ScrapeErrorType } from '../types/scrapeError.type';
import {
    newsScraperINF,
    newsScraperMFI,
} from '../services/newsScraper.service';
import { News } from '../types/news-scraper/news.type';

export const scrapeNewsMFI = async (
    req: Request,
    res: Response<News[] | null | ScrapeErrorType>,
    next: NextFunction,
) => {
    try {
        const news = await newsScraperMFI();
        return res.status(200).send(news);
    } catch (error) {
        return res.status(500).json({
            message: `There's an ${error}. Please try again.`,
        });
    }
};

export const scrapeNewsINF = async (
    req: Request,
    res: Response<News[] | null | ScrapeErrorType>,
    next: NextFunction,
) => {
    try {
        const news = await newsScraperINF();
        return res.status(200).json(news);
    } catch (error) {
        return res.status(500).json({
            message: `There's an ${error}. Please try again.`,
        });
    }
};
