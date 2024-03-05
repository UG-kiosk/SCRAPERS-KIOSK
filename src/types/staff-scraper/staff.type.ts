export interface AcademicContent {
  email: string;
  posts: { position: string; faculty: string[] }[];
  tutorial: string;
}

export interface Academic {
  name: string;
  link: string;
  content: AcademicContent;
}
