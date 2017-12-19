const
  seconds2String = require('./helpers/seconds2String'),
  playlist = require('./YouTubeURLGenerator'),
  DataFetcher = require('./DataFetcher'),
  fetcher = new DataFetcher()

fetcher.get(playlist.url, () => {
  console.log('\n')
  console.log(`Total Duration => ${seconds2String(fetcher.totalDuration)}`)
  console.log('\n')
  console.log(`Number of Videos => ${fetcher.totalVideos}`)
  console.log('\n')
  console.log(`Average => ${seconds2String(fetcher.totalDuration / fetcher.totalVideos)}`)
  console.log('\n')
});
