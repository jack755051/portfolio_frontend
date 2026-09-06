<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section class="flex flex-col gap-6 border-t border-border py-10">
    <h2 class="heading-2">{{ t('skills.focusHeading') }}</h2>
    <ul class="grid gap-6 sm:grid-cols-2">
      <li
        v-for="item in skillsData.focus"
        :key="item.id"
        class="flex flex-col gap-2"
      >
        <h3 class="text-base font-medium text-foreground">
          {{ t(item.titleKey) }}
        </h3>
        <p class="text-sm leading-relaxed text-muted-foreground">
          {{ t(item.summaryKey) }}
        </p>
      </li>
    </ul>
  </section>
</template>
