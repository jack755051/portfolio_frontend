---
title: "Template Syntax"
description: "Vue 在建置階段（或執行初期），會在底層把你寫的 <template> 全部轉換成高效率的 JavaScript 渲染函式 (Render Function)"
category: frontend
date: 2026-08-05
tags: ["Vue"]
draft: false
sourcePath: "Vue/02-Template Syntax.md"
---
## Vue 運作的核心機制

### 編譯為 JS (Compile)：
Vue 在建置階段（或執行初期），會在底層把你寫的 `<template>` 全部轉換成高效率的 **JavaScript 渲染函式 (Render Function)**

### 精準打擊 (Minimal DOM manipulations)：
搭配 Vue 的虛擬 DOM (Virtual DOM) ，當你的變數改變時，會在記憶體中計算出新舊畫面的「最小差異」，然後**只去更新真實網頁上那一個微小的節點**。

=====
##  Text Interpolation (文字插植)

```javascript
<span>Message: {{ msg }}</span>
```

=====
##  Raw HTML
### Text Interpolation (文字插值) vs Raw HTML (原始 HTML)

- 用文字差值的方式`{{}}`，可以杜絕===XSS 攻擊===
- 永遠只在「你完全信任且能控制」的內容上使用 `v-html`（例如你自己公司 CMS 後台編輯器產生的文章）。**絕對不要**把使用者輸入的內容，直接用 `v-html` 渲染在畫面上。

======
##  Attribute Bindings (屬性綁定)

> 不能在 HTML 屬性中使用花括號。請改用 v-bind 指令

```javascript
<div v-bind:id="dynamicId"></div>
```
### 簡寫
<div :id="dynamicId"></div>
```javascript
v-bind:id="dynamicId = :id="dynamicId
```
#### 補充
`v-bind` 的核心作用是「動態綁定 HTML 屬性」，它的基本語法是 `v-bind:屬性名稱="變數"`。
<!-- obsidian image: Pasted image 20260714111359.png|416 -->
======
### 動態綁定多個屬性

```javascript
const objectOfAttrs = {
  id: 'container',
  class: 'wrapper',
  style: 'background-color:green'
}
```
搭配
```javascript
<div v-bind="objectOfAttrs"></div>
```
### JavaScript 表達式 (Expression)

文件差值內部可以接受JS的表達式
```javascript
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

<div :id="`list-${id}`"></div>
```

但是**不能**放用來「宣告」或「控制流程」的陳述式

----------
##  Directives

>帶有==v-==前綴的特殊屬性。

###  Arguments

- 指令 (Directive) 就是 `v-` 開頭的字（例如 `v-bind`、`v-on`）。但是，光說指令是不夠的，Vue 需要知道**這個指令要作用在誰身上**。
- **公式**：指令:參數="表達式"
```javascript
<a v-bind:href="url">

<a :href="url">               // 縮寫

<a v-on:click="doSomething">

<a @click="doSomething">      // 縮寫
```
> **`v-bind`** 是指令（告訴 Vue：幫我動態綁定一個屬性）
> **`href`** 就是這段文件所說的 **「參數 (Argument)」**（告訴 Vue：我要綁定的是 `href` 這個屬性）
> **`url`** 是表達式（告訴 Vue：這個屬性的值來自於 `url` 這個變數）

###  Dynamic Arguments

```javascript
<a :[attributeName]="url"> ... </a>
```

- 消滅因 **『屬性名稱不同** 或 **『事件名稱不同』** 而產生的 `v-if` 複製貼上地獄。
- 有時候要綁定 A 屬性/事件，有時候要綁定 B 屬性/事件
- 日常開發 95% 的業務邏輯中，**真的用不到它**。我們通常都很明確知道一個按鈕要綁定 `click`，一個輸入框要綁定 `disabled`。
- 主要服務於 **「開發底層共用元件庫（如 shadcn、ElementUI）」** 或 **「極度複雜的資料驅動架構（Schema-Driven）」**。

### 情境一：開發一個萬用的「下拉選單 (Dropdown)」
假設你要幫公司寫一個共用的 `<AppDropdown>` 元件。 設計師要求：在「電腦版」時，滑鼠移過去（`mouseenter`）就要展開；在「手機版」時，必須點擊（`click`）才會展開。

#### 如果沒有動態參數：
```javascript
<!-- 逼不得已的寫法：把所有可能的事件都綁定，然後在邏輯裡判斷 -->
<div 
  @mouseenter="isDesktop ? open() : null"
  @click="isMobile ? open() : null"
>
  點我或滑我
</div>
```

#### 使用動態參數
```javascript
// JS 裡判斷：如果是手機就回傳 'click'，否則回傳 'mouseenter'
const triggerEvent = computed(() => isMobile.value ? 'click' : 'mouseenter');
```

```javascript
<!-- 乾淨俐落！ -->
<div @[triggerEvent]="open()">
  點我或滑我
</div>
```

### 情境二：後端決定前端的驗證屬性（Schema-Driven）

假設後端傳來一包 JSON，告訴你這個 `<input>` 有一個長度或大小的限制。 有時候是限制「字數」（屬性叫 `maxlength`），有時候是限制「數字大小」（屬性叫 `max`）。

```javascript
// 後端傳來的設定
const fieldRule = {
  limitType: 'maxlength', // 下次可能會變成 'max'
  limitValue: 20
}
```
#### 如果沒有動態參數：
```javascript
<input 
  v-if="fieldRule.limitType === 'maxlength'" 
  :maxlength="fieldRule.limitValue" 
/>
<input 
  v-if="fieldRule.limitType === 'max'" 
  :max="fieldRule.limitValue" 
/>
```
#### 使用動態參數
```javascript
<input :[fieldRule.limitType]="fieldRule.limitValue" />
```
