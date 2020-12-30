const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZnVsbG1ldGFsNjQiLCJhIjoiY2tqMWkyZ291MnVtZzJ1bW0zaHRsYzNleSJ9.4kKwut1sh3K5L-CHUMIAww&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect location services', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find given location, please try with different search', undefined)
        } else {
            const data =
            {
                latitude: body.features[0].center[1],//sencond one in center is latitude
                longitude: body.features[0].center[0],//first one in center is longitude
                location: body.features[0].place_name
            }
            callback(undefined, data)
        }
    })
}

module.exports = geocode