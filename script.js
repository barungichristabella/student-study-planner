function addTask() {
    var subject = document.getElementById("subject").value;
    var topic = document.getElementById("topic").value;
    var startdate = document.getElementById("startdate").value;
    var deadline = document.getElementById("deadline").value;
    var priority = document.getElementById("priority").value;
    var status = document.getElementById("status").value;

    if (subject === "" || topic === "" || startdate === "" || deadline === "" || priority === "" || status === "") {
        alert("Please fill in all fields!");
        return;
    }

    var task = { subject, topic, startdate, deadline, priority, status };
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTask(task, tasks.length - 1);
    checkReminders();

    document.getElementById("subject").value = "";
    document.getElementById("topic").value = "";
    document.getElementById("startdate").value = "";
    document.getElementById("deadline").value = "";
    document.getElementById("priority").value = "";
    document.getElementById("status").value = "";
}

function displayTask(task, index) {
    var list = document.getElementById("task-list");
    var li = document.createElement("li");
    li.setAttribute("data-index", index);
    li.innerHTML = "<div><strong>" + task.subject + "</strong> — " + task.topic + "<br>Start: " + task.startdate + " | Deadline: " + task.deadline + "<br>Priority: " + task.priority + " | Status: " + task.status + "</div>";

    var btn = document.createElement("button");
    btn.textContent = "Remove";
    btn.onclick = function() {
        removeTask(index);
        li.remove();
        checkReminders();
    };
    li.appendChild(btn);
    list.appendChild(li);
}

function removeTask(index) {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function checkReminders() {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    var today = new Date();
    today.setHours(0, 0, 0, 0);

    var messages = [];
    var popupMessages = [];

    tasks.forEach(function(task) {
        var deadline = new Date(task.deadline);
        deadline.setHours(0, 0, 0, 0);
        var diff = (deadline - today) / (1000 * 60 * 60 * 24);

        if (diff < 0) {
            messages.push("❌ <strong>" + task.subject + " — " + task.topic + "</strong> is OVERDUE!");
            popupMessages.push("❌ " + task.subject + " — " + task.topic + " is OVERDUE!");
        } else if (diff === 0) {
            messages.push("🔴 <strong>" + task.subject + " — " + task.topic + "</strong> is due TODAY!");
            popupMessages.push("🔴 " + task.subject + " — " + task.topic + " is due TODAY!");
        } else if (diff === 1) {
            messages.push("🟡 <strong>" + task.subject + " — " + task.topic + "</strong> is due TOMORROW!");
            popupMessages.push("🟡 " + task.subject + " — " + task.topic + " is due TOMORROW!");
        }
    });

    var banner = document.getElementById("reminder-banner");
    if (messages.length > 0) {
        banner.innerHTML = "<div class='reminder-box'><strong>⚠️ Reminders:</strong><br>" + messages.join("<br>") + "</div>";
        alert("⚠️ Reminder!\n\n" + popupMessages.join("\n"));
    } else {
        banner.innerHTML = "";
    }
}

window.onload = function() {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(function(task, index) {
        displayTask(task, index);
    });
    checkReminders();
}