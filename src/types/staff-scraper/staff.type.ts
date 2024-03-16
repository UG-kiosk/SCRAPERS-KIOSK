export interface AcademicContent {
    posts: { position: string; faculty: string[] }[];
    tutorial: string;
}

export interface Academic {
    name: string;
    link: string;
    email: string;
    content: AcademicContent;
}
