import type {CollectionEntry} from 'astro:content';
export const seriesCatalog = {
  'youthfinlab-branding': {
    title: '유스핀랩 브랜딩과 운영을 만들어가는 기록',
    description: '인스타그램 콘텐츠 자동화부터 홈페이지까지, 같은 브랜드로 연결하며 내린 선택과 검증을 기록합니다.',
  },
  'sogonsoop-instagram': {
    title: '소곤숲 친구들의 인스타그램 그림책 만들기',
    description: '캐릭터와 그림체를 정하는 일부터 낭독 릴스와 승인 루틴을 운영하기까지의 기록입니다.',
  },
} as const;
export type SeriesId = keyof typeof seriesCatalog;
// Callers pass only getPublishedPosts() results: drafts and future posts stay private to the PR.
export function getSeriesPosts(posts: CollectionEntry<'posts'>[], id: SeriesId) {
  return posts.filter(post => post.data.series?.id === id)
    .sort((a,b) => a.data.series!.order - b.data.series!.order);
}
