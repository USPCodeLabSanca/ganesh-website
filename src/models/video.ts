export interface Video {
  id: string;
  title: string;
  title_en: string;
  description: string;
  description_en: string;
  url: string;
  thumbnail: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface VideoForm {
  title: string;
  title_en?: string;
  description?: string;
  description_en?: string;
  url: string;
  thumbnail?: string;
}