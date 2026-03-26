export type PostType = 'artigo' | 'dica' | 'atividade' | 'notícia';
export const postTypes: PostType[] = ['artigo', 'dica', 'atividade', 'notícia'];

export interface Post {
  id: string
  title: string
  title_en: string
  summary?: string
  summary_en?: string
  type: PostType
  createdAt: Date
  published: boolean
  authorGithub: string
  images: string[]
}

export interface PostForm {
  id: string
  title: string
  title_en: string
  summary?: string
  summary_en?: string
  content: string
  content_en: string
  images: string[]
  createdAt: Date
  type: PostType
  published: boolean
  authorGithub: string
  authorName: string
  authorAvatar?: string
}

export interface PostTxtContent {
  title: string;
  title_en?: string;
  summary?: string;
  summary_en?: string;
  content: string;
  content_en?: string;
}