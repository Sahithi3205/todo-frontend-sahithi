import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import "./index.css";
import dotenv from "dotenv"

dotenv.config()

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState({});

  
  const fetchTasks = async () => {
    const res = await axios.get();
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTasks = async () => {
   const res=  await axios.post(`${import.meta.env.VITE_API_URL}/tasks` ,{ text });
    setText("");
    fetchTasks();
  };

  const deleteTasks = async (id) => {
   const res=  await axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div>
      <h2>To-Do List</h2>

      <input
        type="text"
        placeholder="Enter task"
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={addTasks}>Add</button>

      <ol>
        {tasks.map((text) => (
          <li key={text._id}>
            {tasks.note}{" "}
            <button onClick={() => deleteTasks(text._id)}>
              Delete
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

