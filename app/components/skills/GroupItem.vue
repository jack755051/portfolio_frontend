<script setup lang="ts">
const props = defineProps<{
  label: string
  icon: string
}>()

const src = computed(
  () => `https://cdn.simpleicons.org/${props.icon}`,
)

const failed = ref(false)

function onError() {
  failed.value = true
}
</script>

<template>
  <li
    class="flex items-center gap-3 rounded-lg bg-muted/60 px-3 py-2.5"
  >
    <span
      class="flex size-8 shrink-0 items-center justify-center rounded-md bg-background/80"
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
        class="text-xs font-semibold text-muted-foreground"
        aria-hidden="true"
      >
        {{ label.slice(0, 1) }}
      </span>
    </span>
    <span class="text-sm font-medium text-foreground">{{ label }}</span>
  </li>
</template>
