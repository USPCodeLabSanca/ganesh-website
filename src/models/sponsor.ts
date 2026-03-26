export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  link: string;
  description?: string;
  description_en?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SponsorForm {
  name: string;
  logo: string;
  link: string;
  description?: string;
  description_en?: string;
}