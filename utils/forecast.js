const request = require("request");

const forecast = (latitude,longitude,callback)=>{
    const url ='http://api.weatherstack.com/current?access_key=b9bafeb4e9b7874295abf48e8c5ea0b4&query='+latitude+','+longitude+'&units=m';
    request({url,json : true},(error,{body})=>{
            if(error){
            callback("unable to access weather services !",undefined);
        } else if(body.error){
            callback("unable to find the location",undefined);
        } else {
            callback(undefined,{
                description : body.current.weather_descriptions[0],
                temperature : body.current.temperature,
                feelslike : body.current.feelslike,
                weatherIcon : body.current.weather_icons[0]
            });
        }
    })
}

module.exports = forecast;