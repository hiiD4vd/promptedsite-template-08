import { test, expect } from '@playwright/test';
import { scrollTimeline } from '../src/components/scrollTimeline';
test('timeline preserves section anchors through middle and footer',()=>{
 const anchors=[{position:3000,percentage:.1},{position:9000,percentage:.35},{position:11000,percentage:.406},{position:13000,percentage:.499}];
 expect(scrollTimeline(0,900,13000,anchors)).toBe(0);
 expect(scrollTimeline(8100,900,13000,anchors)).toBe(.35);
 expect(scrollTimeline(10100,900,13000,anchors)).toBe(.406);
 expect(scrollTimeline(12100,900,13000,anchors)).toBe(.499);
 expect(scrollTimeline(11500,900,13000,anchors)).toBeGreaterThan(.406);
 expect(scrollTimeline(11500,900,13000,anchors)).toBeLessThan(.499);
});
