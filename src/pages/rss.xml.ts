import type {APIRoute} from 'astro';
import {getPublishedPosts} from '../lib/posts';
import {site as settings} from '../config';
import {escapeXml as x} from '../lib/xml.mjs';
export const GET:APIRoute=async ({site})=>{
  const items=(await getPublishedPosts()).map(post=>{
    const url=new URL(`${import.meta.env.BASE_URL}posts/${post.data.postId}/`,site).href;
    return `<item><title>${x(post.data.title)}</title><description>${x(post.data.description)}</description><link>${x(url)}</link><guid isPermaLink="false">post:${x(post.data.postId)}</guid><pubDate>${post.data.date.toUTCString()}</pubDate></item>`;
  }).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${x(settings.title)}</title><description>${x(settings.description)}</description><link>${x(new URL(import.meta.env.BASE_URL,site).href)}</link><language>ko</language>${items}</channel></rss>`,{headers:{'Content-Type':'application/rss+xml; charset=utf-8'}});
};
