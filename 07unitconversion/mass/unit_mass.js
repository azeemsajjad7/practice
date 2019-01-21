function doConvert() {
    var from = document.getElementById("mass_opt1").value
    var to = document.getElementById("mass_opt2").value
    var input = document.getElementById("input").value

    if (from === "kg") {
        if (to === "g") {
            output = input * 1000
            document.getElementById("result").innerHTML = output
        }
        else if (to === "ton") {
            output = input * 0.00110231
            document.getElementById("result").innerHTML = output
        }
        else if (to === "pound") {
            output = input * 2.20462
            document.getElementById("result").innerHTML = output
        }
        else if (to === "ounce") {
            output = input * 35.274
            document.getElementById("result").innerHTML = output
        }
        else {
            document.getElementById("result").innerHTML = input
        }
    }
    else if (from === "g") {
        if (to === "kg") {
            output = input * 0.001
            document.getElementById("result").innerHTML = output
        }
        else if (to === "ton") {
            output = input * 0.0000011023
            document.getElementById("result").innerHTML = output
        }
        else if (to === "pound") {
            output = input * 0.00220462
            document.getElementById("result").innerHTML = output
        }
        else if (to === "ounce") {
            output = input * 0.035274
            document.getElementById("result").innerHTML = output
        }
        else {
            document.getElementById("result").innerHTML = input
        }
    }
    else if (from === "ton") {
        if (to === "kg") {
            output = input * 907.18474
            document.getElementById("result").innerHTML = output
        }
        else if (to === "g") {
            output = input * 907184.74
            document.getElementById("result").innerHTML = output
        }
        else if (to === "pound") {
            output = input * 2000
            document.getElementById("result").innerHTML = output
        }
        else if (to === "ounce") {
            output = input * 32000
            document.getElementById("result").innerHTML = output
        }
        else {
            document.getElementById("result").innerHTML = input
        }
    }
    else if (from === "pound") {
        if (to === "kg") {
            output = input * 0.45359237
            document.getElementById("result").innerHTML = output
        }
        else if (to === "g") {
            output = input * 453.59237
            document.getElementById("result").innerHTML = output
        }
        else if (to === "ton") {
            output = input * 0.0005 
            document.getElementById("result").innerHTML = output
        }
        else if (to === "ounce") {
            output = input * 16
            document.getElementById("result").innerHTML = output
        }
        else {
            document.getElementById("result").innerHTML = input
        }
    }
    else if (from === "ounce") {
        if (to === "kg") {
            output = input * 0.0283495231
            document.getElementById("result").innerHTML = output
        }
        else if (to === "g") {
            output = input * 28.349523125
            document.getElementById("result").innerHTML = output
        }
        else if (to === "ton") {
            output = input * 0.00003125
            document.getElementById("result").innerHTML = output
        }
        else if (to === "pound") {
            output = input * 0.0625
            document.getElementById("result").innerHTML = output
        }
        else {
            document.getElementById("result").innerHTML = input
        }
    }
}