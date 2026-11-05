---
title: Sanring 官網
summary: 監控工程品牌的 SSR 官網，搭配內容與詢價管理後台
kind: side-project
visibility: public
status: live
period:
  start: '2026-09'
role: [全端]
team: 個人
stack: [Angular SSR, .NET, PostgreSQL, Redis, Docker]
links:
  demo: https://www.sanring.com
cover: /works/sanring-tech-site/cover.png
highlights:
  - Angular SSR 官網與後台同一個 monorepo，一個 SSR 映像依網域服務兩個品牌
  - .NET Web API 採 Clean Architecture，公開 API 與後台 API 分流
  - CI 含單元測試、相依套件弱點檢查、OWASP ZAP 掃描與 Playwright E2E
order: 5
featured: true
---

## 背景與目標

監控工程品牌的官方網站，目標是建立潛在客戶的信任，並把流量導向「預約場勘／工程諮詢」表單。後台讓非工程人員自行維護產品、內容與活動。

## 核心功能

**官網**

- 產品、解決方案、最新消息，SSR 輸出利於 SEO
- 聯絡／詢價表單
- 即時影像展示頁，作為施工實績的佐證

**後台**

- 產品型錄：規格範本、匯出匯入
- 詢價收件匣：來源標記與分類
- 首頁季節活動排程，以時間軸檢視
- 提案審核流程：版本快照、刪除回收區、操作紀錄、系統備份
- 提案文件 PDF 產生

## 技術架構

- **前端**：pnpm monorepo，含官網、後台、共用三個 Angular 專案；TanStack Query、Signals、Tailwind CSS、[Sanring UI](/works/ui-sanring)
- **後端**：.NET Web API（Domain／Application／Infrastructure／Api 分層），`/api/public` 匿名存取、`/api/admin` 需登入
- **資料**：PostgreSQL（EF Core）、Redis；檔案存物件儲存，郵件走 HTTPS API
- **登入**：後台改接 [Sanring SSO](/works/sanring-sso)，寫入權限需 MFA，權限採動態 RBAC
- **部署**：Docker Compose 部署於單台 VPS，經 Cloudflare Tunnel 對外

## 挑戰與解法

- **主機商封鎖 SMTP**：VPS 無法直接寄信，改以 HTTPS 寄信 API 發送通知。
- **帳號系統外移**：把網站自有的帳號表遷移到獨立的 SSO，完成後移除舊表，網站只保留授權邏輯。
