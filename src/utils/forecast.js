
const request = require('request')
const forecast = (address,callback)=>
{
  const url = 'http://api.weatherstack.com/current?access_key=5c080bd3a5e99992b2538dafe9366f12&query='+encodeURIComponent(address)
  request({url, json:true},(error,{body}) =>{
    if(error)
    callback('Unable to connect to weather services',undefined)
    else if(body.error)
    callback('unable to find the location',undefined)
    else
    callback(undefined,'temperture: '+body.current.temperature+' degree celcius\n humidity: ' +body.current.humidity)
  })
}
module.exports = forecast