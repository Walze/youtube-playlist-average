// for testing purposes
// const hardCoded = require('./testIDs.hardcoded.temp')

const
  seconds2String = require('./helpers/seconds2String'),
  playlist = require('./YTUrlGen'),
  DataFetcher = require('./DataFetcher'),
  fetcher = new DataFetcher()

fetcher.get(playlist.url, () => {
  console.log('\n')
  console.log(`Total Duration => ${seconds2String(fetcher.totalDuration)}`)
  console.log('\n')
  console.log(`Number of Videos => ${fetcher.totalVideos}`)
  console.log('\n')
  console.log(`Average => ${seconds2String(fetcher.totalDuration / fetcher.totalVideos)}`)
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
