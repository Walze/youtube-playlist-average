const
	axios = require('axios'),
	duration2secs = require('./helpers/durationToSecs'),
	playlist = require('./YTUrlGen')

class DataFetcher {

	constructor() {
		this.totalVideos = 0
		this.totalDuration = 0
		this.counter = 1;
	}

	get(url, endGet) {
		console.log('Loading...')

		axios.get(url)
			.then(res => {

				const chunk = res.data.items.map(i => i.contentDetails.videoId)
				this.totalVideos += chunk.length

				axios.get(playlist.getVideo(chunk.join(',')))
					.then(res2 => {
						res2.data.items.map(video => {
							this.totalDuration += Number(duration2secs(video.contentDetails.duration))
							this.counter++
						})
						if (res.data.hasOwnProperty('nextPageToken')) this.get(playlist.getNext(res.data.nextPageToken), endGet)
						else endGet()
					}).catch(err => console.log(err))

			}).catch(err => console.error(err))
	}

}

module.exports = DataFetcher