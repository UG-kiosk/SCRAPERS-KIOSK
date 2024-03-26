interface Post {
    position: string;
    faculty: string[];
}

export interface Academic {
    name: string;
    link: string;
    email: string;
    content: AcademicContent;
}

export interface AcademicContent {
    posts: Post[];
    tutorial: string;
}

export interface DetailsContent {
    email: string;
    posts: Post[];
    tutorial: string;
}
