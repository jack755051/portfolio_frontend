export type SkillFocus = {
  id: string
  titleKey: string
  summaryKey: string
}

export type SkillGroup = {
  id: string
  titleKey: string
  items: string[]
}

export type SkillsData = {
  focus: SkillFocus[]
  groups: SkillGroup[]
}
