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
}

export interface Event extends BaseEntity {
  type: 'event';
  name: LocalizedString;
  priority: 'high' | 'medium' | 'low';
  status: LocalizedString;
  tag: LocalizedString;
  date: string;
  link: string;
}

export interface Job extends BaseEntity {
  type: 'job';
  position: LocalizedString;
  department: LocalizedString;
  salaryRange: string;
  link: string;
}

export interface Sponsor extends BaseEntity {
  type: 'sponsor';
  brandName: LocalizedString;
  tier: 'Platinum' | 'Gold';
  industry: LocalizedString;
}

export interface Resource extends BaseEntity {
  type: 'resource';
  resourceName: LocalizedString;
  format: string;
  description: LocalizedString;
  link: string;
}

// Union type for all data
export type AppData = Blog | Event | Job | Sponsor | Resource;

export interface DataCard {
  id: string;
  title: string;
  subtitle?: string;
  meta?: string;
  link?: string;
  tags?: string[];
  highlight?: boolean;
}