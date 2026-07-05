import { BlogContentBlock } from '../types/blog-content.type';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readTime?: string;
  content?: BlogContentBlock[];
}
