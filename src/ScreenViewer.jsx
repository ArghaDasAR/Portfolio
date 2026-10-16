import { useState, useRef, useEffect } from 'react'

/**
 * ScreenViewer renders a Stitch-generated HTML file inside an iframe,
 * preserving the original UI/UX exactly as designed.
 * It auto-resizes the iframe to match the content height so the page
 * scrolls naturally without a nested scrollbar.
 */
export default function ScreenViewer({ src, title }) {
  const [loading, setLoading] = useState(true)
  const [iframeHeight, setIframeHeight] = useState('100vh')
  const iframeRef = useRef(null)

  useEffect(() => {
    // Reset loading state when src changes
    setLoading(true)
    setIframeHeight('100vh')
  }, [src])

  const handleLoad = () => {
    setLoading(false)

    // Try to auto-size the iframe to the content height
    try {
      const iframe = iframeRef.current
      if (iframe && iframe.contentDocument) {
        const body = iframe.contentDocument.body
        const html = iframe.contentDocument.documentElement
        if (body && html) {
          const height = Math.max(
            body.scrollHeight,
            body.offsetHeight,
            html.scrollHeight,
            html.offsetHeight
          )
          setIframeHeight(`${height}px`)
        }
      }
    } catch (e) {
      // Cross-origin — fall back to viewport height
      setIframeHeight('calc(100vh - 64px)')
    }
  }

  return (
    <>
      {loading && (
        <div className="screen-loader">
          <div className="screen-loader-spinner" />
          <span className="screen-loader-text">Loading {title}…</span>
        </div>
      )}
      <iframe
        ref={iframeRef}
        className="screen-iframe"
        src={src}
        title={title}
        onLoad={handleLoad}
        style={{
          height: iframeHeight,
          minHeight: loading ? 0 : 'calc(100vh - 64px)',
          opacity: loading ? 0 : 1,
          transition: 'opacity 0.3s ease',
        }}
      />
    </>
  )
}
