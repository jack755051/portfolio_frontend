<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <header class="flex max-w-2xl flex-col gap-3 pb-10">
    <h1 class="heading-1">{{ t('experience.title') }}</h1>
    <p class="text-base text-muted-foreground sm:text-lg">
      {{ t('experience.lead') }}
    </p>
  </header>
</template>
