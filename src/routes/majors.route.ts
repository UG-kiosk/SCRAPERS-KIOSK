import { scrapeMajors } from '../controllers/majors.controller';
import { Router } from 'express';

const majorsRouter = Router();

/**
 * @swagger
 * /scrape/majors:
 *   get:
 *     summary: Get all majors
 *     description: Retrieve a list of all majors.
 *     responses:
 *       200:
 *         description: Successful response
 */
majorsRouter.get('/majors', scrapeMajors);

export default majorsRouter;
