<script setup lang="ts">
const localePath = useLocalePath()
const { t } = useI18n()
</script>

<template>
  <section class="relative isolate grid items-center gap-12 py-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16 lg:py-24">
    <div class="flex flex-col gap-8 sm:gap-10">
      <div class="flex flex-col gap-6 motion-safe:animate-[hero-in_0.7s_ease-out_both]">
        <p class="meta-label text-primary">
          {{ t('home.role') }}
        </p>

        <div class="relative w-fit">
          <h1 class="display-name text-foreground">
            {{ t('home.name') }}
          </h1>
          <span
            aria-hidden="true"
            class="mt-3 block h-1 w-full origin-left rounded-full bg-accent-500 motion-safe:animate-[mark-draw_0.8s_ease-out_0.25s_both]"
          />
        </div>

        <p class="max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          {{ t('home.lead') }}
        </p>
        <p class="font-mono text-sm text-muted-foreground/90">
          {{ t('home.focus') }}
        </p>
      </div>

      <div class="flex flex-wrap gap-3 motion-safe:animate-[hero-in_0.7s_ease-out_0.12s_both]">
        <Button as-child size="lg">
          <NuxtLink :to="localePath('/works')">
            {{ t('home.cta.works') }}
          </NuxtLink>
        </Button>
        <Button as-child variant="outline" size="lg">
          <NuxtLink :to="localePath('/skills')">
            {{ t('home.cta.skills') }}
          </NuxtLink>
        </Button>
      </div>
    </div>

    <HomeHeroGraphic />
  </section>
</template>
