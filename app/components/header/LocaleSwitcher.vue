<script setup lang="ts">
const { locale, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const isEn = computed({
  get: () => locale.value === 'en',
  set: (en: boolean) => {
    const code = en ? 'en' : 'zh-TW'
    if (locale.value === code) return
    navigateTo(switchLocalePath(code))
  },
})
</script>

<template>
  <Toggle
    v-model="isEn"
    variant="outline"
    size="sm"
    class="size-7 rounded-full text-xs font-medium"
    :aria-label="isEn ? t('locale.toZh') : t('locale.toEn')"
  >
    <span>{{ isEn ? t('locale.zh-TW') : t('locale.en') }}</span>
  </Toggle>
</template>
