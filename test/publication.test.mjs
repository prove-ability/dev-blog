import {test} from 'node:test';
import assert from 'node:assert/strict';
import {isPublished,commentKey} from '../src/lib/publication.mjs';
test('drafts and future posts stay private regardless of title',()=>{const now=new Date('2026-11-13');assert.equal(isPublished({status:'draft',date:'2020-01-01'},now),false);assert.equal(isPublished({status:'published',date:'2099-01-01'},now),false);assert.equal(isPublished({status:'published',date:'2020-01-01'},now),true)});
test('comment mapping uses stable post ID, not mutable title or URL',()=>assert.equal(commentKey('stable-id'),'post:stable-id'));
