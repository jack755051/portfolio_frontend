# Portfolio

個人作品集網站,展示前端技能、學經歷、作品,以及刷題與技術筆記等持續學習紀錄。

## 技術棧
- [Nuxt 3](https://nuxt.com/) + TypeScript
- Tailwind CSS
- shadcn-vue
- Nuxt Content(筆記與作品內容管理)

詳細架構規劃請見 [架構.md](./架構.md)。

## 開發

```bash
# 安裝套件
pnpm install

# 啟動開發伺服器
pnpm dev

# 建置
pnpm build

# 本機預覽建置結果
pnpm preview
```

## 筆記同步（Obsidian）

從 private vault [`obsidian_notes`](https://github.com/jack755051/obsidian_notes) 同步 `Vue/`、`C#/` 到 `content/notes/sync/`：

```bash
# 需已 gh auth login，且讀得到該 private repo
pnpm sync:notes
```

排程：GitHub Actions `.github/workflows/sync-obsidian-notes.yml` 每 3 天跑一次。  
請在 repo Secrets 設定 `OBSIDIAN_NOTES_TOKEN`（能讀 `obsidian_notes` 的 PAT；workflow 另需 write 本 repo 以 commit）。

## 刷題同步（Practice）

```bash
# 可選：LEETCODE_USERNAME=jack755051 LEETCODE_RECENT_LIMIT=20
pnpm sync:leetcode
```

寫入 `content/practice/leetcode.json`（解題統計 + 近期 AC，schema 含 `source`）。  
排程：`.github/workflows/sync-leetcode.yml` 每 3 天；可選 Variables `LEETCODE_USERNAME`。  
之後其他平台可同樣放到 `content/practice/<source>.json`。

> 未登入 GraphQL 只能拿到**近期 AC（約 20）**與公開統計；完整題單需之後再擴 session。

## 頁面
- `/` 首頁
- `/skills` 技能展示
- `/experience` 學經歷展示
- `/works` 作品展示
- `/practice` 刷題（共用卡片 + 難度 Tabs；目前資料來源為 LeetCode）
- `/notes` 筆記集合

## 相關連結
- [ui.sanring.dev](https://ui.sanring.dev/)
- [haul.sanring.dev](https://haul.sanring.dev/)
