<script setup lang="ts">
import type { NoteCategory } from '~/utils/notes'
import { noteCategories } from '~/utils/notes'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '~/components/ui/tabs'

type NoteListItem = {
  path: string
  title: string
  description: string
  category: string
  date: string
  tags?: string[] | null
  draft?: boolean | null
}

const props = defineProps<{
  notes: NoteListItem[]
}>()

const { t } = useI18n()
const active = ref<NoteCategory>('all')

const publishedNotes = computed(() =>
  props.notes.filter(note => !note.draft),
)

const filteredNotes = computed(() => {
  if (active.value === 'all') return publishedNotes.value
  return publishedNotes.value.filter(note => note.category === active.value)
})

function countFor(category: NoteCategory) {
  if (category === 'all') return publishedNotes.value.length
  return publishedNotes.value.filter(note => note.category === category).length
}
</script>

<template>
  <Tabs v-model="active" class="gap-6">
    <TabsList class="flex h-auto w-full flex-wrap justify-start gap-1">
      <TabsTrigger
        v-for="category in noteCategories"
        :key="category"
        :value="category"
        class="gap-1.5"
      >
        {{ t(`notes.categories.${category}`) }}
        <span class="font-mono text-[0.7rem] text-muted-foreground">
          {{ countFor(category) }}
        </span>
      </TabsTrigger>
    </TabsList>

    <TabsContent
      v-for="category in noteCategories"
      :key="category"
      :value="category"
      class="mt-0"
    >
      <ul
        v-if="filteredNotes.length"
        class="grid gap-4 sm:grid-cols-2"
      >
        <li v-for="note in filteredNotes" :key="note.path">
          <NotesItem
            :title="note.title"
            :description="note.description"
            :date="note.date"
            :category="note.category"
            :path="note.path"
            :tags="note.tags"
          />
        </li>
      </ul>
      <p v-else class="caption py-8">
        {{ t('notes.empty') }}
      </p>
    </TabsContent>
  </Tabs>
</template>
