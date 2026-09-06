<script setup lang="ts">
import type { SkillFocus } from '~/types/skills'
import { Boxes, Layers, Palette, PanelsTopLeft } from '@lucide/vue'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'

const props = defineProps<{
  item: SkillFocus
  index: number
}>()

const { t } = useI18n()

const icons = {
  panels: PanelsTopLeft,
  palette: Palette,
  layers: Layers,
  boxes: Boxes,
} as const

const icon = computed(() => icons[props.item.icon])

const indexLabel = computed(() =>
  String(props.index).padStart(2, '0'),
)
</script>

<template>
  <Card class="group relative h-full overflow-hidden transition-colors hover:border-primary/35">
    <span
      aria-hidden="true"
      class="pointer-events-none absolute -right-8 -top-8 size-28 rounded-full bg-primary/10 transition-transform duration-500 group-hover:scale-125"
    />

    <CardHeader class="relative gap-4">
      <div class="flex items-start justify-between gap-3">
        <span
          class="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary"
        >
          <component :is="icon" class="size-5" />
        </span>
        <span class="font-mono text-xs tabular-nums text-muted-foreground">
          {{ indexLabel }}
        </span>
      </div>

      <div class="flex flex-col gap-1">
        <p class="meta-label text-primary">
          {{ t(item.subtitleKey) }}
        </p>
        <CardTitle class="text-lg">
          {{ t(item.titleKey) }}
        </CardTitle>
      </div>

      <CardDescription class="text-sm leading-relaxed">
        {{ t(item.summaryKey) }}
      </CardDescription>
    </CardHeader>

    <CardContent class="relative flex flex-wrap gap-1.5 pt-0">
      <Badge
        v-for="tag in item.highlights"
        :key="tag"
        variant="secondary"
      >
        {{ tag }}
      </Badge>
    </CardContent>
  </Card>
</template>
