<script setup lang="ts">
import type { WorkKind } from '~/composables/useWorks'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '~/components/ui/tabs'

const { t } = useI18n()
const { data: works } = await useWorks()

const kinds: WorkKind[] = ['side-project', 'work']
const active = ref<WorkKind>('side-project')

function worksOf(kind: WorkKind) {
  return works.value.filter(work => work.kind === kind)
}

useSeoMeta({
  title: () => t('works.title'),
  description: () => t('works.lead'),
})
</script>

<template>
  <div>
    <WorksIntro />
    <Tabs v-model="active" class="gap-6">
      <TabsList class="flex h-auto w-full flex-wrap justify-start gap-1">
        <TabsTrigger
          v-for="kind in kinds"
          :key="kind"
          :value="kind"
          class="gap-1.5"
        >
          {{ t(`works.kind.${kind}`) }}
          <span class="font-mono text-[0.7rem] text-muted-foreground">
            {{ worksOf(kind).length }}
          </span>
        </TabsTrigger>
      </TabsList>

      <TabsContent
        v-for="kind in kinds"
        :key="kind"
        :value="kind"
        force-mount
        class="mt-0 data-[state=inactive]:hidden"
      >
        <ul v-if="worksOf(kind).length" class="flex flex-col gap-4">
          <li v-for="work in worksOf(kind)" :key="work.slug">
            <WorksCard :work="work" />
          </li>
        </ul>
        <p v-else class="caption py-8">
          {{ t('works.empty') }}
        </p>
      </TabsContent>
    </Tabs>
  </div>
</template>
