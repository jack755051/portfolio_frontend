<script setup lang="ts">
import { Moon, Sun } from '@lucide/vue'

const colorMode = useColorMode()

const isDark = computed({
  get: () => colorMode.value === 'dark',
  set: (dark: boolean) => {
    colorMode.preference = dark ? 'dark' : 'light'
  },
})
</script>

<template>
  <ClientOnly>
    <Toggle
      v-model="isDark"
      variant="outline"
      size="sm"
      class="size-7 rounded-full"
      :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    >
      <Sun v-if="isDark" class="size-3.5" />
      <Moon v-else class="size-3.5" />
    </Toggle>
    <template #fallback>
      <span class="inline-block size-7 rounded-full border border-border" />
    </template>
  </ClientOnly>
</template>
