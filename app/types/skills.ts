export type SkillFocus = {
  id: string
  titleKey: string
  subtitleKey: string
  summaryKey: string
  /** Lucide icon name used by FocusItem */
  icon: 'panels' | 'palette' | 'layers' | 'boxes'
  highlights: string[]
}

export type SkillItem = {
  label: string
  /** simpleicons.org slug，例如 vuedotjs */
  icon: string
  /** 可選：simpleicons 色碼（不含 #），例如 DD0031 */
  color?: string
}

export type SkillGroup = {
  id: string
  titleKey: string
  subtitleKey: string
  items: SkillItem[]
}

export type SkillsData = {
  focus: SkillFocus[]
  groups: SkillGroup[]
}
