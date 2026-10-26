<script setup lang="ts">
import type { WorkItem } from '~/types/work'

const props = defineProps<{
  work: WorkItem
  index?: number
}>()

const { t } = useI18n()
const localePath = useLocalePath()

const to = computed(() => {
  const href = props.work.href
  if (!href) return undefined
  return props.work.external ? href : localePath(href)
})

const NuxtLink = resolveComponent('NuxtLink')

const linkAttrs = computed(() =>
  to.value
    ? {
        to: to.value,
        external: props.work.external,
        target: props.work.external ? '_blank' : undefined,
        rel: props.work.external ? 'noopener noreferrer' : undefined,
      }
    : {},
)

const hostLabel = computed(() => {
  if (!props.work.href) return ''
  try {
    return new URL(props.work.href).host
  }
  catch {
    return props.work.href
  }
})

const indexLabel = computed(() =>
  String(props.index ?? 1).padStart(2, '0'),
)

const openLabel = computed(() =>
  props.work.external ? t('home.works.openExternal') : t('home.works.open'),
)
</script>

<template>
  <li>
    <component
      :is="to ? NuxtLink : 'div'"
      v-bind="linkAttrs"
      class="group flex flex-col gap-3 rounded-xl border border-border bg-card px-5 py-5 transition-colors sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-6"
      :class="{ 'hover:border-primary/30 hover:bg-muted/40': to }"
    >
      <span class="flex min-w-0 items-start gap-4 sm:items-center">
        <span class="font-mono text-xs text-muted-foreground tabular-nums">
          {{ indexLabel }}
        </span>
        <span class="flex min-w-0 flex-col gap-1">
          <span
            class="text-lg font-medium tracking-tight text-foreground transition-colors"
            :class="{ 'group-hover:text-primary': to }"
          >
            {{ t(work.titleKey) }}
          </span>
          <span v-if="to && work.external" class="font-mono text-xs text-muted-foreground">
            {{ hostLabel }}
          </span>
        </span>
      </span>

      <span class="flex min-w-0 flex-col gap-1.5 pl-8 sm:max-w-sm sm:items-end sm:pl-0 sm:text-right">
        <span class="text-sm leading-relaxed text-muted-foreground">
          {{ t(work.summaryKey) }}
        </span>
        <span v-if="to" class="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors group-hover:text-primary">
          {{ openLabel }}
          <span aria-hidden="true" class="transition-transform group-hover:translate-x-0.5">→</span>
        </span>
      </span>
    </component>
  </li>
</template>
