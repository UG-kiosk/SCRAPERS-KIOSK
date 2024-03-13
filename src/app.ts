import express, { Request, Response } from 'express';
import cors from 'cors';
import lessonPlanRouter from './routes/lessonPlan.route';
import majorsRouter from './routes/majors.route';
import staffRouter from './routes/staff.route';
import newsRouter from './routes/news.route';
import ectsRouter from './routes/ects.route';
import eventsRouter from './routes/events.route';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/scrape', ectsRouter);
app.use('/scrape', majorsRouter);
app.use('/scrape', lessonPlanRouter);
app.use('/scrape', staffRouter);
app.use('/scrape', newsRouter);
app.use('/scrape', eventsRouter)

app.get('/', (req: Request, res: Response) =>
    res.status(200).send('SCRAPERS-KIOSK'),
);

export { app };
