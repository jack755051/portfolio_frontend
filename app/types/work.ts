export type WorkItem = {
  slug: string
  titleKey: string
  summaryKey: string
  href: string
  external?: boolean
  /** 縮圖路徑；沒有時用 tone 色塊佔位 */
  image?: string
  tone?: 'primary' | 'accent' | 'muted'
  /** 作品卡右側技術標籤 */
  stack?: string[]
}

/** @deprecated 使用 WorkItem */
export type FeaturedWork = WorkItem
