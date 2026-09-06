<script setup lang="ts">
import type { ExperienceProject } from '~/types/experience'

const props = withDefaults(
  defineProps<{
    projects: ExperienceProject[]
    /** 預設可見上限；超過後需點「顯示全部」 */
    maxVisible?: number
  }>(),
  { maxVisible: 5 },
)

const { t } = useI18n()
const expanded = ref(false)

const hasMore = computed(() => props.projects.length > props.maxVisible)

const visibleProjects = computed(() =>
  expanded.value || !hasMore.value
    ? props.projects
    : props.projects.slice(0, props.maxVisible),
)

const hiddenCount = computed(() =>
  Math.max(props.projects.length - props.maxVisible, 0),
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
    <p class="text-xs font-medium text-muted-foreground">
      {{ t('experience.projectsLabel') }}
    </p>

    <div class="rounded-lg border border-border">
      <ExperienceProjectItem
        v-for="(project, index) in visibleProjects"
        :key="index"
        :project="project"
      />
    </div>

    <div v-if="hasMore" class="flex justify-start">
      <button
        v-if="!expanded"
        type="button"
        class="text-xs font-medium text-primary transition-colors hover:text-primary/80"
        @click="showAll"
      >
        {{ t('experience.projectsShowAll', { count: hiddenCount }) }}
      </button>
      <button
        v-else
        type="button"
        class="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        @click="collapse"
      >
        {{ t('experience.projectsCollapse') }}
      </button>
    </div>
  </div>
</template>
