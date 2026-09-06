<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section class="flex flex-col gap-6 border-t border-border py-10">
    <div class="flex flex-col gap-2">
      <p class="meta-label text-primary">{{ t('skills.focusEyebrow') }}</p>
      <h2 class="heading-2">{{ t('skills.focusHeading') }}</h2>
    </div>
    <ul class="grid gap-4 sm:grid-cols-2">
      <li v-for="(item, index) in skillsData.focus" :key="item.id">
        <SkillsFocusItem :item="item" :index="index + 1" />
      </li>
    </ul>
  </section>
</template>
