//open weather
// https://api.openweathermap.org/data/2.5/weather?lat=26.846695&lon=80.946167&appid=f697ff730d3b1aaf2a71c70ea5795bbd
// const APPID = 'f697ff730d3b1aaf2a71c70ea5795bbd'

//dark sky
// const proxy = "https://cors-anywhere.herokuapp.com/"
// const api = `${proxy}https://api.darksky.net/forecast/2a03c0d59a47fb31e66e05813d6a81df/${currentLatitude},${currentLongitude}`


window.addEventListener('load', function () {
    //time
    const fullDate = new Date()
    var hour = fullDate.getHours()
    var min = fullDate.getMinutes()

    if (hour < 10) {
        hour = '0' + hour
    } else if (min < 10) {
        min = '0' + min
    }

    document.getElementById('hour').innerHTML = hour
    document.getElementById('minute').innerHTML = min
})



var search = document.getElementById('search')
var city = document.getElementById('city')
var currentLocation = document.getElementById('currentLocation')
var convertToC = document.getElementById('c')
var convertToF = document.getElementById('f')




// by city weather
search.addEventListener('click', function () {
    const location = city.value
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=f697ff730d3b1aaf2a71c70ea5795bbd`

    fetch(url)
        .then(function (responce) {
            return responce.json()
        })
        .then(function (data) {
            const { name } = data
            document.getElementById('location').innerHTML = name


            const { lat, lon } = data.coord
            document.getElementById('latitude').innerHTML = lat
            document.getElementById('longitude').innerHTML = lon


            const { country } = data.sys
            document.getElementById('country').innerHTML = ' , ' + country

            //darksky
            const proxy = "https://cors-anywhere.herokuapp.com/"
            const darkSkyAPI = `${proxy}https://api.darksky.net/forecast/2a03c0d59a47fb31e66e05813d6a81df/${lat},${lon}`

            fetch(darkSkyAPI)
                .then(function (responce) {
                    return responce.json()
                })
                .then(function (data) {
                    const { temperature, humidity, pressure, windSpeed, windGust, windBearing, cloudCover, dewPoint, uvIndex, visibility, ozone, summary, icon } = data.currently


                    document.getElementById('summary').innerHTML = summary
                    document.getElementById('temperature').innerHTML = temperature + ' F'
                    document.getElementById('humidity').innerHTML = (humidity * 100) + ' %'
                    document.getElementById('pressure').innerHTML = pressure + ' mBar'
                    document.getElementById('uvIndex').innerHTML = uvIndex
                    document.getElementById('visibility').innerHTML = visibility + ' Km'
                    document.getElementById('dew_point').innerHTML = dewPoint + ' C'

                    document.getElementById('windSpeed').innerHTML = windSpeed + ' km/h'
                    document.getElementById('windGust').innerHTML = windGust + ' m/h'
                    document.getElementById('windBearing').innerHTML = windBearing
                    document.getElementById('cloudCover').innerHTML = (cloudCover * 100) + ' %'
                    document.getElementById('ozone').innerHTML = ozone + ' Dobson'

                    const { temperatureHigh, temperatureLow } = data.daily.data[0]
                    document.getElementById('max-temperature').innerHTML = temperatureHigh + ' F'
                    document.getElementById('min-temperature').innerHTML = temperatureLow + ' F'

                    switch (icon) {
                        case "clear-day":
                            document.getElementById('image').setAttribute('src', 'clear-day.png')
                            break;
                        case "clear-night":
                            document.getElementById('image').setAttribute('src', 'clear-night.png')
                            break;
                        case "rain":
                            document.getElementById('image').setAttribute('src', 'rain.png')
                            break;
                        case "snow":
                            document.getElementById('image').setAttribute('src', 'snow.png')
                            break;
                        case "sleet":
                            document.getElementById('image').setAttribute('src', 'sleet.png')
                            break;
                        case "wind":
                            document.getElementById('image').setAttribute('src', 'wind.png')
                            break;
                        case "fog":
                            document.getElementById('image').setAttribute('src', 'fog.png')
                            break;
                        case "cloudy":
                            document.getElementById('image').setAttribute('src', 'cloudy.png')
                            break;
                        case "partly-cloudy-day":
                            document.getElementById('image').setAttribute('src', 'partly-cloudy-day.png')
                            break;
                        case "partly-cloudy-night":
                            document.getElementById('image').setAttribute('src', 'partly-cloudy-night.png')
                            break;
                        case "hail":
                            document.getElementById('image').setAttribute('src', 'hail.png')
                            break;
                        case "thunderstorm":
                            document.getElementById('image').setAttribute('src', 'thunderstorm.png')
                            break;
                        case "tornado":
                            document.getElementById('image').setAttribute('src', 'tornado.png')
                            break;

                    }

                    convertToC.addEventListener('click', function () {
                        var c = (temperature - 32) * (5 / 9)
                        var ch = (temperatureHigh - 32) * (5 / 9)
                        var cl = (temperatureLow - 32) * (5 / 9)

                        document.getElementById('temperature').innerHTML = c.toFixed(2) + ' C'
                        document.getElementById('max-temperature').innerHTML = ch.toFixed(2) + ' C'
                        document.getElementById('min-temperature').innerHTML = cl.toFixed(2) + ' C'

                    })
                    convertToF.addEventListener('click', function () {
                        document.getElementById('temperature').innerHTML = temperature + ' F'
                        document.getElementById('max-temperature').innerHTML = temperatureHigh + ' F'
                        document.getElementById('min-temperature').innerHTML = temperatureLow + ' F'
                    })
                })
        })
})


// by geo location weather
currentLocation.addEventListener('click', function () {



    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var latitude = position.coords.latitude
            var longitude = position.coords.longitude



            //darksky
            const proxy = "https://cors-anywhere.herokuapp.com/"
            const darkSkyAPI = `${proxy}https://api.darksky.net/forecast/2a03c0d59a47fb31e66e05813d6a81df/${latitude},${longitude}`

            fetch(darkSkyAPI)
                .then(function (responce) {
                    return responce.json()
                })
                .then(function (data) {
                    const { temperature, humidity, pressure, windSpeed, windGust, windBearing, cloudCover, uvIndex, icon, dewPoint, summary, visibility, ozone } = data.currently

                    console.log(icon)
                    document.getElementById('summary').innerHTML = summary
                    document.getElementById('temperature').innerHTML = temperature + ' F'
                    document.getElementById('humidity').innerHTML = (humidity * 100) + ' %'
                    document.getElementById('pressure').innerHTML = pressure + ' mBar'
                    document.getElementById('uvIndex').innerHTML = uvIndex
                    document.getElementById('visibility').innerHTML = visibility + ' Km'
                    document.getElementById('dew_point').innerHTML = dewPoint + ' C'

                    document.getElementById('windSpeed').innerHTML = windSpeed + ' km/h'
                    document.getElementById('windGust').innerHTML = windGust + ' m/h'
                    document.getElementById('windBearing').innerHTML = windBearing
                    document.getElementById('cloudCover').innerHTML = (cloudCover * 100) + ' %'
                    document.getElementById('ozone').innerHTML = ozone + ' Dobson'

                    const { temperatureHigh, temperatureLow } = data.daily.data[0]
                    document.getElementById('max-temperature').innerHTML = temperatureHigh + ' F'
                    document.getElementById('min-temperature').innerHTML = temperatureLow + ' F'


                    switch (icon) {
                        case "clear-day":
                            document.getElementById('image').setAttribute('src', 'clear-day.png')
                            break;
                        case "clear-night":
                            document.getElementById('image').setAttribute('src', 'clear-night.png')
                            break;
                        case "rain":
                            document.getElementById('image').setAttribute('src', 'rain.png')
                            break;
                        case "snow":
                            document.getElementById('image').setAttribute('src', 'snow.png')
                            break;
                        case "sleet":
                            document.getElementById('image').setAttribute('src', 'sleet.png')
                            break;
                        case "wind":
                            document.getElementById('image').setAttribute('src', 'wind.png')
                            break;
                        case "fog":
                            document.getElementById('image').setAttribute('src', 'fog.png')
                            break;
                        case "cloudy":
                            document.getElementById('image').setAttribute('src', 'cloudy.png')
                            break;
                        case "partly-cloudy-day":
                            document.getElementById('image').setAttribute('src', 'partly-cloudy-day.png')
                            break;
                        case "partly-cloudy-night":
                            document.getElementById('image').setAttribute('src', 'partly-cloudy-night.png')
                            break;
                        case "hail":
                            document.getElementById('image').setAttribute('src', 'hail.png')
                            break;
                        case "thunderstorm":
                            document.getElementById('image').setAttribute('src', 'thunderstorm.png')
                            break;
                        case "tornado":
                            document.getElementById('image').setAttribute('src', 'tornado.png')
                            break;

                    }

                    convertToC.addEventListener('click', function () {
                        var c = (temperature - 32) * (5 / 9)
                        var ch = (temperatureHigh - 32) * (5 / 9)
                        var cl = (temperatureLow - 32) * (5 / 9)

                        document.getElementById('temperature').innerHTML = c.toFixed(2) + ' C'
                        document.getElementById('max-temperature').innerHTML = ch.toFixed(2) + ' C'
                        document.getElementById('min-temperature').innerHTML = cl.toFixed(2) + ' C'

                    })
                    convertToF.addEventListener('click', function () {
                        document.getElementById('temperature').innerHTML = temperature + ' F'
                        document.getElementById('max-temperature').innerHTML = temperatureHigh + ' F'
                        document.getElementById('min-temperature').innerHTML = temperatureLow + ' F'
                    })
                })

            //openweather
            const currentLocationURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=f697ff730d3b1aaf2a71c70ea5795bbd`
            fetch(currentLocationURL)
                .then(function (responce) {
                    return responce.json()
                })
                .then(function (data) {
                    const { name } = data
                    document.getElementById('location').innerHTML = name
                    document.getElementById('city').setAttribute('placeholder', name)

                    document.getElementById('latitude').innerHTML = latitude.toFixed(2)
                    document.getElementById('longitude').innerHTML = longitude.toFixed(2)

                    const { country } = data.sys
                    document.getElementById('country').innerHTML = ' , ' + country
                })
        })
    }
})