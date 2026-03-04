// Get token function
function getToken() {
  return localStorage.getItem("token");
}

// Redirect if not logged in
if (!getToken()) {
  alert("Please login first");
  window.location.href = "login.html";
}

// Load Tasks
async function loadTasks() {
  const response = await fetch("http://127.0.0.1:5000/api/tasks", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + getToken()
    }
  });

  if (!response.ok) {
    console.log("Status:", response.status);
    return;
  }

  const tasks = await response.json();

  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task.title + " - " + task.description;
    taskList.appendChild(li);
  });
}

// Add Task
async function addTask() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;

  const response = await fetch("http://127.0.0.1:5000/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + getToken()
    },
    body: JSON.stringify({ title, description })
  });

  if (!response.ok) {
    console.log("Add Task Status:", response.status);
    return;
  }

  // Clear inputs
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";

  loadTasks();
}

// Load tasks when page opens
loadTasks();