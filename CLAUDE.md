# CLAUDE.md

## 專案簡介
個人作品集網站(Nuxt 4 + Tailwind CSS v4 + shadcn-vue)。詳細架構見 [架構.md](./架構.md)。

## Commit 規範

格式:

```
[type]: 描述
```

- `type` 為小寫,從下列擇一:

  | type | 用途 |
  |---|---|
  | feat | 新功能 |
  | fix | 修正 bug |
  | docs | 文件(README、架構.md 等) |
  | style | 純樣式調整,不影響邏輯 |
  | refactor | 重構,不新增功能也不修 bug |
  | chore | 雜項、工具、設定、依賴管理 |
  | test | 測試相關 |
  | build | 建置流程、部署設定 |
  | perf | 效能優化 |

- 描述用繁體中文,簡短說明「做了什麼/為什麼」,不要條列改了哪些檔案。

範例:
```
[chore]: 初始化 Nuxt 專案，整合 Tailwind CSS 與 shadcn-vue
[feat]: 新增技能展示頁面
[fix]: 修正筆記列表分頁邏輯錯誤
```

若單次改動橫跨多個不相關目的,應拆成多個 commit,每個 commit 只做一件事。
