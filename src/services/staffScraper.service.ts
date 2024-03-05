import axios from 'axios';
import cheerio from 'cheerio';
import { AcademicContent, Academic } from '../types/staff-scraper/staff.type';
import { ErrorType } from '../types/error.type';
import { returnScraperError } from '../utils/errorScraper';

const facultyMemberScraper = async (
    url: string,
): Promise<AcademicContent | null> => {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const contact = $('.node-pracownik .group-pracownik-kontakt');
        const email = contact.find('.group-pracownik-kontakt .e-mail').text();
        const postElements = $(
            '.field-collection-view.clearfix.view-mode-full',
        );
        const posts = await Promise.all(
            postElements.map(async (_, post) => {
                const position = $(post)
                    .find('strong')
                    .not(":contains('Źródło danych:')")
                    .text();
                const faculty = $(post)
                    .find('a')
                    .get()
                    .map((el) => $(el).text());

                return { position, faculty };
            }),
        );
        const tutorial = $('#terminy_konsultacji p')
            .get()
            .reduce((acc, p) => (acc += $(p).text() + '\n'), '');
        const content = {
            email: email,
            posts: posts,
            tutorial: tutorial,
        } as AcademicContent;
        return content;
    } catch (error) {
        return null;
    }
};

export const staffScraper = async (): Promise<Academic[] | ErrorType> => {
    try {
        const { data } = await axios.get(
            'https://old.mfi.ug.edu.pl/pracownicy_mfi/sklad_osobowy',
        );
        const $ = cheerio.load(data);

        const selectedElement = $(
            '.wyszukiwarka-pracownikow-wyniki .view-content .views-row',
        );
        const staff = await Promise.all(
            selectedElement
                .map(async (i, element) => {
                    const name = $(element)
                        .find('.tytul .field-content a')
                        .text()
                        .replace(/\n/g, '');
                    const endpoint = $(element)
                        .find('.tytul .field-content a')
                        .attr('href');
                    const link = 'https://old.mfi.ug.edu.pl' + endpoint;

                    return {
                        name: name,
                        link: link,
                        content: await facultyMemberScraper(link),
                    } as Academic;
                })
                .get(),
        );
        return staff;
    } catch (error) {
        return returnScraperError(error);
    }
};
