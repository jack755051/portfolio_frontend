<script setup lang="ts">
import type { Work } from '~/composables/useWorks'
import { ArrowUpRight, Lock } from '@lucide/vue'

const props = defineProps<{
  work: Work
}>()

const { t } = useI18n()

type LinkKey = 'demo' | 'repo' | 'docs'
const linkKeys: LinkKey[] = ['demo', 'repo', 'docs']

/** 內部系統不給外連；已下線的作品不給 demo */
const links = computed(() => {
  if (props.work.visibility === 'private') return []
  return linkKeys
    .filter(key => props.work.links[key])
    .filter(key => !(key === 'demo' && props.work.status === 'archived'))
    .map(key => ({ key, href: props.work.links[key]! }))
})
</script>

<template>
  <header class="flex flex-col gap-4">
    <div class="flex flex-wrap items-center gap-2">
      <Badge variant="secondary">{{ t(`works.kind.${work.kind}`) }}</Badge>
      <Badge variant="outline">{{ t(`works.status.${work.status}`) }}</Badge>
    </div>
    <h1 class="heading-1">{{ work.title }}</h1>
    <p class="max-w-2xl text-base text-muted-foreground sm:text-lg">
      {{ work.summary }}
    </p>

    <div v-if="links.length" class="flex flex-wrap gap-2">
      <Button
        v-for="(link, i) in links"
        :key="link.key"
        as-child
        size="sm"
        :variant="i === 0 ? 'default' : 'outline'"
      >
        <a :href="link.href" target="_blank" rel="noopener noreferrer">
          {{ t(`works.links.${link.key}`) }}
          <ArrowUpRight class="size-3.5" />
        </a>
      </Button>
    </div>
    <p
      v-else-if="work.visibility === 'private'"
      class="inline-flex items-center gap-1.5 text-sm text-muted-foreground"
    >
      <Lock class="size-3.5" />
      {{ t('works.detail.privateNotice') }}
    </p>
  </header>
</template>
