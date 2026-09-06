---
title: "C# 基本型別"
description: "`浮點數`適合表示大小可非常大或非常小的非整數"
category: backend
date: 2026-07-18
tags: ["C#"]
draft: false
sourcePath: "C#/C# 基本型別.md"
---
## 整數和浮點數

### 整數 int

### 雙精度浮點數 double 
>  `浮點數`適合表示大小可非常大或非常小的非整數
>  `雙精確度` 是一個相對詞彙，描述用來儲存值的二進位數位數。雙精確度 數位的二進位數是 單精度的兩倍。
>   `單精度` 數是透過關鍵字 float 來宣告的

### 十進位類型 decimal
> decimal 類型的範圍較小，但精確度大於 double

```csharp
double a = 1.0;
double b = 3.0;
Console.WriteLine(a / b);
### 0.3333333333333333



decimal c = 1.0M;
decimal d = 3.0M;
Console.WriteLine(c / d);
### 0.3333333333333333333333333333
```

```
M字母是在關鍵字double和decimal之間，從視覺上看最為顯眼的字母。
```

### 短整數 short
> Stack 佔用大小：2 位元組 (16 bits)
> 容量範圍：$-32,768$ 到 $32,767$


### 長整數 long
> Stack 佔用大小：8 位元組 (64 bits) ── 體積是 int 的雙倍！
> 容量範圍：約正負 900 兆（天文數字）

### 無符號整數 Unsigned
* 在上述的名字前面加上一個 u，代表 Unsigned（無符號，純正數）。
    *    它們物理體積不變，但因為放棄了負數，所以正數容量直接翻倍：
            *    ushort：2 位元組，範圍變成 $0$ 到 $65,535$。
            *    uint：4 位元組，範圍變成 $0$ 到約 42 億。
            *    ulong：8 位元組，範圍變成 $0$ 到約 1800 兆。

### byte
> 最小的整數
> 只佔 1 位元組 (8 bits)，只能存 $0$ 到 $255$。

--------------------
## List

> 是一個標準的參考型別

### 與Csharp自身的Array差異

> 原生 Array 的讀寫速度比 List 快了約 15% 到 30%。

> 在「底層硬體與生態系」上，它們的地位完全不重疊。因為 List<T> 本質上只是個「寄生蟲」，它的內部肉身，百分之百是靠原生 Array 撐起來的！
    
```csharp
public class List<T>
{
    internal T[] _items; // 👈 抓到了！骨子裡就是一個最普通的原生陣列！
    internal int _size;  // 記錄目前真正裝了幾個格子
}
```
    
*    假設宣告 var myList = new List<int>();
        *    宿主出生：List 在 Heap 大倉庫裡悄悄 new int[4] 蓋了一個長度只有 4 的原生 Array（叫底層陣列）。
        *    動態擴容（Resize）：當你塞滿 4 個格子，想塞第 5 個時，List 會在後台發動大絕招──在 Heap 另一個地方 new int[8] 蓋一個雙倍大的新原生 Array，把舊的 4 個資料影印過去，然後把舊的 Array 丟給 GC 丟掉。

![image](https://hackmd.io/_uploads/SyHAe9fgMl.png)


========

### 跟JS的Array非常類似

* 強型別的「單一品種限制」（最核心的差別）
    * JS 的 Array（自由散漫）：
一個陣列裡可以同時塞字串、數字、甚至是物件：["Alice", 30, { isOk: true }]。因為 JS 骨子裡沒有強型別鐵律。
    *    C# 的 List<T>（基因純正）：
你必須在角括號 <T> 裡死死指定這個櫃子只能裝什麼。一旦宣告 List<int>，如果你敢把 "Alice" 塞進去，編譯器在編譯那一秒就會直接物理性亮紅燈報警！這保證了櫃子裡所有資料的形狀與大小完全一致。
    
*    底層的「連續圈地大作戰」
        *    JS 的 Array（骨子裡其實是雜湊表/物件）：JS 的陣列在記憶體裡可能是不連續的（Sparse Array），它是靠 Key-Value 的對照表去模擬陣列。
        *    C# 的 List<T>（骨子裡包著一個實體靜態 Array）：
這就是最有趣的硬體真相。當你 new List<int>() 時，C# 其實是在 Heap 大倉庫裡，悄悄圈了一塊絕對連續、死板的「實體靜態陣列 (Array)」空間（預設容量通常是 4）。

```csharp
List<string> names = ["<name>", "Ana", "Felipe"];
foreach (var name in names)
{
    Console.WriteLine($"Hello {name.ToUpper()}!");
}
```
    
```csharp
    
Console.WriteLine();
names.Add("Maria");
names.Add("Bill");
names.Remove("Ana");
foreach (var name in names)
{
    Console.WriteLine($"Hello {name.ToUpper()}!");
}
    
```

![image](https://hackmd.io/_uploads/SJjg40bgGg.png)

--------------------

## Dictionary

### Dictionary 的 Key

> 要在 C# 裡面有資格當 Dictionary 的 Key，在物理和邏輯上必須通過兩大硬性考驗`Equals`跟`GetHashCode`


🎟️ 通行證一：Equals（它必須能精準比對「我們一不一樣」）
字典在找 Key 的時候，就像管理員在核對身分。

如果 Key 是參考型別（物件），電腦預設比對的是「記憶體位址」。如果用物件當 Key，你兩次宣告 new Person("Alice") 就算內容一樣，因為在 Stack 上的位址不同，字典就會判定它們是不同的 Key。

但 Tuple 是值型別！C# 官方在設計 ValueTuple 時，特別幫它寫好了物理規則：「只要裡面的每一個元素內容完全相同，它們在邏輯上就是完全相等的東西。」

你的 target 宣告為 (1, 3)。

字典裡本來就存了一個 [(1, 3)]。

當 TryGetValue 啟動時，電腦拿著 target 去跟字典裡的 Key 比對。電腦會一格一格檢查：1 == 1（對）、3 == 3（對）。管理員蓋章認證：「完全一致！」，所以能精準找到對應的 "Sensor A"。

🎟️ 通行證二：GetHashCode（它能算出專屬的「分類雜湊值」）
這是字典物理效能極快的核心祕密。字典內部不是一條線慢慢排隊找 Key 的，而是像郵局一樣，有很多個「分類信箱（Buckets）」。

當你把一個 Key 丟進去，電腦會對這個 Key 執行一個數學公式，算出一個整數，叫做 HashCode（雜湊值）。這個數字決定了這個 Key 該去哪一個信箱。

以前大家喜歡用 string 當 Key，因為字串算出來的 HashCode 很穩定。

微軟在設計 ValueTuple 時，也幫它內建了超厲害的算式：它會把 Row (1) 和 Column (3) 的記憶體二進位訊號混在一起，算出一串專屬於 (1, 3) 的唯一 HashCode 數字。

因為只要內容是 (1, 3)，算出來的 HashCode 永遠一模一樣，所以 TryGetValue 就能以極速、點對點地直接衝到正確的信箱裡把資料拔出來。



-------------------------------
