//AIzaSyCAN4NgVoggX58lAu_D10fRPL9wx3UuMXs

window.addEventListener("load", function () {
    let locality = document.querySelector(".location")
    let currentLongitude = document.querySelector(".longitude-val")
    let currentLatitude = document.querySelector(".latitude-val")
    let time = document.querySelector(".time")
    let temperature = document.querySelector(".temperature")
    let currentHumidity = document.querySelector(".humidity-val")
    let currentDewPoint = document.querySelector(".dew-point-val")
    let currentPressure = document.querySelector(".pressure-val")
    let currentUVIndex = document.querySelector(".uv-index-val")
    let currentVisibility = document.querySelector(".visibility-val")
    let currentSummary = document.querySelector(".discription")



    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            currentLongitude = position.coords.longitude
            currentLatitude = position.coords.latitude

            const proxy = "https://cors-anywhere.herokuapp.com/"
            const api = `${proxy}https://api.darksky.net/forecast/2a03c0d59a47fb31e66e05813d6a81df/${currentLatitude},${currentLongitude}`
            // const googleApi = `${proxy}http://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&sensor=false`
            const sunrise_sunsetApi = `https://api.sunrise-sunset.org/json?lat=${position.coords.latitude}&lng=${position.coords.longitude}`

            const locationUrl = "https://geoip-db.com/jsonp/"

            fetch(locationUrl)
            .then(function(responce){
                return responce.json
            })
            .then(function(data){
                console.log(data)
            })

            // fetch(googleApi)
            //     .then(function (responce) {
            //         return responce.json()
            //     })
            //     .then(function (data) {
            //         console.log(data)
            //     })

            fetch(sunrise_sunsetApi)
                .then(function (responce) {
                    return responce.json()
                })
                .then(function (data) {
                    console.log(data)
                    const { sunrise, sunset } = data.results
                    console.log(sunrise, sunset)
                })

            fetch(api)
                .then(function (responce) {
                    return responce.json()
                })
                .then(function (data) {
                    console.log(data)
                    //longitude and latitude
                    const { latitude, longitude } = data
                    console.log(latitude)
                    console.log(longitude)
                    currentLongitude.textContent = longitude
                    currentLatitude.textContent = latitude

                    //time
                    const fullDate = new Date()
                    var hours = fullDate.getHours()
                    var mins = fullDate.getMinutes()

                    if (hours < 10) {
                        hours = '0' + hours
                    } else if (mins < 10) {
                        mins = '0' + mins
                    }

                    var fullTime = hours + ':' + mins
                    time.textContent = fullTime

                    //temp , summary and icon
                    const { temperature, summary, icon, } = data.currently
                    currentSummary.textContent = summary
                    setIcon(icon, document.querySelector(".icon"))
                    // console.log(temperature)
                    // console.log(icon)

                    //current details
                    const { humidity, dewPoint, pressure, uvIndex, visibility } = data.currently
                    currentHumidity.textContent = humidity
                    currentDewPoint.textContent = dewPoint
                    currentPressure.textContent = pressure
                    currentUVIndex.textContent = uvIndex
                    currentVisibility.textContent = visibility
                })
        })
    }
    function setIcon(icon, iconID) {
        const skycons = new Skycons({ color: "white" })
        const currentIcon = icon.replace(/-/g, "_").toUpperCase()
        skycons.play()
        return skycons.set(iconID, Skycons[currentIcon])
    }
})