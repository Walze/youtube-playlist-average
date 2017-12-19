// https://gist.github.com/jrtaylor-com/42883b0e28a45b8362e7

module.exports = function youtubeDurationToSeconds(duration) {
    var hours = 0;
    var minutes = 0;
    var seconds = 0;

    // Remove PT from string ref: https://developers.google.com/youtube/v3/docs/videos#contentDetails.duration
    duration = duration.replace('PT', '');

    // If the string contains hours parse it and remove it from our duration string
    if (duration.indexOf('H') > -1) {
        hours_split = duration.split('H');
        hours = parseInt(hours_split[0]);
        duration = hours_split[1];
    }

    // If the string contains minutes parse it and remove it from our duration string
    if (duration.indexOf('M') > -1) {
        minutes_split = duration.split('M');
        minutes = parseInt(minutes_split[0]);
        duration = minutes_split[1];
    }

    // If the string contains seconds parse it and remove it from our duration string
    if (duration.indexOf('S') > -1) {
        seconds_split = duration.split('S');
        seconds = parseInt(seconds_split[0]);
    }

    // Math the values to return seconds
    return (hours * 60 * 60) + (minutes * 60) + seconds;
}