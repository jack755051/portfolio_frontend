<script setup lang="ts">
import type { ArchitectureLayer } from '~/components/works/Architecture.vue'

const route = useRoute()
const localePath = useLocalePath()
const { t } = useI18n()

const { data: works } = await useWorks()

const slug = computed(() => String(route.params.slug))
const index = computed(() => works.value.findIndex(work => work.slug === slug.value))
const work = computed(() => works.value[index.value])

if (!work.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Work not found',
  })
}

/** 同類型（個人作品／工作專案）內的上一個、下一個 */
const siblings = computed(() => works.value.filter(item => item.kind === work.value?.kind))
const prev = computed(() => {
  const i = siblings.value.findIndex(item => item.slug === slug.value)
  return i > 0 ? siblings.value[i - 1] : undefined
})
const next = computed(() => {
  const i = siblings.value.findIndex(item => item.slug === slug.value)
  return i >= 0 ? siblings.value[i + 1] : undefined
})

/** 頂部輪播：封面在前，接著作品截圖 */
const slides = computed(() => {
  if (!work.value) return []
  const cover = work.value.cover ? [{ src: work.value.cover, alt: work.value.title }] : []
  return [...cover, ...work.value.gallery.filter(item => item.src !== work.value?.cover)]
})

/** minimark 節點：[tag, props, ...children] 或純文字 */
type MinimarkNode = string | [string, Record<string, unknown>, ...MinimarkNode[]]

function textOf(node: MinimarkNode): string {
  if (typeof node === 'string') return node
  const [, , ...children] = node
  return children.map(textOf).join('')
}

/** 以內文的 ## 標題切段，每段做成一張卡片；標題自己渲染，不帶錨點連結 */
const sections = computed(() => {
  const nodes = (work.value?.body?.value ?? []) as MinimarkNode[]
  const result: { title: string, nodes: MinimarkNode[] }[] = []
  for (const node of nodes) {
    if (Array.isArray(node) && node[0] === 'h2') {
      result.push({ title: textOf(node), nodes: [] })
      continue
    }
    if (!result.length) result.push({ title: '', nodes: [] })
    result[result.length - 1]!.nodes.push(node)
  }
  return result
    .filter(section => section.nodes.length)
    .map(section => ({
      title: section.title,
      value: { body: { type: 'minimark', value: section.nodes } },
      layers: ARCHITECTURE_TITLES.includes(section.title) ? toLayers(section.nodes) : null,
    }))
})

const ARCHITECTURE_TITLES = ['技術架構', 'Architecture']

/** 技術架構段落：單一清單、每項寫成「**標籤**：說明」，轉成分層卡片；格式不符就照一般內文顯示 */
function toLayers(nodes: MinimarkNode[]): ArchitectureLayer[] | null {
  const [list] = nodes
  if (nodes.length !== 1 || !Array.isArray(list) || list[0] !== 'ul') return null

  const [, , ...items] = list
  return items
    .filter((li): li is Exclude<MinimarkNode, string> => Array.isArray(li) && li[0] === 'li')
    .map((li) => {
      const [, , ...children] = li
      const [first, second] = children
      let label = ''
      let rest = children
      if (Array.isArray(first) && first[0] === 'strong' && typeof second === 'string' && /^[：:]/.test(second)) {
        label = textOf(first)
        rest = [second.replace(/^[：:]\s*/, ''), ...children.slice(2)]
      }
      return { label, value: { body: { type: 'minimark', value: [['p', {}, ...rest]] } } }
    })
}

useSeoMeta({
  title: () => work.value?.title,
  description: () => work.value?.summary,
  ogImage: () => work.value?.cover,
})
</script>

<template>
  <article v-if="work" class="flex flex-col gap-10">
    <div class="flex flex-col gap-6">
      <NuxtLink
        :to="localePath('/works')"
        class="text-sm font-medium text-primary transition-colors hover:text-primary/80"
      >
        ← {{ t('works.backToList') }}
      </NuxtLink>

      <p
        v-if="work.isFallback"
        class="rounded-lg border border-border bg-muted/50 px-4 py-3 text-sm text-muted-foreground"
      >
        {{ t('works.detail.fallbackNotice') }}
      </p>

      <WorksDetailHeader :work="work" />
    </div>

    <WorksGallery v-if="slides.length" :items="slides" />

    <div class="grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
      <div class="order-2 flex min-w-0 flex-col gap-4 lg:order-1">
        <section
          v-if="work.highlights.length"
          class="flex flex-col gap-3 rounded-xl border border-border bg-card p-5 sm:p-6"
        >
          <h2 class="heading-2">{{ t('works.detail.highlights') }}</h2>
          <ul class="flex flex-col gap-2">
            <li
              v-for="item in work.highlights"
              :key="item"
              class="flex gap-3 text-sm leading-relaxed text-foreground/90 sm:text-base"
            >
              <span aria-hidden="true" class="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
              {{ item }}
            </li>
          </ul>
        </section>

        <section
          v-for="(section, i) in sections"
          :key="`${section.title}-${i}`"
          class="flex flex-col gap-3 rounded-xl border border-border bg-card p-5 sm:p-6"
        >
          <h2 v-if="section.title" class="heading-2">{{ section.title }}</h2>
          <WorksArchitecture v-if="section.layers" :layers="section.layers" />
          <div v-else class="works-body flex flex-col gap-3 text-sm leading-relaxed text-foreground/90 sm:text-base [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-primary/80 [&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.85em] [&_img]:rounded-lg [&_img]:border [&_img]:border-border [&_li]:my-1 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:text-muted-foreground [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:pl-5">
            <ContentRenderer :value="section.value" />
          </div>
        </section>
      </div>

      <WorksDetailFacts :work="work" class="order-1 lg:order-2" />
    </div>

    <WorksPager :prev="prev" :next="next" />
  </article>
</template>
