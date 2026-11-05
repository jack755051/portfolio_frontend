---
title: Sanring SSO
summary: 各系統共用的自建 OIDC 統一登入與帳號權限服務
kind: side-project
visibility: private
status: live
period:
  start: '2026-10'
role: [全端]
team: 個人
stack: [.NET, OpenIddict, PostgreSQL, Redis, Angular]
cover: /works/sanring-sso/cover.png
gallery:
  - src: /works/sanring-sso/01.png
    alt: 統一登入頁
    caption: 中英雙語登入頁，支援帳號密碼與 Google 登入，並顯示即將前往的系統
  - src: /works/sanring-sso/02.png
    alt: 我的系統
    caption: 帳號中心列出可進入的系統與在各系統的角色
  - src: /works/sanring-sso/03.png
    alt: 安全性設定
    caption: 變更密碼、TOTP 雙重驗證與備用碼、Google 帳號綁定
  - src: /works/sanring-sso/04.png
    alt: 使用者管理
    caption: 使用者列表，依狀態篩選並顯示在各系統的角色
  - src: /works/sanring-sso/05.png
    alt: 組織架構圖
    caption: 部門、主管與成員的組織圖，可拖曳與縮放
highlights:
  - 以 OpenIddict 自建 IdP，並自行實作 OIDC Back-Channel Logout，登出與停權即時跨系統生效
  - 135 個測試涵蓋 50 種安全與流程情境
  - CI 含 .NET 安全分析、相依弱點掃描、secret 掃描、Semgrep、Trivy 與 OWASP ZAP
order: 6
featured: true
---

## 背景與目標

登入、帳號與角色原本寫在官網裡，獨立成 IdP 後，多個系統共用同一套帳號；新系統接入只需註冊，不用改程式或資料表。

## 核心功能

- **OIDC 登入**：Authorization Code + PKCE、refresh token 輪替；服務帳號使用 client credentials
- **即時跨系統登出**：登出只結束當前工作階段，停權則撤銷全部；通知失敗會排隊重送
- **依權限要求 MFA**：有編輯權限的使用者必須綁定 TOTP 並取得備用碼，唯讀使用者免綁
- **系統與權限註冊**：每個系統有自己的權限代碼與角色；使用者失去最後一個角色時自動停用
- **登入頁與帳號中心**：中英雙語登入頁、Google 登入，以及 Angular 帳號中心

## 技術架構

- **IdP**：單一專案同時提供 Razor 登入頁與 Angular 帳號中心
- **帳號模型**：OpenIddict 只負責協定層，帳號、角色與權限自行實作（ASP.NET Core Identity）
- **資料與部署**：PostgreSQL、Redis，Docker Compose 部署
- **已接入系統**：[監控中台](/works/sanring-middle-platform)、[官網後台](/works/sanring-tech-site)

## 挑戰與解法

- **自建還是採購 IdP**：評估後選擇自建，OpenIddict 處理協定細節，帳號與權限模型保留彈性。
- **OpenIddict 沒有 Back-Channel Logout**：依規格自行實作簽章的 logout token、失敗重送佇列，接收端檢查 token 識別碼防止重放。
- **CSP 擋住登入轉址**：加上 `form-action` 限制後，各系統的登入轉址被阻擋，改以中介頁轉址解決。
