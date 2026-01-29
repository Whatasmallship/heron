import { STATIC_REGISTRY } from '../data/staticRegistry';
import { Lang, AppData, DataCard, Blog, Event, Job, Sponsor, Resource, Career } from '../types';

/**
 * Field Mapper: Converts generic AppData into a display-ready DataCard.
 */
const mapToDataCard = (item: AppData, lang: Lang): DataCard => {
  switch (item.type) {
    case 'blog':
      const b = item as Blog;
      return {
        id: b.id,
        title: b.title[lang],
        subtitle: b.date,
        meta: b.location,
        highlight: false
      };
    case 'event':
      const e = item as Event;
      return {
        id: e.id,
        title: e.name[lang],
        subtitle: e.date,
        meta: e.status[lang],
        link: e.link,
        tags: [e.tag[lang]],
        highlight: e.priority === 'high'
      };
    case 'job':
      const j = item as Job;
      return {
        id: j.id,
        title: j.position[lang],
        subtitle: j.department[lang],
        meta: j.salaryRange,
        link: j.link
      };
    case 'career':
      const c = item as Career;
      return {
        id: c.id,
        title: c.title[lang],
        meta: c.description[lang]
      };
    case 'sponsor':
      const s = item as Sponsor;
      return {
        id: s.id,
        title: s.brandName[lang],
        meta: s.tier,
        subtitle: s.industry[lang]
      };
    case 'resource':
      const r = item as Resource;
      return {
        id: r.id,
        title: r.resourceName[lang],
        subtitle: r.format,
        meta: r.description[lang],
        link: r.link
      };
    default:
      return { id: 'unknown', title: 'Unknown' };
  }
};

/**
 * Universal Gateway Interface
 */
export function getStaticData<T extends AppData>(category: keyof typeof STATIC_REGISTRY): T[] {
  return STATIC_REGISTRY[category] as T[];
}

/**
 * Helper to get display cards directly
 */
export function getDisplayCards(category: keyof typeof STATIC_REGISTRY, lang: Lang): DataCard[] {
  const data = getStaticData(category);
  return data.map(item => mapToDataCard(item, lang));
}