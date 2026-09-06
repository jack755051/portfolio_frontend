<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section class="flex flex-col gap-8 border-t border-border py-10">
    <h2 class="heading-2">{{ t('skills.groupsHeading') }}</h2>
    <div
      v-for="group in skillsData.groups"
      :key="group.id"
      class="flex flex-col gap-3 sm:flex-row sm:gap-10"
    >
      <h3 class="w-40 shrink-0 text-sm font-medium text-foreground">
        {{ t(group.titleKey) }}
      </h3>
      <p class="text-sm leading-relaxed text-muted-foreground">
        {{ group.items.join(' · ') }}
      </p>
    </div>
  </section>
</template>
