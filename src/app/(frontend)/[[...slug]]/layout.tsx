import type { Metadata } from 'next'
import React from 'react'

import { defaultScripts, WF_SITE_ID, wfPageFor } from '@/wf/pages'

// Root layout for the public site. It lives inside [[...slug]] so it knows the page path
// and can set the page's data-wf-page ID, which webflow.js uses to find its interactions.

export const metadata: Metadata = {
  icons: { icon: '/wf/images/favicon.png', apple: '/wf/images/webclip.png' },
}

const webfont = `WebFont.load({  google: {    families: ["Montserrat:100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic","Merriweather:300,300italic,400,400italic,700,700italic,900,900italic","Neuton:200,300,400,700,800","Playfair Display:400,500,600,700,800,900"]  }});`
const touch = `!function(o,c){var n=c.documentElement,t=" w-mod-";n.className+=t+"js",("ontouchstart"in o||o.DocumentTouch&&c instanceof DocumentTouch)&&(n.className+=t+"touch")}(window,document);`

// React does not run <script> tags it renders on the client, so the export's scripts are
// appended from the head with async=false: they download in parallel and run in order.
// The page's inline init script waits for the DOM, as it sat at the end of <body>.
const loader = (scripts: string[], init?: string) => `(function(){
  ${JSON.stringify(scripts)}.forEach(function(src){
    var s = document.createElement('script');
    s.src = src; s.async = false;
    if (src.indexOf('webfont') > -1) s.onload = function(){ ${webfont} };
    if (src.indexOf('jquery') > -1) { s.crossOrigin = 'anonymous'; s.integrity = 'sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0='; }
    document.head.appendChild(s);
  });
  var init = ${JSON.stringify(init ?? null)};
  if (!init) return;
  function add(){ var s = document.createElement('script'); s.src = init; s.async = false; document.head.appendChild(s); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', add); else add();
})();`

type Args = { children: React.ReactNode; params: Promise<{ slug?: string[] }> }

export default async function RootLayout({ children, params }: Args) {
  const path = '/' + ((await params).slug ?? []).join('/')
  const wf = wfPageFor(path)

  return (
    <html lang="en" data-wf-page={wf?.pageId} data-wf-site={WF_SITE_ID} suppressHydrationWarning>
      <head>
        <link href="/wf/css/normalize.css" rel="stylesheet" type="text/css" />
        <link href="/wf/css/webflow.css" rel="stylesheet" type="text/css" />
        <link href="/wf/css/the-butcher-langley.webflow.css" rel="stylesheet" type="text/css" />
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin="anonymous" />
        <script dangerouslySetInnerHTML={{ __html: touch }} />
        <link href="/wf/css/inline.css" rel="stylesheet" type="text/css" />
        <script
          dangerouslySetInnerHTML={{ __html: loader(wf?.scripts ?? defaultScripts, wf?.init) }}
        />
      </head>
      <body className="body" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
