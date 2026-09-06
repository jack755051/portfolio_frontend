<script setup lang="ts">
import type { ExperienceProject } from '~/types/experience'
import { ChevronDown } from '@lucide/vue'

const props = defineProps<{
  project: ExperienceProject
  open?: boolean
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const { t, rt } = useI18n()

const isOpen = computed(() => !!props.open)

const status = computed(() => String(rt(props.project.status)))

const statusLabel = computed(() =>
  t(`experience.projectStatus.${status.value}`),
)

const statusVariant = computed(() =>
  status.value === 'active' ? 'default' : 'secondary',
)

const responsibilities = computed(() =>
  (props.project.responsibilities ?? []).map(item => rt(item)),
)

const stack = computed(() =>
  (props.project.stack ?? []).map(item => rt(item)),
)

const outcomes = computed(() =>
  (props.project.outcomes ?? []).map(item => rt(item)),
)

function toggle() {
  emit('update:open', !isOpen.value)
}
</script>

<template>
  <div class="border-b border-border last:border-b-0">
    <button
      type="button"
      class="flex w-full cursor-pointer items-center justify-between gap-3 px-3 py-2.5 text-left"
      :aria-expanded="isOpen"
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
        :class="isOpen ? 'rotate-180' : ''"
      />
    </button>

    <div
      class="grid transition-[grid-template-rows] duration-300 ease-out"
      :class="isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
    >
      <div class="overflow-hidden">
        <div class="flex flex-col gap-3 border-t border-border px-3 py-3">
          <p class="text-sm leading-relaxed text-foreground/90">
            {{ rt(project.summary) }}
          </p>

          <div v-if="responsibilities.length" class="flex flex-col gap-1.5">
            <p class="text-xs font-medium text-muted-foreground">
              {{ t('experience.projectResponsibilities') }}
            </p>
            <ul class="list-disc space-y-1 pl-4 text-sm leading-relaxed text-muted-foreground">
              <li v-for="(item, index) in responsibilities" :key="index">
                {{ item }}
              </li>
            </ul>
          </div>

          <div v-if="stack.length" class="flex flex-col gap-1.5">
            <p class="text-xs font-medium text-muted-foreground">
              {{ t('experience.projectStack') }}
            </p>
            <div class="flex flex-wrap gap-1.5">
              <Badge
                v-for="(tech, index) in stack"
                :key="index"
                variant="secondary"
              >
                {{ tech }}
              </Badge>
            </div>
          </div>

          <div v-if="outcomes.length" class="flex flex-col gap-1.5">
            <p class="text-xs font-medium text-muted-foreground">
              {{ t('experience.projectOutcomes') }}
            </p>
            <ul class="list-disc space-y-1 pl-4 text-sm leading-relaxed text-muted-foreground">
              <li v-for="(item, index) in outcomes" :key="index">
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
