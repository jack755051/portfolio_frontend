<script setup lang="ts">
import type { ExperienceProject } from '~/types/experience'

const props = withDefaults(
  defineProps<{
    projects: ExperienceProject[]
    /** 預設可見上限；超過後需點「顯示更多」 */
    maxVisible?: number
  }>(),
  { maxVisible: 4 },
)

const { t } = useI18n()
const listExpanded = ref(false)
/** 各專案手風琴開關（以可見列表 index 為 key） */
const openByIndex = ref<Record<number, boolean>>({})

const hasMore = computed(() => props.projects.length > props.maxVisible)

const visibleProjects = computed(() =>
  listExpanded.value || !hasMore.value
    ? props.projects
    : props.projects.slice(0, props.maxVisible),
)

const anyAccordionOpen = computed(() =>
  visibleProjects.value.some((_, index) => openByIndex.value[index]),
)

function isOpen(index: number) {
  return !!openByIndex.value[index]
}

function setOpen(index: number, open: boolean) {
  openByIndex.value = { ...openByIndex.value, [index]: open }
}

function showAll() {
  listExpanded.value = true
}

function collapseList() {
  listExpanded.value = false
  openByIndex.value = {}
}

function collapseAllAccordions() {
  openByIndex.value = {}
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
        :open="isOpen(index)"
        @update:open="setOpen(index, $event)"
      />
    </div>

    <div
      v-if="anyAccordionOpen || hasMore"
      class="flex justify-start"
    >
      <button
        v-if="anyAccordionOpen"
        type="button"
        class="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        @click="collapseAllAccordions"
      >
        {{ t('experience.projectsCollapseAll') }}
      </button>
      <button
        v-else-if="hasMore && !listExpanded"
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
        @click="collapseList"
      >
        {{ t('experience.projectsCollapse') }}
      </button>
    </div>
  </div>
</template>
