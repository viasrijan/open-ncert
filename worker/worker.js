/**
 * Cloudflare Worker — NCERT PDF CORS Proxy
 *
 * Usage:  https://<your-subdomain>.workers.dev/pdf/<PDFCODE>.pdf
 * Forwards to https://ncert.nic.in/textbook/pdf/<PDFCODE>.pdf
 * and returns the response with permissive CORS headers so browsers
 * (and PDF.js) can load the file directly.
 *
 * Range requests are forwarded untouched — required by PDF.js for paging.
 */

const NCERT_BASE = 'https://ncert.nic.in/textbook/pdf/'

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)

    // Only handle /pdf/... paths
    if (!url.pathname.startsWith('/pdf/')) {
      return new Response(
        'NCERT CORS Proxy. Use /pdf/<code>.pdf',
        { status: 200, headers: { 'content-type': 'text/plain' } }
      )
    }

    const file = url.pathname.slice('/pdf/'.length)
    // Basic guard: only allow safe filenames (letters, digits, dash)
    if (!/^[\w-]+\.pdf$/i.test(file)) {
      return new Response('Invalid filename', { status: 400 })
    }

    const target = NCERT_BASE + file

    // Forward the request (including Range header) to NCERT
    const upstream = await fetch(target, {
      headers: { Range: request.headers.get('Range') || '' },
      redirect: 'follow',
    })

    // Build response with CORS headers
    const headers = new Headers(upstream.headers)
    headers.set('Access-Control-Allow-Origin', '*')
    headers.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS')
    headers.set('Access-Control-Allow-Headers', 'Range, Content-Type')
    headers.set('Access-Control-Expose-Headers', 'Content-Range, Content-Length, Accept-Ranges')
    headers.set('Cache-Control', 'public, max-age=86400')

    return new Response(upstream.body, {
      status: upstream.status,
      headers,
    })
  },
}

// Handle CORS preflight
// (Cloudflare invokes the module handler above for all methods,
//  including OPTIONS, which is fine because we just echo CORS headers.)
