import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
const evidence = z.object({
  problem: z.string().trim().min(1),
  ownership: z.string().trim().min(1),
  decisions: z.string().trim().min(1),
  validation: z.string().trim().min(1),
  limitations: z.string().trim().min(1),
  aiUse: z.string().trim().min(1),
  links: z.array(z.object({label:z.string().trim().min(1),url:z.url({protocol:/^https$/})})).min(1),
});
const posts = defineCollection({loader: glob({pattern: '**/*.md', base: './src/content/posts'}), schema: z.object({title:z.string(),description:z.string(),postId:z.string().regex(/^[a-z0-9-]+$/),date:z.coerce.date(),status:z.enum(['draft','published']).default('draft'),tags:z.array(z.string()).default([]),kind:z.enum(['note','project']).default('note'),featured:z.boolean().default(false),evidence:evidence.optional()}).superRefine((post,ctx)=>{
  if(post.kind==='project' && post.status==='published' && !post.evidence)ctx.addIssue({code:'custom',message:'공개 프로젝트에는 본인 기여·설계·검증·AI 활용·한계·근거 링크가 필요합니다.',path:['evidence']});
  if(post.featured && post.kind!=='project')ctx.addIssue({code:'custom',message:'대표 기록은 프로젝트에만 지정합니다.',path:['featured']});
})});
export const collections = {posts};
