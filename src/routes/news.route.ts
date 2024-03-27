import { Router } from 'express';
import { scrapeNewsMFI } from '../controllers/news.controller';
import { scrapeNewsINF } from '../controllers/news.controller';

const newsRouter = Router();

/**
 * @swagger
 * /scrape/news/mfi:
 *   get:
 *     summary: Get all mfi news
 *     description: Retrieve a list of all news articles.
 *     responses:
 *       200:
 *         description: Successful response
 */
newsRouter.get('/news/mfi', scrapeNewsMFI);

/**
 * @swagger
 * /scrape/news/inf:
 *   get:
 *     summary: Get all inf news
 *     description: Retrieve a list of all news articles.
 *     responses:
 *       200:
 *         description: Successful response
 */
newsRouter.get('/news/inf', scrapeNewsINF);

export default newsRouter;
