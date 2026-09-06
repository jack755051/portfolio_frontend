<script setup lang="ts">
import type { ExperienceItem } from '~/types/experience'
import { Briefcase, GraduationCap } from '@lucide/vue'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'

const props = defineProps<{
  item: ExperienceItem
}>()

const { t, rt } = useI18n()

const icon = computed(() => (rt(props.item.type) === 'work' ? Briefcase : GraduationCap))
</script>

<template>
  <Card>
    <CardHeader>
      <div class="flex items-start justify-between gap-2">
        <div class="flex items-center gap-2">
          <component :is="icon" class="size-4 shrink-0 text-muted-foreground" />
          <CardTitle class="text-base">
            {{ rt(item.role) }} · {{ rt(item.company) }}
          </CardTitle>
        </div>
        <Badge v-if="item.isActive" class="shrink-0">
          {{ t('experience.active') }}
        </Badge>
      </div>
      <p class="font-mono text-xs tracking-wide text-muted-foreground">
        {{ rt(item.period) }}
      </p>
      <p class="text-sm leading-relaxed text-foreground/90">
        {{ rt(item.description) }}
      </p>
    </CardHeader>

    <CardContent v-if="item.projects?.length">
      <ExperienceProjects :projects="item.projects" />
    </CardContent>
  </Card>
</template>
