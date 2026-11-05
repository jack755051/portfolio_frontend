---
title: World Line
summary: 以 GIS 與時間軸呈現世界歷史，比較同一時間點各政權的疆域與互動
kind: side-project
visibility: public
status: wip
period:
  start: '2026-08'
role: [全端]
team: 個人
stack: [Angular, ASP.NET, PostgreSQL, PMTiles]
links:
  demo: https://worldline.sanring.dev/?axis=sovereignty
  repo: https://github.com/jack755051/world_line
cover: /works/world-line/cover.png
gallery:
  - src: /works/world-line/01.png
    alt: 主權圖層與政權資訊面板
    caption: 地圖顯示 1941 年的主權疆域，右側面板列出政權的國界期間、首都與史料出處
  - src: /works/world-line/02.png
    alt: 衝突彈窗
    caption: 點選衝突圖示，查看交戰雙方、開戰與停戰日期及查證狀態
  - src: /works/world-line/03.png
    alt: 政權事件時間軸
    caption: 政權相關事件依時間排列，以目前日期為分界
highlights:
  - 1908–1945 全球主權疆域，可沿時間軸逐日切換
  - 每筆疆域與事件標示史料出處與查證狀態
  - Angular 前端＋ASP.NET API＋自架 PMTiles 圖磚，Docker 部署於 VPS
order: 4
featured: true
---

## 背景與目標

以 GIS 與時間軸呈現世界歷史：在同一時間點比較多個政權的疆域、名稱與互動，並保留史觀差異、時間不確定性與史料修正歷程。

第一階段範圍為 1908-01-01～1945-09-30（一戰、戰間期、二戰），涵蓋全世界所有國家與殖民地。

## 核心功能

- **主權／實際控制雙圖層**：同一日期可切換「主權」與「實際控制」兩種視角
- **衝突**：地圖上標示交戰關係，點選可看交戰雙方與停戰／投降資訊
- **政權資訊面板**：首都、國界期間、起訖變動、領導人與生平、相關事件
- **時間軸**：拖曳或播放跳年掃描動畫，觀察疆域隨時間變化

## 技術架構

- **前端**：Angular
- **後端**：ASP.NET API、PostgreSQL
- **圖磚**：PMTiles，由 Martin 提供服務
- **部署**：Docker Compose 部署於 VPS，經 Cloudflare Tunnel 對外，nginx 負責 SPA、`/api` 與 `/tiles` 的轉發
