const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/9fc09672e7e6f663d9145b361753d110/' + lat + ',' + long +'?units=si';

    request({ url , json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect location services', undefined)
        } else if (body.error) {
            callback('Unable to find given location, please try with different search', undefined)
        } else {
            callback(undefined,`${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is ${body.currently.precipProbability}% rain chances`)
        }
    })
}
module.exports = forecast