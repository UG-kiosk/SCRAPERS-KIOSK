export interface LessonPlanEntry {
    name: string;
    year: number;
    day: string;
    start: number;
    duration: number;
    groups: string[];
    teachers: string[];
    class: string | number;
    subject: string;
    type: string;
    info: string[];
}
