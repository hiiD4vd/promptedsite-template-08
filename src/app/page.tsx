import React from 'react';
import fs from 'fs';
import path from 'path';

export default function Home() {
  const htmlPath = path.join(process.cwd(), 'public', 'peachweb.html');
  const html = fs.readFileSync(htmlPath, 'utf8');
  let bodyContent = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] || '';
  bodyContent = bodyContent.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  return (
    <main suppressHydrationWarning dangerouslySetInnerHTML={{ __html: bodyContent }} />
  );
}
