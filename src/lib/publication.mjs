export function isPublished(post, now = new Date()) { return post.status === 'published' && new Date(post.date) <= now; }
export function commentKey(postId) { return `post:${postId}`; }
