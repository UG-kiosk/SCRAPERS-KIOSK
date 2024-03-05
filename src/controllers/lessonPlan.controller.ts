import { Request, Response, NextFunction } from 'express';
import { ScrapeErrorType } from '../types/scrapeError.type';
import { LessonPlanEntry } from '../types/lesson-plan-scraper/lessonPlanEntry.type';
import { lessonPlanScraper } from '../services/lessonPlanScraper.service';

export const scrapeLessonPlan = async (
    req: Request,
    res: Response<LessonPlanEntry[] | ScrapeErrorType>,
    next: NextFunction,
) => {
    try {
        const lessonPlan = await lessonPlanScraper();
        return res.status(200).json(lessonPlan);
    } catch (error) {
        return res.status(500).json({
            message: `There's an ${error}. Please try again.`,
        });
    }
};
