const task = document.querySelector(".task-entry");
const taskList = document.getElementById("tasklist");


function showtask(event) {
    if (event.key === 'Enter') {
        const newTask = document.createElement("li");
        const textnode = document.createTextNode(task.value);
        newTask.appendChild(textnode);
        taskList.appendChild(newTask);
        task.value = '';
    }
}

function addtask() {
    task.addEventListener("keydown", showtask);
}

addtask();

