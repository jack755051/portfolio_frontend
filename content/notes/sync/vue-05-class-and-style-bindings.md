---
title: "Class and Style Bindings"
description: "在 Vue 中給元素綁定 class 或 style 時，不用再辛苦地自己「拼字串」，Vue 提供了可以直接傳入「物件（Object）」或「陣列（Array）」的快捷寫法。"
category: frontend
date: 2026-08-05
tags: ["Vue"]
draft: false
sourcePath: "Vue/05-Class and Style Bindings.md"
---
在 Vue 中給元素綁定 `class` 或 `style` 時，不用再辛苦地自己「拼字串」，Vue 提供了可以直接傳入「物件（Object）」或「陣列（Array）」的快捷寫法。

## Binding HTML Classes

### Binding to Objects

- 可以透過動態樣式`:class`來傳遞
```javascript
<div :class="{ active: isActive }"></div>
```

- `:class` 指令也可以與普通的 `class` 屬性共存。例如，在以下狀態：
```javascript
const isActive = ref(true) 
const hasError = ref(false)

<div 
	class="static" 
	:class="{ active: isActive, 'text-danger': hasError }" >
</div>

```

- 不需要把全部的 Class 物件都硬塞（Inline）在 HTML 模板裡，可以直接把整個物件抽出來寫在 `<script>` 裡
```javascript
const classObject = reactive({
  active: true,
  'text-danger': false
})
```

```javascript
<div :class="classObject"></div>
```

會渲染成：
```javascript
<div class="active"></div>
```
