---
title: "物件 03 多型性"
description: "同一個方法名字，通電後可以表現出多種不同的狀態"
category: backend
date: 2026-08-09
tags: ["C#", "OOP"]
draft: false
sourcePath: "C#/物件/物件 03 多型性.md"
---
> 同一個方法名字，通電後可以表現出多種不同的狀態

```Plaintext!
                👑 多型 (Polymorphism)
                           │
         ┌─────────────────┴─────────────────┐
         ▼                                   ▼
【靜態多型 / 編譯期多型】              【動態多型 / 執行期多型】
   ➔ 掌門人：Overload (多載)              ➔ 掌門人：Override (覆寫)
   ➔ 物理戰場：編譯時看「參數」            ➔ 物理戰場：執行時看「Heap 肉身」
```

## 物件的宣告型別與其執行階段型別將不再相同
```csharp!
// ［左邊：宣告型別］ ➔ ［右邊：執行階段型別］
WorkItem item = new ChangeRequest("改底層", "加成員", time, 1);
```

-    宣告型別（Declared Type）➔ 看左邊： 這是寫給「編譯器（Compiler）」看的。編譯器在檢查語法時，只認皮包的外殼。在它眼裡，item 變數的型別就是一個普通的 WorkItem。
-    執行階段型別（Runtime Type）➔ 看右邊： 這是程式開車後（Runtime），真正躺在 Heap 記憶體平民區 的物理肉身。此時這塊記憶體，完完全全是一個帶有頂樓加蓋（originalItemID）的 ChangeRequest 實體！

===========

## 虛擬方法(virtual)

```csharp!
public class Shape
{
    // A few example members
    public int X { get; init; }
    public int Y { get; init; }
    public int Height { get; init; }
    public int Width { get; init; }

    // Virtual method
    public virtual void Draw()
    {
        Console.WriteLine("Performing base class drawing tasks");
    }
}

public class Circle : Shape
{
    public override void Draw()
    {
        // Code to draw a circle...
        Console.WriteLine("Drawing a circle");
        base.Draw();
    }
}
public class Rectangle : Shape
{
    public override void Draw()
    {
        // Code to draw a rectangle...
        Console.WriteLine("Drawing a rectangle");
        base.Draw();
    }
}
public class Triangle : Shape
{
    public override void Draw()
    {
        // Code to draw a triangle...
        Console.WriteLine("Drawing a triangle");
        base.Draw();
    }
}
```
---

### 一、 實例化（Instantiation）的物理真相：工地開桌點菜

當你在程式碼裡寫下 `public class Circle` 等類別宣告時，在實體記憶體世界裡，並沒有任何一棟肉身大樓被蓋出來，它們通通只是躺在 **【總店辦公室（Heap-Static）】** 裡的紙質規格菜單。

直到程式通電，執行到 `new` 的這一秒，才是藍圖演變成「物理肉身」的時刻：
```csharp
Circle A = new Circle();
```

#### 🍽️ 點餐開桌的施工現場
1. **抬頭看菜單（Heap-Static）**：CPU 探針衝進總店辦公室，翻開 `Circle` 的套餐規格。
2. **計算托盤尺寸**：規格寫著：「這份套餐要裝下老爸的基礎房間（X, Y, Width, Height 共 16 節格子），還要加上 Circle 自己加碼的房間（Radius 4 節格子），外加物件頭外殼天線 16 節。」
3. **【工地現場灌漿（Heap-Heap）】**：CPU 轉身衝進 **【工地現場餐桌區（Heap-Heap）】**，直接圈出一塊 **36 節（Bytes）的連續地皮**。把老爸的房間和兒子的房間嚴絲合縫地焊在一起，蓋出**唯一的一棟「加肥版單一托盤大樓」**。
4. **發放桌號收據（Stack）**：這桌蓋好後的實體地址門牌（假設是 `0x5566`），被發射回 **【工兵隨身工作檯（Stack）】**，塞進變數皮包 `A` 裡。

> ⚠️ **鋼鐵校正：開兩桌，就是點裝兩次菜！**
> 如果你在程式裡 `new` 了 10 次，系統就會在 **【Heap-Heap】** 區開 10 張完全獨立、物理隔離的餐桌托盤（c1 ~ c10）。每一桌都有自己獨立影印、獨立加熱的一份合體食物資料。**開 10 個實例就是開 10 桌，絕對不會全部擠在同一桌！**

---

### 二、 關於方法：總店的「料理步驟祕笈」

#### ⚙️ 本質是「唯讀的烹飪指令流」
方法（Method）的本質，就是一堆「冷酷的、唯讀的、只負責計算的機器指令（CPU Instructions）」。它不是負責在現場搬桌子、搞出實體的建構子工兵，編譯完後，它在底層就是純粹的**『烹飪動作流』**。

#### 💾 方法要不要佔空間？
* **要！但只佔在總店辦公室**：它們是唯讀的晶片指令，一出生就安穩地焊在 **【總店中央廚房（Heap-Static）】** 的祕笈檔案庫裡，全宇宙永遠只有一份。
* **與客人的餐桌完全隔離**：不論你外面開了 2 桌還是 10 桌，客人的餐桌托盤上都只裝自己的食物資料，絕對不會在餐桌上重複影印這些複雜的料理步驟。

---

### 三、 關於虛擬方法（Virtual）：點餐單上的「自訂魔改插槽」

既然都已經「繼承」了，兒子不就自動拿到老爸的方法了嗎？為什麼還要特別在老爸那裡加一個 `virtual`（虛擬），在兒子那裡加一個 `override`（覆寫）？

#### 🔬 物理真相
* **普通方法（沒有寫 virtual）管的是「代碼的重用（靜態死規矩）」**：
  老爸寫 `public void PrintInfo()`，這就是鋼鐵死規矩（固定配菜）。兒子落地時直接自動沿用。全宇宙呼叫這個方法，CPU 都會盲目跑去中央廚房執行同一段老祕笈，吐出來的代碼都一模一樣。
* **虛擬方法（有寫 virtual）管的是「通電時認不認肉身（動態多型）」**：
  老爸在總店藍圖上挖了一個「彈性魔改插槽」，意思是：「這招我寫了個預設版步驟，外部分店兒子（子類別）開桌時可以隨時換成自己的獨門作法。」 兒子這才能在自己的單子裡寫 `override` 去修改它。

---

### 四、 兒子覆寫（Override）的物理分家

當鍵兒子決定加碼魔改，寫下 `public override void Draw()` 時，底層晶片會進行最漂亮的「步驟獨立、改接電話線」物理行為：

1. **獨門步驟（機器碼）➔ 獨立開闢**：
   兒子的新方法指令，是獨立寫在 **【Heap-Static】** 中央廚房的新格子裡（例如 `0x2222`）。**老爸的原版步驟（`0x1111`）依然安穩地躺在原地，絕對沒有被複製，也沒有被消失！**
2. **點餐單表格（VMT / 虛擬方法表）➔ 結構複製、指針改接**：
   * **結構複製**：繼承的那一秒，兒子在 **【Heap-Static】** 影印（複製）了一張老爸的點餐單格式（VMT 表格欄位），蓋了一張**屬於兒子自己私有、完全分家的新電話簿表格**。
   * **指針改接**：因為寫了 `override`，兒子拿起立可白，**只在自己這張新單子上，把原本指向老爸廚房的 `0x1111` 地址，擦掉改接（更新）成指向自己新步驟的 `0x2222`**。兩張表完全分家，互不干涉！

---

### 五、 揭秘 `base` 關鍵字：多型宇宙的超高速傳送門

當兒子在自己的新代碼裡寫了 `base.Draw();`，這個 `base` 在底層根本不是一個新物件，而是一個**「編譯期魔術貼紙（VMT 繞道指令）」**。

#### 🚀 `base.Draw()` 通電時的硬體超能力
* **呼叫 `this.Draw()`（普通虛擬呼叫）** ➔ 編譯成 `callvirt` 指令。
  * **CPU 動作**：去翻 Heap-Heap 的大樓頭頂貼紙，尋線去查 Heap-Static 兒子的 VMT 表，查到誰就執行誰。若兒子呼叫自己，會陷入無限遞迴導致 Stack 暴斃。
* **呼叫 `base.Draw()`（老爸強行呼叫）** ➔ 編譯成 `call` 指令（**靜態直接彈射**）。
  * **編譯期硬焊**：編譯器在編譯期翻開老爸那張沒被動過的原始單子，查到地址是 `0x1111`。編譯器直接在兒子的指令裡**硬焊（Hardcode）**打上老爸機房的物理 GPS 座標，把 `base.Draw()` 換成 `call 0x1111`。
  * **執行期繞道**：通電執行時，`base` 在物理上直接蒸發（佔用 0 位元組）。CPU **完全無視、繞過**

---

### 六、 幕後黑魔法：世界上根本沒有「實體方法」與隱藏的 `this`

在 **【Heap-Static】** 中央廚房區裡，不論是老爸的方法還是兒子的方法，在編譯成機器碼後，肚子裡其實都偷偷藏了一個全天下工程師都看不到的**「0號隱藏參數」，叫做 `this` 指針**！

在 CPU 眼裡，這兩個方法底層真正的物理長相其實是這樣的：

```csharp
// 老爸的方法，在底層其實長這樣：
public static void Shape_Draw(Shape __this) // 👈 偷偷收一個肉身地址！
{
    // 這裡如果存取 __this.X，就是去讀那個地址的資料
    Console.WriteLine("Performing base class drawing tasks");
}

// 兒子覆寫的方法，在底層其實長這樣：
public static void Circle_Draw(Circle __this) // 👈 同樣偷偷收一個肉身地址！
{
    Console.WriteLine("Drawing a circle");
    // base.Draw(); 在底層被編譯器翻譯成：
    Shape_Draw(__this); // 🚀 物理真相就在這一行！直接把自己的肉身傳過去
}
```



#### 🎬 還原 `base.Draw()` 通電時的物理肉身流向 (`Circle A = new Circle(); A.Draw();`)

1. **第一幕：外部通電，衝進兒子方法**
   CPU 帶著 `A` 大樓在 **【Heap-Heap】** 的實體地址（假設是 `0x5566`），衝進兒子的 `Circle_Draw` 晶片。
   * 此時方法內部的 `__this` ＝ `0x5566`（**主體是 Circle 肉身**）。
   * 螢幕印出：`"Drawing a circle"`。
2. **第二幕：撞到 base.Draw() ➔ 執行 Shape_Draw(__this);**
   兒子的晶片執行到最後一行，它呼叫老爸的 `Shape_Draw` 晶片。關鍵來了：**兒子把自己手裡的 `0x5566` 地址（自己的肉身），原封不動地當作參數，傳給了老爸的方法！**
3. **第三幕：老爸代碼通電，但用的是兒子的肉身！**
   CPU 探針彈射到老爸的 `Shape_Draw` 機器碼區。老爸的晶片啟動了，此時老爸方法肚子裡的 `__this` 拿到了 `0x5566`！**依然是那棟 Circle 大樓！** 老爸的指令順利借用兒子大樓裡面的資料欄位完成運算。

---

### 七、 商業實戰落地：購物車與折價券引擎（多型、權重與雙肉身指標流向）

在真實商業世界中，我們絕對不會把物件死死寫在 List 裡，而是動態從資料庫抓取。以下是多型控管「計算順序（先扣錢還是先打折）」的終極商業架構。

#### 📊 1. 購物車與折價券菜單規格（Heap-Static）
```csharp
// 🛒 購物車資料肉身規格
public class Cart
{
    public int Id { get; set; }
    public decimal TotalAmount { get; set; } // 💰 隨時被修改的總金額格子
}

// 🎖️ 總店的基礎折價券菜單（老爸）
public abstract class CouponRule
{
    public string Code { get; set; }
    public int Priority { get; set; } // 📌 魔鬼在這裡：數字越小越先執行！
    public abstract void ApplyDiscount(Cart cart); // 魔改插槽
}

// 2. 衍生菜單 A（滿千折百兒子）
public class AmountCoupon : CouponRule
{
    public decimal Threshold { get; set; } // 門檻
    public decimal DiscountAmount { get; set; } // 折多少
    public override void ApplyDiscount(Cart cart)
    {
        if (cart.TotalAmount >= Threshold) { cart.TotalAmount -= DiscountAmount; }
    }
}

// 3. 衍生菜單 B（打折兒子）
public class PercentageCoupon : CouponRule
{
    public decimal Percentage { get; set; } // 打幾折
    public override void ApplyDiscount(Cart cart) { cart.TotalAmount *= Percentage; }
}
```

#### 🏎️ 2. 萬用結帳核心引擎（Web API Controller 控場）
```csharp
public void Checkout(string userId, Cart cart)
{
    // 🚀 關鍵 1：從資料庫動態撈出使用者勾選的所有折價券大樓指標
    List<CouponRule> userCoupons = _db.GetAppliedCoupons(userId);

    // 🎖️ 關鍵 2（順序真相）：管你是什麼券，通通按照 Priority 數字從小到大排好隊！
    var sortedCoupons = userCoupons.OrderBy(c => c.Priority).ToList();

    // 毫無感情的萬用引擎依序發射 callvirt 指令：
    foreach (var coupon in sortedCoupons)
    {
        coupon.ApplyDiscount(cart); // 🎯 多型的萬用雷射就在這一行！
    }
}
```

#### 📈 3. 數據流實況模擬：把隱形的「順序」看個清清楚楚！

為了看穿順序，我們模擬一次真實的動態執行。
假設現在**購物車原始金額為 1100 元** (`cart.TotalAmount = 1100`)，使用者在前端勾選了兩張券，背後資料庫設定的權重如下：
* **滿千折百券** (`AmountCoupon`)：行銷設定 `Priority = 10` (優先權高)
* **全局九折券** (`PercentageCoupon`)：行銷設定 `Priority = 20` (優先權低)

##### 📍 第一步：資料庫撈出來時（userCoupons 狀態）
這時從資料庫撈出來的 List 順序可能是亂的（例如打折券排在前面）：
* `userCoupons[0]` ➔ `PercentageCoupon` (Priority = 20)
* `userCoupons[1]` ➔ `AmountCoupon` (Priority = 10)
*(如果直接跑這團亂序，金額會算錯！)*

##### 📍 第二步：執行完 `OrderBy(c => c.Priority)` 後（sortedCoupons 狀態）
經過這一行排序後，List 內部的指標順序**在物理上被重新排隊**了！變成：
* 1️⃣ `sortedCoupons[0]` ➔ `AmountCoupon` (**Priority = 10，成功排到老大！**)
* 2️⃣ `sortedCoupons[1]` ➔ `PercentageCoupon` (**Priority = 20，乖乖排到老二！**)

##### 📍 第三步：進入 `foreach` 晶片狂飆

* **🔄 第一次迴圈（coupon ＝ 滿千折百老大）：**
  * **當前購物車金額**：`1100` 元。
  * **動態認親**：CPU 摸到老大天線，彈射去跑 `AmountCoupon` 的扣錢晶片。
  * **執行數學**：`1100 >= 1000` 成立！➔ `1100 - 100 = 1000`。
  * **此時購物車格子被物理改寫為**：**`1000` 元**。

* **🔄 第二次迴圈（coupon ＝ 九折老二）：**
  * **當前購物車金額**：已經變成上一步留下來的 **`1000` 元**！
  * **動態認親**：CPU 摸到老二天線，彈射去跑 `PercentageCoupon` 的打折晶片。
  * **執行數學**：`1000 * 0.9 = 900`。
  * **最終結帳金額**：**`900` 元**（成功先扣完錢、再打折！）。

#### 🔍 4. 核心引擎通電時的「雙肉身指標流向」
當迴圈在跑時，底層晶片電路實際上是被翻譯成直接傳遞記憶體地址：
`AmountCoupon_ApplyDiscount(coupon_address, cart_address);`

* **指標一（隱藏的 `__this`）**：拿著當下那張折價券大樓的 Heap 地址（`0x2222`）。
* **指標二（一般的 `cart`）**：拿著購物車大樓的 Heap 地址（`0x1111`）。

**兩股電流同時導通**：CPU 站在中央廚房的唯讀晶片上，左手拿著 `0x2222` 地址去讀取這張折價券專屬的自訂欄位（讀到權重 `Priority` 或是折價金額）；右手拿著 `0x1111` 地址，直接橫跨地皮，物理改寫了購物車大樓肚子裡的 `TotalAmount` 格子！

這就是為什麼方法不需要在實體世界多開區域存放資料——因為方法本身是乾癟的唯讀電路，它在執行時，同時吸取了「折價券肉身（`this`）」與「購物車肉身（`cart`）」的微觀資料，才完美完成了這場商業運算！

---
## 八、 官方文件解密：為什麼「欄位不可為虛擬」？（死資料 vs 可變動邏輯）

微軟官方文件提到：「**欄位不可為虛擬（Fields cannot be virtual）**，只有方法、屬性、事件和索引子可以是虛擬的。」這在底層是鋼鐵般的硬體物理限制。

### 🧬 1. C# 術語大澄清：「成員（Members）」與「欄位（Fields）」
* **成員（Members）**：大集合統稱。只要寫在類別（Class）肚子裡的東西（欄位、方法、屬性）通通叫做類別成員。
* **欄位（Fields）**：**純粹的死資料格子**。
  ```csharp
  public decimal TotalAmount; // 👈 沒有加 { get; set; }！這就是欄位
  ```
  在物理上，它在 **【Heap-Heap】** 的肉身托盤中就是一塊用來放二進位數字的空格（純記憶體空間）。它在中央廚房 **【Heap-Static】** 裡**沒有任何對應的 CPU 機器碼指令**。它的「數值」天天在變，但它身上沒有運算邏輯。

### ⚡ 2. 屬性（Properties）：披著變數外皮的「偽裝方法」
  ```csharp
  public decimal TotalAmount { get; set; } // 👈 有加 { get; set; }！這叫屬性
  ```
  屬性表面上看著像變數，但在編譯成機器碼後，編譯器會自動把它打散、生成兩個隱藏的方法：`get_TotalAmount()` 和 `set_TotalAmount()`。**屬性的本質是方法，也就是唯讀的 CPU 指令流！**



### ❌ 3. 為什麼欄位在物理上沒資格玩虛擬（Virtual）？
虛擬（`virtual`）與覆寫（`override`）的魔法，完全建立在 **【Heap-Static】 點餐單表格（VMT / 虛擬方法表）** 的基礎上：
1. **VMT 表格的硬體限制**：VMT 表格內的插槽，**只允許存放「CPU 唯讀運算指令（方法）的機房門牌地址」**。
2. **欄位沒有指令**：欄位只是 Heap-Heap 裡的一塊死肉身資料，它在 Heap-Static 裡根本沒有機器碼指令，因此**它在物理上絕對不可能、也沒資格在 VMT 點餐單上佔有任何一個插槽**。
3. **無電線可改接**：既然在 VMT 單子上連個插槽都沒有，兒子在寫代碼時，就**沒有任何多型電話線可以讓他用 `override` 進行改接**。

> 🎯 **大一統物理結論：**
> 程式碼（C# Code）只負責在 **【Heap-Static】** 開好空規格與格子；資料庫（DB）負責在執行期把真實數字灌入 **【Heap-Heap】** 的大樓。
> 虛擬（`virtual`）追求的「可變動」，是 **VMT 點餐單上「運算邏輯（指令線路）」的可變動**。欄位肚子裡只有死資料、沒有指令線，因此欄位在物理上是絕對不可能成為虛擬的！

---
## 九、 進階多型控制：`new` 同名陰陽線與 `sealed` 電焊槍

微軟官方文件針對虛擬線路的控制，提供了 `new`（隱藏）與 `sealed`（密封）兩種更進階的硬體操作。

### 🎭 1. `new` 關鍵字（Method Hiding / 同名陰陽線）
* **物理本質**：它完全不碰老爸的 VMT 插槽！老爸在 VMT 上的插槽依然死死指著老爸的舊機房（`0x1111`）。兒子使用 `new` 只是**在自己的點餐單上，另外偷開了一個完全無關、剛好同名叫做 `DoWork` 的新插槽**，指著自己的新機房（`0x2222`）。
* **硬體走位（雙帳本機制）**：呼叫哪個方法，取決於「皮包（變數）的型別」，而不是「大樓肉身（實體）的型別」。
  ```csharp
  DerivedClass B = new();
  B.DoWork();  // 翻兒子帳本 ➔ 執行兒子偷開的新機房 (0x2222)
  
  BaseClass A = B;
  A.DoWork();  // 翻老爸帳本 ➔ 老爸原廠 VMT 插槽完好無損，執行老爸舊機房 (0x1111)！
  ```



### 🔒 2. `sealed override`（密封覆寫 / 死死焊死）
* **實例演練**：繼承鏈條長這樣：老祖宗 A ➔ 爺爺 B ➔ 爸爸 C ➔ 兒子 D。
  * 老祖宗 A 挖了一個 `virtual` 彈性插槽。
  * 爺爺 B 寫了 `override`，拿立可白改接電話線。
  * 到了爸爸 C 這一代，寫下了：`public sealed override void DoWork()`。
* **物理動作**：這個 `sealed` 在底層的物理動作就是：**爸爸 C 把電話線改接到自己的機房後，直接拿電焊槍把這個 VMT 插槽用鐵皮「死死焊大印焊死」！**
* **後代的命運**：到了兒子 D 這一代，由於該插槽已被爸爸 C 用鐵皮焊死，不允許後代再拿立可白塗改（無法再寫 `override`）。如果兒子 D 骨子裡極度反骨，非要自己寫一個同名的 `DoWork`，就只能退而求其次，加上 `new` 關鍵字，自己在旁邊偷開一條同名的私人陰陽線。
