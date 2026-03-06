import { useState, useEffect } from "react";
import Board from "./components/Board";
import "./App.css";

function App() {

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("kanbanTasks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("kanbanTasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="app">
      <h1>🚀 Smart Kanban Task Manager</h1>
      <Board tasks={tasks} setTasks={setTasks} />
    </div>
  );
}

export default App;