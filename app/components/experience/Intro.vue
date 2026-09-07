<script setup lang="ts">
import { Download } from '@lucide/vue'

const { t } = useI18n()
</script>

<template>
  <header class="flex max-w-2xl flex-col gap-6 pb-10">
    <div class="flex flex-col gap-3">
      <h1 class="heading-1">{{ t('experience.title') }}</h1>
      <p class="text-base text-muted-foreground sm:text-lg">
        {{ t('experience.lead') }}
      </p>
    </div>

    <div class="flex flex-wrap gap-3">
      <Button as-child size="lg">
        <a href="/resume.pdf" download="Charlie-Tai-resume.pdf">
          <Download data-icon="inline-start" />
          {{ t('experience.downloadResume') }}
        </a>
      </Button>
    </div>
  </header>
</template>
