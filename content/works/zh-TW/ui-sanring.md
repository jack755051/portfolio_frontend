---
title: Sanring UI
summary: 給 Angular 開發者的複製貼上式 headless 元件庫與 CLI
kind: side-project
visibility: public
status: live
period:
  start: '2026-06'
role: [前端, CLI 工具]
team: 個人
stack: [Angular, Tailwind CSS, TypeScript, pnpm monorepo, Playwright]
links:
  demo: https://ui.sanring.dev
  repo: https://github.com/sanringtech/ui
  docs: https://www.npmjs.com/package/@sanring/cli
cover: /works/ui-sanring/cover.png
highlights:
  - 50+ 個 headless 元件與 4 個頁面區塊（登入、後台框架、表格頁、組織圖）
  - CLI 內建 MCP server，讓 AI coding agent 直接查元件規格
  - CI 把打包後的 CLI 裝進全新 Angular 專案做 production build，並跑雙主題的無障礙與視覺回歸測試
order: 1
featured: true
---

## 背景與目標

傳統元件庫以 npm 套件發布，客製化時常卡在覆寫樣式。Sanring UI 改用「複製貼上」模式：CLI 把元件原始碼直接放進使用者的專案，程式碼歸使用者所有、可自由修改。

## 核心功能

- **安裝元件**：`sanring add` 自動解析元件之間的相依、peer 套件與共用工具
- **安全更新**：記錄每個檔案的內容雜湊，未修改的檔案靜默更新，改過的檔案先顯示 diff 再決定是否覆寫
- **多來源 registry**：可設定多個元件來源（`alias:component`、`github:owner/repo`），也能用 `sanring build` 產生自己的 registry
- **AI 整合**：`sanring mcp` 提供 MCP server，AI 助手可查詢元件規格與用法
- **文件站**：互動式主題產生器、一鍵開到 StackBlitz、深色模式

## 技術架構

- **專案結構**：pnpm monorepo，含 `apps/docs`（文件站）、`packages/ui`（元件原始碼）、`packages/cli`（發布到 npm 的 `@sanring/cli`）、`registry/`（CLI 下載的元件範本）
- **發布**：以 Changesets 管理版本，GitHub Actions 透過 OIDC trusted publishing 發布到 npm
- **文件站**：部署於 GitHub Pages
- **相依**：日期元件依賴同系列的 [Date Picker](/works/date-picker) 引擎

## 挑戰與解法

- **組織圖排版**：需要雙主管、跨層虛線、避開卡片的直角連線。實際打包比較 d3-hierarchy、dagre 等排版引擎後，選用 elkjs。
- **富文字編輯器**：考量 SSR 安全與既有 popover 的焦點行為，不用現成的 Angular 包裝套件，改以 Tiptap v3 自寫薄包裝。
- **多 registry 設計**：CLI 原本只支援單一來源，改為在設定檔記錄具名來源，並以 `alias:` 前綴指定元件出處。
