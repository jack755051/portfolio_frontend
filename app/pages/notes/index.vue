<script setup lang="ts">
import meta from '~~/content/notes/meta.json'

const { t } = useI18n()

const { data: notes } = await useAsyncData('notes-list', () =>
  queryCollection('notes')
    .order('date', 'DESC')
    .all(),
)

useSeoMeta({
  title: () => t('notes.title'),
  description: () => t('notes.lead'),
})
</script>

<template>
  <div>
    <NotesIntro
      :username="meta.username"
      :updated-at="meta.updatedAt"
    />
    <NotesList :notes="notes ?? []" />
  </div>
</template>
