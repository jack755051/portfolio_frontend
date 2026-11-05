<script setup lang="ts">
import type { CarouselApi } from '@/components/ui/carousel'
import type { Work } from '~/composables/useWorks'

const props = defineProps<{
  items: Work['gallery']
}>()

const { t } = useI18n()

const api = shallowRef<CarouselApi>()
const current = ref(0)

function onInit(value: CarouselApi) {
  api.value = value
  current.value = value?.selectedScrollSnap() ?? 0
  value?.on('select', () => {
    current.value = value.selectedScrollSnap()
  })
}

const active = computed(() => props.items[current.value])
const multiple = computed(() => props.items.length > 1)
</script>

<template>
  <section class="flex flex-col gap-3" :aria-label="t('works.detail.gallery')">
    <Carousel
      class="overflow-hidden rounded-xl border border-border bg-muted"
      :opts="{ loop: multiple }"
      @init-api="onInit"
    >
      <CarouselContent class="ml-0">
        <CarouselItem v-for="(item, i) in items" :key="item.src" class="pl-0">
          <!-- 點開看原圖 -->
          <a :href="item.src" target="_blank" rel="noopener" class="block">
            <img
              :src="item.src"
              :alt="item.alt"
              :loading="i === 0 ? 'eager' : 'lazy'"
              class="aspect-[2/1] w-full object-contain"
            >
          </a>
        </CarouselItem>
      </CarouselContent>
      <template v-if="multiple">
        <CarouselPrevious class="left-3 bg-background/80 backdrop-blur" />
        <CarouselNext class="right-3 bg-background/80 backdrop-blur" />
      </template>
    </Carousel>

    <div class="flex items-start justify-between gap-4">
      <p class="caption min-h-5">
        {{ active?.caption ?? active?.alt }}
      </p>
      <span v-if="multiple" class="shrink-0 font-mono text-xs text-muted-foreground tabular-nums">
        {{ current + 1 }} / {{ items.length }}
      </span>
    </div>

    <!-- 縮圖列：點擊跳到對應張 -->
    <ul v-if="multiple" class="flex gap-2 overflow-x-auto pb-1">
      <li v-for="(item, i) in items" :key="item.src" class="shrink-0">
        <button
          type="button"
          class="block w-24 overflow-hidden rounded-md border-2 bg-muted transition-colors sm:w-28"
          :class="i === current ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'"
          :aria-label="item.alt"
          :aria-current="i === current"
          @click="api?.scrollTo(i)"
        >
          <img :src="item.src" alt="" loading="lazy" class="aspect-[2/1] w-full object-cover object-left-top">
        </button>
      </li>
    </ul>
  </section>
</template>
