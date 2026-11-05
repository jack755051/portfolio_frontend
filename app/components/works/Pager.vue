<script setup lang="ts">
import type { Work } from '~/composables/useWorks'

defineProps<{
  prev?: Work
  next?: Work
}>()

const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <nav
    v-if="prev || next"
    class="grid gap-4 border-t border-border pt-8 sm:grid-cols-2"
    :aria-label="t('works.detail.pager')"
  >
    <NuxtLink
      v-if="prev"
      :to="localePath(`/works/${prev.slug}`)"
      class="group flex flex-col gap-1 rounded-xl border border-border p-4 transition-colors hover:border-primary/40"
    >
      <span class="caption">← {{ t('works.detail.prev') }}</span>
      <span class="font-medium text-foreground group-hover:text-primary">{{ prev.title }}</span>
    </NuxtLink>
    <span v-else />
    <NuxtLink
      v-if="next"
      :to="localePath(`/works/${next.slug}`)"
      class="group flex flex-col gap-1 rounded-xl border border-border p-4 text-right transition-colors hover:border-primary/40"
    >
      <span class="caption">{{ t('works.detail.next') }} →</span>
      <span class="font-medium text-foreground group-hover:text-primary">{{ next.title }}</span>
    </NuxtLink>
  </nav>
</template>
