function doConvert() {
    var from = document.getElementById("temp_opt1").value
    var to = document.getElementById("temp_opt2").value
    var input = document.getElementById("input").value

    if (from === "k") {
        if (to === "c") {
            output = input - 273.15
            document.getElementById("result").innerHTML = output
        }
        else if (to === "f") {
            output = (input - 273.15) * (9 / 5) + 32
            document.getElementById("result").innerHTML = output
        }
        else if (to === "r") {
            output = input * 1.8
            document.getElementById("result").innerHTML = output
        }
        else if (to === "r2") {
            output = (input - 273.15) * 0.8
            document.getElementById("result").innerHTML = output
        }
        else {
            document.getElementById("result").innerHTML = input
        }
    }
    else if (from === "c") {
        if (to === "k") {
            output = input + 273.15
            document.getElementById("result").innerHTML = output
        }
        else if (to === "f") {
            output = (input * (9 / 5)) + 32
            document.getElementById("result").innerHTML = output
        }
        else if (to === "r") {
            output = (input * 1.8) + 491.67
            document.getElementById("result").innerHTML = output
        }
        else if (to === "r2") {
            output = input * 0.8
            document.getElementById("result").innerHTML = output
        }
        else {
            document.getElementById("result").innerHTML = input
        }
    }
    else if (from === "f") {
        if (to === "k") {
            output = ((input - 32) * (5 / 9)) + 273.15
            document.getElementById("result").innerHTML = output
        }
        else if (to === "c") {
            output = (input - 32) * (5 / 9)
            document.getElementById("result").innerHTML = output
        }
        else if (to === "r") {
            output = input + 459.67
            document.getElementById("result").innerHTML = output
        }
        else if (to === "r2") {
            output = (input - 32) * (4 / 9)
            document.getElementById("result").innerHTML = output
        }
        else {
            document.getElementById("result").innerHTML = input
        }
    }
    else if (from === "r") {
        if (to === "k") {
            output = input * (5 / 9)
            document.getElementById("result").innerHTML = output
        }
        else if (to === "c") {
            output = (input - 491.67) * (5 / 9)
            document.getElementById("result").innerHTML = output
        }
        else if (to === "f") {
            output = input - 459.67
            document.getElementById("result").innerHTML = output
        }
        else if (to === "r2") {
            output = (input - 491.67) * (4 / 9)
            document.getElementById("result").innerHTML = output
        }
        else {
            document.getElementById("result").innerHTML = input
        }
    }
    else if (from === "r2") {
        if (to === "k") {
            output = (input * 1.25) + 273.15
            document.getElementById("result").innerHTML = output
        }
        else if (to === "c") {
            output = input * 1.25
            document.getElementById("result").innerHTML = output
        }
        else if (to === "f") {
            output = (input * 2.25) + 32
            document.getElementById("result").innerHTML = output
        }
        else if (to === "r") {
            output = (input * 2.25) + 32 + 459.67
            document.getElementById("result").innerHTML = output
        }
        else {
            document.getElementById("result").innerHTML = input
        }
    }
}