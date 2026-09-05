---
description: 依專案 commit 規範建立 git commit
---

依照 CLAUDE.md 的「Commit 規範」建立一個新的 git commit：

1. 執行 `git status` 與 `git diff`（含 staged 與 unstaged）確認目前變更內容。
2. 判斷這次變更最合適的 type（feat/fix/docs/style/refactor/chore/test/build/perf）。
3. 用繁體中文簡短描述這次變更的目的，不要條列改了哪些檔案。
4. commit message 格式固定為 `[type]: 描述`。
5. 用 `git add` 加入相關檔案（逐一列名，不要用 `git add -A` 或 `git add .`），確認沒有誤加密鑰或不相關檔案後再建立 commit。

如果這次改動橫跨多個不相關目的（例如同時有 feat 又有 fix），先跟我確認要不要拆成多個 commit，不要自己擅自合併成一個。
