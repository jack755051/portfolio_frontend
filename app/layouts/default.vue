<template>
  <div class="flex min-h-screen flex-col">
    <Header />
    <main class="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
      <div class="mb-6 flex flex-wrap items-center justify-between gap-3">
        <AppBreadcrumb />
        <SiteViews class="ml-auto" />
      </div>
      <slot />
    </main>
  </div>
</template>
