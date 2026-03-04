const token = localStorage.getItem("token");

const response = await fetch(http://127.0.0.1:5000, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + token
  }
});