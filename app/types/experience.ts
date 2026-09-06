export type ExperienceType = 'work' | 'education'

export type ExperienceProjectStatus = 'active' | 'done'

export type ExperienceProject = {
  title: string
  status: ExperienceProjectStatus
  /** 專案一句定位 */
  summary: string
  /** 負責內容條列 */
  responsibilities: string[]
  /** 專案技術（可選） */
  stack?: string[]
  /** 成果／影響（可選） */
  outcomes?: string[]
}

export type ExperienceItem = {
  type: ExperienceType
  company: string
  role: string
  /** 已排版好的期間文字，例如 "2024.07 - 至今" */
  period: string
  isActive?: boolean
  description: string
  projects: ExperienceProject[]
  stack: string[]
}
