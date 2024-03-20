import { Router } from 'express';
import { scrapeStaff } from '../controllers/staff.controller';

const staffRouter = Router();

/**
 * @swagger
 * /scrape/staff:
 *   get:
 *     summary: Get all staff
 *     description: Retrieve a list of all staff members.
 *     responses:
 *       200:
 *         description: Successful response
 */
staffRouter.get('/staff', scrapeStaff);

export default staffRouter;
