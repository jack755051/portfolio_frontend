# CLAUDE.md

## 專案簡介
個人作品集網站(Nuxt 4 + Tailwind CSS v4 + shadcn-vue)。詳細架構見 [架構.md](./架構.md)。

## 設計 Token 慣例

定義於 `app/assets/css/main.css`,分兩層:

1. **色階層**(不隨 light/dark 變動,寫死在 `@theme inline`):
   - `primary-50 ~ primary-950`:品牌主色,indigo 色相(oklch hue ≈ 265~281)
   - `accent-50 ~ accent-950`:強調色,amber 色相(oklch hue ≈ 45~95),用於需要跟主色做對比的標籤/CTA
   - `gray-50 ~ gray-950`:中性灰階(neutral,chroma 0)
   - 三者皆可直接當 Tailwind utility 用,例如 `bg-primary-500`、`text-accent-700`、`border-gray-200`
   - 要換品牌色只需改這一段的數值,下面語意層會自動跟著變

2. **語意層**(`:root` / `.dark`,隨主題切換):`--primary`、`--secondary`、`--muted`、`--accent`、`--border`、`--ring` 等 shadcn 元件用的變數,皆從色階層取值(例如 `--primary: var(--color-primary-600)`),不再各自寫死 oklch 值。
   - 這裡的 `--accent`(語意值,shadcn 元件 hover 背景用)刻意維持中性灰,跟色階層的 `accent-*`(品牌強調色)是兩件事,不要混用。

- **互動狀態(hover/active)**:`--primary-hover`、`--primary-active`、`--secondary-hover`、`--secondary-active` 為獨立 token(從色階取值,例如 `--primary-hover: var(--color-primary-700)`),`app/components/ui/button/index.ts` 的 `default`/`secondary` variant 已接上這些 token(取代原本 shadcn 預設的透明度寫法 `hover:bg-primary/80`)。
- **disabled**:刻意維持 shadcn 全域寫法 `disabled:opacity-50`(同色降低不透明度,不換色),這是決定不是遺漏——disabled 不需要獨立色票。
- **圓角**:獨立量級、全 rem 寫死（`--radius` / `sm/md/lg/xl` 對應 10/6/8/10/14px @ 根 16px），不與字級耦合。另補 `--radius-none`(0)、`--radius-full`(9999px)。
- **文字階層**:用 `@utility` 定義成三個可直接套用的 class,不是文件裡的建議寫法:
  | class | 用途 | 等同 |
  |---|---|---|
  | `heading-1` | 主標 | `text-3xl font-bold` |
  | `heading-2` | 副標 | `text-xl font-semibold` |
  | `caption` | 小標/輔助文字 | `text-sm text-muted-foreground` |
- **色彩格式為 oklch**:採用 shadcn-vue 產生的預設格式,也是 Tailwind v4 內建色盤本身的格式——同一亮度數值在不同色相間感知亮度一致,適合做色階漸層。如需改用 hex,整批轉換即可,不影響架構。

字體沿用內建的 Geist,字級不另建自訂 CSS 變數,直接用 Tailwind 既有字級對應:

| 用途 | Tailwind class |
|---|---|
| 主標(H1) | `text-3xl font-bold` |
| 副標(H2) | `text-xl font-semibold` |
| 小標/輔助文字 | `text-sm text-muted-foreground` |

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
