import { Router } from 'express';
import { scrapeLessonPlan } from '../controllers/lessonPlan.controller';

const lessonPlanRouter = Router();

/**
 * @swagger
 * /scrape/lesson-plan:
 *   get:
 *     summary: Get lesson-plan information
 *     description: Retrieve all lesson-plans.
 *     responses:
 *       200:
 *         description: Successful response
 */
lessonPlanRouter.get('/lesson-plan', scrapeLessonPlan);

export default lessonPlanRouter;
