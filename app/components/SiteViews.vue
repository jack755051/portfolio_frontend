<script setup lang="ts">
/**
 * 全站總瀏覽。
 * 靜態 GitHub Pages 無後端；改打 hitscounter.dev（有 CORS），
 * 從回傳 SVG 的 aria-label 解析數字（JSON API 常被擋）。
 * 同一 session 只 +1 一次，避免 remount／HMR 灌水。
 */
const { t, locale } = useI18n()

const COUNTER_URL =
  'https://hitscounter.dev/api/hit?url=https://portfolio.sanring.dev&label=Views&message_bg=%230d9488'
const SESSION_KEY = 'portfolio-site-views-v2'

const views = ref<number | null>(null)

const display = computed(() => {
  if (views.value == null) return '—'
  return new Intl.NumberFormat(locale.value).format(views.value)
})

function parseViewsFromSvg(svg: string): number | null {
  // e.g. aria-label="12 / 34" or <title>12 / 34</title> → take the larger (total hits)
  const labeled = svg.match(/aria-label="([^"]+)"/i)?.[1]
    ?? svg.match(/<title>([^<]+)<\/title>/i)?.[1]
  if (!labeled) return null

  const nums = labeled.match(/\d+/g)?.map(Number) ?? []
  const valid = nums.filter(n => Number.isFinite(n) && n >= 0)
  if (!valid.length) return null
  return Math.max(...valid)
}

onMounted(async () => {
  try {
    const cached = sessionStorage.getItem(SESSION_KEY)
    if (cached != null && cached !== '') {
      const n = Number(cached)
      if (Number.isFinite(n) && n >= 0) {
        views.value = n
        return
      }
    }

    const res = await fetch(COUNTER_URL)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const svg = await res.text()
    const n = parseViewsFromSvg(svg)
    if (n == null) throw new Error('invalid count')

    views.value = n
    sessionStorage.setItem(SESSION_KEY, String(n))
  }
  catch {
    views.value = null
  }
})
</script>

<template>
  <ClientOnly>
    <p class="font-mono text-xs text-muted-foreground">
      <span>{{ t('site.views') }}</span>
      <span class="ml-1.5 tabular-nums text-foreground">{{ display }}</span>
    </p>
    <template #fallback>
      <p class="font-mono text-xs text-muted-foreground">
        {{ t('site.views') }}
        <span class="ml-1.5 tabular-nums">—</span>
      </p>
    </template>
  </ClientOnly>
</template>
