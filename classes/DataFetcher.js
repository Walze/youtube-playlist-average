const
	axios = require('axios'),
	duration2secs = require('./../helpers/durationToSecs'),
	seconds2String = require('./../helpers/seconds2String'),
	playlist = require('./YouTubeURLGenerator')

class DataFetcher {

	constructor() {
		this.totalVideos = 0
		this.totalDuration = 0
		this.startTime = false
		this.loadingString = 'Loading'
		this.videos = []
	}

	get(url, endGet) {
		if (!this.startTime) this.startTime = new Date()
		console.log(this.loadingString + ` ${this.totalVideos} fetched`)

		axios.get(url)
			.then(res => {
				const chunk = res.data.items.map(i => i.contentDetails.videoId)
				this.totalVideos += chunk.length

				axios.get(playlist.getVideo(chunk.join(',')))
					.then(res2 => {
						res2.data.items.map(video => {
							this.totalDuration += Number(duration2secs(video.contentDetails.duration))
							this.videos.push(video)
						})

						if (res.data.hasOwnProperty('nextPageToken'))
							this.get(playlist.getNext(res.data.nextPageToken), endGet)
						else
							endGet(this.videos)
					}).catch(err => console.log(err))
			}).catch(err => console.error(err))
	}

	timer(end) {
		var date1 = this.startTime
		var date2 = end
		if (date2 < date1) {
			date2.setDate(date2.getDate() + 1)
		}

		var diff = date2 - date1

		console.log(`Done in ${seconds2String(diff / 1000)}`)
		console.log('\n')
	}

}

module.exports = DataFetcher