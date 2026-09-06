<template>
  <div>
    <WorksIntro />
    <ul class="flex flex-col gap-4">
      <li v-for="work in works" :key="work.slug">
        <WorksCard :work="work" />
      </li>
    </ul>
  </div>
</template>
