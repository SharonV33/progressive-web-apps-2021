const staticCacheName = 'favouriteCache'
const section = document.querySelector('.favourite')

async function loadFavorites () {
    const cache = await caches.open(staticCacheName)
    const response = await cache.keys()

    if (response.length === 0) {
        section.innerHTML += '<p>You havent viewed any albums yet, go online and check some metalcore albums </p>'
        return;
    }

    response.forEach(album => {
        if (album.url.includes('mbid')) {
            const urlPart = album.url.split('/mbid/')

            section.innerHTML += `<a href="/mbid/${urlPart[1]}"><img src="${window.localStorage.getItem(urlPart[1])}"></a>`
        }
    })
}

loadFavorites()