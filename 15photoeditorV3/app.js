var imageUpload = document.getElementById("upload")
function uploadImage(event) {
    var imageFile = event.target.files[0]
    var imageElement = document.getElementById("image")
    imageElement.setAttribute('src', URL.createObjectURL(imageFile))
}
imageUpload.onchange = uploadImage

//Effects

var blur = document.getElementById("blur")
blur.addEventListener("click", function () {
    var image = document.getElementById("image")
    image.style.filter = "blur(1px)"
})

var dropshadow = document.getElementById("drop-shadow")
dropshadow.addEventListener("click", function () {
    var image = document.getElementById("image")
    image.style.filter = "drop-shadow(10px 10px 10px #000000)"
})

var grayscale = document.getElementById("grayscale")
grayscale.addEventListener("click", function () {
    var image = document.getElementById("image")
    image.style.filter = "grayscale(100%)"
})

var hue = document.getElementById("hue-rotate")
hue.addEventListener("click", function () {
    var image = document.getElementById("image")
    image.style.filter = "hue-rotate(90)"
})

var invert = document.getElementById("invert")
invert.addEventListener("click", function () {
    var image = document.getElementById("image")
    image.style.filter = "invert(100%)"
})

var opacity = document.getElementById("opacity")
opacity.addEventListener("click", function () {
    var image = document.getElementById("image")
    image.style.filter = "opacity(50%)"
})

var saturate = document.getElementById("saturate")
saturate.addEventListener("click", function () {
    var image = document.getElementById("image")
    image.style.filter = "saturate(50%)"
})

var sepia = document.getElementById("sepia")
sepia.addEventListener("click", function () {
    var image = document.getElementById("image")
    image.style.filter = "sepia(50%)"
})