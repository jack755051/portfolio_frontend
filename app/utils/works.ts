import type { WorkItem } from '~/types/work'

/** 作品清單（之後可改由 content/works 產生） */
export const works: WorkItem[] = [
  {
    slug: 'ui-sanring',
    titleKey: 'home.works.ui.title',
    summaryKey: 'home.works.ui.summary',
    href: 'https://ui.sanring.dev',
    external: true,
    tone: 'primary',
    image: '/works/ui-sanring.png',
    stack: ['Angular', 'Design System', 'Primitives'],
  },
  {
    slug: 'date-picker',
    titleKey: 'home.works.datePicker.title',
    summaryKey: 'home.works.datePicker.summary',
    href: 'https://date-picker.sanring.dev/',
    external: true,
    tone: 'accent',
    image: '/works/date-picker.png',
    stack: ['Angular', 'Date Picker', 'Standalone'],
  },
  {
    slug: 'haul-sanring',
    titleKey: 'home.works.haul.title',
    summaryKey: 'home.works.haul.summary',
    href: 'https://haul.sanring.dev',
    external: true,
    tone: 'muted',
    image: '/works/haul-sanring.png',
    stack: ['Nuxt', 'Product UI', 'Logistics'],
  },
]


/** 首頁精選：目前等同全部作品 */
export const featuredWorks = works
