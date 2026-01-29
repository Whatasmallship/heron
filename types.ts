export type Lang = 'cn' | 'en';

export interface LocalizedString {
  cn: string;
  en: string;
}

export interface BaseEntity {
  id: string;
}

export interface Blog extends BaseEntity {
  type: 'blog';
  title: LocalizedString;
  date: string;
  location: string;
  coordinates: [number, number]; // Longitude, Latitude
  summary: LocalizedString;
  excerpt: LocalizedString; // Full paragraph summary
}

export interface Event extends BaseEntity {
  type: 'event';
  name: LocalizedString;
  priority: 'high' | 'medium' | 'low';
  status: LocalizedString;
  tag: LocalizedString;
  date: string;
  link: string;
  image?: string;
  shortIntro: LocalizedString;
  detailedIntro: LocalizedString;
}

export interface Job extends BaseEntity {
  type: 'job';
  position: LocalizedString;
  department: LocalizedString;
  salaryRange: string;
  link: string;
}

export interface Career extends BaseEntity {
  type: 'career';
  title: LocalizedString;
  stats: { label: LocalizedString; value: string }[];
  description: LocalizedString;
}

export interface Sponsor extends BaseEntity {
  type: 'sponsor';
  brandName: LocalizedString;
  tier: 'Platinum' | 'Gold' | 'Silver';
  industry: LocalizedString;
  logo?: string;
  url?: string;
}

export interface Resource extends BaseEntity {
  type: 'resource';
  resourceName: LocalizedString;
  format: string;
  description: LocalizedString;
  link: string;
}

// Union type for all data
export type AppData = Blog | Event | Job | Sponsor | Resource | Career;

export interface DataCard {
  id: string;
  title: string;
  subtitle?: string;
  meta?: string;
  link?: string;
  tags?: string[];
  highlight?: boolean;
}