---
title: "查詢"
description: "依據使用頻率與應用場景，最常用的方法可以分為以下 6 大核心分類："
category: backend
date: 2026-08-24
tags: ["C#", "LINQ"]
draft: false
sourcePath: "C#/LINQ/查詢.md"
---
依據**使用頻率與應用場景**，最常用的方法可以分為以下 6 大核心分類：

### 篩選與過濾（最基本門檻）
``
<!-- obsidian image: Pasted image 20260820171012.png -->

```csharp
// 撈出未被刪除且年滿 18 的使用者
var activeUsers = users.Where(u => !u.IsDeleted && u.Age >= 18);
```

### 2. 挑選欄位與格式轉換（資料加工）

<!-- obsidian image: Pasted image 20260820171132.png -->
