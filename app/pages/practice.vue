<script setup lang="ts">
import type { PracticeDataset } from '~/types/practice'
import data from '~~/content/practice/leetcode.json'

const { t } = useI18n()
const dataset = data as PracticeDataset

useSeoMeta({
  title: () => t('practice.title'),
  description: () => t('practice.lead'),
})
</script>

<template>
  <div>
    <PracticeIntro
      :stats="dataset.stats"
      :username="dataset.username"
      :updated-at="dataset.updatedAt"
    />
    <PracticeList :problems="dataset.problems" />
  </div>
</template>
