export type BlogContentBlock =
  | { type: 'paragraph'; content: string }
  | { type: 'heading'; level: 2 | 3; content: string }
  | { type: 'list'; items: string[] }
  | { type: 'code'; filename: string; language: string; code: string }
  | { type: 'blockquote'; content: string };
