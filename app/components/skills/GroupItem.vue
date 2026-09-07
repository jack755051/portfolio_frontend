<script setup lang="ts">
const props = defineProps<{
  label: string
  icon: string
  /** simpleicons 色碼（不含 #），例如 DD0031；深色 logo 可省略，靠白底對比 */
  color?: string
}>()

const src = computed(() => {
  const base = `https://cdn.simpleicons.org/${props.icon}`
  return props.color ? `${base}/${props.color}` : base
})

const failed = ref(false)

watch(
  () => [props.icon, props.color],
  () => {
    failed.value = false
  },
)

function onError() {
  failed.value = true
}
</script>

<template>
  <li
    class="flex items-center gap-3 rounded-lg bg-muted/60 px-3 py-2.5"
  >
    <!-- 固定淺底，避免 Next／Shadcn 等深色 logo 在 dark mode 消失 -->
    <span
      class="flex size-8 shrink-0 items-center justify-center rounded-md bg-white shadow-sm ring-1 ring-black/8"
    >
      <img
        v-if="!failed"
        :src="src"
        :alt="label"
        width="20"
        height="20"
        class="size-5"
        loading="lazy"
        @error="onError"
      >
      <span
        v-else
        class="text-xs font-semibold text-zinc-700"
        aria-hidden="true"
      >
        {{ label.slice(0, 1) }}
      </span>
    </span>
    <span class="text-sm font-medium text-foreground">{{ label }}</span>
  </li>
</template>
