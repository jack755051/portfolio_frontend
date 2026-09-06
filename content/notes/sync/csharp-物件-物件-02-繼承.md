---
title: "物件 02 繼承"
description: "繼承與封裝和多型一起，是面向對象程序設計三個主要特性之一"
category: backend
date: 2026-08-09
tags: ["C#", "OOP"]
draft: false
sourcePath: "C#/物件/物件 02 繼承.md"
---
> 繼承與封裝和多型一起，是面向對象程序設計三個主要特性之一

 -    繼承成員的 類別稱為基類，而繼承這些成員的類別稱為 衍生類別。
 -    衍生類別只能有一個直接基類。 
 -    繼承是可轉移的。

## 可轉移性?

### 正確的理解：垂直的「傳遞性」（爺爺 ➔ 爸爸 ➔ 孫子）
```Plaintext
ClassA (爺爺：留下一把劍)
   ▼
ClassB (爸爸：繼承了劍，自己買了盾)
   ▼
ClassC (孫子：繼承爸爸，自動「傳遞」獲得了劍和盾)
```


### 錯誤的理解：橫向的「乾哥乾妹」（ClassC ➔ ClassD）
```Plaintext
ClassA (老祖宗)
          ╱      ╲
         ╱        ╲
   ClassB (爸爸)  ClassD (叔叔)
     ▼
   ClassC (孫子)
```

## 等於JavaScript 的原型鏈（Prototype Chain）

### 1. 三層繼承代碼現場（爺、爸、孫）
```csharp!
// 👴 爺爺級別（ClassA）：最基礎的動物
public class Animal
{
    public void Eat() => Console.WriteLine("吃東西囉！");
}

// 👨 爸爸級別（ClassB）：繼承爺爺，並擴充哺乳類特能
public class Mammal : Animal
{
    public void FeedMilk() => Console.WriteLine("餵母乳中...");
}

// 👶 孫子級別（ClassC）：繼承爸爸，並擴充貓咪特能
public class Cat : Mammal
{
    public void Meow() => Console.WriteLine("喵喵叫~");
}
```

### 2. 孫子（ClassC）怎麼找到爺爺（ClassA）的？
```csharp!
{
    static void Main()
    {
        // 誕生一隻孫子級別的貓
        Cat myCat = new Cat();

        myCat.Meow();     // 🟢 毫無疑問，這是 Cat（孫子）自己寫的超能力。
        myCat.FeedMilk(); // 🟢 找到了！這是從 Mammal（爸爸）那裡繼承來的。
        myCat.Eat();      // 🚀 找到了！這就是你問的：孫子成功的跨代找到了 Animal（爺爺）的 Eat()！
    }
}
```

#### 繼承是可轉移的（Transitive）」。只要這條血脈不斷，不論往上傳幾代，最底層的孫子都能無縫享用老祖宗留下來的所有財產（方法與欄位）。


========

## 範例說明:

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

```csharp!
// Create an instance of WorkItem by using the constructor in the
// base class that takes three arguments.
WorkItem item = new("Fix Bugs",
            "Fix all bugs in my code branch",
            new TimeSpan(3, 4, 0, 0));

// Create an instance of ChangeRequest by using the constructor in
// the derived class that takes four arguments.
ChangeRequest change = new("Change Base Class Design",
                  "Add members to the class",
                  new TimeSpan(4, 0, 0),
                  1);

// Use the ToString method defined in WorkItem.
Console.WriteLine(item.ToString());

// Use the inherited Update method to change the title of the
// ChangeRequest object.
change.Update("Change the Design of the Base Class",
    new TimeSpan(4, 0, 0));

// ChangeRequest inherits WorkItem's override of ToString.
Console.WriteLine(change.ToString());
/* Output:
    1 - Fix Bugs
    2 - Change the Design of the Base Class
*/
```

### 1. 為什麼可以同時存在多個 WorkItem 的傢伙？

```csharp!
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
```
========================
### 2.多載（Overload）

這兩個沒有寫 static，他們是為了 new 物件時服務的。

```csharp!
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

```


#### 參數的數量或型別不同。目的是為了讓別人在 new WorkItem() 時有不同的套餐可以選。

========================
### 3. 靜態建構子（第三個）

```csharp!
// 3號：前面加上了 static！
static WorkItem() => currentID = 0;
```

#### 特色:

-    無法主動呼叫它
-    只會執行一次
-    它是為了「太陽（靜態變數）」而生的：
因為這棟大樓裡有一個 private static int currentID;（活在靜態儲存區的太陽）。微軟需要一個安全的地方，在太陽升起時把它初始化為 0。這就是這個靜態建構子的唯一任務。
-    嚴格的語法禁令：
它絕對不能有任何參數（所以它無法被多載），也絕對不能寫 public 或 private。因為它是系統自動呼叫的，不需要對外公開權限。

#### 為什麼得這樣做?

-    這四個限制根本不是為難工程師，它們完完全全就是一整套「硬核防呆保護機制」！ 而它存在的唯一方式，也正如你所說，是被動、而且只在 Class 第一次被驚醒時觸發的「開光儀式」。
-    不給它參數、不讓你寫 public/private、不讓你主動呼叫，就是為了把這個重大的初始化權限從人類手裡奪走，100% 交給系統代管。人類既然連碰都碰不到，就絕對沒有機會去搞砸這個全域變數。****
-    「被動建立 + 只執行一次」


![image](https://hackmd.io/_uploads/BkQi_lOgzx.png)

#### 參數也得分開

```csharp!
private static int currentID;
```

-    它是什麼： 靜態欄位（Static Field）。
-    它住哪裡： 靜態儲存區（Static Storage Area）。
-    物理現實： 只要看到 static，它就跟 new 蓋出來的實體大樓徹底分手。不管你的網頁現在有 0 個使用者、還是 10,000 個使用者，這個 currentID 在整個記憶體世界裡永遠只有唯一的一個格子。
-    白話比喻： 它是科學園區總部大門口的「總統計計數器」。


```csharp!
protected int ID { get; set; }
protected string Title { get; set; }
protected string Description { get; set; }
protected TimeSpan jobLength { get; set; }
```

-    它們是什麼： 實例屬性（Instance Properties）。
-    它們住哪裡： Heap（堆積區）。
-    物理現實： 在你寫下 new WorkItem() 之前，這四個東西在記憶體裡根本不存在！只有當你每次呼叫 new，系統才會在 Heap 區像細胞分裂一樣，挖出一塊塊獨立的新空間，把這四個東西塞進去。
-    白話比喻： 它們是每間辦公室內部的「門牌、公司名稱、辦公室簡介、租約長度」。每開一家新公司（new 一個實例），就會誕生一組全新、獨立、互不干涉的屬性。

========================

### 4. 時間順序

#### 地基動工（靜態建構子優先開跑）

當程式碼的指針走到 new ClassA()，海關（CLR）發現記憶體裡還沒有這種類別的蹤跡，它會當場按下暫停鍵。

-    動作： 在你的 new 動作真正蓋出實體大樓之前，系統會搶先一步去執行 static ClassA()。
-    目的： 確保全域的太陽（靜態變數）已經安全地初始化完畢（例如把 currentID 設為 0）。
-    特點： 這個時候，實體物件根本還沒誕生，你傳進 new ClassA("參數") 的那些參數，這時候通通被晾在一邊，完全不干它的事。

#### 房間裝潢（依據參數挑選多載）
當階段一的開光儀式圓滿結束後，系統才會放開暫停鍵，正式進入 new 的重頭戲。

-    動作： CPU 在 Heap（堆積區）挖好一塊乾淨的記憶體，然後轉頭看你手裡拿著什麼門票。
-    如果你寫 new ClassA() ➔ 它就去敲「沒參數的預設款建構子」的門。
-    如果你寫 new ClassA("iPhone", 30000) ➔ 它就去敲「帶有字串與數字的多載建構子」的門。

目的： 把你傳進來的參數，精準地塞進這棟剛蓋好的大樓房間裡（初始化實例屬性）。

========================
#### 5. override

```csharp!
    public override string ToString() =>
        $"{this.ID} - {this.Title}";
```

讓每一個你寫出來的 Class，都能擁有自己決定自己要長成什麼文字的超能力。以後不管是除錯（Debug）、印 Log、還是要在畫面上顯示，只要一呼叫它，大樓就會乖乖交出這張最精美、最看得懂的客製化名片！

========================
#### 6. 繼承的真相:

-    物理真相:
        -    繼承（Inheritance）帶給你的： 是「結構的繼承」。老爸保證你的骨架裡一定有 ID 和 Title。
        -    建構子（Constructor）負責的： 是「數值的初始化」。大樓蓋好了，裡面有空房間（Title），但房間裡要擺沙發還是擺床（到底是 "Default title" 還是外部傳進來的 "修正 Bug"），必須由建構子在物件誕生那一刻決定。
        
-    物理意義:  
        -    技能樹全自動複製（Code Reuse）：
老爸身上只要是 public 或 protected 的方法（如 Update、GetNextID、ToString），自動百分之百焊死在兒子的技能樹上。兒子不需要重新發明輪子，直接拿來用就好。
        -    型別認同（Is-A 關係）：
在 C# 的法庭裡，「兒子就是老爸的一種特例（ChangeRequest IS A WorkItem）」。所有原本規定要傳入 WorkItem 的地方，你現在通通可以把 ChangeRequest 堂堂正正地丟進去。

========================

#### 7. 與前端差別

> C# 的 : ＝ 前端的 extends。

```typescript!
// 前端寫法：用 extends
class ChangeRequest extends WorkItem {
    // ...
}
```

```csharp!
// C# 寫法：用 冒號 :
public class ChangeRequest : WorkItem
{
    ....
}
```

========================

#### 8. Base:

```csharp!
public class ChangeRequest : WorkItem
{
    protected int originalItemID { get; set; }

    // 🚀 兒子收到了 4 個參數，它說：「前面 3 個是老爸的，直接用 : base 送去給老爸初始化！」
    public ChangeRequest(string title, string desc, TimeSpan jobLen, int originalID) 
        : base(title, desc, jobLen) // 👈 這行會直接觸發老爸的豪華建構子！
    {
        // 兒子自己只需要專注處理自己發明的專利屬性就好！超級乾淨！
        this.originalItemID = originalID;
    }
}
```

========================

#### 9. 其實可以原封不動

-    可以把 WorkItem 的功能原封不動搬過來即可

```csharp!
// 🏢 兒子對外宣告：我繼承老爸。然後加上大括號，裡面什麼都不寫！
public class ChangeRequest : WorkItem
{
    // 這裡空空如也，連建構子、屬性、方法通通都不寫！
}
```

========================

#### 總結:

-    靜態建構子是「類別本體（Class itself）」的點火開關，一定比任何物件實體（Instance）都還要早執行。
-    多載（Overload）是「實體物件」出生時的客製化套餐，等全域環境（靜態）準備好之後，才會根據你傳入的參數決定走哪一條多載路線。
