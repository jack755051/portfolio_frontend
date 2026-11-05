---
title: Sanring 監控中台
summary: 網站流量、VPS 服務健康度與告警通知的監控平台
kind: side-project
visibility: private
status: live
period:
  start: '2026-10'
role: [全端]
team: 個人
stack: [.NET, Angular, ECharts, PostgreSQL, Redis]
cover: /works/sanring-middle-platform/cover.png
gallery:
  - src: /works/sanring-middle-platform/01.png
    alt: 監控總覽
    caption: 網站、主機、服務的狀態統計，近 24 小時請求數與基準線比較，以及最近的狀態變化
  - src: /works/sanring-middle-platform/02.png
    alt: 網站流量明細
    caption: 單一網站的健康與攻擊判定、4xx/5xx 次數、回源時間與訪客國家分布
  - src: /works/sanring-middle-platform/03.png
    alt: 網站列表
    caption: 從 Cloudflare 收集流量的網站，依狀態篩選並顯示最後收集時間
highlights:
  - 每台 VPS 部署獨立的 C# agent 回報健康度，以唯讀方式讀取 Docker 狀態
  - 整合 Cloudflare 流量、外部可用性檢查與告警，集中在單一平台
  - 前端 API 型別由後端 OpenAPI 產生，契約測試防止前後端不一致
order: 7
featured: true
---

## 背景與目標

多個網站放在 Cloudflare 後面、Docker 服務分散在多台 VPS，沒有統一的地方看流量、健康度與告警。監控中台把這些集中起來：異常自動告警、自動產生月報，狀態紀錄以統一格式保存一年。

## 核心功能

- **主機與服務健康度**：依 agent 回報判定狀態等級；部署重啟有寬限期避免誤報，長時間未回報即標示離線
- **Cloudflare 流量**：定期擷取流量數據，偵測流量異常與攻擊，並產生月報
- **告警**：透過通知佇列寄送 email 並重試；維護時段與靜音設定最長 7 天
- **外部可用性檢查**：定期檢查 HTTP 狀態、轉址與 SSL 到期日，與 Cloudflare 狀態合併判斷
- **狀態紀錄**：單一格式、不可修改，依月分區保存

## 技術架構

- **後端**：.NET，分為 API、Agent、共用 DTO 三個專案，API 依功能分資料夾
- **前端**：Angular、Tailwind CSS、ECharts、[Sanring UI](/works/ui-sanring)
- **登入**：透過 [Sanring SSO](/works/sanring-sso) 以 OIDC 登入，後端作為 BFF；所有 API 檢查權限，寫入需 MFA；程式存取使用唯讀 token
- **測試**：Testcontainers 整合測試與 Playwright E2E
- **部署**：Docker Compose 部署於單台小型 VPS

## 挑戰與解法

- **1 GB 記憶體的 VPS**：只記錄狀態變化、資料降採樣，並為每個容器設定記憶體上限。
- **兩種狀態來源互相覆蓋**：Cloudflare 判定與外部檢查原本會互相覆寫，改為分開儲存、取較嚴重者顯示。
- **部署後使用者全被登出**：登入金鑰沒有持久化，改存到 volume。
