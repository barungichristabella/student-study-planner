function addTask() {
    // Get the values from the form
    let subject = document.getElementById("subject").value;
    let task = document.getElementById("task").value;
    let deadline = document.getElementById("deadline").value;

    // Check if all fields are filled in
    if (subject === "" || task === "" || deadline === "") {
        alert("Please fill in all fields before adding a task!");
        return;
    }

    // Create a new list item
    let li = document.createElement("li");
    li.innerHTML = "<strong>" + subject + "</strong> — " + task + " (Due: " + deadline + ")";

    // Add a delete button to each task
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Remove";
    deleteBtn.onclick = function() {
        li.remove();
    };

    li.appendChild(deleteBtn);

    // Add the task to the list
    document.getElementById("task-list").appendChild(li);

    // Clear the form after adding
    document.getElementById("subject").value = "";
    document.getElementById("task").value = "";
    document.getElementById("deadline").value = "";
}