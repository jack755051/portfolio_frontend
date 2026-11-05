<script setup lang="ts">
export type ArchitectureLayer = {
  label: string
  /** 可直接丟給 ContentRenderer 的內容 */
  value: { body: { type: string, value: unknown[] } }
}

defineProps<{
  layers: ArchitectureLayer[]
}>()
</script>

<template>
  <ul class="grid gap-3 sm:grid-cols-2">
    <li
      v-for="(layer, i) in layers"
      :key="`${layer.label}-${i}`"
      class="flex flex-col gap-2 rounded-lg border border-border bg-muted/40 p-4 sm:last:odd:col-span-2"
    >
      <span
        v-if="layer.label"
        class="inline-flex w-fit items-center gap-2 text-xs font-semibold tracking-wide text-primary"
      >
        <span aria-hidden="true" class="size-1.5 rounded-full bg-primary" />
        {{ layer.label }}
      </span>
      <div class="text-sm leading-relaxed text-muted-foreground [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-primary/80 [&_code]:rounded [&_code]:bg-background [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.85em] [&_strong]:text-foreground">
        <ContentRenderer :value="layer.value" />
      </div>
    </li>
  </ul>
</template>
