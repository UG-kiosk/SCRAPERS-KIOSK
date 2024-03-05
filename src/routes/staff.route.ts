import { Router } from 'express';
import { scrapeStaff } from '../controllers/staff.controller';

const staffRouter = Router();

staffRouter.get('/staff', scrapeStaff);

export default staffRouter;
