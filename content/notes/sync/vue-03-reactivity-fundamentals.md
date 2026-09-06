---
title: "Reactivity Fundamentals"
description: "宣告響應式狀態的建議方法"
category: frontend
date: 2026-08-05
tags: ["Vue"]
draft: false
sourcePath: "Vue/03-Reactivity Fundamentals.md"
---
##  Declaring Reactive State
###  ref()

宣告響應式狀態的建議方法

```javascript
import { ref } from 'vue'

const count = ref(0)
```

ref() 函數接受一個參數，並將其包裝在一個帶有 .value 屬性的 ref 物件中傳回

```javascript
const count = ref(0)

console.log(count) // { value: 0 }
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

setup() 函數中宣告並傳回它們
```javascript
<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}
</script>

<template>
  <button @click="increment">
    {{ count }}
  </button>
</template>
```

#### 為什麼是`ref()`

- **自動追蹤與更新**：首次渲染時追蹤 `ref`，數值改變即自動更新 DOM。
- **`value` 的作用**：讓 Vue 能夠攔截並偵測數值的存取與修改。
- **保持響應性傳遞**：可將 `ref` 傳入函式且不失聯，適合抽離與重構邏輯。

##### 補充： 
在底層，Vue 在 getter 中執行跟踪，並在 setter 中執行觸發。從概念上講，你可以將 ref 想像成一個類似這樣的物件：
```javascript
// pseudo code, not actual implementation
const myRef = {
  _value: 0,
  get value() {
    track()
    return this._value
  },
  set value(newValue) {
    this._value = newValue
    trigger()
  }
}
```

####  Deep Reactivity
