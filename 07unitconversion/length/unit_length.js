function doConvert() {
    var from = document.getElementById("len_opt1").value
    var to = document.getElementById("len_opt2").value
    var input = document.getElementById("input").value

    if (from === "m") {
        if (to === "km") {
            var output = input * 0.001
            document.getElementById("result").innerHTML = output
        }
        else if (to === "mile") {
            var output = input * 0.0006213712
            document.getElementById("result").innerHTML = output
        }
        else if (to === "yd") {
            var output = input * 1.0936132983
            document.getElementById("result").innerHTML = output
        }
        else if (to === "ft") {
            var output = input * 3.280839895
            document.getElementById("result").innerHTML = output
        }
        else if (to === "in") {
            var output = input * 39.37007874
            document.getElementById("result").innerHTML = output
        }
        else if (to === "nm") {
            var output = input * 0.0001799856
            document.getElementById("result").innerHTML = output
        }
        else {
            document.getElementById("result").innerHTML = input
        }
    }
    else if (from === "km") {
        if (to === "m") {
            var output = input * 1000
            document.getElementById("result").innerHTML = output
        }
        else if (to === "mile") {
            var output = input * 0.6213711922
            document.getElementById("result").innerHTML = output
        }
        else if (to === "yd") {
            var output = input * 1093.6132983
            document.getElementById("result").innerHTML = output
        }
        else if (to === "ft") {
            var output = input * 3280.839895
            document.getElementById("result").innerHTML = output
        }
        else if (to === "in") {
            var output = input * 39370.07874
            document.getElementById("result").innerHTML = output
        }
        else if (to === "nm") {
            var output = input * 0.1799856012
            document.getElementById("result").innerHTML = output
        }
        else {
            document.getElementById("result").innerHTML = input
        }
    }
    else if (from === "mile") {
        if (to === "m") {
            var output = input * 1609.344
            document.getElementById("result").innerHTML = output
        }
        else if (to === "km") {
            var output = input * 1.609344
            document.getElementById("result").innerHTML = output
        }
        else if (to === "yd") {
            var output = input * 1760
            document.getElementById("result").innerHTML = output
        }
        else if (to === "ft") {
            var output = input * 5280
            document.getElementById("result").innerHTML = output
        }
        else if (to === "in") {
            var output = input * 63360
            document.getElementById("result").innerHTML = output
        }
        else if (to === "nm") {
            var output = input * 0.8689762419
            document.getElementById("result").innerHTML = output
        }
        else {
            document.getElementById("result").innerHTML = input
        }
    }
    else if (from === "yd") {
        if (to === "m") {
            var output = input * 0.9144
            document.getElementById("result").innerHTML = output
        }
        else if (to === "km") {
            var output = input * 0.0009144
            document.getElementById("result").innerHTML = output
        }
        else if (to === "mile") {
            var output = input * 0.0005681818
            document.getElementById("result").innerHTML = output
        }
        else if (to === "ft") {
            var output = input * 3
            document.getElementById("result").innerHTML = output
        }
        else if (to === "in") {
            var output = input * 36
            document.getElementById("result").innerHTML = output
        }
        else if (to === "nm") {
            var output = input * 0.0004937365
            document.getElementById("result").innerHTML = output
        }
        else {
            document.getElementById("result").innerHTML = input
        }
    }
    else if (from === "ft") {
        if (to === "m") {
            var output = input * 0.3048
            document.getElementById("result").innerHTML = output
        }
        else if (to === "km") {
            var output = input * 0.0003048
            document.getElementById("result").innerHTML = output
        }
        else if (to === "mile") {
            var output = input * 0.0001893939
            document.getElementById("result").innerHTML = output
        }
        else if (to === "yd") {
            var output = input * 0.3333333333
            document.getElementById("result").innerHTML = output
        }
        else if (to === "in") {
            var output = input * 12
            document.getElementById("result").innerHTML = output
        }
        else if (to === "nm") {
            var output = input * 0.0001645788
            document.getElementById("result").innerHTML = output
        }
        else {
            document.getElementById("result").innerHTML = input
        }
    }
    else if (from === "in") {
        if (to === "m") {
            var output = input * 0.0254
            document.getElementById("result").innerHTML = output
        }
        else if (to === "km") {
            var output = input * 0.0000254
            document.getElementById("result").innerHTML = output
        }
        else if (to === "mile") {
            var output = input * 0.0000157828
            document.getElementById("result").innerHTML = output
        }
        else if (to === "yd") {
            var output = input * 0.0277777778
            document.getElementById("result").innerHTML = output
        }
        else if (to === "ft") {
            var output = input * 0.0833333333
            document.getElementById("result").innerHTML = output
        }
        else if (to === "nm") {
            var output = input * 0.0000137149
            document.getElementById("result").innerHTML = output
        }
        else {
            document.getElementById("result").innerHTML = input
        }
    }
    else if (from === "nm") {
        if (to === "m") {
            var output = input * 1852
            document.getElementById("result").innerHTML = output
        }
        else if (to === "km") {
            var output = input * 1.852
            document.getElementById("result").innerHTML = output
        }
        else if (to === "mile") {
            var output = input * 1.150779448
            document.getElementById("result").innerHTML = output
        }
        else if (to === "yd") {
            var output = input * 2025.3718285
            document.getElementById("result").innerHTML = output
        }
        else if (to === "ft") {
            var output = input * 6076.1154856
            document.getElementById("result").innerHTML = output
        }
        else if (to === "in") {
            var output = input * 72913.385827
            document.getElementById("result").innerHTML = output
        }
        else {
            document.getElementById("result").innerHTML = input
        }
    }
}