const
  seconds2String = require('./helpers/seconds2String'),
  playlist = require('./classes/YouTubeURLGenerator'),
  DataFetcher = require('./classes/DataFetcher'),
  JsonController = require('./classes/JsonController'),
  fileHandler = new JsonController(playlist),
  fetcher = new DataFetcher(),
  file = `./saved playlists/${playlist.playlist_id}.json`,
  readline = require('readline'),
  rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

/*
const id_exists = fileHandler.checkCache(file)

if (id_exists) {
  rl.question('Playlist is already cached, would you like to show it? (Y/N)', (answer) => {

    if (answer.toLowerCase() == 'y') {
      // run yes
    } else {
      //run no
    }

    rl.close()
  })
}
*/

fetcher.get(playlist.url, videos => {
  console.log(`\n Total Duration => ${seconds2String(fetcher.totalDuration)} \n`)
  console.log(`Number of Videos => ${fetcher.totalVideos} \n`)
  console.log(`Average => ${seconds2String(fetcher.totalDuration / fetcher.totalVideos)} \n`)

  fetcher.timer(new Date)

  fileHandler.save(videos)

  console.log('\n Press any key to exit...')
  process.stdin.setRawMode(true)
  process.stdin.resume()
  process.stdin.on('data', process.exit.bind(process, 0))
})
