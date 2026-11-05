import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    notes: defineCollection({
      type: 'page',
      source: 'notes/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        category: z.enum(['frontend', 'backend', 'other']),
        date: z.string(),
        tags: z.array(z.string()).optional(),
        draft: z.boolean().default(false),
        sourcePath: z.string().optional(),
      }),
    }),
    // 檔案放 content/works/<locale>/<slug>.md；en 沒有就退回 zh-TW
    works: defineCollection({
      type: 'page',
      source: 'works/**/*.md',
      schema: z.object({
        title: z.string(),
        summary: z.string(),
        kind: z.enum(['side-project', 'work']),
        visibility: z.enum(['public', 'private']),
        status: z.enum(['live', 'wip', 'archived']),
        period: z.object({
          start: z.string(),
          end: z.string().optional(),
        }).optional(),
        role: z.array(z.string()).default([]),
        team: z.string().optional(),
        stack: z.array(z.string()).default([]),
        links: z.object({
          demo: z.string().url().optional(),
          repo: z.string().url().optional(),
          docs: z.string().url().optional(),
        }).default({}),
        cover: z.string().optional(),
        gallery: z.array(z.object({
          src: z.string(),
          alt: z.string(),
          caption: z.string().optional(),
        })).default([]),
        highlights: z.array(z.string()).max(3).default([]),
        order: z.number(),
        featured: z.boolean().default(false),
        draft: z.boolean().default(false),
      }),
    }),
  },
})
