/** 刷題平台；之後擴充時只加 union member */
export type PracticeSource = 'leetcode'

export type PracticeDifficulty = 'Easy' | 'Medium' | 'Hard'

export type PracticeProblem = {
  source: PracticeSource
  id: string
  title: string
  /** 平台內唯一 slug（LeetCode titleSlug；其他平台可填題號） */
  titleSlug: string
  difficulty: PracticeDifficulty
  /** ISO date YYYY-MM-DD */
  date: string
  tags: string[]
  url: string
}

export type PracticeStats = {
  easy: number
  medium: number
  hard: number
  total: number
}

export type PracticeDataset = {
  source: PracticeSource
  username: string
  updatedAt: string
  stats: PracticeStats
  problems: PracticeProblem[]
}

export const practiceDifficulties = ['all', 'Easy', 'Medium', 'Hard'] as const

export type PracticeDifficultyFilter = (typeof practiceDifficulties)[number]
