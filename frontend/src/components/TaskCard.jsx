function TaskCard({ task, onDelete, onEdit }) {
  return (
    <div className="task-card">
      <div className="task-top">
        <h3>{task.title}</h3>

        <span
          className={
            task.status === "Completed"
              ? "status completed"
              : "status pending"
          }
        >
          {task.status}
        </span>
      </div>

      <p>{task.description}</p>

      <div className="task-actions">
        <button
          className="edit-btn"
          onClick={() => onEdit(task)}
        >
          ✏ Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(task._id)}
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;