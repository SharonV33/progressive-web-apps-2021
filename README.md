# Progressive Web Apps @cmda-minor-web · 20-21

[Live link](https://music-discovery-cmd.herokuapp.com/)

## about the app
This app will help you to discover new and awesome music in the best genre there is, metalcore. Browse through the 
latest and most popular albums there are and get inspired by new bands and albums. 

<img src="https://i.ibb.co/wWtcqp3/image.png" alt="Screenshot of the overview page of Music Discovery">

## Tabe of content
* [installing](#installing)
* [Usage and features](#usage-and-features)
* [last.fm api](#last.fm-api)

## installing
clone the repo
```
git clone https://github.com/SharonV33/web-app-from-scratch-2021
```
install dependencies
```
npm install
```
start the program
```
npm run start
```
or start the project in developer mode (with nodemon)
```
npm run dev
```
navigate to localhost in the browser
```
http://localhost:8080/
```


## Usage and features
<img src="https://i.ibb.co/wWtcqp3/image.png" alt="Screenshot of the overview page of Music Discovery" width="400">
Browse the most populair metalcore albums and get inspired to listen to new albums and artists

<img src="https://i.ibb.co/cCRkrxP/image.png" alt="Screenshot of download popup" width="400">
Since this website is a progressive web app, it can be downloaded both on a computer as on a mobile device.
This lets the user experience the website as if it is a native app.

<img src="https://i.ibb.co/PGqL4tZ/image.png" alt="Screenshot of recently viewed page" width="400">
Ever forget what that one album was called? you can look back at what albums you recently viewed to easily find
that one album back. These results are also available offline so you can look back whenever you want


## last.fm api
For this web app, I use data from the [last.FM api](https://www.last.fm/api). The documentation is very easy to follow
which was a great help when getting started. I already knew that I wanted to work with data about genre's and albums so
I was able to get started right away. last.fm has a variety of links described in their documentation about what link
you need to call in order to get data and what the data you will receive looks like. The link I decided to use was 
```
JSON: /2.0/?method=tag.gettopalbums&tag=disco&api_key=YOUR_API_KEY&format=json 
```
In order to use this link, you need to add an api key, this can be gained by creating an account. Passing a genre (or as the api calls it, tag)
with the url is required, I changed this to metalcore. The url can also be changed to set a limit of albums to be fetched, the
standard is 50 which I decided to keep for testing, this could easily be changed to a larger number for production
By using a XMLHttpRequest on the link, I was able to get the data quite easily. The data I recieved looked like this:

<img src="https://i.ibb.co/x3d6YrY/Screenshot-2021-02-05-at-10-27-03.png" width="500">

Each album has a name, a url to the related page on last.fm, a unique identifyer, information about the artist and 4 formats
of album art. This structure is repeated for each album, making it easy to create a template which I can fill with data.


MIT License
