// Load tasks when page opens
window.onload = function() {
    loadTasks();
}

function addTask() {
    // Get values from the form
    let subject = document.getElementById("subject").value;
    let topic = document.getElementById("topic").value;
    let startdate = document.getElementById("startdate").value;
    let deadline = document.getElementById("deadline").value;
    let priority = document.getElementById("priority").value;
    let status = document.getElementById("status").value;

    // Check if all fields are filled
    if (subject === "" || topic === "" || startdate === "" || deadline === "" || priority === "" || status === "") {
        alert("Please fill in all fields before adding a task!");
        return;
    }

    // Create task object
    let task = { subject, topic, startdate, deadline, priority, status };

    // Save to localStorage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Display the task
    displayTask(task, tasks.length - 1);

    // Clear the form
    document.getElementById("subject").value = "";
    document.getElementById("topic").value = "";
    document.getElementById("startdate").value = "";
    document.getElementById("deadline").value = "";
    document.getElementById("priority").value = "";
    document.getElementById("status").value = "";
}

function displayTask(task, index) {
    let li = document.createElement("li");
    li.innerHTML = `
        <div>
            <strong>${task.subject}</strong> — ${task.topic}<br>
            📅 Start: ${task.startdate} &nbsp; | &nbsp; ⏰ Deadline: ${task.deadline}<br>
            Priority: ${task.priority} &nbsp; | &nbsp; Status: ${task.status}
        </div>
    `;

    // Remove button
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Remove";
    deleteBtn.onclick = function() {
        removeTask(index);
        li.remove();
    };

    li.appendChild(deleteBtn);
    document.getElementById("task-list").appendChild(li);
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(function(task, index) {
        displayTask(task, index);
    });
}

function removeTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}