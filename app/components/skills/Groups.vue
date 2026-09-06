<script setup lang="ts">
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'

const { t } = useI18n()
</script>

<template>
  <section class="flex flex-col gap-6 border-t border-border py-10">
    <div class="flex flex-col gap-2">
      <p class="meta-label text-primary">{{ t('skills.groupsEyebrow') }}</p>
      <h2 class="heading-2">{{ t('skills.groupsHeading') }}</h2>
    </div>
    <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <li v-for="group in skillsData.groups" :key="group.id">
        <Card class="h-full">
          <CardHeader class="gap-1 pb-3">
            <CardTitle class="text-base font-semibold">
              {{ t(group.titleKey) }}
            </CardTitle>
            <p class="meta-label text-muted-foreground">
              {{ t(group.subtitleKey) }}
            </p>
          </CardHeader>
          <CardContent>
            <ul class="flex flex-col gap-2">
              <SkillsGroupItem
                v-for="item in group.items"
                :key="item.label"
                :label="item.label"
                :icon="item.icon"
              />
            </ul>
          </CardContent>
        </Card>
      </li>
    </ul>
  </section>
</template>
