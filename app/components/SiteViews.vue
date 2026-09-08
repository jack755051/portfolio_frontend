<script setup lang="ts">
/**
 * 全站總瀏覽：hits.dwyl.com（獨立 key，免申請）。
 * 不蒜子常出現異常大數字，已棄用。
 * 同一瀏覽器 session 只 +1 一次，避免 layout remount／HMR 灌水。
 */
const { t, locale } = useI18n()

const COUNTER_URL = 'https://hits.dwyl.com/jack755051/portfolio-sanring-dev.json'
const SESSION_KEY = 'portfolio-site-views'

const views = ref<number | null>(null)
const failed = ref(false)

const display = computed(() => {
  if (views.value == null) return '—'
  return new Intl.NumberFormat(locale.value).format(views.value)
})

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
    const data = await res.json() as { message?: string }
    const n = Number(data.message)
    if (!Number.isFinite(n) || n < 0) throw new Error('invalid count')

    views.value = n
    sessionStorage.setItem(SESSION_KEY, String(n))
  }
  catch {
    failed.value = true
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
