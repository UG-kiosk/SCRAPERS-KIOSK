import { Degree } from './degree.type';

export interface Major {
  name: string;
  url: string;
  content: string | null;
  degree: Degree;
}
