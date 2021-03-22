const staticCacheName = 'site-static'
const assets = ['style.css']

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
    // console.log('hoi' , event.request.url)
    console.log(event.request)
    if (event.request.url.includes('favourites') && event.request.method == 'GET') {
        console.log('in de if')
        event.respondWith(
            caches.open(staticCacheName)
                .then(cache => {
                    return caches.match(event.request).then(
                        response => {
                            if (response) {
                                return response
                            }
                            return fetch(event.request)
                                .then(res => {
                                    cache.put(event.request, res.clone())
                                    return res
                                })
                        }
                    )
                })
        )
    }
    else {
        event.respondWith(
            //check if request already exists in cache, else fetch it
            caches.match(event.request)
                .then(cacheRes => {
                    return cacheRes || fetch(event.request)
                })
                //iff the user is offline, show favourites list
                .catch((err) => {
                    return caches.open(staticCacheName).then(cache => cache.match('/favourites'))
                })
        )
    }
})