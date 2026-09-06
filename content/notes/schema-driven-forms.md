---
title: Schema-Driven 表單思路
description: 用 schema 描述欄位與驗證，讓複雜表單的結構、文案與規則集中管理。
category: other
date: 2026-08-05
tags: [Forms, Architecture]
draft: false
---

## 問題

當表單欄位一多，畫面、驗證、預設值常散落在元件各處，改一個規則要改好幾層。

## 做法

把欄位定義收成 schema，例如：

- `name` / `type` / `label`
- `required`、驗證規則
- 預設值與顯示條件

UI 只負責「依 schema 渲染」，業務規則盡量留在 schema 或對應的 parser。

## 適合什麼時候

- 欄位結構常變（後台、設定頁、標案表單）
- 同一套欄位要在多個流程重用
- 希望驗證與文案可被非 UI 層共用

## 代價

多一層抽象：簡單三欄表單不必上 schema。schema 本身也需要維護與型別約束。

## 小結

欄位一多、規則一複，就把「長什麼樣子」和「怎麼驗證」從畫面元件抽出去。Schema-driven 不是銀彈，但是複雜表單的好預設。
