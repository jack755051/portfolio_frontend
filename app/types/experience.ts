export type ExperienceType = 'work' | 'education'

export type ExperienceProjectStatus = 'active' | 'done'

export type ExperienceProject = {
  title: string
  detail: string
  status: ExperienceProjectStatus
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
