<script setup lang="ts">
const localePath = useLocalePath()

const homePath = computed(() => {
  const path = localePath('/')
  return typeof path === 'string' ? path : '/'
})
</script>

<template>
  <NuxtLink :to="homePath" class="text-sm font-semibold text-foreground">
    {{ $t('brand') }}
  </NuxtLink>
</template>
