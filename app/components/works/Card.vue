<script setup lang="ts">
import type { WorkItem } from '~/types/work'

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
</script>

<template>
  <NuxtLink
    :to="to"
    :external="work.external"
    :target="work.external ? '_blank' : undefined"
    :rel="work.external ? 'noopener noreferrer' : undefined"
    class="group grid aspect-[2/1] grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/40"
  >
    <!-- 左側縮圖 + 右側邊緣虛化 -->
    <div class="relative min-h-0 overflow-hidden bg-muted">
      <img
        v-if="work.image"
        :src="work.image"
        :alt="t(work.titleKey)"
        class="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        style="mask-image: linear-gradient(to right, #000 0%, #000 58%, transparent 100%); -webkit-mask-image: linear-gradient(to right, #000 0%, #000 58%, transparent 100%);"
      >
      <div
        v-else
        class="absolute inset-0 bg-gradient-to-br"
        :class="toneClass"
        style="mask-image: linear-gradient(to right, #000 0%, #000 58%, transparent 100%); -webkit-mask-image: linear-gradient(to right, #000 0%, #000 58%, transparent 100%);"
        aria-hidden="true"
      />
      <!-- 再疊一層往 card 的柔化，避免接縫生硬 -->
      <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-r from-transparent to-card"
      />
    </div>

    <!-- 右側描述 -->
    <div class="flex min-w-0 flex-col justify-center gap-2 px-4 py-4 sm:px-6 sm:py-5">
      <div class="flex flex-col gap-0.5">
        <h2 class="text-base font-semibold text-foreground transition-colors group-hover:text-primary sm:text-lg">
          {{ t(work.titleKey) }}
        </h2>
        <p v-if="work.external" class="text-xs text-muted-foreground">
          {{ hostLabel }}
        </p>
      </div>
      <p class="line-clamp-2 text-sm leading-relaxed text-muted-foreground sm:line-clamp-3">
        {{ t(work.summaryKey) }}
      </p>
    </div>
  </NuxtLink>
</template>
