---
title: Haul
summary: 跨平台桌面工具，替重度 AI CLI 使用者一次看完多帳號用量
kind: side-project
visibility: public
status: live
period:
  start: '2026-08'
  end: '2026-09'
role: [全端]
team: 個人
stack: [C#, .NET, Photino.NET, Angular, SQLite]
links:
  demo: https://haul.sanring.dev
  repo: https://github.com/sanringtech/haul
cover: /works/haul-sanring/cover.png
highlights:
  - 以單一介面接上 Claude、Codex、DeepSeek、Kimi、Grok、Cursor 等 7 種用量來源，單一來源失敗不影響其他
  - Claude、Codex 的用量數字與官方用量頁比對一致
  - 發布 Windows 單一 .exe、macOS .dmg 與 Homebrew cask；API key 存在系統鑰匙圈
order: 3
featured: true
---

## 背景與目標

同時使用多個 AI 服務、每個服務又有多個帳號時，要逐一登入才看得到各自的用量。Haul 把每個 AI 底下每個帳號的用量集中到同一個畫面。

## 核心功能

- **多帳號用量卡片**：5 小時／7 天用量百分比、重置時間，以及 DeepSeek、Kimi 的餘額
- **帳號切換**：擷取目前 CLI 的登入狀態，在多個帳號之間切換
- **本機用量帳本**：掃描近 30 天的 Claude／Codex 紀錄，依月／週／日與模型彙整
- **用量趨勢圖**：折線圖與環形儀表，手刻 SVG，不依賴圖表套件
- **匯出與常駐**：匯出 xlsx；Windows 支援系統匣常駐

## 技術架構

- **桌面殼層**：Photino.NET（原生 WebView），後端為 C# / .NET，介面為 Angular
- **前後端通訊**：透過 WebView 訊息溝通；發布時 Angular 打包後內嵌進執行檔，由本機 loopback 伺服器提供給 WebView
- **資料**：用量紀錄存在 SQLite，匯出用 ClosedXML
- **介紹頁**：放在同一個 repo，部署於 GitHub Pages

## 挑戰與解法

- **Windows 發布版黑畫面**：原因有二——WebView2 需要 STA 執行緒，以及 `file://` 的 CORS 擋掉 Angular 的 ES module。改為 `[STAThread]` 並以 loopback HTTP 伺服器提供前端檔案。
- **Windows 憑證管理員容量限制**：單筆上限 2560 bytes，帳號快照改為分段寫入。
- **從 Finder 開啟時找不到 CLI**：macOS 從 Finder 啟動的 App 只有精簡的 PATH，改用登入 shell 執行指令偵測。
