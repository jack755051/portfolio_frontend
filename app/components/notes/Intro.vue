<script setup lang="ts">
const props = defineProps<{
  username?: string
  updatedAt?: string
}>()

const { t, locale } = useI18n()

const updatedLabel = computed(() => {
  if (!props.updatedAt) return ''
  const value = Date.parse(props.updatedAt)
  if (Number.isNaN(value)) return props.updatedAt
  return new Intl.DateTimeFormat(locale.value, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(value)
})
</script>

<template>
  <header class="flex max-w-2xl flex-col gap-3 pb-10">
    <h1 class="heading-1">{{ t('notes.title') }}</h1>
    <p class="text-base text-muted-foreground sm:text-lg">
      {{ t('notes.lead') }}
    </p>
    <p v-if="username || updatedLabel" class="font-mono text-xs text-muted-foreground">
      <template v-if="username">{{ t('notes.profile', { username }) }}</template>
      <span v-if="username && updatedLabel"> · </span>
      <span v-if="updatedLabel">{{ t('notes.updated', { date: updatedLabel }) }}</span>
    </p>
  </header>
</template>
