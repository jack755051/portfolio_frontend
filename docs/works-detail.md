# 作品詳情架構

> 狀態：已實作（2026-11-05）。目標是讓 `/works` 的卡片點進 `/works/[slug]` 看到完整介紹，並能收錄沒有公開網址的作品（後台、內部系統）。

## 1. 現況與問題

| 現況 | 問題 |
|---|---|
| 作品資料寫在 `app/utils/works.ts`，文字放在 i18n key | 只放得下標題＋一句簡介，無法寫長篇介紹 |
| 卡片直接外連到作品網址 | 看不到「我做了什麼、怎麼做的」，只能看到成品 |
| `href` 是必填 | 後台／內部系統沒有公開網址，放不進來 |
| 一個作品一張縮圖 | 無法展示多個畫面（例如 World Line 的地圖、衝突彈窗、事件時間軸） |

## 2. 作品通常怎麼被展示

作品集的詳情頁一般採 **case study（案例研究）** 寫法，讀者（面試官、技術主管）想在 30 秒內知道三件事：

1. **這是什麼**：解決什麼問題、給誰用
2. **你做了什麼**：角色、負責範圍、團隊規模
3. **做得怎麼樣**：技術難點怎麼解、成果

所以頁面分成「一眼看完的摘要」和「想深入再往下讀的內容」兩層。

## 3. 詳情頁版面

```
┌──────────────────────────────────────────────────────────┐
│ ← 返回作品列表                                            │
│                                                          │
│ [Side project] [上線中]                                   │
│ World Line                                               │
│ 以 GIS 與時間軸呈現世界歷史……（summary）                  │
│ [查看網站 ↗] [GitHub ↗]      ← 私有作品改顯示「內部系統」  │
├──────────────────────────────────────────────────────────┤
│  截圖輪播（cover＋gallery，附說明、縮圖列）                │
├───────────────────────────────────┬──────────────────────┤
│ ■ 重點（highlights，3 條）         │ 快速資訊（sticky）    │
│                                   │ 角色　前端／全端       │
│ ## 背景與目標                      │ 期間　2026-08 ～ 進行中│
│ ## 我的角色                        │ 團隊　個人             │
│ ## 核心功能（配圖）                │ 技術　Angular …        │
│ ## 技術架構（可放架構圖）          │                       │
│ ## 挑戰與解法                      │                       │
│ ## 成果與反思                      │                       │
├───────────────────────────────────┴──────────────────────┤
│ ← 上一個作品                                下一個作品 →  │
└──────────────────────────────────────────────────────────┘
```

手機版：快速資訊移到輪播下方，不 sticky。

### 各區塊要放什麼

| 區塊 | 必填 | 內容 | 來源 |
|---|---|---|---|
| 標頭 | ✅ | 標題、類型標籤、狀態、一句話簡介、連結按鈕 | frontmatter |
| 封面圖 | ✅ | 最能代表作品的一張圖（列表卡片縮圖，也是輪播第一張） | frontmatter `cover` |
| 重點 | ✅ | 3 條以內，每條一句話，給沒時間讀全文的人 | frontmatter `highlights` |
| 快速資訊 | ✅ | 角色、期間、團隊、技術棧 | frontmatter |
| 背景與目標 | ✅ | 為什麼做、解決什麼問題、目標使用者 | Markdown 內文 |
| 我的角色 | 團隊作品必填 | 負責範圍，跟團隊其他人的分工 | Markdown 內文 |
| 核心功能 | ✅ | 3～5 個功能，各配一張圖或一段說明 | Markdown 內文 |
| 技術架構 | 建議 | 系統組成、資料流、為什麼這樣選型 | Markdown 內文 |
| 挑戰與解法 | 建議 | 1～3 個具體難題與處理方式（最能看出功力的部分） | Markdown 內文 |
| 成果與反思 | 選填 | 數據、使用回饋、下次會怎麼改 | Markdown 內文 |
| 截圖 | 選填 | 其他畫面，附說明文字；接在封面後面放進頂部輪播 | frontmatter `gallery` |

內文用固定的 `##` 標題，方便日後自動產生目錄（TOC）；沒有內容的段落直接省略，不放空標題。

## 4. 作品分類：公開 vs 內部

這是收錄後台作品的關鍵。

| 欄位 | 值 | 影響 |
|---|---|---|
| `kind` | `side-project`（個人作品）／`work`（工作專案） | `/works` 最上層依此分兩個頁籤；`work` 的「我的角色」必填 |
| `visibility` | `public`（有公開網址）／`private`（內部系統、需登入、NDA） | `private` 不顯示外連按鈕，改顯示「內部系統，僅提供截圖」；截圖需自行去識別化 |
| `status` | `live`／`wip`（開發中）／`archived`（已下線） | 顯示狀態標籤；`archived` 的連結會隱藏 |

## 5. 資料模型

作品從 `app/utils/works.ts` 搬到 Nuxt Content，與筆記同一套機制（`架構.md` 原本就規劃 `content/works/*.md`）。

### 檔案位置

```
content/works/
├─ zh-TW/
│  ├─ world-line.md
│  ├─ ui-sanring.md
│  └─ …
└─ en/                  ← 選填；沒有英文版時退回顯示中文版
   └─ world-line.md

public/works/<slug>/
├─ cover.png            ← 封面＋列表縮圖（建議 16:10，寬 1500 左右，壓到 300KB 以下；沒有時顯示主色漸層）
├─ 01.png, 02.png …     ← 內文配圖與 gallery
```

### Frontmatter schema（`content.config.ts`）

```ts
works: defineCollection({
  type: 'page',
  source: 'works/**/*.md',
  schema: z.object({
    title: z.string(),
    summary: z.string(),                       // 卡片與標頭的一句話簡介
    kind: z.enum(['side-project', 'work']),
    visibility: z.enum(['public', 'private']),
    status: z.enum(['live', 'wip', 'archived']),
    period: z.object({
      start: z.string(),                       // 'YYYY-MM'
      end: z.string().optional(),              // 沒填 = 進行中
    }).optional(),
    role: z.array(z.string()).default([]),     // ['前端', '後端', 'UI 設計']
    team: z.string().optional(),               // '個人' / '3 人（前端 1、後端 2）'
    stack: z.array(z.string()).default([]),    // 卡片只顯示前 3 個
    links: z.object({
      demo: z.string().url().optional(),
      repo: z.string().url().optional(),
      docs: z.string().url().optional(),
    }).default({}),
    cover: z.string().optional(),
    gallery: z.array(z.object({
      src: z.string(),
      alt: z.string(),
      caption: z.string().optional(),
    })).default([]),
    highlights: z.array(z.string()).max(3).default([]),
    order: z.number(),                          // 列表排序，小的在前
    featured: z.boolean().default(false),       // 是否出現在首頁
    draft: z.boolean().default(false),
  }),
}),
```

### 範例：`content/works/zh-TW/world-line.md`

```md
---
title: World Line
summary: 以 GIS 與時間軸呈現世界歷史，比較同一時間點各政權的疆域與互動
kind: side-project
visibility: public
status: wip
period: { start: '2026-08' }
role: [全端]
team: 個人
stack: [Angular, ASP.NET, PostgreSQL, PMTiles]
links:
  demo: https://worldline.sanring.dev/?axis=sovereignty
  repo: https://github.com/jack755051/world_line
cover: /works/world-line/cover.png
gallery:
  - { src: /works/world-line/02.png, alt: 衝突彈窗, caption: 點選衝突圖示查看交戰雙方與史料出處 }
  - { src: /works/world-line/03.png, alt: 事件時間軸, caption: 政權事件依時間排列，標示查證狀態 }
highlights:
  - 1908–1945 全球主權疆域，可逐日切換
  - 每筆疆域變動附史料出處與查證狀態
  - 自架 PMTiles 圖磚＋ASP.NET API，部署在 VPS
order: 1
featured: true
---

## 背景與目標
…

## 核心功能
…
```

## 6. 路由與頁面

| 路由 | 檔案 | 說明 |
|---|---|---|
| `/works` | `app/pages/works/index.vue` | 列表；最上層分「個人作品／工作專案」頁籤，卡片連到詳情頁 |
| `/works/[slug]` | `app/pages/works/[slug].vue` | 詳情頁；找不到或 `draft: true` 回 404 |
| `/en/works/[slug]` | 同上 | 先找 `en/`，沒有就退回 `zh-TW/` 並顯示「此頁尚無英文版」 |

部署用 `pnpm generate`（靜態輸出），詳情頁靠列表卡片的連結被爬到並預先產生，不需另外列 prerender 路由。因此列表頁籤用 `force-mount` 把非作用中的頁籤也渲染出來（只用 CSS 隱藏），否則另一個頁籤的詳情頁不會被產生。

### 元件

```
app/components/works/
├─ Card.vue          已有；改連到詳情頁，資料來源改成 content
├─ Intro.vue         已有
├─ DetailHeader.vue  標題、標籤、簡介、連結按鈕（依 visibility/status 決定顯示）
├─ DetailFacts.vue   快速資訊側欄
├─ Gallery.vue       頂部截圖輪播（shadcn-vue Carousel／Embla）；點圖在新分頁開原圖
└─ Pager.vue         上一個／下一個作品
```

## 7. 遷移步驟

1. ✅ 新增 `works` collection 與 schema（`content.config.ts`）
2. ✅ 現有 7 個作品轉成 `content/works/zh-TW/*.md`（內容依各 repo 的 README、docs、ADR 整理），圖片搬到 `public/works/<slug>/`
3. ✅ 卡片與首頁精選改讀 content（`app/composables/useWorks.ts`），連到詳情頁；移除 `app/utils/works.ts`、`app/types/work.ts` 與 i18n 的作品文字
4. ✅ 詳情頁與元件
5. ⬜ 各作品補截圖（`gallery`）：已補 World Line、監控中台、SSO
6. ⬜ 視需要補英文版（`content/works/en/`）

## 8. 已決定

- **英文版內容**：先只寫中文；英文頁沒有對應檔案時退回中文，並在頁首提示。
- **後台作品截圖**：可以公開截圖，自行提供。
- **列表分類**：`/works` 最上層分「個人作品／工作專案」兩個頁籤。目前 7 個作品都歸個人作品，工作專案頁籤暫時是空的。
- **私有 repo 的內容**：不寫主機名稱、IP、埠號、金鑰處理方式、未結案的稽核發現與客戶名稱；資安設計只寫到協定層級（如 PKCE、Back-Channel Logout）。
