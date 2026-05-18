export interface Project {
  id: string | number;
  title: string;
  category: string;
  description: string;
  image: string;
  gallery?: string[];
  size?: string;
  tags: string[];
  year?: string;
}

export interface EducationItem {
  year: string;
  title: string;
  institution: string;
  description: string;
  tags: string[];
}

export type ViewType = 'home' | 'archives' | 'education' | 'about';
