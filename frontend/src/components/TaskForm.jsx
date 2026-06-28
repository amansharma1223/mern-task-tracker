import { useEffect, useState } from "react";

function TaskForm({ onAddTask, editTask, onUpdateTask }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "Pending",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (editTask) {
      setTask(editTask);
    }
  }, [editTask]);

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (task.title.trim() === "") {
      setError("Task title is required");
      return;
    }

    if (editTask) {
      onUpdateTask(task);
    } else {
      onAddTask(task);
    }

    setTask({
      title: "",
      description: "",
      status: "Pending",
    });

    setError("");
  };

  return (
    <div className="form-card">
      <h2>{editTask ? "Update Task" : "Add New Task"}</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Enter task title"
          value={task.title}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Enter task description"
          value={task.description}
          onChange={handleChange}
        ></textarea>

        <div className="form-row">
          <select name="status" value={task.status} onChange={handleChange}>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>

          <button type="submit">
            {editTask ? "Update Task" : "Add Task"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;