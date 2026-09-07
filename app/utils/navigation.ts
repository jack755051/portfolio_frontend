import type { NavItem } from '~/types/navigation'

/**
 * Header 導覽清單（有意維護，不從 pages/ 自動掃描）。
 * labels 直接寫死雙語，避免 t() 在 hydration 時回傳非字串。
 */
export const mainNav: NavItem[] = [
  { to: '/', labelKey: 'nav.home', labels: { 'zh-TW': '首頁', en: 'Home' } },
  { to: '/skills', labelKey: 'nav.skills', labels: { 'zh-TW': '技能', en: 'Skills' } },
  { to: '/experience', labelKey: 'nav.experience', labels: { 'zh-TW': '學經歷', en: 'Experience' } },
  { to: '/works', labelKey: 'nav.works', labels: { 'zh-TW': '作品', en: 'Works' } },
  { to: '/notes', labelKey: 'nav.notes', labels: { 'zh-TW': '筆記', en: 'Notes' } },
  { to: '/practice', labelKey: 'nav.practice', labels: { 'zh-TW': '刷題', en: 'Practice' } },
]
