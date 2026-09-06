<script setup lang="ts">
const props = defineProps<{
  title: string
  description: string
  date: string
  category: string
  path: string
  tags?: string[] | null
}>()

const { t, locale } = useI18n()
const localePath = useLocalePath()

const formattedDate = computed(() => {
  const value = Date.parse(props.date)
  if (Number.isNaN(value)) return props.date
  return new Intl.DateTimeFormat(locale.value, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(value)
})
</script>

<template>
  <NuxtLink
    :to="localePath(path)"
    class="group block h-full rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/35 hover:bg-muted/30"
  >
    <article class="flex h-full flex-col gap-3">
      <div class="flex items-center justify-between gap-3">
        <Badge variant="secondary">
          {{ t(`notes.categories.${category}`) }}
        </Badge>
        <time class="font-mono text-xs text-muted-foreground" :datetime="date">
          {{ formattedDate }}
        </time>
      </div>

      <h2 class="text-base font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
        {{ title }}
      </h2>

      <p class="line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {{ description }}
      </p>

      <ul v-if="tags?.length" class="flex flex-wrap gap-1.5">
        <li
          v-for="tag in tags"
          :key="tag"
        >
          <Badge variant="outline">{{ tag }}</Badge>
        </li>
      </ul>
    </article>
  </NuxtLink>
</template>
