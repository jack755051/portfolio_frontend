export const noteCategories = ['all', 'frontend', 'backend', 'other'] as const

export type NoteCategory = (typeof noteCategories)[number]

export type NoteCategoryFilter = Exclude<NoteCategory, 'all'>
