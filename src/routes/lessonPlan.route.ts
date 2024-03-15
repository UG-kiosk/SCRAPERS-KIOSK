import { Router } from 'express';
import { scrapeLessonPlan } from '../controllers/lessonPlan.controller';

const lessonPlanRouter = Router();

lessonPlanRouter.get('/lesson-plan', scrapeLessonPlan);

export default lessonPlanRouter;
