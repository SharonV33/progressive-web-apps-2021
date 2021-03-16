const staticCacheName = 'site-static'
const assets = ['manifest.json', '/', 'style.css']

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(staticCacheName)
            .then(cache => cache.addAll(assets))
            .then(() => self.skipWaiting())
    )
})

// activate event
self.addEventListener('activate', (evt) => {

})

// fetch event
self.addEventListener('fetch', (evt) => {

})