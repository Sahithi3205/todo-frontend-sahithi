import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";


export default function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  const fetchTasks = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/tasks`);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTasks = async () => {
    await axios.post(`${import.meta.env.VITE_API_URL}/tasks`, { text });
    setText("");
    fetchTasks();
  };

  const deleteTasks = async (id) => {
    await axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div className="container">
      <h2>To-Do List</h2>

      <input
        type="text"
        value={text}
        placeholder="Enter task"
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={addTasks}>Add</button>

      <ol>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.text}
            <button onClick={() => deleteTasks(task._id)}>
              Delete
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
