---
title: "易混淆概念04"
description: "關鍵字 `this`"
category: backend
date: 2026-08-24
tags: ["C#", "Concepts"]
draft: false
sourcePath: "C#/易混淆概念/易混淆概念04.md"
---
## 擴充方法

> 關鍵字 `this`

> 在方法參數裡寫 `this string str`，只是在向編譯器下指令：**「請允許工程師把第一個參數 `str` 挪到最前面，用 `str.方法名稱()` 的方式來呼叫它。」** 它不是物件引用自己，純粹是呼叫語法的左右位置對調而已。

### 擴充方法的語法規則

- 必須放在一個 **`public static class`** 裡面。
- 方法本身必須是 **`public static`**。
- **第一個參數前加上 `this`**，代表這個方法是「擴充給哪一種型別」使用的。

```csharp
public static class LogAnalysis
{
    public static string SubstringAfter(this string str, string delimiter)
    {
        // 1. 找到分隔符號在字串中的起始索引
        int index = str.IndexOf(delimiter);

        // 2. 如果找不到，通常回傳空字串或原字串（視需求而定）
        if (index == -1)
        {
            return string.Empty;
        }

        // 3. 起始位置要跳過 delimiter 本身的長度
        int startIndex = index + delimiter.Length;

        // 4. 從該位置一路截取到最後
        return str.Substring(startIndex);
    }
}
```

--------------
## IEnumerable 可被走訪（可迭代）」的能力

> `IEnumerable` 的意思純粹是：**「你可以拿放大鏡從頭到尾看過我身上的每一個字元」**。

> LINQ 只認 `IEnumerable<T>`，不認具體型別。

- **統一介面**：只要能被 `foreach` 走訪（實作了 `IEnumerable`），就能直接掛上 LINQ。
- **底層無關**：不論是 `string`、`char[]` 還是 `List`，對 LINQ 來說都是同一種「可迭代的資料流」。
- **隨插即用**：`.Select()`、`.Where()` 等所有擴充方法，本質上都是寫給 `IEnumerable<T>` 的通用工具箱。
- **唯讀瀏覽**：`IEnumerable` 只提供「唯讀瀏覽」權限

============

### 字串（`string`）本身就是一個字元的集合（`char[]`）

> 它的底層儲存結構是連續的 `char` 記憶體區塊，但它在型別上不是 `char[]`，而是一個獨立的物件。

因為 `string` 實作了陣列最核心的兩大特徵：

1. 可以用索引讀取（Indexer）
2. 實作了 `IEnumerable<char>`： 這代表它可以像陣列一樣被 `foreach` 走訪，也可以直接套用所有 LINQ 方法（如 `.Count()`、`.Where()`）。

<!-- obsidian image: Pasted image 20260823015508.png -->

------------
## 時間用法DateTime

### 建構與解析

- **手動指定**：`new DateTime(year, month, day)`（時分秒預設自動歸零為 `00:00:00`）。
- **字串轉時間**：
	- `DateTime.Parse(str)` 
	- `DateTime.TryParse(str, out var dt)`
### 格式化代號大小寫鐵則（ToString）

- `MM`（大寫）是**月份**；`mm`（小寫）是**分鐘**。
- `HH`（大寫）是 **24 小時制**；`hh`（小寫）是 **12 小時制**（搭配 `tt` 顯示 AM/PM）。
- 單碼 `M`、`d`、`h` **不補零**（例如 `7` 月）；雙碼 `MM`、`dd`、`hh` **自動補零**（例如 `07` 月）。
### 物件不可變性（Immutable）

- 時間不能直接修改屬性（不能 `dt.Year = 2026`）。
- 加減時間必須使用方法並**接收回傳的新物件**（例如：`dt = dt.AddDays(1)`）。
### 時間比對與運算

- 比較先後直接用運算子：`appointment < DateTime.Now`（是否已過期）。
- 兩個時間相減會得到 **`TimeSpan`**（例如：`TimeSpan diff = date2 - date1;`，可用 `diff.TotalDays` 取得天數差）。
### 歸零與常用屬性
- `.Date`：快速取得當天午夜 `00:00:00`。
- `.Hour`：內部永遠以 **0 ~ 23 的整數** 儲存，判斷上下午或營業時段最方便（例如 `dt.Hour >= 12`）。

### 常用方法
#### 靜態屬性與取得當前時間

- `DateTime.Now`：目前的當地時間（含時分秒）。
- `DateTime.UtcNow`：目前的 UTC 標準時間（伺服器/跨時區常用）。
- `DateTime.Today`：今天的午夜零點 `00:00:00`（相當於 `DateTime.Now.Date`）。
- `DateTime.MinValue` / `DateTime.MaxValue`：C# 支援的最小時間（0001/1/1）與最大時間（9999/12/31）。
#### 解析與字串轉換（靜態方法）

- `DateTime.Parse(str)`：字串轉時間（格式不對會拋出例外）。
- `DateTime.TryParse(str, out dt)`：安全轉換，回傳 `bool` 代表成功與否。
- `DateTime.ParseExact(str, format, ...)`：指定嚴格格式進行解析。
- `DateTime.DaysInMonth(year, month)`：查詢某年某月一共有幾天（自動算閏年）。
- `DateTime.IsLeapYear(year)`：檢查是否為閏年。
#### 時間加減與操作（物件實例方法 `dt.XXX()`）

- `dt.AddYears(n)` / `dt.AddMonths(n)` / `dt.AddDays(n)`：加減年月日。
- `dt.AddHours(n)` / `dt.AddMinutes(n)` / `dt.AddSeconds(n)`：加減時分秒。
- `dt.Add(timeSpan)`：直接加上一段自訂時間長度。
- `dt.ToString("格式")`：轉成自訂格式字串。
#### 提取內部數值（物件實例屬性 `dt.XXX`）

- `dt.Year`、`dt.Month`、`dt.Day`：取得整數的年月日。
- `dt.Hour`、`dt.Minute`、`dt.Second`、`dt.Millisecond`：取得整數的時分秒毫秒。
- `dt.DayOfWeek`：取得星期幾（回傳列舉，如 `DayOfWeek.Monday`）。
- `dt.DayOfYear`：這一天是當年的第幾天（1 ~ 366）。
- `dt.Date`：保留年月日，時分秒全部歸零為 `00:00:00`。
- `dt.TimeOfDay`：單獨取出當天的時間段（回傳 `TimeSpan`）。

---------------
## Dictionary跟HashSet

> 把它們想成是同一種底層技術的「雙胞胎」，差別只在於 **有沒有附帶 Value**

> **`HashSet<T>` 本質上就是一個「Value 為空（不需要附帶資料）」的特化版 `Dictionary`**，因為省去了存 Value 的空間，它比 Dictionary 更省記憶體且更輕量。




-------------
## 寫法

### 陣列初始設定式（Array Initializer）

```csharp
string[] words = { "apple", "banana", "apple", "orange", "banana", "apple" };
```

以下是標準寫法：
```csharp
string[] words = new string[] { "apple", "banana", "apple" };
```
