import { Router } from 'express';
import { scrapeLessonPlan } from '../controllers/lessonPlan.controller';

const lessonsPlansRouter = Router();

lessonsPlansRouter.get('/lesson-plan', scrapeLessonPlan);

export default lessonsPlansRouter;
