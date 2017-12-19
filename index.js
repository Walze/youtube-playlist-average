// for testing purposes
// const hardCoded = require('./testIDs.hardcoded.temp')

const
  api_key = 'AIzaSyC9oEwzxO5OF5kKYmwryWyCVLIyU10tBBY',
  playlistID = 'UUdGpd0gNn38UKwoncZd9rmA',

  axios = require('axios'),

  chunk = require('./helpers/chunckArray'),
  duration2secs = require('./helpers/durationToSecs'),
  seconds2String = require('./helpers/seconds2String'),

  YTURL = require('./YTUrlGen'),
  playlist = new YTURL(api_key, playlistID)


let IDs = []

function get(url, endGet) {
  console.log('Loading...')

  axios.get(url)
    .then(res => {
      res.data.items.map(i => IDs.push(i.contentDetails.videoId))
      if (res.data.hasOwnProperty('nextPageToken'))
        get(playlist.getNext(res.data.nextPageToken), endGet)
      else endGet()
    })
    .catch(err => console.error(err))
}


get(playlist.url, () => {
  const chunks = chunk(IDs, 50)

  let totalDuration = 0

  let counter = 1;

  (function () {
    return new Promise(next => {
      // Each chunk has 50 IDs
      chunks.map((chunk, ichunks) => {
        axios.get(playlist.getVideo(chunk.join(',')))
          .then(res => {
            // Gets 50 vids in response

            res.data.items.map((video, ivideos, videos) => {
              totalDuration += Number(duration2secs(video.contentDetails.duration))
              counter++

              if (counter >= IDs.length) next()

            })
          }).catch(err => console.log(err))
      })
    })
  })().then(() => {

    console.log('\n')
    console.log(`Total Duration: ${seconds2String(totalDuration)}`)
    console.log('\n')
    console.log(`Number of Videos: ${IDs.length}`)
    console.log('\n')
    console.log(`Average is ${seconds2String(totalDuration / IDs.length)}`)

  })
})


/*
// 
var date = new Date(null);
date.setSeconds(SECONDS); //specify value for SECONDS here
var result = date.toISOString().substr(11, 8);
*/