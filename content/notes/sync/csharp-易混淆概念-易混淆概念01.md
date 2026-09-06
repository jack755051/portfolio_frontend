---
title: "易混淆概念01"
description: "硬體底層的運算軌道裡，滿足以下三者才能被稱作Function"
category: backend
date: 2026-08-22
tags: ["C#", "Concepts"]
draft: false
sourcePath: "C#/易混淆概念/易混淆概念01.md"
---
## ㄧ、Function

### 什麼是Function（函式）？

硬體底層的運算軌道裡，滿足以下三者才能被稱作Function
* 有輸入（參數）。
* 有內部邏輯加工：負責執行特定的運算或程式碼邏輯。
* 有輸出（回傳值）：它執行了 return。

```csharp
static string GetChicken() { return "孤獨一隻雞"; }
```
雖然因為它住進了 class Program 大宅裡，而在口頭上稱呼它為 「Method（方法）」，但它本質上就是一尊活生生的 Function。

=================

### Function（函式）與Method（方法）

>在 C# 的世界裡，所有的方法（Method）本質上都是函式（Function），但只有「寄生在類別或結構肚子裡」的函式，才有資格被尊稱為方法。

#### 可以用變數的「物理居住地」來劃分

-    函式 (Function) ➔ 自由流浪的頭等公民
        -    物理定義：它是獨立存在的。它不屬於任何人，不需要依附在任何 class 或 struct 大宅裡。你只要呼叫它的名字，它就能當場點火通電。
        -    前端 JS 視角：你在 JavaScript 檔案頂層隨手寫的 function，就是標準的函式。

```javascript!
// 這是純度 100% 的 Function，它是自由的
function sayHello() {
    console.log("Hello");
}

```

-    方法 (Method) ➔ 寄生在物件大宅裡的「附屬器官」
        -    物理定義：它是物件導向（OOP）宇宙下的產物。它被迫必須寫在 class 或 struct 的肚子裡。它沒辦法單獨存活，外人想要對它通電，必須先呼叫它主人的名字（物件實例）。

```csharp
public class Robot 
{
    // 這是 Method（方法）！因為它寄生在 Robot 大宅裡
    // 外面不能直接呼叫 Walk()，必須先 new Robot().Walk()
    public void Walk() 
    {
        Console.WriteLine("機器人走路");
    }
}
```

<!-- obsidian image: Pasted image 20260718133055.png -->

=================
### 關於Function

> C# 的宇宙裡，任何 function 都不准單獨在外面流浪

*    Func 就是 C# 的 Function 變數型別
        *    如果你的箭頭函式有 return 回傳值 ➔ 它的型別叫做 Func
        *    如果你的箭頭函式純粹做事情，不 return 東西（void） ➔ 它的型別叫做 Action

```csharp
using System;

namespace CharliesCSharpDemo;

// 1. 宣告一個極輕量、住 Stack 的 struct
public struct OrderProcessor
{
    public string OrderId { get; set; }
    public double TotalAmount { get; set; }

    // 🚀 亮點：在 struct 肚子裡裝一尊自由的 Func 變數（吃 double，回傳 double）
    public Func<double, double> DiscountStrategy { get; set; }

    // 2. 一個普通 Method，在內部點火執行那一尊外來的 Func
    public readonly double CalculateFinalPrice()
    {
        if (DiscountStrategy == null) return TotalAmount;
        
        // 物理通電：把金額餵給那個動態傳進來的箭頭函式
        return DiscountStrategy(TotalAmount); 
    }
}

```

#### { get; set; } 到底是什麼？

-    標準的物件導向寫法
```csharp  
private string _orderId; // 物理底層私有欄位

public string GetOrderId() { return _orderId; } // 讀取門衛
public void SetOrderId(string value) { _orderId = value; } // 寫入門衛
```

-    屬性語法糖
```csharp  
public string OrderId { get; set; }
```

#### Func 到底算是「方法 (Method)」還是「函式 (Function)」？

> 在 C# 裡，Func 在「行為」上是 Function（函式），但在「底層物理型別」上，它是一個物件（Object）！

> Func 算是一個變數/物件

<!-- obsidian image: Pasted image 20260718130456.png -->

+++++++++

Action 沒有回傳值算是Function嗎？

> Func 和 Action 物理地位完全平起平坐，兩個都必須算成是 Function 的一種！

***其實 Action 在底層「也有 Return」=> Void 函式***

+++++++++

- 總結：
    - C# 的 { get; set; } ➔ 就是讓變數變成外人可以讀寫的標準屬性。
    - C# 的 Func ➔ 就是 JS 裡的 Function 變數欄位（可以裝箭頭函式的容器）。


====================

### 函式語法結構定義

```csharp
[修飾詞] [回傳型別] [方法名稱]([參數型別] [參數名稱])
```

看看一般的基本型別寫法
```csharp
public static int CalculateAge(string birthDate)
```
<!-- obsidian image: Pasted image 20260822144009.png -->
> 此處 `int` 後面不會有變數名稱，因為它代表的是**輸出型別**。

```csharp
[回傳型別] [方法名稱] ( [參數型別_1] [參數名稱_1], [參數型別_2] [參數名稱_2], ... )
```
> 參數「必須有名稱」才能在方法內被使用


-------------------------------

## 二、Console（控制台專案）和 Web API（網頁專案）

### Console 專案：單純、跑完即死的「打工仔」
-    微軟預載的依賴：極度乾淨、輕量。它底層只認最基础的資料結構（如 int、string、List），完全沒有處理網路 HTTP 請求、路由、安全性驗證、JSON 序列化的能力。
-    使命：
    -    練習 LeetCode 演算法、測試 C# 新語法
    -    寫排程工具（Cron Job）
    
==================

### Web API 專案：永不熄燈、瘋狂接客的「鋼鐵飯店」
-    生存邏輯：「死循環監聽（Infinite Loop）」。
-    在建立專案時，就幫你強行灌入了一整套龐大的 ASP.NET Core 框架網頁伺服器（Kestrel）
        -    前端傳過來的 JSON 怎麼自動轉成 C# 物件？
        -    網址路由 /api/product/123 該分配給哪一個 Controller（控制器）去加工？
        -    怎麼跟前端的 Next.js 跨網域（CORS）通訊？

<!-- obsidian image: Pasted image 20260718130511.png -->

-------------------------------
## 三、{ get; set; }

### 是什麼？

1. 屬性 (Property)」
2. 物理本質是微軟幫你自動生成的「小守門員方法（Method）」

### 存在何處？

1. { get; set; } 不是看記憶體位置（Heap/Stack）決定的，而是看「階級身分」決定的。
2. 只要它是屬於 class 或 struct 的「大樓成員（屬性）」，它就有資格配戴 { get; set; } 這對守門員佩刀。
3. 如果它只是方法肚子裡的「臨時工（區域變數）」，就絕對不能加 { get; set; }。

<!-- obsidian image: Pasted image 20260718133155.png -->
### 為什麼？

只有「外層的成員」有資格擁有 { get; set; }，是因為它們的生命夠長、且身負「跟外面世界通訊」的職責。

方法肚子裡的變數，只是為了幫外面那些尊貴的成員做短暫代工的「數字打工仔」，所以只配光溜溜地躺在 Stack 裡，不配穿上 { get; set; } 這套制服。

### init

> 在 init 誕生以前，微軟面臨了一個兩難的軟體工程大悖論：

-    如果用 { get; set; }：
外面點火很爽，可以用大括號自由挑選參數 new ConnectionOptions { Host = "db.com" }。但缺點是，這棟大樓蓋好後，外面任何人都可以在幾天後隨時跑來改它（例如 options.Host = "hacker.com"）。這在需要「高安全性、不希望配置被亂改」的 Web API 專案裡，是個巨大的不安全地雷。

-    如果用 { get; } + 建構子（唯讀）：
雖然安全（出生後就鎖死），但你就被迫必須在 class 肚子裡寫一堆又臭又長的建構子電線，外面的人 new 時還得嚴格遵守參數順序，失去了大括號物件初始化器的自由度。

### set vs init vs readonly 終極大對齊

| 守門員寫法 | 允許在「建構子」裡賦值？ | 允許在「大括號 `{}` 初始化器」裡？ | 物件 `new` 完後，允許在外面隨時修改？ | 它的終極人設 |
| :--- | :--- | :--- | :--- | :--- |
| **`{ get; set; }`** | 🟢 可以 | 🟢 可以 | 🟢 可以（完全自由） | **開放式住家**：隨時歡迎你來改。 |
| **`{ get; init; }`** | 🟢 可以 | 🟢 可以（這就是它的超能力！） | ❌ 絕對不行（當場鎖死） | **新創安全鎖**：`new` 的時候讓你填，`new` 完立刻灌漿封死。 |
| **`{ get; }`** | 🟢 可以 | ❌ 絕對不行（編譯器噴錯） | ❌ 絕對不行（當場鎖死） | **古代銅牆鐵壁**：只有親生父親（建構子）能填，其他人碰都不准碰。 |

-------------------------------

## 肆、五層通電過濾網

### 五層簡介

```Plaintext!
［第1層：權限］ ➔ ［第2層：空間與繼承］ ➔ ［第3層：狀態］ ➔ ［第4層：契約］ ➔ ［第5層：特異功能］ ➔ ［型別］ ➔ ［名字］
```

#### 順序

$$\text{我有權限看嗎？} \rightarrow \text{它在 RAM 的哪張表上？} \rightarrow \text{那塊晶片防不防寫？} \rightarrow \text{初始化有沒有少材料？} \rightarrow \text{CPU 該用什麼模式跑？}$$

權限 ➔ 記憶體地址 ➔ 晶片狀態 ➔ 初始化 ➔ CPU 運作

#### 🔴 第一層：權限濾網（誰能調用我？）➔ 決定「人際關係」
這層站在最前面，第一時間決定外面的路人、隔壁的專案、或是自己的兒子能不能摸到這條電路。

-    public（大老二流派）：全宇宙、全專案的任何人（包含你的 Next.js 前端 API 路由）都可以公開存取。

-    private（邊緣人流派）：只有這個 class/struct 自己肚子裡的代碼才能用，外面的人連看都看不到（例如私有欄位 _orderId 門衛）。

-    protected（家族繼承流派）：只有自己、以及親生兒子（子類別）才能通電，外面的鄰居路人一律不給碰。

#### 🔵 第二層：空間與繼承濾網（我怎麼存在？子孫能改嗎？）➔ 決定「物理定位與多型基因」
⚠️ 核心鐵律：這一層的所有關鍵字，在 C# 語法裡是「互斥」的！它們佔用同一個生態位，你只能多選一，絕對不可能同時出現！

沒有寫（一般實例成員）：它是附屬器官。外面的人一定要先 new 出一個肉身實體大樓，才能透過點（.）來調用。

-    static（靜態成員）：免 new 的「大樓公共廁所」！一開車就物理性黏在記憶體核心 VIP 區，全宇宙共享唯一一份。

-    virtual（虛擬基因）：老爸說：「這是一個原廠音響，我寫了基礎功能，但我允許兒子未來可以把它拆掉改裝（可覆寫）。」

-    override（覆寫基因）：兒子說：「我現在正拿著工具把老爸的舊音響拆了，強行換上我的重低音藍牙音響（覆寫完成）。」

-    abstract（抽象契約）：老爸只在牆上畫了一個音響的線條框框，肚子裡沒晶片，轉頭咆哮：「你生出來時必須自己實作出來，不然不准開機！」

-    sealed（封印密封）：大兒子改裝完音響後，拿電焊把外殼死死焊住：「到我為止！接下來的曾孫輩不准再改這台音響了！」

-    new（血緣隱藏）：兒子想裝新音響，但不想拆老爸的，直接在旁邊偷偷加掛一台，假裝老爸那台不存在。

#### 🟢 第三層：狀態濾網（能不能改我？）➔ 決定「肉身能不能變更」
這層決定了這塊記憶體格子被填入資料後，電路開關會不會被硬性鎖死。

-    readonly（唯讀）：只能在出生（建構子）那一秒被設定一次，之後直接灌漿鎖死，只能讀取（get），不能寫入（set）。(註：如果是屬性 Property，現代 C# 通常會用 init; 在後方大括號結合控制)。

#### 🟡 第四層：契約濾網（有沒有強迫填值？）➔ 決定「初始化的強迫症」
這是現代 C# 逼迫外部工程師的硬核防呆契約。

-    required（強迫症契約）：強迫外部工程師在 new 的那一秒，必須用大括號把這條電路的數值交出來（例如：new Order() { OrderId = "123" }），漏填連編譯都不會過。

#### 🟣 第五層：特異功能濾網（這條電路怎麼跑？）➔ 決定「執行流的外掛」
這一層決定了這段代碼在被 CPU 執行時，有沒有什麼特殊的「物理時空扭曲」：

-    async（非同步）：時間管理大師。通電時不需要在原地傻傻等它完工，CPU 可以先跳去接別的電路（前端最熟的 async / await）。

-    unsafe（不安全代碼）：解鎖硬體禁區。允許在這段代碼裡像 C/C++ 一樣，直接操作實體記憶體指針（Pointer），海關（CLR）不再保護你。

-    extern（外部調用）：這條電路的本體根本不在 C# 肚子裡， expansion 到外部去呼叫 C++ 編譯出來的 .dll 檔案。
        
=================

### 衝突

#### 衝突一：第二層的 static ⛔ 第四層的 required
-    物理現實： static（大樓公設）與 required（強迫住戶裝潢）絕對不能同時出現！

-    原因： required 是現代 C# 為了強迫外部在 new 物件實體時，必須用大括號填入數值。但 static 成員根本不需要 new 就能用，所以系統會當場錯亂。

-    結論： 只要開了 static 燈號，第四層的 required 燈號就會被強制拔除。

#### 衝突二：第三層的 readonly ⛔ 第四層的 required（針對欄位 Field）
-    物理現實： 如果你宣告的是一個「欄位（Field）」，readonly 和 required 不能共存！

-    原因： readonly 規定變數只能在「建構子內部」出生時賦值；但 required 卻是強迫別人在「建構子外部的物件初始化器 {}」填值，兩者在執行時間線上會打架。

-    現代 C# 的標準解法（改用屬性 Property）：
如果你希望一個屬性既是強迫填值、填完後又是唯讀不可修改的，在現代 C# 裡我們不寫 readonly，而是會結合第四層寫成這樣：

```csharp!
// 完美的現代 C# 組合：權限(1) ➔ 契約(4) ➔ 形態 ➔ 名字 ➔ { get; 狀態(3) }
public required string SystemToken { get; init; }
```

=================
### 關於權限

| 權限修飾詞 | 同一個 Class 內 | 同專案的子類別 (兒子) | 同專案的其他 Class (鄰居) | 不同專案的子類別 (外地兒子) | 不同專案的其他 Class (外星人) |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **`private`** | 🟢 | ❌ | ❌ | ❌ | ❌ |
| **`private protected`** | 🟢 | 🟢 | ❌ | ❌ | ❌ |
| **`protected`** | 🟢 | 🟢 | ❌ | 🟢 | ❌ |
| **`internal`** | 🟢 | 🟢 | 🟢 | ❌ | ❌ |
| **`protected internal`** | 🟢 | 🟢 | 🟢 | 🟢 | ❌ |
| **`public`** | 🟢 | 🟢 | 🟢 | 🟢 | 🟢 |

=================
### 關於static

> static 的物理本質就是「記憶體上的共用公設」！它不需要 new，因為它在程式一開車時就已經物理性地黏在記憶體核心裡了。

#### 用「大樓公設」一秒看穿 static

1. 沒有寫 static（實例成員）➔ 它是「住戶家裡的個人馬桶」
```csharp
var roomA = new ConnectionSettings();
roomA.Port = 8080; // 這是 roomA 家的馬桶，跟 roomB 沒關係
```

2. 加上了 static（靜態成員）➔ 它是「大樓大廳的公共廁所」
```csharp
// 🚀 看好！完全不需要 new Console()！直接呼叫大樓名字 Console 就能點火！
Console.WriteLine("我是大樓公廁，誰都可以直接用我！");
```


=================

### 舉例

```csharp
public static readonly double Pi = 3.14159;
```

<!-- obsidian image: Pasted image 20260718133227.png -->

```Plaintext＝
［第一層：權限］ ➔ ［第二層：空間］ ➔ ［第三層：狀態］ ➔ ［型別］ ➔ ［名字］
    public          static         readonly       double      Pi = 3.14;
  (全宇宙可看)     (大樓公設免new)  (灌漿鎖死不能改)
```
=================
### 補充
<!-- obsidian image: Pasted image 20260718133304.png -->


-------------------------------
## 五、建構子

> 建構子不是必要的：你完全可以不寫。只要不寫，類別就會自帶一個隱形的「無參數刷零建構子」。
> 它的名字有沒有跟外側的 class 或 struct 一模一樣

### class
```csharp
public class Customer
{
    public string Name { get; set; }

    public Customer(string name) => Name = name;
}
```
### struct
```csharp
struct ConnectionSettings
{
    public string Host { get; set; }
    public int Port { get; set; }
    public int MaxRetries { get; set; }

    public ConnectionSettings()
    {
        Host = "localhost";
        Port = 8080;
        MaxRetries = 3;
    }
}
```

```csharp
public class Robot
{
    public string Model { get; set; }

    // 👑 尊貴建構子 A（正統流派）
    // 特徵：名字叫 Robot (跟外側 class 同名)，而且前面「完全沒有回傳型別」！
    public Robot(string model) => Model = model;

    // ❌ 普通方法 B（魚目混珠流派）
    // 特徵：長得一模一樣，但前面加了 "void" (代表它會回傳空值)！
    // 物理真相：編譯器大喊：「你雖然叫 Robot，但你宣告了回傳型別 void！你只是個剛好跟大樓同名的普通方法，不准當建構子！」
    public void Robot(string model) => Model = model;

    // ❌ 普通方法 C（路人甲流派）
    // 特徵：名字叫 Initialize，跟 class 不同名。
    // 物理真相：這就是個純度 100% 的普通方法。
    public void Initialize(string model) => Model = model;
}
```

### 類別就會自帶一個隱形的「無參數刷零建構子」

```csharp
// 假設這是你寫的，沒有任何的建構子
public class Member
{
    public string Account { get; set; }
    public string Email { get; set; }
    public int Age { get; set; }
}

//------------------------

// 🟢 微軟一輩子只會幫你自動補上這個「全空殼」：
public Member()
{
    // 裡面是空的！一句話都不說！
    // 讓你的 Account 變 null，Email 變 null，Age 變 0
}

```
變成這樣
```csharp
public class Member
{
    public string Account { get; set; }
    public string Email { get; set; }
    public int Age { get; set; }
    
    public Member(){}    
}

```
如果要使用的話
```csharp
var a = new Member() { Account = "charlie", Email = "charlie's mail" };

### 沒有Age的話，會帶入初始值0
```

### 寫法：
<!-- obsidian image: Pasted image 20260718133318.png -->


-------------------------------

## 六、靜態（Static）

>在硬體實體記憶體（RAM）裡的「空間與位置」，在程式啟動期間是絕對固定、無法被回收的！

### 記憶體的三種「配置宿命」

在硬體底層，當你的程式（.exe 或 Web API）被載入到 RAM 執行時，作業系統會把記憶體劃分成三種管理模式。這就是為什麼它們的名字長這樣：

```Plaintext!
💾 你的實體記憶體 (RAM)
├── 🟩 [靜態配置區] ── 啟動時直接「圈地封王」，位置固定，與程式同生共死 (Static)
├── 🟦 [Stack 棧區]  ── 隨著函式進出，CPU 指針上下跳動，用完秒回收 (Automatic)
└── 🟨 [Heap 堆區]   ── 程式執行時動態去申請一塊地，不用了派垃圾車回收 (Dynamic)
```

=========

### 靜態配置（Static Allocation）➔ 就是你說的 static
硬體行為： 當編譯器在打包你的程式碼時，看到 private static int currentID;，它就會在二進位檔案的標頭寫下：「這支程式開機時，請直接在 RAM 裡挖出一個固定的 4 位元組格子給它。」

物理現實： 程式一啟動，作業系統立刻把這個格子的物理地址（例如 0x00FF12）死死分配出去。在程式關閉前，這塊物理空間絕對不會釋放，沒有人能把它回收還給作業系統。因為它的地址和大小「永遠靜止不變」，所以這套機制在晶片層面就被稱為 「靜態配置」。

=========

### 自動配置（Automatic Allocation）➔ 就是 Stack
硬體行為： 當你呼叫一個函式，CPU 的暫存器指針（Stack Pointer）就會往下移動，在 RAM 裡開闢一塊臨時空間。

物理現實： 當你的函式一執行完畢（遇到大括號結束 }），CPU 指針一彈回去，剛剛開闢的物理空間在硬體層面上就當場被標記為「可回收/已釋放」。它隨著代碼執行「自動、瞬間」回收，速度極快。

=========

### 動態配置（Dynamic Allocation）➔ 就是平民 Heap
硬體行為： 你在程式執行到一半，突然寫了 new WorkItem()，程式才會臨時跑去跟作業系統大喊：「報告長官！現在使用者突然點了按鈕，請立刻在 Heap 區隨機撥一塊乾淨的土地給我蓋大樓！」

物理現實： 這塊土地的地址是動態決定的（每次 new 都不同）。當你的大樓沒人用了，C# 的垃圾回收機制（GC）就會啟動，把這塊動態申請來的物理空間擦乾淨，還給作業系統。

=========

### 記憶體世界的「生存與特權」排行榜

<!-- obsidian image: Pasted image 20260718133352.png -->

=========

### 程式碼世界的「存取權限（Access Modifiers）」大小

<!-- obsidian image: Pasted image 20260718133400.png -->

----------
