---
title: Sanring Date Picker
summary: Angular 的 headless 日期選擇引擎與組合式元件套件
kind: side-project
visibility: public
status: live
period:
  start: '2026-07'
  end: '2026-07'
role: [前端]
team: 個人
stack: [Angular, date-fns, Angular CDK, Tailwind CSS, Vitest]
links:
  demo: https://date-picker.sanring.dev/
  repo: https://github.com/sanringtech/date-picker
  docs: https://www.npmjs.com/package/@sanring/date-picker
cover: /works/date-picker/cover.png
highlights:
  - 拆成 headless 引擎與組合式元件兩個 npm 套件，元件也支援 shadcn 式複製模式
  - 依 WAI-ARIA Date Picker Grid 實作完整鍵盤操作，支援日／月／季／年四種粒度
  - 先寫規格（憲法、PRD、ADR）再實作，第一個 commit 隔天即發布 v0.1.0
order: 2
featured: true
---

## 背景與目標

Angular Material、PrimeNG 等現成日期選擇器把外觀和邏輯綁在一起，版面不合用時只能和 CSS 覆寫奮戰。這個套件只負責「大腦」（狀態與互動邏輯），markup 與樣式完全交給使用者。

## 核心功能

- **日曆引擎**：單選、區間、多選，可設定不可選日期
- **粒度選擇**：月、季、年的選擇引擎
- **時間調整**：時、分調整引擎
- **組合式元件**：DatePicker、RangePicker、多選、粒度選擇、DateTime、DateTimeRange
- **多語系**：語系需明確注入，文件站提供中／英文

## 技術架構

- **引擎**：`@sanring/date-picker-core`，headless，不含任何 UI
- **元件**：`@sanring/date-picker`，以 Angular CDK Overlay 組合而成
- **文件站**：部署於 GitHub Pages，本身用 [Sanring UI](/works/ui-sanring) 的 CLI 安裝元件
- **發布**：以 Changesets 管理版本與發布

## 挑戰與解法

- **粒度選擇的架構**：月／季／年選擇獨立成 `GranularityPickerEngine`，並把與日曆共用的狀態機抽成參數化的純函式，避免兩套邏輯分歧。
- **時間調整放在哪一層**：最初把時間調整放進日曆引擎，同日改為獨立的 `TimeAdjustmentEngine`（輸入、輸出都是 Date），讓引擎層保持單一職責，跨層的串接交給元件層處理。
