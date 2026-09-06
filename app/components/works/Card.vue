<script setup lang="ts">
import type { WorkItem } from '~/types/work'
import { ArrowUpRight } from '@lucide/vue'

const props = defineProps<{
  work: WorkItem
}>()

const { t } = useI18n()
const localePath = useLocalePath()

const to = computed(() =>
  props.work.external ? props.work.href : localePath(props.work.href),
)

const hostLabel = computed(() => {
  try {
    return new URL(props.work.href).host
  }
  catch {
    return props.work.href
  }
})

const toneClass = computed(() => {
  switch (props.work.tone) {
    case 'primary':
      return 'from-primary-400/40 via-primary-600/30 to-primary-900/50'
    case 'accent':
      return 'from-accent-300/50 via-accent-500/35 to-accent-800/45'
    default:
      return 'from-gray-300/50 via-gray-500/30 to-gray-800/40 dark:from-gray-600/40 dark:via-gray-700/35 dark:to-gray-900/50'
  }
})

const openLabel = computed(() =>
  props.work.external ? t('home.works.openExternal') : t('home.works.open'),
)
</script>

<template>
  <NuxtLink
    :to="to"
    :external="work.external"
    :target="work.external ? '_blank' : undefined"
    :rel="work.external ? 'noopener noreferrer' : undefined"
    class="group grid overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/40 sm:grid-cols-[minmax(0,1.45fr)_minmax(16rem,0.7fr)] sm:min-h-[13.5rem]"
  >
    <!-- 左側縮圖：佔較大比例 -->
    <div class="relative aspect-[16/10] min-h-0 overflow-hidden bg-muted sm:aspect-auto sm:min-h-[13.5rem]">
      <img
        v-if="work.image"
        :src="work.image"
        :alt="t(work.titleKey)"
        class="absolute inset-0 size-full object-cover object-left-top transition-transform duration-500 group-hover:scale-[1.02]"
      >
      <div
        v-else
        class="absolute inset-0 bg-gradient-to-br"
        :class="toneClass"
        aria-hidden="true"
      />
      <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-r from-transparent to-card sm:block"
      />
    </div>

    <!-- 右側：上下鋪滿，底部放 stack + CTA -->
    <div class="flex min-w-0 flex-col justify-between gap-4 px-5 py-5 sm:px-6 sm:py-6">
      <div class="flex flex-col gap-2">
        <div class="flex flex-col gap-1">
          <h2 class="text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
            {{ t(work.titleKey) }}
          </h2>
          <p v-if="work.external" class="font-mono text-xs text-muted-foreground">
            {{ hostLabel }}
          </p>
        </div>
        <p class="text-sm leading-relaxed text-muted-foreground">
          {{ t(work.summaryKey) }}
        </p>
      </div>

      <div class="flex flex-col gap-3">
        <ul v-if="work.stack?.length" class="flex flex-wrap gap-1.5">
          <li v-for="tech in work.stack" :key="tech">
            <Badge variant="secondary">{{ tech }}</Badge>
          </li>
        </ul>
        <span class="inline-flex items-center gap-1 text-xs font-medium text-primary">
          {{ openLabel }}
          <ArrowUpRight class="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </div>
  </NuxtLink>
</template>
