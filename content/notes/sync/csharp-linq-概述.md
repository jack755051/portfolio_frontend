---
title: "概述"
description: "它是整個 C# LINQ（Language Integrated Query） 的大本營。"
category: backend
date: 2026-08-22
tags: ["C#", "LINQ"]
draft: false
sourcePath: "C#/LINQ/概述.md"
---
## Enumerable

> 它是整個 C# **LINQ（Language Integrated Query）** 的大本營。

日常寫在陣列或 List 後面的 `.Where()`、`.Select()`、`.Sum()` 等等，底層全部都是 `Enumerable` 類別所提供的**擴充方法（`this IEnumerable<T>`）**。

#### 主要用途分類

1. 產生器靜態方法（從無到有造序列）
	- `Enumerable.Range(start, count)`：產生連續整數
	- `Enumerable.Repeat("Hello", 3)`：重複元素，產生 `["Hello", "Hello", "Hello"]`
	- `Enumerable.Empty<int>()`：產生一個乾淨且零記憶體配置的空序列
	
2. 擴充方法（類似 JavaScript 陣列的高階函式）
	-  所有實作了 `IEnumerable<T>` 的集合（陣列 `int[]`、`List<T>`、`Dictionary`）都可以直接串接這些方法：
	
	<!-- obsidian image: Pasted image 20260823012920.png -->
