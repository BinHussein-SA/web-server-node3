
//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const request = require("request")


const forecast = (lat,lon,callback)=>{
    const url = `http://api.weatherstack.com/current?access_key=6c50704d7818f2f7e21f7ce70ace6dd1&query=${lat},${lon}`

    request({url, json:true},(error,{body} = {} )=>{ //{} is default value if no value added to the destructure property
        if(error){
            callback('Unable to connect to weather server')
        }
        else if(body.error) {
            callback(body.error.info)
        }
        else {
            callback(undefined, body.current.weather_descriptions[0] + 
                ". It is currently " + body.current.temperature + 
                " degrees out. It feels like " + body.current.feelsLike + 
                " degrees out. The humidity is " + body.current.humidity + 
                "%."
                 )
             
        }
    })
}

module.exports = forecast

















// const url = 'http://api.weatherstack.com/current?access_key=a8ba0a19ef6911ef6e8694a2606dfa55&query='

// request({ url:url, json:true},(error,respond)=>{
//     if(error){
//         console.log('Unable to connect to the server');
//     } else if(respond.body.error) {
//         console.log('weatherSky: no matching result');
//         console.log(respond.body.error.info)
//     }
//     else {
//         const resCurrent = respond.body.current;
//         const weatherDes = resCurrent.weather_descriptions[0]
//         const temp = resCurrent.temperature
//         const feels = resCurrent.feelslike
//         console.log(`${weatherDes}. It is currently ${temp} degrees out. It feels like ${feels} degrees out.`);
//     }

// })