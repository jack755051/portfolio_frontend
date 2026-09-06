<script setup lang="ts">
const route = useRoute()
const localePath = useLocalePath()
const { t, locale } = useI18n()

const notePath = computed(() => {
  const slug = route.params.slug
  const parts = Array.isArray(slug) ? slug : [slug]
  return `/notes/${parts.filter(Boolean).join('/')}`
})

const { data: note } = await useAsyncData(
  () => `note-${notePath.value}`,
  () => queryCollection('notes').path(notePath.value).first(),
  { watch: [notePath] },
)

if (!note.value || note.value.draft) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Note not found',
  })
}

const formattedDate = computed(() => {
  const value = Date.parse(note.value!.date)
  if (Number.isNaN(value)) return note.value!.date
  return new Intl.DateTimeFormat(locale.value, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(value)
})

useSeoMeta({
  title: () => note.value?.title,
  description: () => note.value?.description,
})
</script>

<template>
  <article v-if="note" class="mx-auto flex max-w-3xl flex-col gap-8">
    <div class="flex flex-col gap-4">
      <NuxtLink
        :to="localePath('/notes')"
        class="text-sm font-medium text-primary transition-colors hover:text-primary/80"
      >
        ← {{ t('notes.backToList') }}
      </NuxtLink>

      <header class="flex flex-col gap-3 border-b border-border pb-6">
        <div class="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">
            {{ t(`notes.categories.${note.category}`) }}
          </Badge>
          <time class="font-mono text-xs text-muted-foreground" :datetime="note.date">
            {{ formattedDate }}
          </time>
        </div>
        <h1 class="heading-1">{{ note.title }}</h1>
        <p class="text-base text-muted-foreground sm:text-lg">
          {{ note.description }}
        </p>
        <ul v-if="note.tags?.length" class="flex flex-wrap gap-1.5">
          <li v-for="tag in note.tags" :key="tag">
            <Badge variant="outline">{{ tag }}</Badge>
          </li>
        </ul>
      </header>
    </div>

    <div class="notes-body flex flex-col gap-4 text-sm leading-relaxed text-foreground/90 sm:text-base [&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.85em] [&_h2]:mt-2 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_li]:my-1 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:text-muted-foreground [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:border [&_pre]:border-border [&_pre]:bg-muted/50 [&_pre]:p-4 [&_pre]:font-mono [&_pre]:text-xs [&_ul]:list-disc [&_ul]:pl-5">
      <ContentRenderer :value="note" />
    </div>
  </article>
</template>
