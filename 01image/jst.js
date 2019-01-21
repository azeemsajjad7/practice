var loadImage = document.getElementById('finput')
function loadInputHandler(event) {
    var imageFile = event.target.files[0]
    var imageElement = document.getElementById('image')
    imageElement.setAttribute('src', URL.createObjectURL(imageFile))
}
loadImage.onchange = loadInputHandler


function doBW() {
    var bw = document.getElementById("image")
    image.style.filter = "grayscale(100%)"
}