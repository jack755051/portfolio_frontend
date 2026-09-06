---
title: "Computed Properties"
description: "<script setup>"
category: frontend
date: 2026-08-05
tags: ["Vue"]
draft: false
sourcePath: "Vue/04-Computed Properties.md"
---
```javascript
<script setup>
import { reactive, computed } from 'vue'

const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})

// a computed ref
const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? 'Yes' : 'No'
})
</script>

<template>
  <p>Has published books:</p>
  <span>{{ publishedBooksMessage }}</span>
</template>
```

- 為什麼要用 `computed` 而不是普通函式？
	- **自動追蹤依賴：** 你不需要手動告訴 Vue「當 `author.books` 變動時要重新計算」，Vue 自己會知道。
	- **快取（Cache）機制：** 只要 `author.books` 沒有改變，不管畫面重新渲染多少次，`publishedBooksMessage` 都會直接回傳上一次算好的舊結果，不會浪費效能重新計算。

##  Computed Caching vs. Methods

既然寫成普通函式（Method）也可以在畫面上印出一樣的結果，為什麼還要多一個 `computed`（計算屬性）？

>快取機制

<!-- obsidian image: Pasted image 20260805174536.png -->


#### 補充：Angular的實現方法跟改革

- 在Angular當中舊版的機制是用zone.js來處理 -> 攔截所有非步事件（如 `setTimeout`、HTTP 請求、點擊事件），但會導致兩個問題：
	- **沒有精準追蹤**：Zone.js 其實**不知道**到底是哪一個變數改了，只知道「有事情發生」，所以會進行髒檢查（Dirty Checking）。
	- **效能負擔**：當專案變大時，容易造成不必要的全局過濾與重新渲染。

- 新版的Angular引入Signals的概念

<!-- obsidian image: Pasted image 20260805174946.png|623 -->

----------
## Writable Computed

計算屬性預設僅支援 getter 方法。如果您嘗試為計算屬性賦值，將會收到執行時間警告。可以透過同時提供 getter 和 setter 方法來建立一個：

```javascript
<script setup>
import { ref, computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed({
  // getter
  get() {
    return firstName.value + ' ' + lastName.value
  },
  // setter
  set(newValue) {
    // Note: we are using destructuring assignment syntax here.
    [firstName.value, lastName.value] = newValue.split(' ')
  }
})
</script>
```

-------
## Getting the Previous Value

>可以取得上一次計算後回傳的結果，並非一定是**初始值**

可以取得先前的值：
```javascript
<script setup>
import { ref, computed } from 'vue'

const count = ref(2)

// This computed will return the value of count when it's less or equal to 3.
// When count is >=4, the last value that fulfilled our condition will be returned
// instead until count is less or equal to 3
const alwaysSmall = computed((previous) => {
  if (count.value <= 3) {
    return count.value
  }

  return previous
})
</script>
```

搭配可寫入值：
```javascript
<script setup>
import { ref, computed } from 'vue'

const count = ref(2)

const alwaysSmall = computed({
  get(previous) {
    if (count.value <= 3) {
      return count.value
    }

    return previous
  },
  set(newValue) {
    count.value = newValue * 2
  }
})
</script>
```
