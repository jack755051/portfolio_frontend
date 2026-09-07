<script setup lang="ts">
import type { PracticeProblem } from '~/types/practice'
import { ArrowUpRight } from '@lucide/vue'

const props = defineProps<{
  problem: PracticeProblem
}>()

const { t, locale } = useI18n()

const formattedDate = computed(() => {
  const value = Date.parse(props.problem.date)
  if (Number.isNaN(value)) return props.problem.date
  return new Intl.DateTimeFormat(locale.value, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(value)
})

const difficultyClass = computed(() => {
  switch (props.problem.difficulty) {
    case 'Easy':
      return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
    case 'Medium':
      return 'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300'
    case 'Hard':
      return 'border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300'
    default:
      return ''
  }
})
</script>

<template>
  <a
    :href="problem.url"
    target="_blank"
    rel="noopener noreferrer"
    class="group flex h-full flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/35 hover:bg-muted/30"
  >
    <div class="flex items-center justify-between gap-3">
      <Badge :class="difficultyClass" variant="outline">
        {{ t(`practice.difficulty.${problem.difficulty}`) }}
      </Badge>
      <time class="font-mono text-xs text-muted-foreground" :datetime="problem.date">
        {{ formattedDate }}
      </time>
    </div>

    <div class="flex flex-col gap-1">
      <p class="font-mono text-xs text-muted-foreground">
        #{{ problem.id }}
      </p>
      <h2 class="text-base font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
        {{ problem.title }}
      </h2>
    </div>

    <ul v-if="problem.tags?.length" class="flex flex-wrap gap-1.5">
      <li v-for="tag in problem.tags" :key="tag">
        <Badge variant="secondary">{{ tag }}</Badge>
      </li>
    </ul>

    <span class="mt-auto inline-flex items-center gap-1 text-xs font-medium text-primary">
      {{ t('practice.open') }}
      <ArrowUpRight class="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </span>
  </a>
</template>
