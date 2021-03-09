const express = require('express')
const request = require('request')
const app = express()

const hostname = '127.0.0.1'
const port = 3000

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.static('public'))

//home page
app.get('/', function(req, res) {
    request('https://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=metalcore&api_key=b0cbd53d2ea5b525c2a0447aa31fcd10&format=json', {json: true}, function (err, requestRes, body){
        if (err) {
            // We got an error
            res.send(err)
        } else {
            res.render('pages/index', {
                allAlbums: body.albums.album
            })
        }
    })
})

//detail page
app.get('/mbid/:id', function (req, res) {
    console.log(req.params.id)
    res.render('pages/album', {
        title: `Post ${req.params.id}`
    })
})



app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})

