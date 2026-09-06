<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <section class="flex flex-col gap-6 border-t border-border py-16">
    <div class="flex items-end justify-between gap-4">
      <div class="flex flex-col gap-2">
        <h2 class="heading-2">{{ t('home.works.heading') }}</h2>
        <p class="caption">{{ t('home.works.subtitle') }}</p>
      </div>
      <Button as-child variant="ghost" size="sm">
        <NuxtLink :to="localePath('/works')">
          {{ t('home.works.viewAll') }}
        </NuxtLink>
      </Button>
    </div>

    <ul class="flex flex-col divide-y divide-border border-y border-border">
      <li v-for="work in featuredWorks" :key="work.slug">
        <NuxtLink
          :to="work.external ? work.href : localePath(work.href)"
          :external="work.external"
          :target="work.external ? '_blank' : undefined"
          :rel="work.external ? 'noopener noreferrer' : undefined"
          class="group flex flex-col gap-1 py-5 transition-colors hover:bg-muted/50 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
        >
          <span class="text-base font-medium text-foreground group-hover:text-primary">
            {{ t(work.titleKey) }}
          </span>
          <span class="text-sm text-muted-foreground sm:text-right">
            {{ t(work.summaryKey) }}
          </span>
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>
