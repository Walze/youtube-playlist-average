const
  seconds2String = require('./helpers/seconds2String'),
  playlist = require('./classes/YouTubeURLGenerator'),
  DataFetcher = require('./classes/DataFetcher'),
  fetcher = new DataFetcher(),
  JSF = require('jsonfile'),
  file = `./saved playlists/${playlist.playlist_id}.json`


fetcher.get(playlist.url, videos => {
  console.log(`\n Total Duration => ${seconds2String(fetcher.totalDuration)} \n`)
  console.log(`Number of Videos => ${fetcher.totalVideos} \n`)
  console.log(`Average => ${seconds2String(fetcher.totalDuration / fetcher.totalVideos)} \n`)

  fetcher.timer(new Date)

  JSF.readFile(file, (err, array) => {
    obj = { id: playlist.playlist_id, videos }
    index = array.findIndex(needle => needle.id == playlist.playlist_id)

    if (index >= 0) {
      array[index].push(obj)
      JSF.writeFile(file, array, err => console.error(err))
    } else {
      array.push(obj)
      JSF.writeFile(file, array, err => console.error(err))
    }
  })

  console.log('Press any key to exit...')
  process.stdin.setRawMode(true)
  process.stdin.resume()
  process.stdin.on('data', process.exit.bind(process, 0))
})
