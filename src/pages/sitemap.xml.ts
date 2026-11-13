import type {APIRoute} from 'astro';
import {getPublishedPosts} from '../lib/posts';
import {escapeXml as x} from '../lib/xml.mjs';
export const GET:APIRoute=async ({site})=>{
  const base=import.meta.env.BASE_URL;
  const paths=[base,`${base}about/`,`${base}projects/`,...(await getPublishedPosts()).map(post=>`${base}posts/${post.data.postId}/`)];
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(path=>`<url><loc>${x(new URL(path,site).href)}</loc></url>`).join('')}</urlset>`,{headers:{'Content-Type':'application/xml; charset=utf-8'}});
};
