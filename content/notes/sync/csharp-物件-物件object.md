---
title: "物件Object"
description: "雖然在js跟cshsarp都叫 object，而且在各自的語言裡都隱約有「代表全部」的身影，但在底層的物理結構與生存哲學上，兩者有著天翻地覆的差別。"
category: backend
date: 2026-08-09
tags: ["C#", "OOP"]
draft: false
sourcePath: "C#/物件/物件Object.md"
---
雖然在js跟cshsarp都叫 object，而且在各自的語言裡都隱約有「代表全部」的身影，但在底層的物理結構與生存哲學上，兩者有著天翻地覆的差別。

## 簡介

### 1. JavaScript 的 object ——「沒有地基、隨時能變形的百寶袋」
在 JavaScript 裡，object 幾乎代表了全部
（除了基本型別以外，連 Array、Function 底層都是 object）。

*    物理真相：JS 的物件在底層（V8引擎）本質上是一個`動態的雜湊表`（Hash Table / Map）。它是一個空的百寶袋。

*    生存哲學：它沒有固定的藍圖（Class）。你隨時可以用 obj.age = 25 憑空塞一個新欄位進去。它代表「全部」，是因為它像黏土一樣，你捏成什麼，它就是什麼。

### 2. C# 的 object ——「鐵打的萬物之源、最模糊的最高祖先」
在 C# 的世界裡，object（也就是系統底層的 System.Object）的代表全部，完全是另一種物理邏輯。C# 是強型別語言，講究的是「長幼尊卑的嚴格繼承樹」。

*    在 C# 中，object 代表全部的意思是：「它是全天下所有型別共同的、最頂層的唯一祖先（至高無上的父類別）。」

*    你在 C# 裡寫的任何自訂類別，就算你什麼都不寫，C# 在編譯時都會強迫繼承 object：

```csharp
// 你以為你只是寫了一個簡單的類別：
public class Mammal { }

// 但在電腦眼裡，物理上它其實長這樣（自動繼承）：
public class Mammal : System.Object { }
```

> object boxedMammal = new Mammal() 為什麼可以合理存在?
> 因為海獅骨子裡一定也是個 object。

*    4 個最基本的功能
    *    `ToString()`
    *    `Equals(object obj)`
    *    `GetType()`
    *    `GetHashCode()`

```Plaintext
【boxedMammal 的操作介面】
 ┌────────────────────────┐
 ├─ Equals()              │ ───> 點得出來（老祖宗給的）
 ├─ GetHashCode()         │ ───> 點得出來（老祖宗給的）
 ├─ GetType()             │ ───> 點得出來（老祖宗給的）
 ├─ ToString()            │ ───> 點得出來（老祖宗給的）
 └────────────────────────┘
 ❌ .Name ───> 「查無此功能！」因為老祖宗根本不知道什麼是 Name。
```


### 3. C# 的 object 裝進去之後會「集體失憶」

在 JavaScript 裡，你把物件宣告成什麼都無所謂，你隨時能點出裡面的屬性。
但在 C# 裡，當你把海獅（Mammal）的地址塞進一個 object 變數時，你手裡的放大鏡規格就被降格到了最模糊的 object 級別：

```csharp
object boxedMammal = new Mammal { Name = "Sea lion" };

// ❌ 在 C# 裡這行絕對連編譯都不會過！
Console.WriteLine(boxedMammal.Name);
```

### 4. 兩者在記憶體與觀念上的終極對照

```Plaintext

【JavaScript 的 object (動態黏土)】
變數 obj ───> [ 記憶體百寶袋 ] ───> 隨時可以 .name = "A", .age = 10，完全自由。


【C# 的 object (嚴格的繼承樹最頂端)】
                 System.Object (老祖宗：只會 ToString, GetType)
                       │
         ┌─────────────┴─────────────┐
      Mammal (水獺藍圖)            Reptile (蜥蜴藍圖)
    (.Name 寫在這裡)

 變數 object boxed ───> [ 拿著最頂層的合約 ] ───> 雖然指著 Mammal 實體，但強制不准讀取 .Name！

```
=======================
