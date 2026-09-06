---
title: "實務開發"
description: "在一個標準的.vue檔案中，通常會有三個重要的標籤<template> 、<script> 跟 <style>。那這三者是如何渲染的？"
category: frontend
date: 2026-08-05
tags: ["Vue"]
draft: false
sourcePath: "Vue/實務開發.md"
---
## vue的渲染順序

在一個標準的`.vue`檔案中，通常會有三個重要的標籤`<template>` 、`<script>` 跟 `<style>`。那這三者是如何渲染的？

```javascript

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

console.log('1. script setup 開始')

const message = 'hello'  
const count = ref(0)

const double = computed(() => {  
console.log('computed double 計算')  
return count.value * 2  
})

watch(count, () => {  
console.log('count changed')  
})

function onClick() {  
console.log('使用者點擊後才執行 onClick')  
count.value++  
}

console.log('2. script setup 結束')  
</script>

<template> 
	<div> 
		<p>{{ message }}</p> <p>{{ count }}</p>
	    <p>{{ double }}</p>
		<button @click="onClick">click</button>
	</div> 
</template>

<style lang="scss" scoped> 
	/** style */ 
</style>
```

- `<script setup>` 會早於 template render 執行，不是建立template後才將資料塞進去

- 整個流程會像是：
	1. `.vue` 建立 component instance
	2. 執行 `setup()`，也就是 `<script setup>`
	3. `setup()` 回傳或暴露 template 可用的資料、函式
	4. 執行 render function，也就是由 template 編譯出來的函式
	5. render function 讀取 message / count / onClick
	6. 產生 Virtual DOM
	7. Virtual DOM patch 到真實 DOM

### 其他會影響渲染的：

#### 1. computed 會影響 render，但它是 lazy 的
```javascript
const double = computed(() => count.value * 2)
```
只有 template 或其他地方讀到 `double.value` 時，它才會計算。  
`count` 改變後，`double` 會被標記為需要更新，下一次 render 讀取時才重新計算。

#### 2. watch / watchEffect 可以在資料變動後執行副作用
```javascript
watch(count, () => {
  console.log('count changed')
})
```
這種不直接產生畫面，但可能會改其他 state，進而造成下一次 render。

#### 3. async API 會造成至少兩次畫面狀態
像 `useQuery()` / `useAsyncData()` / `useFetch()` 這類查詢通常是：

```
執行 <script setup>
↓
建立 query / async data 狀態
↓
第一次 render：API 尚未回來，data 還是初始值
↓
畫面先使用初始狀態，例如 list = []、total = 0
↓
API 回來
↓
data.value 改變
↓
依賴 data 的 computed，例如 list / total，被標記為需要更新
↓
使用到 list / total 的 render 範圍重新執行
↓
產生新的 Virtual DOM
↓
Vue diff 新舊 Virtual DOM
↓
只 patch 真實 DOM 中有差異的部分

```

所以在 `vendor-payment-list` 裡：
```javascript
const { page, pageSize, list, total, applyFilters, clearFilters } = useVendorPaymentList()
```
這行會先建立列表查詢。

第一次 render 時，API 可能還沒有回來，因此 `useListQuery` 裡的預設值會先被使用：
```javascript
const list = computed(() => data.value?.data ?? [])
const total = computed(() => data.value?.total ?? 0)
```
所以 table 第一次可能收到：
```javascript
list = []
total = 0
```
等 API 回來後：
```
data.value 更新
↓
list / total 重新計算
↓
vendor-payment-list-table 收到新的 data / total
↓
相關 render function 重新執行
↓
Vue 只更新真實 DOM 中有差異的 table 區域
```

> 要注意的是，這裡的「重新 render」不是整個頁面的 DOM 全部砍掉重建。

#### 4. v-if / v-for / key 會影響 component 是否建立或重建

```javascript
<child-component v-if="visible" />
```
`visible = false` 時，子元件根本不會建立，也不會執行子元件的 `<script setup>`。

如果 `key` 改變：
```javascript
<child-component :key="id" />
```

#### 5. 父子元件順序
```
父元件 setup
↓
父元件 render
↓
遇到子元件
↓
子元件 setup
↓
子元件 render
```
