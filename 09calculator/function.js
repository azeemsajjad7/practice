function insert(num) {
    document.form.textview.value += num
}

function doEqual() {
    var exp = document.form.textview.value
    if (exp) {
        document.form.textview.value = eval(exp)
    }
}

function doClear() {
    document.form.textview.value = ''
}

function doBack() {
    var exp = document.form.textview.value
    document.form.textview.value = exp.substring(0, exp.length - 1)
}