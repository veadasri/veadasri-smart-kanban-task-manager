import { useState } from "react";
import TaskCard from "./TaskCard";
import { Droppable } from "@hello-pangea/dnd";

function Column({ title, status, tasks, setTasks }) {

  const filteredTasks = tasks.filter(task => task.status === status);

  const [showModal, setShowModal] = useState(false);

  const [titleText, setTitleText] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("medium");

  const addTask = () => {

    const newTask = {
      id: Date.now(),
      title: titleText,
      description,
      deadline,
      priority,
      status
    };

    setTasks([...tasks, newTask]);

    setTitleText("");
    setDescription("");
    setDeadline("");
    setPriority("medium");

    setShowModal(false);
  };

  return (
    <div className="column">

      <h2>{title} ({filteredTasks.length})</h2>

      <button onClick={() => setShowModal(true)}>
        Add Task
      </button>

      <Droppable droppableId={status}>
        {(provided) => (
          <div
            className="task-list"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >

            {filteredTasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                tasks={tasks}
                setTasks={setTasks}
              />
            ))}

            {provided.placeholder}

          </div>
        )}
      </Droppable>

      {showModal && (

        <div className="modal">

          <div className="modal-content">

            <h3>New Task</h3>

            <input
              placeholder="Title"
              value={titleText}
              onChange={(e)=>setTitleText(e.target.value)}
            />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
            />

            <input
              type="date"
              value={deadline}
              onChange={(e)=>setDeadline(e.target.value)}
            />

            <select
              value={priority}
              onChange={(e)=>setPriority(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <div className="modal-buttons">
              <button onClick={addTask}>Create</button>
              <button onClick={()=>setShowModal(false)}>
                Cancel
              </button>
            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Column;