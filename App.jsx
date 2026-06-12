import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import "./index.css";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState({});

  
  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5003/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTasks = async () => {
   const res=  await axios.post("http://localhost:5003/tasks",{ text });
    setText("");
    fetchTasks();
  };

  const deleteTasks = async (id) => {
   const res=  await axios.delete(`http://localhost:5003/tasks/${id}`);
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

