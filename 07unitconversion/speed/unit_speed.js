function doConvert() {
    var from = document.getElementById("speed_opt1").value
    var to = document.getElementById("speed_opt2").value
    var input = document.getElementById("input").value

    if (from === "mph") {
        if (to === "kmph") {
            var output = input * 1.609344
            document.getElementById("result").innerHTML = output
        }
        else if (to === "knots") {
            var output = input / 1.150779
            document.getElementById("result").innerHTML = output
        }
        else if (to === "mach") {
            var output = input / 761.207
            document.getElementById("result").innerHTML = output
        }
        else if (to === "mps") {
            var output = input * 0.44704
            document.getElementById("result").innerHTML = output
        }
        else {
            var output = input
            document.getElementById("result").innerHTML = output
        }
    }
    else if (from === "kmph") {
        if (to === "mph") {
            var output = input / 1.609344
            document.getElementById("result").innerHTML = output
        }
        else if (to === "knots") {
            var output = input / 1.852
            document.getElementById("result").innerHTML = output
        }
        else if (to === "mach") {
            var output = input / 1225.044
            document.getElementById("result").innerHTML = output
        }
        else if (to === "mps") {
            var output = input * 0.2777777778
            document.getElementById("result").innerHTML = output
        }
        else {
            var output = input
            document.getElementById("result").innerHTML = output
        }
    }
    else if (from === "knots") {
        if (to === "mph") {
            var output = input * 1.150779
            document.getElementById("result").innerHTML = output
        }
        else if (to === "kmph") {
            var output = input * 1.852
            document.getElementById("result").innerHTML = output
        }
        else if (to === "mach") {
            var output = input / 661.4708
            document.getElementById("result").innerHTML = output
        }
        else if (to === "mps") {
            var output = input * 0.5144444444
            document.getElementById("result").innerHTML = output
        }
        else {
            var output = input
            document.getElementById("result").innerHTML = output
        }
    }
    else if (from === "mach") {
        if (to === "mph") {
            var output = input * 761.207
            document.getElementById("result").innerHTML = output
        }
        else if (to === "kmph") {
            var output = input * 1225.044
            document.getElementById("result").innerHTML = output
        }
        else if (to === "knots") {
            var output = input * 661.4708
            document.getElementById("result").innerHTML = output
        }
        else if (to === "mps") {
            var output = input * 295.0464
            document.getElementById("result").innerHTML = output
        }
        else {
            var output = input
            document.getElementById("result").innerHTML = output
        }
    }
    else if (from === "mps") {
        if (to === "mph") {
            var output = input * 2.2369362921
            document.getElementById("result").innerHTML = output
        }
        else if (to === "kmph") {
            var output = input * 3.6
            document.getElementById("result").innerHTML = output
        }
        else if (to === "knots") {
            var output = input * 1.9438444924
            document.getElementById("result").innerHTML = output
        }
        else if (to === "mach") {
            var output = input * 0.0033892974
            document.getElementById("result").innerHTML = output
        }
        else {
            var output = input
            document.getElementById("result").innerHTML = output
        }
    }
}