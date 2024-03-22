

let input = document.querySelector(".taskInput")
let button = document.querySelector(".taskAddButton")
let tasksContainer = document.querySelector(".tasksContainer");
let closingButton = document.createElement("button")
closingButton.id = "closingButton";
closingButton.innerHTML = "X";

let storedArray = JSON.parse(localStorage.getItem("tasksArray"))

function setTheStoredArray(){
    // For maintenance only
    localStorage.setItem("tasksArray" , JSON.stringify(storedArray))
    storedArray = JSON.parse(localStorage.getItem("tasksArray"));
}
// Starting point
button.addEventListener("click", function () {
    checkLocalStorage()
})


appendElementFromLocalStorage();

function checkLocalStorage() {
    if (localStorage.getItem("tasksArray")) {
        makeTask()
    } else {
        localStorage.setItem("tasksArray", JSON.stringify([]))
        storedArray = JSON.parse(localStorage.getItem("tasksArray"));
        makeTask()
    }
}
function makeTask() {
    if (input.value.length != 0) {
        for(let i in storedArray){
            if(storedArray[i].content == input.value){
                input.value = ''
                input.placeholder = "This task already exists";
                return
            }
        }
        let pushedItem = ({id: Date.now(), content: input.value});
        storedArray.push(pushedItem)
        localStorage.setItem("tasksArray", JSON.stringify(storedArray))
        appendCurrentElement(pushedItem.content, pushedItem.id)
        input.placeholder = "";
    }
}

function appendElementFromLocalStorage() {
    if (localStorage.getItem("tasksArray")) {
        for (let i in storedArray) {
            let element = document.createElement("div")
            element.innerHTML = storedArray[i].content
            element.id = `${storedArray[i].id}`
            tasksContainer.appendChild(element)
            closingButtonFunc(element)
        }
    }
}

function appendCurrentElement(elementContent, elementId) {
    let currentElement = document.createElement("div")
    currentElement.innerHTML = elementContent;
    currentElement.id = `${elementId}`;
    tasksContainer.appendChild(currentElement)
    closingButtonFunc(currentElement)

}
function closingButtonFunc(ele) {
    let closingButton = document.createElement("button")
    closingButton.id = "closingButton";
    closingButton.innerHTML = "X";
    ele.appendChild(closingButton)
    document.querySelectorAll("#closingButton").forEach(function (element) {
        element.addEventListener("click", function () {
            for(let i in storedArray){
                if(storedArray[i].id == element.parentElement.id){
                    storedArray = storedArray.filter(item => item.id != element.parentElement.id)
                    setTheStoredArray()
                }
            }
            element.parentElement.remove()
        })
    })
}
