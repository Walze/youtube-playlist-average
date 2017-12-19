const
  seconds2String = require('./helpers/seconds2String'),
  playlist = require('./classes/YouTubeURLGenerator'),
  DataFetcher = require('./classes/DataFetcher'),
  fetcher = new DataFetcher()

fetcher.get(playlist.url, () => {
  console.log('\n')
  console.log(`Total Duration => ${seconds2String(fetcher.totalDuration)}`)
  console.log('\n')
  console.log(`Number of Videos => ${fetcher.totalVideos}`)
  console.log('\n')
  console.log(`Average => ${seconds2String(fetcher.totalDuration / fetcher.totalVideos)}`)
  console.log('\n')

  fetcher.timer(new Date)

  console.log('Press any key to exit...');

  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.on('data', process.exit.bind(process, 0));
});
