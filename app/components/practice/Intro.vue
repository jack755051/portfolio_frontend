<script setup lang="ts">
import type { PracticeStats } from '~/types/practice'

const props = defineProps<{
  stats: PracticeStats
  username: string
  updatedAt?: string
}>()

const { t, locale } = useI18n()

const updatedLabel = computed(() => {
  if (!props.updatedAt) return ''
  const value = Date.parse(props.updatedAt)
  if (Number.isNaN(value)) return props.updatedAt
  return new Intl.DateTimeFormat(locale.value, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(value)
})
</script>

<template>
  <header class="flex flex-col gap-6 pb-10">
    <div class="flex max-w-2xl flex-col gap-3">
      <h1 class="heading-1">{{ t('practice.title') }}</h1>
      <p class="text-base text-muted-foreground sm:text-lg">
        {{ t('practice.lead') }}
      </p>
      <p class="font-mono text-xs text-muted-foreground">
        {{ t('practice.profile', { username }) }}
        <span v-if="updatedLabel"> · {{ t('practice.updated', { date: updatedLabel }) }}</span>
      </p>
    </div>

    <ul class="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <li class="rounded-xl border border-border bg-card px-4 py-3">
        <p class="text-xs text-muted-foreground">{{ t('practice.stats.total') }}</p>
        <p class="mt-1 font-mono text-2xl font-semibold tabular-nums text-foreground">
          {{ stats.total }}
        </p>
      </li>
      <li class="rounded-xl border border-border bg-card px-4 py-3">
        <p class="text-xs text-muted-foreground">{{ t('practice.stats.easy') }}</p>
        <p class="mt-1 font-mono text-2xl font-semibold tabular-nums text-emerald-600 dark:text-emerald-400">
          {{ stats.easy }}
        </p>
      </li>
      <li class="rounded-xl border border-border bg-card px-4 py-3">
        <p class="text-xs text-muted-foreground">{{ t('practice.stats.medium') }}</p>
        <p class="mt-1 font-mono text-2xl font-semibold tabular-nums text-amber-600 dark:text-amber-400">
          {{ stats.medium }}
        </p>
      </li>
      <li class="rounded-xl border border-border bg-card px-4 py-3">
        <p class="text-xs text-muted-foreground">{{ t('practice.stats.hard') }}</p>
        <p class="mt-1 font-mono text-2xl font-semibold tabular-nums text-rose-600 dark:text-rose-400">
          {{ stats.hard }}
        </p>
      </li>
    </ul>
  </header>
</template>
