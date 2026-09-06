---
title: Vue 反應性基礎
description: 整理 ref、reactive 與依賴追蹤的核心觀念，方便之後回頭對照實務行為。
category: frontend
date: 2026-08-20
tags: [Vue, Reactivity]
draft: false
---

## 為什麼要懂反應性

Vue 的畫面更新建立在「讀取被追蹤、寫入觸發更新」。搞清楚這條路徑，比背 API 名稱更重要。

## `ref` 與 `reactive`

- `ref`：包一層 `.value`，適合基本型別與需要整包替換的值。
- `reactive`：對物件做 Proxy，適合結構穩定的狀態物件。

實務上元件內狀態多數用 `ref` 就夠；跨多欄位的表單模型再用 `reactive` 也行。

## 常見陷阱

1. 解構 `reactive` 物件會失去追蹤，需要 `toRefs`。
2. 在非同步 callback 裡讀寫仍要保持同一份來源。
3. 大物件全程 `reactive` 可能讓依賴圖難除錯，寧可拆小。

## 小結

先確認「誰在讀、誰在寫」，再選 `ref` / `reactive`。大部分 UI 狀態用 `ref` 起步最穩。
