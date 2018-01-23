const { API_KEY, PLAYLIST_ID } = require('./../key.json')

class YTURL {
    constructor(api_key, playlist_id) {
        this.playlist_id = playlist_id

        // Used to get all videos Ids
        this._url = `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&playlistId=${playlist_id}&key=${api_key}`
        // Used to get Duration of vids
        this._videoUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=REPLACE&key=${api_key}`
    }

    get url() {
        return this._url
    }

    getNext(key) {
        return `${this.url}&pageToken=${key}`
    }

    getVideo(id) {
        return this._videoUrl.replace('REPLACE', id)
    }
}

const playlist = new YTURL(API_KEY, PLAYLIST_ID)

module.exports = playlist