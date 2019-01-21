function calculateTip() {
    var billAmt = document.getElementById("billamt").value
    var serviceQual = document.getElementById("serviceQual").value
    var numOfPeople = document.getElementById("peopleamt").value

    if (billAmt === "" || serviceQual == 0) {
        alert("Please enter values")
        return
    }
    
    var total = (billAmt * serviceQual) / numOfPeople
    total = total.toFixed(2)
    document.getElementById("tip").innerHTML = total
}