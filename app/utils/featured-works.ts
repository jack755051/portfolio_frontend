import type { FeaturedWork } from '~/types/work'

/** 首頁精選（之後可改由 content/works 產生） */
export const featuredWorks: FeaturedWork[] = [
  {
    slug: 'ui-sanring',
    titleKey: 'home.works.ui.title',
    summaryKey: 'home.works.ui.summary',
    href: 'https://ui.sanring.dev',
    external: true,
  },
  {
    slug: 'date-picker',
    titleKey: 'home.works.datePicker.title',
    summaryKey: 'home.works.datePicker.summary',
    href: 'https://date-picker.sanring.dev/',
    external: true,
  },
  {
    slug: 'haul-sanring',
    titleKey: 'home.works.haul.title',
    summaryKey: 'home.works.haul.summary',
    href: 'https://haul.sanring.dev',
    external: true,
  },
]
