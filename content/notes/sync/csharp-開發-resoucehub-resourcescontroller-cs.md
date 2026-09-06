---
title: "ResourcesController.cs"
description: "using Microsoft.EntityFrameworkCore;"
category: backend
date: 2026-08-09
tags: ["C#", "Practice"]
draft: false
sourcePath: "C#/開發/ResouceHub/ResourcesController.cs.md"
---
```csharp
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using ResourceHub.Data;
using ResourceHub.Models;

namespace ResourceHub.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ResourcesController(AppDbContext context) : ControllerBase
    {

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Resource>>> GetResources()
        {
            return await context.Resources.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Resource>> PostResource(Resource resource)
        {

            // 2. 直接使用 context
            context.Resources.Add(resource);

            await context.SaveChangesAsync();

            return CreatedAtAction(
	            nameof(GetResources), 
	            new { id = resource.Id }, resource
	        );
        }
    }
}

```

### `[Route]` 與 `[ApiController]` 是什麼？

>在 C# 中稱為 **「特性 (Attribute)」**

對應到 JavaScript / TypeScript / Angular 的世界，它就完完全全是 **「裝飾器 (Decorator)」**（例如 Angular 的 `@Component` 或 NestJS 的 `@Controller`）。

做底層的自動化設定：
- **`[ApiController]`**：告訴 .NET 說「這是一個 API 控制器，不是用來回傳 HTML 網頁的」。加上它之後，.NET 會自動幫你做很多事，例如：當前端傳來的 JSON 格式不對時，它會自動攔截並回傳 HTTP 400 (Bad Request)，你連檢查的程式碼都不用寫。
    
- **`[Route("api/[controller]")]`**：設定這支 API 的網址路徑。裡面的 `[controller]` 是一個動態變數，.NET 會自動抓取這個類別的名稱（去掉 "Controller" 字尾）。因為你的類別叫 `ResourcesController`，所以這支 API 的路由就會自動變成 `api/Resources`。

### `ControllerBase` 與 `AspNetCore.Mvc`

- `ResourcesController : ControllerBase` 代表繼承。
- `ControllerBase` 是微軟寫好的基礎類別，裡面包含了所有寫 API 需要用到的工具。例如 
	- `CreatedAtAction()`
	- `Ok()`
	- `NotFound()`
	- `BadRequest()`

### `Task`

>C# 裡的 `Task`，完完全全就等於 JS 裡的 `Promise`

在 C# 裡只要你的方法使用了 `async`，它的回傳型別就必須是 `Task`。

- JS 的 `Promise<void>` 👉 C# 的 `Task`（沒有回傳值，只等它做完）
- JS 的 `Promise<T>` 👉 C# 的 `Task<T>`（有回傳值）

### `ActionResult` 

>HTTP 回應包裝盒

ASP.NET Core 提供的一個特殊型別，它允許這個方法**不只能回傳資料，還能回傳 HTTP 狀態碼**。

### `IEnumerable`

>可疊代的集合

在 C# 裡，只要看到大寫的 **`I`** 開頭，就代表它是一個 **介面 (Interface)**。`IEnumerable` 的意思是「這是一個可以被逐一讀取 (列舉/疊代) 的集合」。

**為什麼不用 List 或 Array？** 因為 `IEnumerable` 是一種「抽象」的保證。它告訴呼叫端：「我會給你一包 Resource，你可以用迴圈 (foreach) 把裡面的東西拿出來，但你不需要管我底層是用陣列還是清單實作的。」這種寫法在 C# 中被認為是耦合度最低、最優雅的標準寫法。
