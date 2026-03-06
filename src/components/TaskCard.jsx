import { Draggable } from "@hello-pangea/dnd";

function TaskCard({ task, index, tasks, setTasks }) {

  const deleteTask = () => {
    setTasks(tasks.filter(t => t.id !== task.id));
  };

  const editTask = () => {

    const newTitle = prompt("Edit title", task.title);
    if (!newTitle) return;

    const updatedTasks = tasks.map(t =>
      t.id === task.id
        ? { ...t, title: newTitle }
        : t
    );

    setTasks(updatedTasks);
  };

  const isOverdue =
    task.deadline &&
    new Date(task.deadline) < new Date();

  return (

    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (

        <div
          className={`task ${isOverdue ? "overdue" : ""}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >

          <p className="task-title">{task.title}</p>

          {task.description && (
            <small className="task-desc">
              {task.description}
            </small>
          )}

          {task.deadline && (
            <div className="deadline">
              ⏰ {task.deadline}
            </div>
          )}

          <div className={`priority ${task.priority}`}>
            {task.priority}
          </div>

          <div className="buttons">
            <button onClick={editTask}>Edit</button>
            <button onClick={deleteTask}>Delete</button>
          </div>

        </div>

      )}
    </Draggable>

  );
}

export default TaskCard;