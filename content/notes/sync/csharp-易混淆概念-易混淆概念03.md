---
title: "易混淆概念03"
description: "它是為了「依賴注入（DI）」而量身打造的特化武器！"
category: backend
date: 2026-08-09
tags: ["C#", "Concepts"]
draft: false
sourcePath: "C#/易混淆概念/易混淆概念03.md"
---
## 主要建構子與建構子
> 它是為了「依賴注入（DI）」而量身打造的特化武器！

### 建構子類型
#### 服務型大樓（Service / Repository / Controller）➔ 🎯 100% 全面換成主要建構子
這類大樓（像是 EfQuoteRepository）一輩子只需要一種出生方式——就是把 DbContext 塞進去。它們肚子裡完全不需要寫 if 判斷，全心全意做依賴注入。這時候用主要建構子，程式碼精簡到像詩一樣。

++++++

#### 資料型大樓（Domain Entities / Models / DTO）➔ 🛡️ 保持傳統建構子
這類大樓（像是 Order、User）肚子裡裝的是商業靈魂，需要防禦欄位不能為 null、數字不能小於零、或者需要多種出生參數。這時候，老老實實用傳統寫法，才是最安全的防守。

========

### 主要建構子能夠完全建構子嗎?

>不行，主要建構子（Primary Constructor）絕對沒辦法「全面取代」原有的建構子寫法。

#### 限制一：它沒辦法單獨玩「多載（Overloading）」（多個建構子）
在物件導向的世界裡，我們常常需要一棟大樓有「多種不同的出生方式」。
例如：建立一個 Member（會員）物件，有時候我們需要傳入完整的資料；但有時候（像單元測試）我們只想建立一個空物件。

```csharp!
// 🟢 這是主要建構子（大房）
public class Member(string name, int age)
{
    public string Name { get; set; } = name;
    public int Age { get; set; } = age;

    // 🔴 驚悚點：你想寫一個「不用傳參數」的傳統建構子？
    // 你必須用 : this(...) 強制去呼叫主要建構子，幫它填預設值！不呼叫編譯器就直接把你開除！
    public Member() : this("神秘嘉賓", 18) 
    {
        // 這裡才能寫別的初始邏輯
    }
}
```

```csharp!
public class Symbol
{
    public string Code { get; set; }
    public string Name { get; set; }

    // 🚪 獨立大門 A：給證交所 API 用（天天正常出生）
    public Symbol(string code, string name)
    {
        this.Code = code;
        this.Name = name;
        Console.WriteLine("從網路 API 正常創建股票物件。");
    }

    // 🚪 獨立大門 B：給快取或測試用（從一段加密的 JSON 字串直接還原）
    // 💡 瞧！這兩個建構子各走各的路，誰也不用去呼叫誰，內部邏輯完全平行的！
    public Symbol(string encryptedJson)
    {
        var data = MyCryptoTool.DecryptAndParse(encryptedJson); // 解密大數據
        this.Code = data.Code;
        this.Name = data.Name;
        Console.WriteLine("從加密檔案秘密復活股票物件！");
    }
}
```

+++++++

#### ❌ 限制二：它沒有「肚子（Body）」可以寫複雜的防禦邏輯
傳統建構子最厲害的地方，是它自帶一個大括號 { ... } 的肉身肚子。我們可以在資料剛進大門、還沒塞給屬性之前，在肚子裡進行「安檢」或「大數據加工」。

主要建構子在 C# 12 裡是沒有肚子的！它只能做簡單的指派。

```csharp!
// 💻 傳統寫法：肚子裡可以翻江倒海
public class Order
{
    public decimal Price { get; private set; }

    public Order(decimal price)
    {
        // 🛡️ 防禦性程式碼：進門先安檢，不合格當場噴錯！
        if (price <= 0) 
            throw new ArgumentException("價格不能是搶劫價！");
            
        this.Price = price * 0.9m; // 順便打個九折
    }
}
```

--------

## 比較資料庫 EF Core 與 TypeOrm


### EF Core
> 約定優於配置




---------
