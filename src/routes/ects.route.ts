import { Router } from 'express';
import { scrapeEcts } from '../controllers/ects.controller';

const ectsRouter = Router();

ectsRouter.get('/ects', scrapeEcts);

export default ectsRouter;
