var ul = document.getElementById("list")
var removeAll = document.getElementById("removeAll")
var add = document.getElementById("add")

add.onclick = function () {
    addLi(ul)
}

function addLi(targetUl) {
    var inputText = document.getElementById("text").value
    var li = document.createElement("li")
    var textNode = document.createTextNode(inputText + ' ')
    var check = document.createElement("input")
    check.type = "checkbox"
    check.classList.add("custom-checkbox")
    var editButton = document.createElement("button")
    editButton.classList.add("btn-primary")
    var removeButton = document.createElement("button")
    removeButton.classList.add("btn-warning")
    document.getElementById("text").value = ""

    if (inputText.length === 0) {
        alert("Please Enter something")
        return false
    }

    editButton.innerHTML = "Edit"
    removeButton.innerHTML = "Delete"

    li.appendChild(check)
    li.appendChild(textNode)
    li.appendChild(editButton)
    li.appendChild(removeButton)

    removeButton.setAttribute("onclick", "removeMe(this)")
    editButton.setAttribute("onclick", "editMe(this)")

    //problem
    targetUl.appendChild(li)
}

function removeMe(item) {
    var parent = item.parentElement
    parent.parentElement.removeChild(parent)
}

function editMe(item) {
    var parent = prompt("Please Enter New ToDos")
    parent.parentElement.parentNode = parent
}

removeAll.onclick = function () {
    ul.innerHTML = ""
}

