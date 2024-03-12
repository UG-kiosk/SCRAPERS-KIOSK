import { LessonPlanURLObject } from '../types/lesson-plan-scraper/lessonPlanURLObject.type';
import { PlanEntryFromCSV } from '../types/lesson-plan-scraper/planEntryFromCSV.type';
import { LessonPlanEntry } from '../types/lesson-plan-scraper/lessonPlanEntry.type';
import { returnScraperError } from '../utils/errorScraper';
import { ErrorType } from '../types/error.type';

import cheerio from 'cheerio';
import Papa from 'papaparse';
import axios from 'axios';
import {
    getURLWithoutQuery,
    checkIfFaculty,
    transformCSVHeader,
    transformCSVField,
    getYearFromMajorName,
    transformGroupName,
} from '../utils/scrapers/lesson-plan-scraper';

const MAIN_URL = 'https://inf.ug.edu.pl/plan/';

export const lessonPlanScraper = async (): Promise<
    LessonPlanEntry[] | ErrorType
> => {
    try {
        const plansURLObjects = await getPlansURLs();

        if (plansURLObjects.length === 0)
            throw new Error("Couldn't find any URLs");

        const allLessonPlan = await Promise.all(
            plansURLObjects.map(async (url: LessonPlanURLObject) => {
                return await getDataFromCSV(url);
            }),
        );

        const finalResult = allLessonPlan.reduce((acc, lessonsArray) => {
            acc.push(...lessonsArray);
            return acc;
        }, []);

        return finalResult;
    } catch (error) {
        return returnScraperError(error);
    }
};

const getPlansURLs = async (): Promise<LessonPlanURLObject[]> => {
    try {
        const firstLessonsPlansPage = await axios.get(
            MAIN_URL + '?dialog=grupa',
        );

        const $1 = cheerio.load(firstLessonsPlansPage.data);

        const allURLsFromFirstPage = $1('#groups > div > a')
            .map((_, element) => element.attribs.href)
            .get();

        const mainMajorsURLs = allURLsFromFirstPage.splice(
            0,
            allURLsFromFirstPage.length - 1,
        );

        const secondLessonsPlansPage = await axios.get(MAIN_URL + 'fiz/');

        const $2 = cheerio.load(secondLessonsPlansPage.data);

        const allURLsFromSecondPage = $2('#groups > div > a')
            .map((_, element) => 'fiz/' + element.attribs.href)
            .get();

        const otherMajorsURLs = allURLsFromSecondPage.splice(
            0,
            allURLsFromSecondPage.length - 3,
        );

        const allLessonPlanURLObjects = await Promise.all(
            [...mainMajorsURLs, ...otherMajorsURLs].map(getAllURLsForMajor),
        );

        return allLessonPlanURLObjects;
    } catch (error) {
        return [];
    }
};

const getAllURLsForMajor = async (
    currentURL: string,
): Promise<LessonPlanURLObject> => {
    try {
        const lessonsPlanPage = await axios.get(MAIN_URL + currentURL);

        const $ = cheerio.load(lessonsPlanPage.data);
        const majorName = $('div > h1').text();

        const planURLObject: LessonPlanURLObject = {
            majorName: majorName,
            mainURL: currentURL,
        };

        const otherURLs = $('div.uwaga > a')
            .map((_, element) => element.attribs.href)
            .get();

        for (let i = 0; i < 2; i++) {
            if (otherURLs[i]) {
                const url = getURLWithoutQuery(otherURLs[i]);
                if (checkIfFaculty(url)) planURLObject.facultyURL = url;
                else planURLObject.seminarURL = url;
            }
        }

        return planURLObject;
    } catch {
        return { majorName: '', mainURL: '' };
    }
};

const getDataFromCSV = async (
    majorURLObject: LessonPlanURLObject,
): Promise<LessonPlanEntry[]> => {
    const parserConfig = {
        header: true,
        dynamicTyping: true,
        transformHeader: transformCSVHeader,
        transform: transformCSVField,
    };

    const getData = async (URL: string) => {
        const csv = await axios.get(`${MAIN_URL}${URL}&format=csv`);
        const results: PlanEntryFromCSV[] = Papa.parse<PlanEntryFromCSV>(
            csv.data,
            parserConfig,
        ).data;
        const resultsWithoutEmptyLines = results.filter(
            (result) => Object.keys(result).length > 1,
        );

        return resultsWithoutEmptyLines;
    };

    const mapMajorResults = (
        result: PlanEntryFromCSV,
        url: string,
        classType: 'main' | 'seminar' | 'faculty',
    ): LessonPlanEntry => {
        if (
            url.startsWith('fiz/') &&
            !majorURLObject.majorName.includes('bezpieczeństwo jądrowe')
        ) {
            const [, mainGroupName] = url.split('=');

            return mapResults(
                result,
                mainGroupName,
                majorURLObject.majorName,
                classType,
            );
        }

        return mapResults(
            result,
            majorURLObject.majorName,
            majorURLObject.majorName,
            classType,
        );
    };

    const finalResults: LessonPlanEntry[] = [];
    const mainData = await getData(majorURLObject.mainURL);
    if (majorURLObject.mainURL) {
        const mainDataResults = mainData.map((result) =>
            mapMajorResults(result, majorURLObject.mainURL, 'main'),
        );

        finalResults.push(...mainDataResults);
    }

    if (majorURLObject.facultyURL) {
        const facultyData = await getData(majorURLObject.facultyURL);
        const facultyDataResults = facultyData.map((result) =>
            mapMajorResults(result, majorURLObject.facultyURL || '', 'faculty'),
        );

        finalResults.push(...facultyDataResults);
    }

    if (majorURLObject.seminarURL) {
        const seminarData = await getData(majorURLObject.seminarURL);
        const seminarDataResults = seminarData.map((result) =>
            mapMajorResults(result, majorURLObject.seminarURL || '', 'seminar'),
        );

        finalResults.push(...seminarDataResults);
    }

    const finalResultsWithChangedGroups = changeGroupNames(finalResults);

    return finalResultsWithChangedGroups;
};

const changeGroupNames = (
    lessonPlanEntries: LessonPlanEntry[],
): LessonPlanEntry[] => {
    const allGroupNames = lessonPlanEntries.reduce(
        (acc1: string[], lessonEntry: LessonPlanEntry) => {
            const ignoredGroups = ['all', 'fakultet', 'seminarium', ...acc1];
            const uniqueGroupNames = lessonEntry.groups.reduce(
                (acc2: string[], group: string) => {
                    if (!ignoredGroups.includes(group)) {
                        acc2.push(group);
                    }

                    return acc2;
                },
                [],
            );
            acc1.push(...uniqueGroupNames);

            return acc1;
        },
        [],
    );

    const lessonPlanWithChangedGroups = lessonPlanEntries.map(
        (lessonPlanEntry) => {
            if (lessonPlanEntry.groups[0] === 'all') {
                lessonPlanEntry.groups = allGroupNames;
            }

            return lessonPlanEntry;
        },
    );

    return lessonPlanWithChangedGroups;
};

const mapResults = (
    entryFromCSV: PlanEntryFromCSV,
    mainGroupName: string,
    majorName: string,
    classType: 'main' | 'seminar' | 'faculty',
): LessonPlanEntry => {
    const { subject, groups, type, info, start_date, end_date, ...rest } =
        entryFromCSV;

    const { name, year } = getYearFromMajorName(majorName);

    const entryGroup = groups
        ? groups.map((group) => transformGroupName(mainGroupName, group))
        : [];

    if (entryGroup.length === 0)
        entryGroup.push(classType === 'faculty' ? 'fakultet' : 'seminarium');

    const result: LessonPlanEntry = {
        name: name,
        year: year,
        ...rest,
        groups: entryGroup,
        pl: {
            subject: subject,
            type: type,
            info: info,
        },
        eng: {},
    };

    return result;
};
