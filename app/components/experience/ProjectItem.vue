<script setup lang="ts">
import type { ExperienceProject } from '~/types/experience'
import { ChevronDown } from '@lucide/vue'

const props = defineProps<{
  project: ExperienceProject
}>()

const { rt } = useI18n()
const open = ref(false)

function toggle() {
  open.value = !open.value
}
</script>

<template>
  <div class="border-b border-border last:border-b-0">
    <button
      type="button"
      class="flex w-full cursor-pointer items-center justify-between gap-3 px-3 py-2.5 text-left text-sm font-medium text-foreground"
      :aria-expanded="open"
      @click="toggle"
    >
      <span>{{ rt(project.title) }}</span>
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
