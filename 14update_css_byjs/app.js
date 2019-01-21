//upload Image
var imageLoad = document.getElementById("upload")
function uploadImage(event) {
  var imageFile = event.target.files[0]
  var imageElement = document.getElementById("image")
  imageElement.setAttribute('src', URL.createObjectURL(imageFile))
}

imageLoad.onchange = uploadImage

//value uploader
var sliderSpacing = document.getElementById("spacing")
var outputSpacing = document.getElementById("val1")
outputSpacing.innerHTML = sliderSpacing.value
sliderSpacing.oninput = function () {
  outputSpacing.innerHTML = this.value
}

var sliderBlur = document.getElementById("blur")
var outputBlur = document.getElementById("val2")
outputBlur.innerHTML = sliderBlur.value
sliderBlur.oninput = function () {
  outputBlur.innerHTML = this.value
}

var color = document.getElementById("baseColor")
var outputColor = document.getElementById("val3")
outputColor.innerHTML = color.value
color.oninput = function () {
  outputColor.innerHTML = this.value
}

sliderSpacing.addEventListener("change", function () {
  var spc = this.value
  var imageE = document.getElementById("image")
  imageE.style.padding=`${spc}px`
})

sliderBlur.addEventListener("change", function () {
  // console.log(this.value)
  var blr = this.value
  var bgBlr = document.getElementById("image")
  bgBlr.style.filter = `blur(${blr}px)`
})

color.addEventListener("change", function () {
  var bg = this.value
  var cbgColor = document.getElementById("image")
  cbgColor.style.backgroundColor = bg
})