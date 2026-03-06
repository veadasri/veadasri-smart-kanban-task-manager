import Column from "./Column";
import { DragDropContext } from "@hello-pangea/dnd";

function Board({ tasks, setTasks }) {

  const columns = [
    { title: "Todo", status: "todo" },
    { title: "In Progress", status: "progress" },
    { title: "Done", status: "done" }
  ];

  const handleDragEnd = (result) => {

    if (!result.destination) return;

    const taskId = parseInt(result.draggableId);
    const newStatus = result.destination.droppableId;

    const updatedTasks = tasks.map(task =>
      task.id === taskId
        ? { ...task, status: newStatus }
        : task
    );

    setTasks(updatedTasks);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="board">
        {columns.map(col => (
          <Column
            key={col.status}
            title={col.title}
            status={col.status}
            tasks={tasks}
            setTasks={setTasks}
          />
        ))}
      </div>
    </DragDropContext>
  );
}

export default Board;