export interface Project {
  id: string;
  title: string;
  description: string;
  techs: string[];
  image?: string;
  viewUrl?: string;
  codeUrl: string;
  category?: string;
}
