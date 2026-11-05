<script setup lang="ts">
import type { Work } from '~/composables/useWorks'
import { ArrowRight } from '@lucide/vue'

const props = defineProps<{
  work: Work
}>()

const { t } = useI18n()
const localePath = useLocalePath()

const to = computed(() => localePath(`/works/${props.work.slug}`))

const subLabel = computed(() =>
  props.work.visibility === 'private'
    ? t('works.visibility.private')
    : workHost(props.work.links.demo),
)
</script>

<template>
  <NuxtLink
    :to="to"
    class="group grid overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/40 sm:grid-cols-[minmax(0,1.45fr)_minmax(16rem,0.7fr)] sm:min-h-[13.5rem]"
  >
    <!-- 左側縮圖：佔較大比例 -->
    <div class="relative aspect-[16/10] min-h-0 overflow-hidden bg-muted sm:aspect-auto sm:min-h-[13.5rem]">
      <img
        v-if="work.cover"
        :src="work.cover"
        :alt="work.title"
        class="absolute inset-0 size-full object-cover object-left-top transition-transform duration-500 group-hover:scale-[1.02]"
      >
      <div
        v-else
        class="absolute inset-0 bg-gradient-to-br from-primary-400/40 via-primary-600/30 to-primary-900/50"
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
            {{ work.title }}
          </h2>
          <p v-if="subLabel" class="font-mono text-xs text-muted-foreground">
            {{ subLabel }}
          </p>
        </div>
        <p class="text-sm leading-relaxed text-muted-foreground">
          {{ work.summary }}
        </p>
      </div>

      <div class="flex flex-col gap-3">
        <ul v-if="work.stack?.length" class="flex flex-wrap gap-1.5">
          <li v-for="tech in work.stack.slice(0, 3)" :key="tech">
            <Badge variant="secondary">{{ tech }}</Badge>
          </li>
        </ul>
        <span class="inline-flex items-center gap-1 text-xs font-medium text-primary">
          {{ t('works.viewDetail') }}
          <ArrowRight class="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </div>
  </NuxtLink>
</template>
