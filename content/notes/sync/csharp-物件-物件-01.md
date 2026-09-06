---
title: "物件 01"
description: "物件導向（OOP）的核心靈魂是「封裝與實體（Instance）」——每個人有每個人的狀態"
category: backend
date: 2026-08-09
tags: ["C#", "OOP"]
draft: false
sourcePath: "C#/物件/物件 01.md"
---
## 建立類型的實例

>物件導向（OOP）的核心靈魂是「封裝與實體（Instance）」——每個人有每個人的狀態

### 與靜態類型差異

注意！我們前面講的『蓋大樓、傳名片、全肉身影印』這套生命週期，只要遇到『靜態（static）』這兩個字，全部當場失效！它是另一個世界的生物！

-    一個世界兩套法則：蓋大樓 vs. 太陽
        -    普通物件 / 類別（我們之前聊的所有東西）：
它是「建築藍圖」。你必須親手呼叫 new，才能在 Heap 或 Stack 蓋出實體大樓。你可以蓋 100 棟，每棟大樓的門牌（地址）都不同，裡面的住戶（資料）也互不干涉。
        -    靜態類別 / 靜態成員（static）：
它是天上的「太陽」。全宇宙（整個專案應用程式）就只有這麼一個，而且絕對不需要、也沒辦法用 new 去蓋它。所有人只要抬頭（直接用類別名稱），就能共享同一個太陽。

+++++++++++++++++

#### 物理真相：
>static 徹底打破了 Heap 和 Stack 的遊戲規則

1. 它是「長生不老」的（Lifecycle）

    -    `普通物件`：用 new 誕生，沒人用了就被 GC 垃圾車載走，或者隨著函式結束在 Stack 蒸發。
    -    `靜態類型`：當你的程式（Web API 或是 App）一啟動的那一微秒，它就直接進駐記憶體裡一個特殊的「靜態儲存區（Static Storage）」。它不需要被 new 誕生，而且只要你的程式沒有關閉，它就永遠不死。

2. 它沒有「名片」的概念，它是「全域共享」的
    -    record class 傳遞時是傳 8 位元組的名片。但 static 不一樣，你不需要傳遞它。
    -    任何執行緒、任何函式，隨時隨地都能直接存取它。

```csharp!
// 🏢 普通類別：必須 new 才能用
var p1 = new Product("iPhone");
var p2 = new Product("iPad"); // p1 和 p2 是獨立的兩棟大樓

// ☀️ 靜態類別：不需要 new，全世界共享同一個
// 就像 Math.Sqrt() 或 Console.WriteLine()，你從來沒看過 new Console() 對吧？
GlobalConfig.Version = "v2.0";
```

3. 多執行緒的「終極修羅場」
    -    如果你的靜態類別裡面，放了一個可以修改的變數（Mutable set）：

```csharp!
public static class GlobalCounter 
{
    public static int Count = 0; // 🚨 危險源頭！
}
```

會導致所有調用都進來改動他的值，導致多條執行緒會同時、沒有隔離地去搶奪、修改同一個記憶體格子 => 引發 **資料爭用（Race Condition）**

================

### 對象識別與值相等

在 C# 裡寫 A == B 的時候，你必須先搞清楚你到底是在「比對兩個人是不是同一個人（身分證號碼）」，還是在「比對這兩個人是不是長得一模一樣（複製人）」。

-    引用相等性 (Reference Equality)：看變數是不是代表記憶體中的「同一個實體」（比對門牌）。
-    值相等性 (Value Equality)：看物件肚子裡的「欄位數值是否相等」（比對 DNA）。

#### 1. 如果是「參考型別」（類別 Class、陣列 Array）

```csharp!
// 宣告兩個一模一樣的陣列（陣列是參考型別喔！）
int[] array1 = [1, 2, 3];
int[] array2 = [1, 2, 3];

// 🚨 結果是 false！
// 因為它們是蓋在 Heap 上不同地址的兩棟建築物。
// 雖然肚子裡的數字都是 1, 2, 3，但對參考型別來說，門牌不同，就是「不相等」！
Console.WriteLine(array1 == array2);
```
++++++++++++++++
#### 2. 如果是「實值型別」（結構體 Struct）

```csharp!
// 假設 Person 是個 struct
Person p1 = new("Alex", 9);
Person p2 = new("Alex", 9);

// 🟢 結果是 true！
// 因為 Struct 天生就是比對「值是否相等」。只要肚子裡的名字跟年齡一樣，海關就判斷相等！
Console.WriteLine(p1.Equals(p2));
```
++++++++++++++++
#### 3.那 record呢?

record 的本質雖然是 Class（參考型別），但微軟在底層強行把它的比對邏輯，改造成跟 Struct 一樣的「值相等性（比對 DNA）」。它幫你打破了參考型別「只比門牌」的宿命！

- classRecord == structRecord 無法存在
```csharp!
// 🏢 這是 Class 基底（活在 Heap 區）
public record ProductClass(string Name, decimal Price);

// 📦 這是 Struct 基底（活在 Stack 區）
public record struct ProductStruct(string Name, decimal Price);

// 呼叫時：
var p1 = new ProductClass("iPhone", 30000);
var p2 = new ProductStruct("iPhone", 30000);

// ❌ 這一行會直接跳紅字報錯，程式根本動不了！
if (p1 == p2) 
{
    // 編譯器會說：運算子 '==' 無法套用於 'ProductClass' 與 'ProductStruct'
}
```


-    解法:硬核拆包，逐欄手動比對 / 架構大統一，把其中一個「變身」

姿勢一：硬核拆包，逐欄手動比對
```csharp!
// 🟢 這樣寫完全合法！因為是在比對字串跟數字
if (p1.Name == p2.Name && p1.Price == p2.Price)
{
    Console.WriteLine("雖然基底不同，但肚子裡的資料長得一模一樣！");
}
```
姿勢二：架構大統一，把其中一個「變身」
```csharp!
// 在 Struct 內部寫一個可以把自己複製成 Class 版的方法
public record struct ProductStruct(string Name, decimal Price)
{
    public ProductClass ToClass() => new ProductClass(Name, Price);
}

// 💡 比較時，先把 p2 變身成 Class，這樣兩邊都是 Class 大樓，就能大膽用 == 了！
if (p1 == p2.ToClass()) 
{
    Console.WriteLine("完美通關！");
}
```

================
