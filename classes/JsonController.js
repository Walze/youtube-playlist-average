const JSF = require('jsonfile')


class JsonController {

  constructor(playlist) {
    this.playlist = playlist

  }

  checkCache(file) {
    file = JSF.readFileSync(file)

    if (!file) return false

    return file
  }

  save(videos) {
    JSF.readFile(file, (err, array) => {
      obj = { id: this.playlist.playlist_id, videos }
      index = array.findIndex(needle => needle.id == this.playlist.playlist_id)

      if (index >= 0) {
        array[index].push(obj)
        JSF.writeFile(file, array, err => console.error(err))
      } else {
        array.push(obj)
        JSF.writeFile(file, array, err => console.error(err))
      }
    })
  }
}

module.exports = JsonController