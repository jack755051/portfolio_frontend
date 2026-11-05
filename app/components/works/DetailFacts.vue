<script setup lang="ts">
import type { Work } from '~/composables/useWorks'

const props = defineProps<{
  work: Work
}>()

const { t } = useI18n()

const rows = computed(() => [
  { key: 'role', value: props.work.role.join('、') },
  { key: 'period', value: workPeriodLabel(props.work, t('works.detail.present')) },
  { key: 'team', value: props.work.team ?? '' },
].filter(row => row.value))
</script>

<template>
  <aside class="h-fit rounded-xl border border-border bg-card p-5 lg:sticky lg:top-24">
    <dl class="flex flex-col gap-4 text-sm">
      <div v-for="row in rows" :key="row.key" class="flex flex-col gap-1">
        <dt class="caption">{{ t(`works.facts.${row.key}`) }}</dt>
        <dd class="text-foreground">{{ row.value }}</dd>
      </div>
      <div v-if="work.stack.length" class="flex flex-col gap-2">
        <dt class="caption">{{ t('works.facts.stack') }}</dt>
        <dd>
          <ul class="flex flex-wrap gap-1.5">
            <li v-for="tech in work.stack" :key="tech">
              <Badge variant="secondary">{{ tech }}</Badge>
            </li>
          </ul>
        </dd>
      </div>
    </dl>
  </aside>
</template>
