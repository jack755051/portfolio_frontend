<script setup lang="ts">
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
    <NotesIntro />
    <NotesList :notes="notes ?? []" />
  </div>
</template>
