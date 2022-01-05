
const request = require('request')


const geocode = (address,callback)=>{
    const geocodeURL = `http://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiemFjazk0IiwiYSI6ImNreGVramZhdzNxb2EydXBsdzI2Y2l6Z2EifQ.aLCleDO_HOOaiph7VfKejw&limit=1`
    
    request({url : geocodeURL, json:true}, (error, {body} ={} ) => { //{} is default value if no value added to the destructure property
        if(error){
            callback('Unable to connect to location server',undefined)
        }
        else if(body.features.length === 0) {
            callback('Unable to find location, try another search',undefined)
        }
        else {
            callback(undefined, {
                lon : body.features[0].center[0],
                lat : body.features[0].center[1],
                location : body.features[0].place_name
            })
        }
    })
}


module.exports = geocode







//const geocodeURL = 'http://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiemFjazk0IiwiYSI6ImNreGVramZhdzNxb2EydXBsdzI2Y2l6Z2EifQ.aLCleDO_HOOaiph7VfKejw&limit=1'
// request({url:geocodeURL,json:true},(error,respond)=>{
//     if(error){
//         console.log('Unable to connect to location services');
//     } else if(respond.body.features.length === 0 ) {
//         console.log('mapbox: Unable to find location. Try another search');
//     } else {
//         const lon = respond.body.features[0].center[0];
//         const lat = respond.body.features[0].center[1]
//         console.log(`lon is: ${lon}, and lat is: ${lat}`)
//     }
    
// })