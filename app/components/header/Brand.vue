<script setup lang="ts">
const localePath = useLocalePath()

const homePath = computed(() => {
  const path = localePath('/')
  return typeof path === 'string' ? path : '/'
})
</script>

<template>
  <NuxtLink :to="homePath" class="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground">
    <img src="/logo.svg" alt="" aria-hidden="true" class="h-6 w-auto">
    {{ $t('brand') }}
  </NuxtLink>
</template>
