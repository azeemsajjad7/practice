// var image = null

// function upload() {
//     var fileinput = document.getElementById("finput")
//     image = new SimpleImage(fileinput)
//     var canvas = document.getElementById("can")
//     image.drawTo(canvas)
// }


// function doBW() {
//     for (var pixel of image.values()) {
//         var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
//         pixel.setRed(avg);
//         pixel.setGreen(avg);
//         pixel.setBlue(avg);
//     }
//     var canvas = document.getElementById("can");
//     image.drawTo(canvas);
// }

var loadImage = document.getElementById('finput')
    function loadInputHandler(event) {
        var imageFile = event.target.files[0]
        var imageElement = document.getElementById('image')
        imageElement.setAttribute('src', URL.createObjectURL(imageFile))
    }
    loadImage.onchange = loadInputHandler