
module.exports = function secondsToString(seconds) {

  const numdays = Math.floor(seconds / 86400) ?
    Math.floor(seconds / 86400) + ' Days ' : ''

  const numhours = Math.floor((seconds % 86400) / 3600) ?
    Math.floor((seconds % 86400) / 3600) + ' Hours ' : ''

  const numminutes = Math.floor(((seconds % 86400) % 3600) / 60) ?
    Math.floor(((seconds % 86400) % 3600) / 60) + ' Minutes ' : ''

  const numseconds = ((seconds % 86400) % 3600) % 60 ?
    ((seconds % 86400) % 3600) % 60 + ' Seconds ' : ''


  return numdays + numhours + numminutes + numseconds
}