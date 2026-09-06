---
title: C# LINQ 查詢入門
description: 用查詢語法與方法語法對照，釐清 Where、Select 與延遲執行的基本用法。
category: backend
date: 2026-07-18
tags: [C#, LINQ]
draft: false
---

## LINQ 在做什麼

LINQ 把「篩選、投影、排序」寫成可組合的查詢。同一套思維可用在記憶體集合與部分資料來源。

## 兩種寫法

**查詢語法**適合表達意圖：

```csharp
var result =
    from item in items
    where item.IsActive
    select item.Name;
```

**方法語法**適合串接與重用：

```csharp
var result = items
    .Where(item => item.IsActive)
    .Select(item => item.Name);
```

## 延遲執行

多數 LINQ 運算子是延遲的：定義查詢時還不會跑，直到你列舉（`foreach`、`ToList`）才執行。

這代表：

- 可以先組查詢再決定要不要物化
- 也要小心在迴圈裡重複列舉造成重複成本

## 小結

先用 `Where` / `Select` 把資料收成你要的形狀，需要時再 `ToList`。查詢語法與方法語法可以並存，選可讀性較高的那一種。
