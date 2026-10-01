import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchTasks = async () => {
    try {
      const res = await axios.get(API_URL + "/tasks");
      setTasks(res.data);
    } catch (error) {
      console.log("Could not connect to backend:", error);
    }
  };

  useEffect(() => {
    if (API_URL) {
      fetchTasks();
    }
  }, []);

  const addTask = async () => {
    if (!text.trim()) return;

    try {
      const res = await axios.post(API_URL + "/tasks", {
        text: text.trim(),
      });

      setTasks([...tasks, res.data]);
      setText("");
    } catch (error) {
      console.log("Could not add task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(API_URL + "/tasks/" + id);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.log("Could not delete task:", error);
    }
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

      <button onClick={addTask}>Add</button>

      <ol>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.text}
            <button onClick={() => deleteTask(task._id)}>
              Delete
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

