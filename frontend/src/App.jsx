import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import "./App.css";

import API from "./services/api";
import TaskForm from "./components/TaskForm";
import TaskCard from "./components/TaskCard";
import Filter from "./components/Filter";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [editTask, setEditTask] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const pendingCount = tasks.filter((task) => task.status === "Pending").length;
  const completedCount = tasks.filter((task) => task.status === "Completed").length;

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (task) => {
    try {
      const res = await API.post("/tasks", task);
      setTasks([res.data, ...tasks]);
      toast.success("Task added successfully");
    } catch (error) {
      toast.error("Task not added");
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await API.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
      toast.success("Task deleted successfully");
    } catch (error) {
      toast.error("Task not deleted");
    }
  };

  const updateTask = async (updatedTask) => {
    try {
      const res = await API.put(`/tasks/${updatedTask._id}`, updatedTask);

      setTasks(
        tasks.map((task) => (task._id === updatedTask._id ? res.data : task))
      );

      setEditTask(null);
      toast.success("Task updated successfully");
    } catch (error) {
      toast.error("Task not updated");
    }
  };

  const filteredTasks =
    filter === "All" ? tasks : tasks.filter((task) => task.status === filter);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Toaster position="top-right" />

      <div className="container">
        <div className="top-bar">
          <div>
            <h1>📝 Task Tracker</h1>
            <p className="subtitle">Organize your daily work with MERN Stack</p>

            <div className="stats">
              <div className="stat-card">
                <h3>{tasks.length}</h3>
                <span>Total</span>
              </div>

              <div className="stat-card">
                <h3>{pendingCount}</h3>
                <span>Pending</span>
              </div>

              <div className="stat-card">
                <h3>{completedCount}</h3>
                <span>Completed</span>
              </div>
            </div>
          </div>

          <button className="theme-btn" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        <TaskForm
          onAddTask={addTask}
          editTask={editTask}
          onUpdateTask={updateTask}
        />

        <Filter filter={filter} setFilter={setFilter} />

        <div className="task-section">
          {loading ? (
            <p className="message">Loading tasks...</p>
          ) : filteredTasks.length === 0 ? (
            <div className="empty-state">
              <div>📭</div>
              <h3>No Tasks Found</h3>
              <p>Create your first task to get started.</p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onDelete={deleteTask}
                onEdit={setEditTask}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;