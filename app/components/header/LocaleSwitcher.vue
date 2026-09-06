<script setup lang="ts">
const { locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const isEn = computed({
  get: () => locale.value === 'en',
  set: (en: boolean) => {
    const code = en ? 'en' : 'zh-TW'
    if (locale.value === code) return
    navigateTo(switchLocalePath(code))
  },
})

const label = computed(() => (isEn.value ? '繁' : 'EN'))
const ariaLabel = computed(() =>
  isEn.value ? 'Switch to Traditional Chinese' : 'Switch to English',
)
</script>

<template>
  <ClientOnly>
    <Toggle
      v-model="isEn"
      variant="outline"
      size="sm"
      class="size-7 rounded-full text-xs font-medium"
      :aria-label="ariaLabel"
    >
      <span>{{ label }}</span>
    </Toggle>
    <template #fallback>
      <span class="inline-block size-7 rounded-full border border-border" />
    </template>
  </ClientOnly>
</template>
