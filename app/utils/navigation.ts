import type { NavItem } from '~/types/navigation'

/**
 * Header 導覽清單（有意維護，不從 pages/ 自動掃描）。
 * Nuxt 會從 pages/ 產生路由；導覽是精選子集：順序、文案、是否露出都跟檔案樹無關。
 */
export const mainNav: NavItem[] = [
  { to: '/', labelKey: 'nav.home' },
  { to: '/skills', labelKey: 'nav.skills' },
  { to: '/experience', labelKey: 'nav.experience' },
  { to: '/works', labelKey: 'nav.works' },
  { to: '/notes', labelKey: 'nav.notes' },
  { to: '/leetcode', labelKey: 'nav.leetcode' },
]
