window.addEventListener("load", function () {
    let long
    let lat
    let temperatureDescription = document.querySelector(".temperature-discription")
    let temperatureDegree = document.querySelector(".temperature-degree")
    let locationTimezone = document.querySelector(".location-timezone")
    let temperatureSection = document.querySelector(".degree-section")
    const temperatureSpan = document.querySelector(".degree-section span")


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            long = position.coords.longitude
            lat = position.coords.latitude
            const proxy = "https://cors-anywhere.herokuapp.com/"
            const api = `${proxy}https://api.darksky.net/forecast/2a03c0d59a47fb31e66e05813d6a81df/${lat},${long}`


            fetch(api)
                .then(function (responce) {
                    return responce.json()
                })
                .then(function (data) {
                    const { temperature, summary, icon } = data.currently
                    temperatureDegree.textContent = temperature
                    temperatureDescription.textContent = summary
                    locationTimezone.textContent = data.timezone
                    let celsius = ((temperature - 32) * (5 / 9))
                    setIcon(icon, document.querySelector(".icon"))
                    temperatureSection.addEventListener("click", function () {
                        if (temperatureSpan.textContent === "F") {
                            temperatureDegree.textContent = celsius.toFixed(2)
                            temperatureSpan.textContent = "C"
                        } else {
                            temperatureSpan.textContent = "F"
                            temperatureDegree.textContent = temperature
                        }
                    })
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