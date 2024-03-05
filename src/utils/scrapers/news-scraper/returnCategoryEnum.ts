import { NewsCategory } from '../../../types/news-scraper/news.type';
export const mapNewsCategory = (category: string): NewsCategory => {
    switch (category) {
        case 'Wydarzenia':
        case 'Aktualności':
            return NewsCategory.NEWS;
        case 'Dla studentów':
            return NewsCategory.STUDENTS;
        case 'Archiwum aktualności':
            return NewsCategory.ARCHIVE;
        default:
            return NewsCategory.NEWS;
    }
};
