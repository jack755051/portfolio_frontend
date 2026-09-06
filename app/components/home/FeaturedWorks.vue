<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <section class="flex flex-col gap-8 border-t border-border py-16 sm:py-20">
    <div class="flex items-end justify-between gap-4">
      <div class="flex max-w-xl flex-col gap-3">
        <p class="meta-label text-primary">{{ t('home.works.eyebrow') }}</p>
        <h2 class="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {{ t('home.works.heading') }}
        </h2>
        <p class="caption max-w-md">{{ t('home.works.subtitle') }}</p>
      </div>
      <Button as-child variant="outline" size="sm">
        <NuxtLink :to="localePath('/works')">
          {{ t('home.works.viewAll') }}
        </NuxtLink>
      </Button>
    </div>

    <ul class="flex flex-col gap-3">
      <HomeFeaturedWorkItem
        v-for="(work, index) in featuredWorks"
        :key="work.slug"
        :work="work"
        :index="index + 1"
      />
    </ul>
  </section>
</template>
