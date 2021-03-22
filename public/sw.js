const staticCacheName = 'site-static'
const assets = ['style.css', '/favourites']

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
self.addEventListener('fetch', (event) => {
    event.respondWith(
        //check if request already exists in cache, else fetch it
        caches.match(event.request)
            .then(cacheRes => {
                return cacheRes || fetch(event.request)
            })
            .catch((err) => {
                return caches.open(staticCacheName).then(cache => cache.match('/favourites'))
            })
    )
})