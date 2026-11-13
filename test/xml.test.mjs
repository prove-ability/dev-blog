import {test} from 'node:test';
import assert from 'node:assert/strict';
import {escapeXml} from '../src/lib/xml.mjs';
test('feed metadata cannot break XML when titles contain special characters',()=>assert.equal(escapeXml('AI & <code> "test" \'quote\''),'AI &amp; &lt;code&gt; &quot;test&quot; &apos;quote&apos;'));
