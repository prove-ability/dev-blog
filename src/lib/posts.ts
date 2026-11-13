import {getCollection} from 'astro:content';
import {isPublished} from './publication.mjs';
export async function getPublishedPosts(){
  return (await getCollection('posts',({data})=>isPublished(data))).sort((a,b)=>b.data.date.valueOf()-a.data.date.valueOf());
}
