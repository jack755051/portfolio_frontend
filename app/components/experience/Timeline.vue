<script setup lang="ts">
import type { ExperienceItem } from '~/types/experience'

const { tm } = useI18n()

const items = computed(() => tm('experience.list') as ExperienceItem[])
</script>

<template>
  <ol class="relative flex flex-col gap-8 border-l border-border pl-8">
    <li v-for="(item, index) in items" :key="index" class="relative">
      <span
        aria-hidden="true"
        class="absolute -left-[calc(2rem+5px)] top-6 size-2.5 rounded-full bg-primary ring-4 ring-background"
      />
      <ExperienceCard :item="item" />
    </li>
  </ol>
</template>
