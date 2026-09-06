<script setup lang="ts">
import { Moon, Sun } from '@lucide/vue'

const { t } = useI18n()
const colorMode = useColorMode()

const isDark = computed({
  get: () => colorMode.value === 'dark',
  set: (dark: boolean) => {
    colorMode.preference = dark ? 'dark' : 'light'
  },
})
</script>

<template>
  <Toggle
    v-model="isDark"
    variant="outline"
    size="sm"
    class="size-7 rounded-full"
    :aria-label="isDark ? t('theme.toLight') : t('theme.toDark')"
  >
    <Sun v-if="isDark" class="size-3.5" />
    <Moon v-else class="size-3.5" />
  </Toggle>
</template>
