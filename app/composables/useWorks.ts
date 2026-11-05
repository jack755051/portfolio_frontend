import type { WorksCollectionItem } from '@nuxt/content'

export type WorkKind = WorksCollectionItem['kind']

export type Work = WorksCollectionItem & {
  slug: string
  /** 目前語系沒有這篇，顯示的是預設語系（zh-TW）版本 */
  isFallback: boolean
}

const DEFAULT_LOCALE = 'zh-TW'

/** stem 形如 'works/zh-TW/world-line' */
function parseStem(stem: string) {
  const [, locale = '', slug = ''] = stem.split('/')
  return { locale, slug }
}

function toWork(item: WorksCollectionItem, locale: string): Work {
  const parsed = parseStem(item.stem)
  return { ...item, slug: parsed.slug, isFallback: parsed.locale !== locale }
}

/** 全部作品（已依 order 排序、排除 draft）；目前語系有翻譯就用翻譯，沒有退回 zh-TW */
export function useWorks() {
  const { locale } = useI18n()

  return useAsyncData(
    () => `works-${locale.value}`,
    async () => {
      const items = await queryCollection('works')
        .where('draft', '=', false)
        .order('order', 'ASC')
        .all()

      const bySlug = new Map<string, WorksCollectionItem>()
      for (const item of items) {
        const { locale: itemLocale, slug } = parseStem(item.stem)
        if (itemLocale === locale.value || (itemLocale === DEFAULT_LOCALE && !bySlug.has(slug)))
          bySlug.set(slug, item)
      }

      return [...bySlug.values()]
        .map(item => toWork(item, locale.value))
        .sort((a, b) => a.order - b.order)
    },
    { watch: [locale], default: () => [] as Work[] },
  )
}

export function workPeriodLabel(work: Pick<Work, 'period'>, presentLabel: string) {
  if (!work.period) return ''
  return `${work.period.start} – ${work.period.end ?? presentLabel}`
}

export function workHost(url?: string) {
  if (!url) return ''
  try {
    return new URL(url).host
  }
  catch {
    return url
  }
}
