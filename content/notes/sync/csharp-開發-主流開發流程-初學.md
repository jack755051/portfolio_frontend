---
title: "主流開發流程(初學)"
description: "這是一份針對現代 C Web API 開發的標準流程指南。採用業界最主流的「由底而上 (Data-Driven)」開發模式，完美契合「關注點分離」原則。"
category: backend
date: 2026-08-09
tags: ["C#", "Practice"]
draft: false
sourcePath: "C#/開發/主流開發流程(初學).md"
---
# C# ASP.NET Core Web API 開發指南：Resource Hub

這是一份針對現代 C# Web API 開發的標準流程指南。採用業界最主流的「由底而上 (Data-Driven)」開發模式，完美契合「關注點分離」原則。

## 🛠️ 開發環境準備
* 安裝 **.NET 8.0 SDK** (或更新版本)
* 編輯器使用 **VS Code**，並安裝官方 **C# Dev Kit** 擴充套件
* 開啟終端機執行初始化指令：
  ```bash
  dotnet new webapi -n ResourceHub --use-controllers
  cd ResourceHub
  dotnet add package Microsoft.EntityFrameworkCore
  dotnet add package Microsoft.EntityFrameworkCore.InMemory
  ```

---

## 🚀 標準開發五步驟 (Bottom-Up)

### 步驟 1：定義資料模型 (Models)
**概念對應：** 類似 TypeScript 的 `interface`。
先確定資料長什麼樣子，建立藍圖。

**路徑：** `Models/Resource.cs`
```csharp
namespace ResourceHub.Models
{
    public class Resource
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Url { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
    }
}
```

### 步驟 2：建立資料庫上下文 (DbContext)
**概念對應：** 負責與資料庫溝通的服務層。
引入 Entity Framework Core，讓程式碼知道如何把物件轉成資料表。

**路徑：** `Data/AppDbContext.cs`
```csharp
using Microsoft.EntityFrameworkCore;
using ResourceHub.Models;

namespace ResourceHub.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Resource> Resources { get; set; }
    }
}
```

### 步驟 3：撰寫 API 控制器 (Controllers)
**概念對應：** 類似 Next.js 的 `route.ts` 或 NestJS 的 Controller。
開放 HTTP 接口，透過依賴注入呼叫資料庫，並回傳 JSON 結果。

**路徑：** `Controllers/ResourcesController.cs`
```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ResourceHub.Data;
using ResourceHub.Models;

namespace ResourceHub.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResourcesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ResourcesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Resource>>> GetResources()
        {
            return await _context.Resources.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Resource>> PostResource(Resource resource)
        {
            _context.Resources.Add(resource);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetResources), new { id = resource.Id }, resource);
        }
    }
}
```
*(備註：為保持版面簡潔，此處僅展示 GET 與 POST，實務上可補齊 PUT 與 DELETE)*

### 步驟 4：依賴注入與配置 (Program.cs)
**概念對應：** 類似 Angular 的 `app.config.ts` 總管中心。
將寫好的控制器與記憶體資料庫註冊到應用程式中。

**路徑：** `Program.cs`
```csharp
using Microsoft.EntityFrameworkCore;
using ResourceHub.Data;

var builder = WebApplication.CreateBuilder(args);

// --- 核心註冊區 ---
builder.Services.AddControllers(); 
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseInMemoryDatabase("ResourceDb"));
// ----------------

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapControllers(); 
app.Run();
```

### 步驟 5：啟動與驗證
完成所有配置後，啟動伺服器並使用內建的 Swagger UI 進行 API 測試。

在 VS Code 終端機執行：
```bash
dotnet run
```
**驗收：** 打開瀏覽器前往 `http://localhost:<你的Port>/swagger`，即可開始發送 API 請求！
