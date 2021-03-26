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
self.addEventListener('fetch', (event) => {
    if (event.request.url.includes('mbid')) {
        event.respondWith(
            //open cache
            caches.open('favouriteCache')
                .then(cache => {
                    //match cache with current request to see if request already excists
                    return cache.match(event.request).then(
                        response => {
                            return fetch(event.request)
                                .then(res => {
                                    cache.delete(event.request)
                                    cache.put(event.request, res.clone())
                                    return res
                                })
                            //if request exists in cache, return this
                                .catch(() => {
                                    if (response) {
                                        return response
                                    }
                                })
                        }
                    )
                })
        )
    }
    else {
        event.respondWith(
            //open cache
            caches.open(staticCacheName)
                .then(cache => {
                    //match cache with current request to see if request already exists
                    return cache.match(event.request).then(
                        response => {
                            if (response) {
                                return response
                            }
                            return fetch(event.request)
                                .then(res => {
                                    return res
                                })
                        }
                    ) .catch((err) => {
                        return caches.open(staticCacheName).then(cache => cache.match('/favourites'))
                    })
                })
        )
    }
})