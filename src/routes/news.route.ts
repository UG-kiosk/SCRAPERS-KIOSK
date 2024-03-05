import { Router } from 'express';
import { scrapeNewsMFI } from '../controllers/news.controller';
import { scrapeNewsINF } from '../controllers/news.controller';

const newsRouter = Router();

newsRouter.get('/news/mfi', scrapeNewsMFI);
newsRouter.get('/news/inf', scrapeNewsINF);

export default newsRouter;
