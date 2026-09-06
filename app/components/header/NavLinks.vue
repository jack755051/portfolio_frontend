<script setup lang="ts">
const { locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

function labelOf(item: (typeof mainNav)[number]) {
  return item.labels[locale.value as 'zh-TW' | 'en'] ?? item.labels['zh-TW']
}

function pathOf(to: string) {
  const path = localePath(to)
  return typeof path === 'string' ? path : to
}

function isActive(to: string) {
  const path = pathOf(to)
  if (to === '/') return route.path === path || route.path === `${path}/`
  return route.path === path || route.path.startsWith(`${path}/`)
}
</script>

<template>
  <nav class="flex flex-wrap items-center gap-1" aria-label="Navigation">
    <NuxtLink
      v-for="item in mainNav"
      :key="item.to"
      :to="pathOf(item.to)"
      class="inline-flex min-w-20 items-center justify-center rounded-lg px-2.5 py-1.5 text-center text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      :class="{ 'bg-muted font-medium text-foreground': isActive(item.to) }"
    >
      {{ labelOf(item) }}
    </NuxtLink>
  </nav>
</template>
