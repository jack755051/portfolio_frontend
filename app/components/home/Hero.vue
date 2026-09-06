<script setup lang="ts">
const localePath = useLocalePath()
const { t } = useI18n()
</script>

<template>
  <section class="relative isolate flex min-h-[78vh] flex-col justify-center overflow-hidden py-12 sm:py-16">
    <!-- 氛圍：柔和光暈，不搶過名字 -->
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 -z-10 -mx-4 sm:-mx-0"
    >
      <div class="absolute -top-24 left-1/2 size-[28rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl dark:bg-primary/20" />
      <div class="absolute bottom-0 right-0 size-72 translate-x-1/4 rounded-full bg-accent-400/10 blur-3xl dark:bg-accent-400/15" />
    </div>

    <div class="flex max-w-3xl flex-col gap-8 sm:gap-10">
      <div class="flex flex-col gap-5 motion-safe:animate-[hero-in_0.7s_ease-out_both]">
        <p class="text-sm font-medium tracking-wide text-primary">
          {{ t('home.role') }}
        </p>
        <h1 class="text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          {{ t('home.name') }}
        </h1>
        <p class="max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          {{ t('home.lead') }}
        </p>
        <p class="text-sm text-muted-foreground/80">
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
  </section>
</template>
