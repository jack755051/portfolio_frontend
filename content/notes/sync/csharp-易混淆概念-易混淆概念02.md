---
title: "易混淆概念02"
description: "// WorkItem implicitly inherits from the Object class."
category: backend
date: 2026-08-09
tags: ["C#", "Concepts"]
draft: false
sourcePath: "C#/易混淆概念/易混淆概念02.md"
---
## 物件的繼承

```csharp!
// WorkItem implicitly inherits from the Object class.
public class WorkItem
{
    // Static field currentID stores the job ID of the last WorkItem that
    // has been created.
    private static int currentID;

    //Properties.
    protected int ID { get; set; }
    protected string Title { get; set; }
    protected string Description { get; set; }
    protected TimeSpan jobLength { get; set; }

    // Default constructor. If a derived class does not invoke a base-
    // class constructor explicitly, the default constructor is called
    // implicitly.
    public WorkItem()
    {
        ID = 0;
        Title = "Default title";
        Description = "Default description.";
        jobLength = new TimeSpan();
    }

    // Instance constructor that has three parameters.
    public WorkItem(string title, string desc, TimeSpan joblen)
    {
        ID = GetNextID();
        Title = title;
        Description = desc;
        jobLength = joblen;
    }

    // Static constructor to initialize the static member, currentID. This
    // constructor is called one time, automatically, before any instance
    // of WorkItem or ChangeRequest is created, or currentID is referenced.
    static WorkItem() => currentID = 0;

    // currentID is a static field. It is incremented each time a new
    // instance of WorkItem is created.
    protected int GetNextID() => ++currentID;

    // Method Update enables you to update the title and job length of an
    // existing WorkItem object.
    public void Update(string title, TimeSpan joblen)
    {
        this.Title = title;
        this.jobLength = joblen;
    }

    // Virtual method override of the ToString method that is inherited
    // from System.Object.
    public override string ToString() =>
        $"{this.ID} - {this.Title}";
}

// ChangeRequest derives from WorkItem and adds a property (originalItemID)
// and two constructors.
public class ChangeRequest : WorkItem
{
    protected int originalItemID { get; set; }

    // Constructors. Because neither constructor calls a base-class
    // constructor explicitly, the default constructor in the base class
    // is called implicitly. The base class must contain a default
    // constructor.

    // Default constructor for the derived class.
    public ChangeRequest() { }

    // Instance constructor that has four parameters.
    public ChangeRequest(string title, string desc, TimeSpan jobLen,
                         int originalID)
    {
        // The following properties and the GetNexID method are inherited
        // from WorkItem.
        this.ID = GetNextID();
        this.Title = title;
        this.Description = desc;
        this.jobLength = jobLen;

        // Property originalItemID is a member of ChangeRequest, but not
        // of WorkItem.
        this.originalItemID = originalID;
    }
}
```

### 絕對事實
1. 一個物件的`建構子`跟`物件本身`需要同名
    -    兒子的類別叫 ChangeRequest，他的建構子就只能叫 public ChangeRequest()。
    -    老爸的 public WorkItem() 名字天生不合，所以絕對無法被繼承。

+++++++++++++

2. 繼承的部分是`屬性`+`方法`，`建構子`無法被繼承：
    -    因為`建構子跟物件本身需要同名`

+++++++++++++

3. 繼承來的`屬性`跟`方法`可以隨意使用、也可以不用
    ![image](https://hackmd.io/_uploads/SyFxL_Olzx.png)
    -    兒子(ChangeRequest)擁有這些資產的絕對主導權

+++++++++++++

4. 孫子繼承兒子，即使兒子沒說明，孫子也能拿到曾祖父的財產？
    -    在物件導向裡叫做「傳遞性（Transitivity）」
 ```Plaintext!
 👴 曾祖父 Object  ➔ 留下了 ToString() 技能
   │
👨 爺爺 WorkItem  ➔ 繼承了 ToString()，自己又發明了 ID, Title, Update()
   │
👦 爸爸 ChangeRequest ➔ 什麼都不寫（肚子裡空空如也）
   │
👶 孫子 SuperChangeRequest ➔ 宣布繼承爸爸！
```

這時候，這個孫子（SuperChangeRequest）落地時，他的記憶體大樓會發生神蹟：

1. 他往上看，爸爸雖然是一隻空白的 Class，但爸爸的血脈裡流著爺爺的基因。

2. 所以，孫子全自動、不需要任何人敘明，直接打包繼承了爺爺的 ID、Title、Update()，甚至曾祖父的 ToString()！

+++++++++++++

5.那為什麼建構子的大括號 { } 內部，會出現屬性的名字（ID、Title）？這不就代表建構子內部『有』屬性嗎？

```csharp!
Title = title;
```
-    在記憶體的實體世界裡，這行代碼要拆成左邊與右邊：
        -    右邊的 title（參數）：它是外面貨車送來的全新材料（例如字串 "Default title"）。它確實暫時活在建構子的肚子（Stack 區域）裡。
        -    左邊的 Title（屬性）：它是死死固定在 Heap 區大樓外牆上的「實體信箱」。
-    建構子這個「郵差」，在執行期間走到大樓外牆前，伸手把貨車上的材料（右邊的 title），塞進大樓原本就有的橘色信箱（左邊的 Title）裡。

+++++++++++++

6. 「定義」與「呼叫」的物理界線

```csharp!
public class WorkItem
{
    // ===================================================
    // 🧱 【這是定義】真正挖在 Heap 區大樓肉身上的「實體記憶體格子」
    // ===================================================
    protected int ID { get; set; }
    protected string Title { get; set; }


    // ===================================================
    // 🛠️ 【這是動作】一段通電執行的機器碼，肚子裡只有「通電指令」
    // ===================================================
    public WorkItem(string title)
    {
        // 🚨 物理真相：這不叫「內含屬性」，這叫「指令：把 title 的電流導向牆上的 Title 格子」
        this.Title = title; 
    }
}
```

+++++++++++++

7. 為什麼class沒有static標籤也住在heap-static當中?

-    因為 「類別（Class）本身」不需要標籤，它出生就自帶最頂級的 VIP 通行證！
-    class 的本質就是「靜態設計圖」

```plaintext!
【 🎬 記憶體大連動三幕劇 】

 🟢 第一幕：程式開車通電 (Heap-Static 誕生)
   [Heap-Static] ──載入 WorkItem 藍圖與 currentID ──➔ 萬事俱備
                          │
 🔵 第二幕：執行 new WorkItem() (Stack 點火)
   [Stack] ───────➔ 壓入建構子工兵框架，手持 "0" 與 "Default title" 指令
                          │
 🟣 第三幕：工兵動工 (Heap-Heap 灌漿)
   [Heap-Heap] ────➔ 挖出實體房間，由 Stack 電流將值寫入 ID 與 Title 房間
```

+++++++++++++

8. 那struct是住在stack他也是住在heap-static嗎?
-    Struct 的「設計圖」住哪裡？➔ 【Heap-Static】
-    Struct 的「肉身實體」住哪裡？➔ 【看它寄生在誰身上！】
        -    class 很高傲，不管被誰呼叫，都一定要在 Heap-Heap 圈地蓋獨立大樓，別人只能拿指針（Pointer）指著它。
        -    struct（值型別）非常卑微，它沒有自己獨立的大樓（沒有物件車頭、沒有指針指著它）。它的物理特性是：「宿主（Container）住哪裡，它就原地寄生在哪裡！」
                -    宿主是「方法工兵」：你寫在方法肚子裡當區域變數 ➔ 宿主在 【Stack】，它就直接嵌在 Stack 的格子裡。
                
                -    宿主是「Class大樓」：你寫在 Class 裡面當成員屬性 ➔ 宿主在 【Heap-Heap】，它就直接變成了大樓牆壁的一部分，死死躺在 Heap-Heap 裡。
                
                -    宿主是「Static標籤」：你把它宣告成靜態成員 ➔ 宿主在 【Heap-Static】，它就直接焊在 Heap-Static 的設計圖旁邊。

=======================

### 總結:

1. 方法與屬性 ➔ 走的是 「基因血脈鏈」，代代相傳，只要沒被 sealed（封印），孫子就可以一路啃老啃到最上層。

2. 建構子 ➔ 走的是 「每代獨立的剪綵大門」，每個人名字都不同，無法繼承，只能在自己開門時，在幕後拉一條隱密通道（Constructor Chaining）去請老爸的推進器幫忙點火。

-----------------------------

## heap/stack的無殼理論

### 值型別的深層真相

前面關於值型別都是說他是一筆真實的資料保存在stack中，可以更快速的存取，看似比參考型別這種之神資料保存在heap，在stack僅有位址(門牌)更基現代化，但其實不然:

- 本質是「沒有指針外殼的純資料」
    - 它不像 Class 擁有高傲的 VIP 外殼（沒有 Object Header 和 Method Table Pointer）。它全身光溜溜的，就是純粹的二進位資料顆粒（例如 int 是 4 Bytes、TimeSpan 是 8 Bytes）。
- 因為沒有殼，它絕對無法「獨立」在 Heap-Heap 區開戶
    - 它是一堆沒有腳的樂高積木，它的物理居住地址完全取決於它抱到誰的大腿（宿主）：
        - 孤身一人（方法內的區域變數） ➔ 只能肉身躺在 Stack 的臨時工作檯上。
        - 抱到大腿（Class 內部的成員屬性） ➔ 隨著 Class 大樓一起嵌在 Heap-Heap 的實體牆壁裡。
        - 自帶標籤（加了 static 關鍵字） ➔ 直接焊在 Heap-Static 的設計圖旁邊。
        
- 觸發硬體大坑：裝箱（Boxing）的代價
    - 當你強迫一個無殼的值型別，非要硬生生把它塞給 object 或是介面（Interface）時，系統為了讓它能獨立待在 Heap-Heap，必須在幕後手工幫它打造一個「臨時的塑膠殼」。這個裝箱動作會劇烈消耗 CPU 算力，並在 Heap 區產生記憶體碎片。


### 1. 為什麼class沒有static標籤也住在heap-static當中?

-    因為 「類別（Class）本身」不需要標籤，它出生就自帶最頂級的 VIP 通行證！
-    class 的本質就是「靜態設計圖」

```plaintext!
【 🎬 記憶體大連動三幕劇 】

 🟢 第一幕：程式開車通電 (Heap-Static 誕生)
   [Heap-Static] ──載入 WorkItem 藍圖與 currentID ──➔ 萬事俱備
                          │
 🔵 第二幕：執行 new WorkItem() (Stack 點火)
   [Stack] ───────➔ 壓入建構子工兵框架，手持 "0" 與 "Default title" 指令
                          │
 🟣 第三幕：工兵動工 (Heap-Heap 灌漿)
   [Heap-Heap] ────➔ 挖出實體房間，由 Stack 電流將值寫入 ID 與 Title 房間
```

===================

### 2. 那struct是住在stack他也是住在heap-static嗎?
-    Struct 的「設計圖」住哪裡？➔ 【Heap-Static】
-    Struct 的「肉身實體」住哪裡？➔ 【看它寄生在誰身上！】
        -    class 很高傲，不管被誰呼叫，都一定要在 Heap-Heap 圈地蓋獨立大樓，別人只能拿指針（Pointer）指著它。
        -    struct（值型別）非常卑微，它沒有自己獨立的大樓（沒有物件車頭、沒有指針指著它）。它的物理特性是：「宿主（Container）住哪裡，它就原地寄生在哪裡！」
                -    宿主是「方法工兵」：你寫在方法肚子裡當區域變數 ➔ 宿主在 【Stack】，它就直接嵌在 Stack 的格子裡。
                
                -    宿主是「Class大樓」：你寫在 Class 裡面當成員屬性 ➔ 宿主在 【Heap-Heap】，它就直接變成了大樓牆壁的一部分，死死躺在 Heap-Heap 裡。
                
                -    宿主是「Static標籤」：你把它宣告成靜態成員 ➔ 宿主在 【Heap-Static】，它就直接焊在 Heap-Static 的設計圖旁邊。

===================

### 3. C# 的宇宙大一統：萬物皆自 object 出

微軟架構師立下了一條鐵律：全宇宙不論是多高傲的 class，還是多卑微的 struct（如 int、bool），它們往上追溯無數代，共同的始祖只有一個，叫做 System.Object（關鍵字小寫的 object）。

```Plaintext!
👑 object (System.Object) ➔ 它是全宇宙最頂層的 Class！
                                 │
         ┌───────────────────────┴───────────────────────┐
         ▼                                               ▼
【參考型別流派 (Reference Types)】             【值型別流派 (Value Types)】
   • 所有自訂的普通 class                       • 核心中樞：System.ValueType (也是一隻 Class)
   • 所有的 string、陣列、介面                             │
                                                         ▼
                                               • 所有的 struct (如 Point)
                                               • 所有的內建基本型別 (int, bool, TimeSpan)
```

===================
### 4. 無殼的 struct 怎麼去繼承身為 Class 的 object？

這是 C# 語言設計史上最偉大的「雙面人設計」，用來解決「名義上的血緣」與「記憶體長相」的物理衝突：

#### A. 在日常生活裡（未裝箱狀態）

當宣告 `int age = 25;` 或者`TimeSpan time = new TimeSpan();`時：
-    追求極致的快取效率與零 GC 壓力 -> C# 會完全隱瞞它繼承 object 的事實
-    在記憶體的物理世界裡，他就是沒有任何外殼的二進位資料，沒有任何地方長得像 object

++++++++++++++

#### B. 世界線交會：當物理矛盾當場炸開

當你忽然手癢，寫出這行程式碼，強迫「物理上沒殼的平民」去坐「名義上老爸的皇帝位」時：

```csharp!
object obj = age; // 💥 物理衝突點
```

-    左邊的 object obj：在 【Stack 區】 宣告了一個空皮包（指針變數），它規定自己只能收納 【Heap-Heap 區的大樓門牌（地址）】，且要求大樓門口必須有標準外殼結構（Object Header）。
-    右邊的 age：躺在 【Stack 區】 的純資料，沒有門牌地址讓別人追蹤，更沒有外殼結構。
皮包無法直接綁定一個沒殼且沒門牌的資料，為了不讓 CPU 順著指針衝進 Stack 撞牆，CLR 必須強制啟動 Boxing 施工隊進行物理轉譯。

#### C. 裝箱（Boxing）的四步施工作業

-    區圈地：CPU 衝進 【Heap-Heap】 區大喊：「快給我撥一塊全新大樓的空間！」

-    蓋出標準外殼：在這塊地上焊上 System.Object 規格的指針外殼（Object Header + Method Table 指針），符合 obj 皮包的挑剔胃口。
-    複製肉身：把 Stack 區 age 肚子裡的 25 影印一份，塞進 Heap-Heap 這棟新外殼大樓的客廳裡。
-    發放門牌並收納：新大樓在 Heap-Heap 產生了合法的實體地址門牌（例如 0x9FFF），最後把這個門牌寫進 Stack 區的 obj 皮包裡。

===================
