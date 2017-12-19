// for testing purposes
// const hardCoded = require('./testIDs.hardcoded.temp')

const
  { API_KEY } = require('./key.json'),
  playlistID = 'UUdGpd0gNn38UKwoncZd9rmA',

  axios = require('axios'),

  chunk = require('./helpers/chunckArray'),
  duration2secs = require('./helpers/durationToSecs'),
  seconds2String = require('./helpers/seconds2String'),

  YTURL = require('./YTUrlGen'),
  playlist = new YTURL(API_KEY, playlistID)


let totalVideos = 0

let totalDuration = 0

let counter = 1;

function get(url, endGet) {
  console.log('Loading...')

  axios.get(url)
    .then(res => {

      const chunk = res.data.items.map(i => i.contentDetails.videoId)
      totalVideos += chunk.length

      axios.get(playlist.getVideo(chunk.join(',')))
        .then(res2 => {
          res2.data.items.map(video => {
            totalDuration += Number(duration2secs(video.contentDetails.duration))
            counter++
          })
          if (res.data.hasOwnProperty('nextPageToken')) get(playlist.getNext(res.data.nextPageToken), endGet)
          else endGet()
        }).catch(err => console.log(err))

    }).catch(err => console.error(err))
}

get(playlist.url, () => {
  console.log('\n')
  console.log(`Total Duration => ${seconds2String(totalDuration)}`)
  console.log('\n')
  console.log(`Number of Videos => ${totalVideos}`)
  console.log('\n')
  console.log(`Average => ${seconds2String(totalDuration / (totalVideos))}`)
});

/*
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
    console.log(`Total Duration => ${seconds2String(totalDuration)}`)
    console.log('\n')
    console.log(`Number of Videos => ${IDs.length}`)
    console.log('\n')
    console.log(`Average => ${seconds2String(totalDuration / IDs.length)}`)

  })
})


/*
// 
var date = new Date(null);
date.setSeconds(SECONDS); //specify value for SECONDS here
var result = date.toISOString().substr(11, 8);
*/
