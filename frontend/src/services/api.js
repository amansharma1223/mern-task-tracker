import axios from "axios";

let userId = localStorage.getItem("taskUserId");

if (!userId) {
  userId =
    Date.now().toString() +
    Math.random().toString(36).substring(2, 10);

  localStorage.setItem("taskUserId", userId);
}

const API = axios.create({
  baseURL: "https://mern-task-tracker-o70t.onrender.com/api",
  headers: {
    "x-user-id": userId,
  },
});

export default API;