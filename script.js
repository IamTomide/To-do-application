const task = document.querySelector(".task-entry");
const taskList = document.getElementById("tasklist");
const draglist = document.querySelector('ul');



function buildItem(event) {
    if (event.key === 'Enter') {
        const newTask = document.createElement("li");
        const div = document.createElement("div");
        const firstButton = document.createElement("button");
        firstButton.classList.add("tocheck");
        const secondButton = document.createElement("button");
        secondButton.classList.add("tocancel");
        const item = document.createElement("p");
        const firstImg = document.createElement('img');
        firstImg.src = "./images/icon-check.svg";
        firstImg.classList.add("tick");
        const secondImg = document.createElement('img');
        secondImg.src = "./images/icon-cross.svg";
        secondImg.classList.add("cross");
        item.innerText = task.value;
        firstButton.appendChild(firstImg);
        secondButton.appendChild(secondImg);
        div.append(firstButton, item);
        newTask.append(div, secondButton);
        addtask(newTask);
    }
}

function addtask(newTask) {
    if (task.value===""){
        alert("Enter a task to add");
    }
    else {
    taskList.appendChild(newTask);
    task.value = '';
    itemcounter();
    saveData();
    checkaction();
    }
}

function itemcounter() {
    const itemsLeft = document.querySelector(".items-left");
    const allTasks = document.querySelectorAll("li");
    itemsLeft.innerText = `${allTasks.length} items left`;
    saveData();
}

function addCheck(event) {
    if (event.target.classList.contains("tick")) {
        if (!(event.target.classList.contains("showtick"))) {
            event.target.classList.add("showtick");
            event.target.parentElement.classList.add("checked");
            event.target.parentElement.parentElement.classList.add("check");
        }
        else if (event.target.classList.contains("showtick")) {
            event.target.classList.remove("showtick");
            event.target.parentElement.classList.remove("checked");
            event.target.parentElement.parentElement.classList.remove("check");
        }
        
    }

    else {
        if (!(event.target.classList.contains("showtick"))) {
            event.target.firstChild.classList.add("showtick");
            event.target.classList.add("checked");
            event.target.parentElement.classList.add("check");
        }
        else if (event.target.classList.contains("showtick")) {
            event.target.firstChild.classList.remove("showtick");
            event.target.classList.remove("checked");
            event.target.parentElement.classList.remove("check");
        }
        
    }
    saveData();
    }

    

function showAllTasks() {
    const allTasks = document.querySelectorAll("li");
    allTasks.forEach(element => {
        element.style.display = "flex";
    })
}

function showActive() {
    const allTasks = document.querySelectorAll("li");
    allTasks.forEach(element => {
        if (element.firstChild.firstChild.classList.contains("checked")){
        element.style.display = "none";
        }
        else {element.style.display = "flex"};
    })
}

function showcompleted() {
    const allTasks = document.querySelectorAll("li");
    allTasks.forEach(element => {
        if (element.firstChild.firstChild.classList.contains("checked")){
            element.style.display = "flex";
        }
        else {element.style.display = "none";}
    })
}

function clearCompleted() {
    const allTasks = document.querySelectorAll("li");
    allTasks.forEach(element => {
        if (element.firstChild.firstChild.classList.contains("checked")){
            element.remove();
        }
    })
    itemcounter();
    showAllTasks();
}

function cancelTask(event) {
    event.target.parentElement.parentElement.remove();
    itemcounter();
    saveData();
}

function changemode() {
    const body = document.querySelector("body");
    const modeimg = document.querySelector(".modeimg");
    if (body.classList.contains("darkmode")) {
        modeimg.src = "images/icon-moon.svg";
        body.classList.remove("darkmode");
    }
    else if (!(body.classList.contains("darkmode"))) {
        modeimg.src = "images/icon-sun.svg";
        body.classList.add("darkmode");
    }
}

function checkaction() {
    const checkButton = document.querySelectorAll(".tocheck");
    checkButton.forEach(element => {
        element.addEventListener("click", addCheck);
    });

    const cancelButton = document.querySelectorAll(".tocancel");
    cancelButton.forEach(element => {
        element.addEventListener("click", cancelTask);
    });

    const all = document.querySelectorAll(".all");
    all.forEach(element => {
    element.addEventListener("click", showAllTasks);
    });

    const active = document.querySelectorAll(".active");
    active.forEach(element => {
    element.addEventListener("click", showActive);
    });

    const completed = document.querySelectorAll(".completed");
    completed.forEach(element => {
    element.addEventListener("click", showcompleted);
    });

    const clear = document.querySelector(".clear");
    clear.addEventListener("click", clearCompleted);

    const mode = document.querySelector(".mode");
    mode.addEventListener("click", changemode);
}

function createtask() {
    task.addEventListener("keydown", buildItem);
}

createtask();

function saveData() {
    localStorage.setItem("data", taskList.innerHTML);
}

function showTaskList(){
    taskList.innerHTML = localStorage.getItem("data");
    checkaction();
    itemcounter();
    showAllTasks();
}

showTaskList();

new Sortable(draglist, {
    animation: 150,
    ghostClass: 'drag',
    delayOnTouchOnly: true
});
