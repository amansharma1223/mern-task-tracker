import axios from "axios";

const API = axios.create({
  baseURL: "https://mern-task-tracker-o70t.onrender.com/api",
});

export default API;