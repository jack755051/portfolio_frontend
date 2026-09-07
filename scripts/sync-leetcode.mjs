#!/usr/bin/env node
/**
 * 從 LeetCode 公開 GraphQL 同步刷題資料 → content/practice/leetcode.json
 *
 * 限制：未登入只能拿到「近期 AC」（約 20 筆）+ 解題統計。
 * 完整題單需 session cookie（之後可再擴）。
 *
 * 用法：
 *   LEETCODE_USERNAME=jack755051 node scripts/sync-leetcode.mjs
 *   pnpm sync:leetcode
 */

import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const OUT = join(ROOT, 'content/practice/leetcode.json')
const SOURCE = 'leetcode'

const USERNAME = process.env.LEETCODE_USERNAME?.trim() || 'jack755051'
const LIMIT = Number(process.env.LEETCODE_RECENT_LIMIT || 20)
const ENDPOINT = 'https://leetcode.com/graphql'
const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

async function gql(query, variables) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'user-agent': UA,
      referer: 'https://leetcode.com/',
    },
    body: JSON.stringify({ query, variables }),
  })
  if (!res.ok) {
    throw new Error(`LeetCode HTTP ${res.status}`)
  }
  const json = await res.json()
  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join('; '))
  }
  return json.data
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

function toDate(ts) {
  const n = Number(ts)
  if (!Number.isFinite(n) || n <= 0) return new Date().toISOString().slice(0, 10)
  return new Date(n * 1000).toISOString().slice(0, 10)
}

async function main() {
  console.log(`==> fetching LeetCode user: ${USERNAME}`)

  const progress = await gql(
    `query userSessionProgress($username: String!) {
      matchedUser(username: $username) {
        submitStats {
          acSubmissionNum { difficulty count submissions }
        }
      }
    }`,
    { username: USERNAME },
  )

  const matched = progress?.matchedUser
  if (!matched) {
    throw new Error(`User not found: ${USERNAME}`)
  }

  const ac = matched.submitStats.acSubmissionNum || []
  const pick = (d) => ac.find((x) => x.difficulty === d)?.count ?? 0
  const stats = {
    easy: pick('Easy'),
    medium: pick('Medium'),
    hard: pick('Hard'),
    total: pick('All'),
  }

  const recent = await gql(
    `query recentAcSubmissions($username: String!, $limit: Int!) {
      recentAcSubmissionList(username: $username, limit: $limit) {
        id
        title
        titleSlug
        timestamp
      }
    }`,
    { username: USERNAME, limit: LIMIT },
  )

  const list = recent?.recentAcSubmissionList || []
  console.log(`==> recent AC: ${list.length}, stats:`, stats)

  const problems = []
  for (const item of list) {
    await sleep(120)
    let difficulty = 'Easy'
    let tags = []
    let frontendId = item.id

    try {
      const q = await gql(
        `query question($titleSlug: String!) {
          question(titleSlug: $titleSlug) {
            difficulty
            questionFrontendId
            topicTags { name }
          }
        }`,
        { titleSlug: item.titleSlug },
      )
      difficulty = q?.question?.difficulty || difficulty
      frontendId = q?.question?.questionFrontendId || frontendId
      tags = (q?.question?.topicTags || []).map((t) => t.name).slice(0, 4)
    }
    catch (err) {
      console.warn(`  ! enrich failed for ${item.titleSlug}:`, err.message)
    }

    problems.push({
      source: SOURCE,
      id: String(frontendId),
      title: item.title,
      titleSlug: item.titleSlug,
      difficulty,
      date: toDate(item.timestamp),
      tags,
      url: `https://leetcode.com/problems/${item.titleSlug}/`,
    })
  }

  // de-dupe by titleSlug (keep newest first)
  const seen = new Set()
  const unique = []
  for (const p of problems) {
    if (seen.has(p.titleSlug)) continue
    seen.add(p.titleSlug)
    unique.push(p)
  }

  const data = {
    source: SOURCE,
    username: USERNAME,
    updatedAt: new Date().toISOString(),
    stats,
    problems: unique,
  }

  mkdirSync(dirname(OUT), { recursive: true })
  writeFileSync(OUT, `${JSON.stringify(data, null, 2)}\n`, 'utf8')
  console.log(`==> wrote ${unique.length} problems → content/practice/leetcode.json`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
