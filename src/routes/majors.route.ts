import { scrapeMajors } from '../controllers/majors.controller';
import { Router } from 'express';

const majorsRouter = Router();

majorsRouter.get('/majors', scrapeMajors);

export default majorsRouter;
