const staticCacheName = 'site-static'
const assets = ['/style.css', '/script.js', '/manifest.json', '/favourites', '/img/icons/icon-92x92.png', '/storeAlbums.js']

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

async function storeFavorite (event) {
    const cache = await caches.open('favouriteCache')
    const match = await cache.match(event.request)
    const response = await fetch(event.request)

    if (!match) {
        cache.delete(event.request)
        cache.put(event.request, response.clone())
    }

    return response
}

async function cachedResponse (event) {
    const cache = await caches.open(staticCacheName)
    const match = await cache.match(event.request)

    if (match) {
        console.log('I match!')
        return match
    }

    try {
        return await fetch(event.request)
    } catch (exception) {
        return cache.match('/favourites')
    }
}


self.addEventListener('fetch', (event) => {
    if (event.request.url.includes('mbid')) {
        return storeFavorite(event);
    } else {
        const response = cachedResponse(event)
        event.respondWith(response)
    }
})