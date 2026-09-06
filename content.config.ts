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
  },
})
