<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const { t } = useI18n()
const localePath = useLocalePath()

const is404 = computed(() => props.error?.statusCode === 404)

const title = computed(() =>
  is404.value ? t('error.notFound.title') : t('error.generic.title'),
)

const description = computed(() =>
  is404.value ? t('error.notFound.description') : t('error.generic.description'),
)

const homeHref = computed(() => localePath('/') || '/')

async function goHome() {
  // 先清掉 fatal error，再用整頁導向確保離開 error.vue
  await clearError()
  window.location.assign(homeHref.value)
}
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <header class="border-b border-border">
      <div class="mx-auto flex max-w-5xl items-center px-4 py-3">
        <a :href="homeHref" class="text-sm font-semibold text-foreground" @click.prevent="goHome">
          {{ t('brand') }}
        </a>
      </div>
    </header>
    <main class="mx-auto flex w-full max-w-5xl flex-1 flex-col items-start justify-center gap-6 px-4 py-16">
      <p class="text-sm font-medium text-primary">
        {{ error?.statusCode ?? 500 }}
      </p>
      <div class="flex max-w-lg flex-col gap-3">
        <h1 class="heading-1">{{ title }}</h1>
        <p class="text-base text-muted-foreground">
          {{ description }}
        </p>
      </div>
      <Button @click="goHome">
        {{ t('error.backHome') }}
      </Button>
    </main>
  </div>
</template>
