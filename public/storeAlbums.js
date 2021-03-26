const staticCacheName = 'favouriteCache'
const section = document.querySelector('.favourite')
caches.open(staticCacheName)
    .then(cache => {
        cache.keys()
            .then(response => {
                if (response.length === 0) {
                    section.innerHTML = '<p>You dont have any albums available</p>'
                }
                console.log(response)
                response.forEach(album => {
                    if (album.url.includes('mbid')) {
                        console.log(album)
                        const urlPart = album.url.split('/mbid/')
                        console.log(urlPart)
                        section.innerHTML += `<a href="${album.url}"> <img src="${window.localStorage.getItem(urlPart[1])}"> </a>`
                    }
                })

            })
    })

console.log('hoi')