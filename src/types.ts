export interface AssetItem {
  url: string;
  publicId?: string;
}

export interface Project {
  id: string | number;
  _id?: string;
  title: string;
  slug?: string;
  shortDescription?: string;
  fullDescription?: string;
  description?: string;
  category: string;
  thumbnail?: AssetItem | string;
  image?: string;
  images?: AssetItem[] | string[];
  gallery?: string[];
  hashtags?: string[];
  tags: string[];
  views?: number;
  featured?: boolean;
  status?: 'draft' | 'published' | 'archived';
  caseStudy?: string;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
  year?: string;
  size?: string;
}

export interface EducationItem {
  year: string;
  title: string;
  institution: string;
  description: string;
  tags: string[];
}

export type ViewType = 'home' | 'archives' | 'education' | 'about';
