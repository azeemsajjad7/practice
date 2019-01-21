document.addEventListener('DOMContentLoaded', function () {

    var loadImage = document.getElementById('load')
    function loadInputHandler(event) {
        var imageFile = event.target.files[0]
        var imageElement = document.getElementById('image')
        imageElement.setAttribute('src', URL.createObjectURL(imageFile))
    }
    loadImage.onchange = loadInputHandler

    function changeSliderHandler(event) {
        Caman("#image", function renderCaman() {
            this.revert(false)
            this[event.target.name](event.target.value).render()
        })
    }

    var brightnessRange = document.getElementById("brightness")
    brightnessRange.onchange = changeSliderHandler

    var vibranceRange = document.getElementById("vibrance")
    vibranceRange.onchange = changeSliderHandler

    var hueRange = document.getElementById("hue")
    hueRange.onchange = changeSliderHandler

    var gammaRange = document.getElementById("gamma")
    gammaRange.onchange = changeSliderHandler

    // var ranges = document.querySelectorAll('input[type="range"]')

    // ranges.forEach(function (range) {
    //     range.onchange = changeSliderHandler
    // })


    var ranges = document.querySelectorAll('input[type="range"]')
    var resetButton = document.getElementById("reset")

    function resetButtonHandler(event) {
        ranges.forEach(function (range) {
            range.value = 0
        })
        Caman("#image", function () {
            this.revert(true)
        })
    }
    resetButton.onclick = resetButtonHandler

    function filterButtonHandler(event) {
        Caman("#image", function () {
            this.revert(false)
            this[event.target.id]().render()
        })
    }
    var filterButtons = document.querySelectorAll(".filter")
    filterButtons.forEach(function (filterButton) {
        filterButton.onclick = filterButtonHandler
    })

    var saveButton = document.getElementById("save")
    function saveButtonHandler(event) {
        Caman("#image", function () {
            this.render(function () {
                this.save('image.png')
            })
        })
    }
    saveButton.onclick = saveButtonHandler

}, false)