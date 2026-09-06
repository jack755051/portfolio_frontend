<template>
  <!-- 右側識別圖：模擬程式碼編輯器卡片，呼應前端工程師身份 -->
  <div
    aria-hidden="true"
    class="relative mx-auto hidden w-full max-w-2xl motion-safe:animate-[hero-in_0.8s_ease-out_0.15s_both] lg:block"
  >
    <!-- 卡片後方的虛線邊框，做出層次感 -->
    <div class="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border border-dashed border-accent-500/60" />

    <div class="relative aspect-[2/1] overflow-hidden rounded-2xl border border-black/10 bg-gray-950 shadow-xl">
      <div class="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <span class="size-2.5 rounded-full bg-red-500" />
        <span class="size-2.5 rounded-full bg-amber-400" />
        <span class="size-2.5 rounded-full bg-green-500" />
        <span class="ml-auto font-mono text-xs text-gray-400">profile.vue</span>
      </div>

      <div class="flex gap-4 px-5 py-4 font-mono text-xs">
        <div class="flex flex-col items-end gap-1 text-gray-600 tabular-nums select-none">
          <span v-for="n in 10" :key="n">{{ n }}</span>
        </div>
        <div class="flex flex-col gap-1 whitespace-nowrap text-gray-300">
          <p><span class="text-purple-400">const</span> developer = {</p>
          <p class="pl-4"><span class="text-sky-300">name</span>: <span class="text-emerald-400">'Charlie Tai'</span>,</p>
          <p class="pl-4"><span class="text-sky-300">role</span>: <span class="text-emerald-400">'Frontend Engineer'</span>,</p>
          <p class="pl-4"><span class="text-sky-300">skills</span>: {</p>
          <p class="pl-8"><span class="text-sky-300">frontend</span>: [<span class="text-emerald-400">'Vue'</span>, <span class="text-emerald-400">'Nuxt'</span>, <span class="text-emerald-400">'Angular'</span>],</p>
          <p class="pl-8"><span class="text-sky-300">backend</span>: [<span class="text-emerald-400">'Node.js'</span>, <span class="text-emerald-400">'NestJS'</span>, <span class="text-emerald-400">'Docker'</span>],</p>
          <p class="pl-4">},</p>
          <p class="pl-4"><span class="text-sky-300">work</span>: [<span class="text-emerald-400">'TPIsoftware'</span>, <span class="text-emerald-400">'SYSTEX'</span>, <span class="text-emerald-400">'HaMaStar'</span>],</p>
          <p class="pl-4"><span class="text-sky-300">learning</span>: [<span class="text-emerald-400">'C#'</span>],</p>
          <p>};</p>
        </div>
      </div>
    </div>
  </div>
</template>
