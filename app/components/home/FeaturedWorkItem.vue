<script setup lang="ts">
import type { Work } from '~/composables/useWorks'

const props = defineProps<{
  work: Work
  index?: number
}>()

const { t } = useI18n()
const localePath = useLocalePath()

const to = computed(() => localePath(`/works/${props.work.slug}`))

const subLabel = computed(() =>
  props.work.visibility === 'private'
    ? t('works.visibility.private')
    : workHost(props.work.links.demo),
)

const indexLabel = computed(() =>
  String(props.index ?? 1).padStart(2, '0'),
)
</script>

<template>
  <li>
    <NuxtLink
      :to="to"
      class="group flex flex-col gap-3 rounded-xl border border-border bg-card px-5 py-5 transition-colors hover:border-primary/30 hover:bg-muted/40 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-6"
    >
      <span class="flex min-w-0 items-start gap-4 sm:items-center">
        <span class="font-mono text-xs text-muted-foreground tabular-nums">
          {{ indexLabel }}
        </span>
        <span class="flex min-w-0 flex-col gap-1">
          <span class="text-lg font-medium tracking-tight text-foreground transition-colors group-hover:text-primary">
            {{ work.title }}
          </span>
          <span v-if="subLabel" class="font-mono text-xs text-muted-foreground">
            {{ subLabel }}
          </span>
        </span>
      </span>

      <span class="flex min-w-0 flex-col gap-1.5 pl-8 sm:max-w-sm sm:items-end sm:pl-0 sm:text-right">
        <span class="text-sm leading-relaxed text-muted-foreground">
          {{ work.summary }}
        </span>
        <span class="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors group-hover:text-primary">
          {{ t('works.viewDetail') }}
          <span aria-hidden="true" class="transition-transform group-hover:translate-x-0.5">→</span>
        </span>
      </span>
    </NuxtLink>
  </li>
</template>
