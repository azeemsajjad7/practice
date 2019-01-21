function doSubmit() {
    var score = 0
    var noAns = 0
    var radios = document.getElementsByName('ques1');

    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {

            if (radios[i].value == 1) {
                var x = '1.Correct'
                document.getElementById("correctAnswer1").innerHTML = x
                score++
            }

            else if (radios[i].value == 2 || radios[i].value == 3 || radios[i].value == 4) {
                var x = '1.Wrong'
                document.getElementById("correctAnswer1").innerHTML = x

            }

        }
        else {
            var x = '1.No option selected'
            document.getElementById("correctAnswer1").innerHTML = x
            noAns++

        }
    }

    radios = document.getElementsByName('ques2');

    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {

            if (radios[i].value == 2) {
                var x = '2.Correct'
                document.getElementById("correctAnswer2").innerHTML = x
                score++
            }
            else if (radios[i].value == 1 || radios[i].value == 3 || radios[i].value == 4) {
                var x = '2.Wrong'
                document.getElementById("correctAnswer2").innerHTML = x

            }

        }
        else {
            var x = '2.No option selected'
            document.getElementById("correctAnswer1").innerHTML = x
            noAns++

        }
    }

    radios = document.getElementsByName('ques3');

    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {

            if (radios[i].value == 1) {
                var x = '3.Correct'
                document.getElementById("correctAnswer3").innerHTML = x
                score++
            }
            else if (radios[i].value == 2 || radios[i].value == 3 || radios[i].value == 4) {
                var x = '3.Wrong'
                document.getElementById("correctAnswer3").innerHTML = x
            }

        }
        else {
            var x = '3.No option selected'
            document.getElementById("correctAnswer1").innerHTML = x
            noAns++

        }
    }

    radios = document.getElementsByName('ques4');

    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {

            if (radios[i].value == 4) {
                var x = '4.Correct'
                document.getElementById("correctAnswer4").innerHTML = x
                score++
            }
            else if (radios[i].value == 1 || radios[i].value == 2 || radios[i].value == 3) {
                var x = '4.Wrong'
                document.getElementById("correctAnswer4").innerHTML = x

            }

        }

        else {
            var x = '4.No option selected'
            document.getElementById("correctAnswer1").innerHTML = x
            noAns++

        }
    }
    document.getElementById("notAns").innerHTML = noAns
    document.getElementById("userscore").innerHTML = score
}