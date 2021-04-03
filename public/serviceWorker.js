const staticCacheName = 'site-static'
const assets = ['/dist/style.css', '/dist/script.js', '/manifest.json', '/favourites', '/img/icons/icon-92x92.png', '/storeAlbums.js']

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
//big thanks to robin frugte for helping me with this part
self.addEventListener('fetch', (event) => {
    //if the url contains "/mbid/"
    if (event.request.url.includes('mbid')) {
        event.respondWith(
            //open favourites cache
            caches.open('favouriteCache')
                .then(cache => {
                    //match cache with current request to see if request already exists
                    return cache.match(event.request).then(
                        response => {
                            return fetch(event.request)
                                .then(res => {
                                    //place request in cache
                                    cache.put(event.request, res.clone())
                                    return res
                                })
                                //if request exists in cache, return item from the cache
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
                    //check if requests excists in cache
                    return cache.match(event.request).then(
                        response => {
                            //if it exists, load it from cache
                            if (response) {
                                return response
                            }
                            //else try to fetch the request
                            return fetch(event.request)
                                .then(res => {
                                    return res
                                })
                        }
                    //if the fetch fails (because of being offline) load recently viewed page
                    )
                    .catch((err) => {
                    return caches.open(staticCacheName).then(cache => cache.match('/favourites'))
                    })
                })
        )
    }
})