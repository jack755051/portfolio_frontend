<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const links = computed(() =>
  mainNav.map(({ to, labelKey }) => ({
    to,
    label: t(labelKey),
  })),
)

/** 所有語系標籤，用來讓每個連結寬度統一取全域最長 */
const widthSamples = computed(() =>
  mainNav.flatMap(({ labelKey }) => [
    t(labelKey, {}, { locale: 'zh-TW' }),
    t(labelKey, {}, { locale: 'en' }),
  ]),
)

function isActive(to: string) {
  const path = localePath(to)
  if (to === '/') return route.path === path
  return route.path === path || route.path.startsWith(`${path}/`)
}
</script>

<template>
  <nav class="flex flex-wrap items-center gap-1" :aria-label="t('nav.aria')">
    <NuxtLink
      v-for="link in links"
      :key="link.to"
      :to="localePath(link.to)"
      class="rounded-lg px-2.5 py-1.5 text-center text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      :class="{ 'bg-muted font-medium text-foreground': isActive(link.to) }"
    >
      <span class="inline-grid justify-items-center">
        <span
          v-for="(sample, i) in widthSamples"
          :key="i"
          class="invisible col-start-1 row-start-1 whitespace-nowrap font-medium"
          aria-hidden="true"
        >{{ sample }}</span>
        <span class="col-start-1 row-start-1 whitespace-nowrap">{{ link.label }}</span>
      </span>
    </NuxtLink>
  </nav>
</template>
