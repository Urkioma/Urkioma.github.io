import { defineCollection, z } from "astro:content";

export const collections = {
  projects: defineCollection({
    schema: z.object({
      title: z.string(),
      description: z.string(),
      shortDescription: z.string(),
      preview: z.object({
        type: z.enum(["image", "video"]),
        url: z.string(),
      }),
      color: z.enum(["lavender", "rose", "mint", "peach"]),
      tech: z.array(
        z.object({
          name: z.string(),
          color: z.enum(["lavender", "mint", "rose", "peach"]),
        })
      ),
      githubUrl: z.string().url(),
      demoUrl: z.string().url().optional(),
      featured: z.boolean().default(false),
      order: z.number(), // ✅
    }),
  }),
};
