<script setup lang="ts">
const localePath = useLocalePath()
const { t } = useI18n()
</script>

<template>
  <section class="relative isolate grid min-h-[78vh] items-center gap-12 py-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16 lg:py-20">
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

    <!-- 右側識別圖：工程感構圖，不是裝飾光暈 -->
    <div
      aria-hidden="true"
      class="relative mx-auto hidden aspect-square w-full max-w-md motion-safe:animate-[hero-in_0.8s_ease-out_0.15s_both] lg:block"
    >
      <div class="absolute inset-0 rounded-[2rem] border border-border bg-card/70 backdrop-blur-sm" />
      <div class="absolute inset-6 rounded-[1.5rem] border border-dashed border-primary/30" />
      <div class="absolute inset-[22%] rounded-full border border-accent-500/40" />
      <div class="absolute left-[18%] top-[28%] size-3 rounded-full bg-accent-500" />
      <div class="absolute bottom-[24%] right-[20%] size-2 rounded-full bg-primary" />
      <div class="absolute inset-x-[20%] top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div class="absolute inset-y-[20%] left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-accent-500/40 to-transparent" />
      <p class="absolute bottom-8 left-8 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
        UI · System · Craft
      </p>
    </div>
  </section>
</template>
