const express = require('express')
const app = express()

const hostname = '127.0.0.1'
const port = 3000

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.static('public'))


//home page
app.get('/', (req, res) => {
    const albums =[
        {name: 'high voltage', artist: 'ac/dc'},
        {name: 'danger days', artist: 'MCR'},
        {name: 'holy hell', artist: 'architects'}
    ]
    res.render('pages/index',  {
        allAlbums: albums
    })
})

//detail page
app.get('/mbid', function (req, res) {
    res.send('Detail!')
})

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})