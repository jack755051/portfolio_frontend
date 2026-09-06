---
title: "Program.cs"
description: "using Microsoft.EntityFrameworkCore;"
category: backend
date: 2026-08-10
tags: ["C#", "Practice"]
draft: false
sourcePath: "C#/開發/ResouceHub/Program.cs.md"
---
```csharp
using Microsoft.EntityFrameworkCore;
using ResourceHub.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseInMemoryDatabase("ResourceListDb"));
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
```

### `Microsoft.EntityFrameworkCore`與`ResourceHub.Data`

### `WebApplication.CreateBuilder(args);

> `WebApplication.CreateBuilder(args)` 就是整個 .NET 專案的「萬物本源」

- **讀取環境變數與設定檔：** 它會自動去抓取 `appsettings.json`（類似 Node.js 的 `.env`）裡面的設定。
- **設定基礎 Log 系統：** 讓你在終端機可以看到那些黃黃綠綠的系統提示文字。
- **建立依賴注入 (DI) 的大倉庫：** 也就是為後面的 `builder.Services` 準備好空間。
- **接收外部參數：** 括號裡的 `args` 就是終端機下指令時傳進來的參數（例如 `dotnet run --environment Production`），它會把這些參數吃進來。

### `builder.Services`

在 `builder.Build()` 執行之前，所有開頭為 `builder.Services.Add...` 的程式碼，都屬於「註冊服務 (Service Registration)」階段。

<!-- obsidian image: Pasted image 20260810215359.png -->

### `builder.Services.AddControllers();`

#### 1. 自動掃描並註冊所有的 Controller

- 當程式啟動執行到這一行時，系統會自動像雷達一樣掃描你整個專案
- 只要發現有任何類別繼承了 `ControllerBase`（例如你剛剛寫的 `ResourcesController`），就會把它註冊到系統的「依賴注入 (DI) 容器」裡，正式成為處理 HTTP 請求的合法窗口。你不需要像其他框架那樣，每寫一個 Controller 就手動去某個陣列裡加一筆。

#### 2. 啟用自動資料轉換 (Model Binding)
#### 3.專注於 API (不渲染 HTML 畫面)

- `AddControllersWithViews()`：這是給傳統 MVC 用的（後端要負責把資料塞進 HTML 模板裡吐給前端）。
- `AddRazorPages()`：這是給另一種後端渲染網頁用的。
- `AddControllers()`：這是**最輕量**的註冊方式。它明確告訴系統：「我這個專案是一個純粹的 Web API 後端，我只回傳 JSON 格式的資料，不處理任何 HTML 畫面。」

### `var app = builder.Build();`

> 這個才是真正的「成型」時刻。

當你把所有的 Controller、資料庫 (`AddDbContext`) 都丟進 `builder` 之後，一旦呼叫了 `.Build()`：

- 這個大倉庫就會被「鎖死」。
- 系統會把剛才註冊的所有東西打包，真正實例化出一個可以處理 HTTP 請求的 Web 伺服器物件 (`app`)。
- **注意：** 在 `.Build()` 執行之後，你就**再也不能**往 `builder.Services` 裡面加新東西了。
