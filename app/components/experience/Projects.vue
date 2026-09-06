<script setup lang="ts">
import type { ExperienceProject } from '~/types/experience'

const props = withDefaults(
  defineProps<{
    projects: ExperienceProject[]
    /** 預設可見上限；超過後需點「顯示全部」 */
    maxVisible?: number
  }>(),
  { maxVisible: 4 },
)

const { t } = useI18n()
const expanded = ref(false)

const hasMore = computed(() => props.projects.length > props.maxVisible)

const visibleProjects = computed(() =>
  expanded.value || !hasMore.value
    ? props.projects
    : props.projects.slice(0, props.maxVisible),
)

function showAll() {
  expanded.value = true
}

function collapse() {
  expanded.value = false
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex items-center justify-between gap-3">
      <p class="text-xs font-medium text-muted-foreground">
        {{ t('experience.projectsLabel') }}
      </p>
      <button
        v-if="hasMore && !expanded"
        type="button"
        class="text-xs font-medium text-primary transition-colors hover:text-primary/80"
        @click="showAll"
      >
        {{ t('experience.projectsShowAll') }}
      </button>
      <button
        v-else-if="hasMore"
        type="button"
        class="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        @click="collapse"
      >
        {{ t('experience.projectsCollapse') }}
      </button>
    </div>

    <div class="rounded-lg border border-border">
      <ExperienceProjectItem
        v-for="(project, index) in visibleProjects"
        :key="index"
        :project="project"
      />
    </div>
  </div>
</template>
