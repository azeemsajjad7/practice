function doPlus(){
    var n1=parseInt(document.getElementById("num1").value)
    var n2=parseInt(document.getElementById("num2").value)

    var total=n1+n2
    document.getElementById("tot").innerHTML = total
}

function doMinus(){
    var n1=document.getElementById("num1").value
    var n2=document.getElementById("num2").value

    var total=(n1-n2)
    document.getElementById("tot").innerHTML = total
}

function doMulti(){
    var n1=document.getElementById("num1").value
    var n2=document.getElementById("num2").value

    var total=(n1*n2)
    document.getElementById("tot").innerHTML = total
}

function doDivide(){
    var n1=document.getElementById("num1").value
    var n2=document.getElementById("num2").value

    var total=(n1/n2)
    total=total.toFixed(4)
    document.getElementById("tot").innerHTML = total
}