<script setup lang="ts">
import { NuxtLink } from '#components'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { mainNav } from '~/utils/navigation'

type Crumb = {
  label: string
  to?: string
}

const route = useRoute()
const localePath = useLocalePath()
const { t, locale } = useI18n()

function stripLocalePrefix(path: string) {
  if (path === '/en' || path.startsWith('/en/')) {
    return path.slice(3) || '/'
  }
  return path || '/'
}

const crumbs = computed<Crumb[]>(() => {
  const path = stripLocalePrefix(route.path)
  if (path === '/') return []

  const items: Crumb[] = [
    { label: t('nav.home'), to: localePath('/') },
  ]

  const segments = path.split('/').filter(Boolean)
  if (!segments.length) return items

  const root = `/${segments[0]}`
  const nav = mainNav.find(item => item.to === root)
  const rootLabel = nav
    ? (nav.labels[locale.value as 'zh-TW' | 'en'] ?? t(nav.labelKey))
    : segments[0]

  if (segments.length === 1) {
    items.push({ label: rootLabel })
    return items
  }

  items.push({ label: rootLabel, to: localePath(root) })

  // nested: e.g. /notes/sync/foo → show last segment as current
  const rest = segments.slice(1).map(decodeURIComponent)
  const current = rest[rest.length - 1] ?? ''
  items.push({ label: current })

  return items
})

const visible = computed(() => crumbs.value.length > 0)
</script>

<template>
  <Breadcrumb v-if="visible" aria-label="Breadcrumb">
    <BreadcrumbList>
      <template v-for="(crumb, index) in crumbs" :key="`${crumb.label}-${index}`">
        <BreadcrumbItem>
          <BreadcrumbLink v-if="crumb.to && index < crumbs.length - 1" as-child>
            <NuxtLink :to="crumb.to">
              {{ crumb.label }}
            </NuxtLink>
          </BreadcrumbLink>
          <BreadcrumbPage v-else>
            {{ crumb.label }}
          </BreadcrumbPage>
        </BreadcrumbItem>
        <BreadcrumbSeparator v-if="index < crumbs.length - 1" />
      </template>
    </BreadcrumbList>
  </Breadcrumb>
</template>
