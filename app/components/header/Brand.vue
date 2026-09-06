<script setup lang="ts">
const localePath = useLocalePath()
</script>

<template>
  <NuxtLink :to="localePath('/')" class="text-sm font-semibold text-foreground">
    {{ $t('brand') }}
  </NuxtLink>
</template>
