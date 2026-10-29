// Global Minds Academy — Service Worker v2
// Cache strategy:
//   - /api/*            → network-first, offline JSON response on failure
//   - Static assets     → cache-first with background revalidation
//   - Authenticated     → network-only (never cache /student, /teacher, /parent, /admin)
//   - Public HTML       → network-first, cache fallback, then offline.html

const CACHE_NAME = 'gma-v2';
const OFFLINE_PAGE = '/offline.html';
const STATIC_ASSETS = [
  '/',
  '/offline.html',
  '/login',
  '/register',
  '/courses',
  '/boards',
  '/entrance-exams',
  '/jee',
  '/neet',
  '/faq',
  '/about',
  '/contact',
];

// ── Install ──────────────────────────────────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch(() => {
        // Non-fatal: continue even if some pages can't be cached during install
      });
    })
  );
  // Skip waiting so updated SW activates immediately
  self.skipWaiting();
});

// ── Activate: clean up old caches ───────────────────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    )
  );
  self.clients.claim();
});

// ── Fetch ────────────────────────────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET and cross-origin requests
  if (request.method !== 'GET' || url.origin !== location.origin) return;

  // NEVER cache authenticated portal pages — always require network
  if (
    url.pathname.startsWith('/student') ||
    url.pathname.startsWith('/teacher') ||
    url.pathname.startsWith('/parent') ||
    url.pathname.startsWith('/admin')
  ) {
    event.respondWith(
      fetch(request).catch(() => caches.match(OFFLINE_PAGE))
    );
    return;
  }

  // API routes — network-first, return JSON error on failure
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request).catch(() =>
        new Response(JSON.stringify({ error: 'You are offline. Please check your internet connection.' }), {
          status: 503,
          headers: { 'Content-Type': 'application/json' },
        })
      )
    );
    return;
  }

  // Static assets (JS, CSS, images, fonts) — cache-first
  if (url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|webp|svg|woff2?|ttf|eot|ico)$/)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        const networkFetch = fetch(request).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        });
        return cached || networkFetch;
      })
    );
    return;
  }

  // All other GET requests (public HTML) — network-first, cache fallback, offline.html last resort
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      })
      .catch(() =>
        caches.match(request).then((cached) => cached || caches.match(OFFLINE_PAGE))
      )
  );
});
