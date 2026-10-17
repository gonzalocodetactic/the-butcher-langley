'use client'

import { RefreshRouteOnSave } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'

type WebflowRuntime = {
  destroy: () => void
  ready: () => void
  require: (module: string) => { init?: () => void } | undefined
}

// Re-renders the page in the live preview iframe each time the draft autosaves.
// `markup` is the page's HTML: when a refresh replaces it, webflow.js is restarted so
// interactions, sliders and the menu bind to the new elements (and the preloader hides).
export function LivePreviewListener({ markup }: { markup: string }) {
  const router = useRouter()
  const first = useRef(true)

  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    const webflow = (window as unknown as { Webflow?: WebflowRuntime }).Webflow
    if (!webflow) return
    webflow.destroy()
    webflow.ready()
    webflow.require('ix2')?.init?.()
    // Page load interactions (the preloader) listen for this; the real load already happened.
    document.dispatchEvent(new CustomEvent('IX2_PAGE_UPDATE'))
  }, [markup])

  return (
    <RefreshRouteOnSave
      refresh={() => router.refresh()}
      serverURL={typeof window !== 'undefined' ? window.location.origin : ''}
    />
  )
}
