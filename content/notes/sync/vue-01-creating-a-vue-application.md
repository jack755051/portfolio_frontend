---
title: "Creating a Vue Application"
description: "import { createApp } from 'vue'"
category: frontend
date: 2026-08-05
tags: ["Vue"]
draft: false
sourcePath: "Vue/01-Creating a Vue Application.md"
---
## 每個 `Vue Application`都是 `createApp` 函数创建
```javascript
import { createApp } from 'vue'

const app = createApp({
  /* root component options */
})
```

-------
## 每個應用都需要根組件
```javascript
import { createApp } from 'vue'
// import the root component App from a single-file component.
import App from './App.vue'

const app = createApp(App)
```

-------
## 掛載 `Application`

Application只有在調用`.mount()`方法后才会渲染任何内容
```javascript
app.mount('#app')
```
### Container 不屬於 Vue Application 的一部分

Vue 的魔法（如綁定變數、監聽點擊），對這個最外層的 HTML 標籤是完全無效的

1. 渲染前（你的專案檔案）

在 `index.html` (這是 Container 容器)
```javascript
<!-- Vue 管不到這裡！如果你在這裡寫 Vue 的語法，瀏覽器會看不懂 --> 
<div id="app" {{ msg }} @click="doSomething"></div>
```

在 `App.vue` (這是 Root Component 根元件)
```javascript
<template>
  <!-- Vue 只管得到這裡面 -->
  <h1>我是 App.vue 裡面的標題</h1>
</template>
```

2. 渲染後（瀏覽器最終看到的樣子）
```javascript
<div id="app"> 
	<!-- 從這裡開始，才是 Vue 真正有掌控權的「應用程式內部」 --> 
	<h1>我是 App.vue 裡面的標題</h1> 
</div>
```


========
#### `mount()`是最後的啟動開關

`.mount()` 方法應該始終在所有應用程式配置和資源註冊完成後呼叫，一旦呼叫了 `.mount()`，Vue 就會開始解析畫面並渲染到瀏覽器上。

- 路由設定 (Vue Router)
- 狀態管理 (Pinia)
- 全域共用的 UI 元件 (如你提到的 `TodoDeleteButton`)

以上都需要在 `.mount()`之前完成。

========
#### 回傳值的本質不同 (實體 vs 元件)

- `createApp()` 回傳的是「應用程式實體 (Application Instance)」
- `.mount()` 回傳的是「根元件實體 (Component Instance)」

----------
### App Configurations

>它設定的是 **Vue 框架本身的底層行為**

當你寫下 `const app = createApp(App)`的時候，會提供一個`app.config`調整全域的系統機制。

最常見的只有這幾個：

- 全域錯誤處理 (`app.config.errorHandler`)
- 全域變數 (`app.config.globalProperties`)

----------------------
### Multiple Application Instances

>createApp API 允許多個 Vue 應用程式共存於相同頁面

```javascript
const app1 = createApp({
  /* ... */
})
app1.mount('#container-1')

const app2 = createApp({
  /* ... */
})
app2.mount('#container-2')
```

- 是在解決**舊有系統翻新**或**混合架構**的真實開發痛點

---------------------------
