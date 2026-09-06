<script setup lang="ts">
import type { ExperienceProject } from '~/types/experience'
import { ChevronDown } from '@lucide/vue'

const props = defineProps<{
  project: ExperienceProject
}>()

const { t, rt } = useI18n()
const open = ref(false)

const statusLabel = computed(() =>
  t(`experience.projectStatus.${rt(props.project.status)}`),
)

const statusVariant = computed(() =>
  rt(props.project.status) === 'active' ? 'default' : 'secondary',
)

function toggle() {
  open.value = !open.value
}
</script>

<template>
  <div class="border-b border-border last:border-b-0">
    <button
      type="button"
      class="flex w-full cursor-pointer items-center justify-between gap-3 px-3 py-2.5 text-left"
      :aria-expanded="open"
      @click="toggle"
    >
      <span class="flex min-w-0 items-center gap-2">
        <span class="truncate text-sm font-medium text-foreground">
          {{ rt(project.title) }}
        </span>
        <Badge :variant="statusVariant" class="shrink-0">
          {{ statusLabel }}
        </Badge>
      </span>
      <ChevronDown
        class="size-4 shrink-0 text-muted-foreground transition-transform duration-300"
        :class="open ? 'rotate-180' : ''"
      />
    </button>

    <div
      class="grid transition-[grid-template-rows] duration-300 ease-out"
      :class="open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
    >
      <div class="overflow-hidden">
        <p class="border-t border-border px-3 py-2.5 text-sm leading-relaxed text-muted-foreground">
          {{ rt(project.detail) }}
        </p>
      </div>
    </div>
  </div>
</template>
