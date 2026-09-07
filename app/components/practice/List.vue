<script setup lang="ts">
import type { PracticeDifficultyFilter, PracticeProblem } from '~/types/practice'
import { practiceDifficulties } from '~/types/practice'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '~/components/ui/tabs'

const props = defineProps<{
  problems: PracticeProblem[]
}>()

const { t } = useI18n()
const active = ref<PracticeDifficultyFilter>('all')

const filtered = computed(() => {
  if (active.value === 'all') return props.problems
  return props.problems.filter(p => p.difficulty === active.value)
})

function countFor(filter: PracticeDifficultyFilter) {
  if (filter === 'all') return props.problems.length
  return props.problems.filter(p => p.difficulty === filter).length
}
</script>

<template>
  <Tabs v-model="active" class="gap-6">
    <TabsList class="flex h-auto w-full flex-wrap justify-start gap-1">
      <TabsTrigger
        v-for="diff in practiceDifficulties"
        :key="diff"
        :value="diff"
        class="gap-1.5"
      >
        {{ t(`practice.tabs.${diff}`) }}
        <span class="font-mono text-[0.7rem] text-muted-foreground">
          {{ countFor(diff) }}
        </span>
      </TabsTrigger>
    </TabsList>

    <TabsContent
      v-for="diff in practiceDifficulties"
      :key="diff"
      :value="diff"
      class="mt-0"
    >
      <ul v-if="filtered.length" class="grid gap-4 sm:grid-cols-2">
        <li
          v-for="problem in filtered"
          :key="`${problem.source}-${problem.titleSlug}`"
        >
          <PracticeItem :problem="problem" />
        </li>
      </ul>
      <p v-else class="caption py-8">
        {{ t('practice.empty') }}
      </p>
    </TabsContent>
  </Tabs>
</template>
