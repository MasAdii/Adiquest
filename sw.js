const CACHE_NAME = 'adiquest-v1.4' 
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  '/images/icons/icon-192x192.png',
  '/images/icons/icon-512x512.png',
  '/audio/background-music.mp3',
  '/audio/click.wav',
  '/audio/hover.wav',
  '/audio/level-up.wav',
  '/audio/quest-complete.wav',
  '/audio/purchase.wav',
  '/audio/warp.wav',
  'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Exo+2:wght@400;700&family=Poppins:wght@300;400;600&display=swap',
]

self.addEventListener('install', event => {
  console.log('[Service Worker] Install event')
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching app shell')
        const requests = urlsToCache.map(url => {
          if (url.startsWith('http')) { 
            return new Request(url, { mode: 'no-cors' })
          }
          return new Request(url) 
        })
        return cache.addAll(requests)
      })
      .catch(err => {
        console.error('[Service Worker] Cache addAll failed:', err)
      })
  )
  self.skipWaiting()
})

self.addEventListener('activate', event => {
  console.log('[Service Worker] Activate event')
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Clearing old cache:', cache)
            return caches.delete(cache)
          }
        })
      )
    }).then(() => {
        console.log('[Service Worker] Claiming clients')
        return self.clients.claim()
    })
  )
})

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') {
    return
  }

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (response && response.ok) { 
            const responseToCache = response.clone()
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseToCache)
            })
          }
          return response
        })
        .catch(() => {
          return caches.match(event.request)
            .then(cachedResponse => {
              return cachedResponse || caches.match('/index.html') 
            })
        })
    )
  } else {
    event.respondWith(
      caches.match(event.request)
        .then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse 
          }
          return fetch(event.request).then(networkResponse => {
            if (networkResponse && networkResponse.ok) {
                const responseToCache = networkResponse.clone()
                caches.open(CACHE_NAME).then(cache => {
                    if (!event.request.url.startsWith('http') || urlsToCache.includes(event.request.url)) {
                         cache.put(event.request, responseToCache)
                    }
                })
            }
            return networkResponse
          })
        })
    )
  }
})