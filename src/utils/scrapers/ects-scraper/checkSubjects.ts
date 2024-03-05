import { WORSTCASESUBCJECT } from '@/utils/scrapers/ects-scraper/EctsScrappersURLs.const';

const isTheWorstCase = (subject: string) => subject === WORSTCASESUBCJECT;

export default isTheWorstCase;
