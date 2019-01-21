var display = document.getElementById("screen")
var displayVal = ""
var operatedVal = 0
var lastOperator = ""

function parse(event) {
    // var val = event.target.value 
    var val = event.target.value
    switch (val) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            // displayVal = displayVal + (displayVal == '0' ? '' : val)
            displayVal = displayVal + (displayVal == '0' ? '' : val)
            display.value = (displayVal)
            break;
        case '+':
            operatedVal = parseFloat(displayVal)
            displayVal = ''
            lastOperator = '+'
            break;
        case '-':
            operatedVal = parseFloat(displayVal)
            displayVal = ''
            lastOperator = '-'
            break;
        case '*':
            operatedVal = parseFloat(displayVal)
            displayVal = ''
            lastOperator = '*'
            break;
        case '/':
            operatedVal = parseFloat(displayVal)
            displayVal = ''
            lastOperator = '/'
            break;
        case 'C':
            displayVal = ''
            display.value = ''
            break;
        case '=':
            switch (lastOperator) {
                case '+':
                    operatedVal = operatedVal + parseFloat(displayVal)
                    displayVal = ''
                    break;
                case '-':
                    operatedVal = operatedVal - parseFloat(displayVal)
                    break;
                case '*':
                    operatedVal = operatedVal * parseFloat(displayVal)
                    break;
                case '/':
                    operatedVal = operatedVal / parseFloat(displayVal)
                    break;
                case '=':
                    operatedVal = '0'
                    break;
            }

            displayVal = operatedVal
            display.value = displayVal

    }
}
var calcButtons = document.querySelectorAll(".calc-button")
for (let i = 0; i < calcButtons.length; i++) {
    calcButtons[i].onclick = parse
}
