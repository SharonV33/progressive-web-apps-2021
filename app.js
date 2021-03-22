const express = require('express')
const request = require('request')
const compression = require('compression')

const app = express()

const port = 8080

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.static('public'))

app.use(compression())


//home page
app.get('/', function(req, res) {
    const genre = "metalcore"
    request(`https://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=${genre}&limit=100&api_key=b0cbd53d2ea5b525c2a0447aa31fcd10&format=json`, {json: true}, function (err, requestRes, body){
        if (err) {
            // We got an error
            res.send(err)
        } else {
            //clean data to remove albums without an album id
            const data = body.albums.album.filter((album) => album.mbid)
            //load home page with the data
            res.render('pages/index', {
                allAlbums: data
            })
        }
    })
})

//detail page
app.get('/mbid/:id', function (req, res) {
    request(`https://ws.audioscrobbler.com/2.0/?method=album.getinfo&mbid=${req.params.id}&api_key=b0cbd53d2ea5b525c2a0447aa31fcd10&format=json`, {json: true}, function (err, requestRes, body){
        if (err) {
            // We got an error
            res.send(err)
        } else {
            res.render('pages/album', {
                albumInfo: body.album,
                tracks: body.album.tracks.track
            })
        }
    })
})

app.get('/favourites', function(req, res) {
    //get cache items
    res.render('pages/favourites')
})

app.get('/mbid/:id/favourites', function (req, res) {
    //add item to cache
    //then show favourites
    res.render('pages/favourites', {

    })
})


//the "process.env.PORT" is specific for Heroku deployment
app.listen(process.env.PORT || port, () => {
    console.log(`Server running at http://localhost:${port}/`)
})

