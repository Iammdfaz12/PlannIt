import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../services/FirebaseConfig";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        fetchTasks(user.uid);
      } else {
        setUserId("");
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchTasks = async (userId) => {
    const res = await axios.get(`${backendUrl}/tasks?userId=${userId}`);
    setTasks(res.data);
  };

  const addTask = async (taskData) => {
    const res = await axios.post(`${backendUrl}/tasks`, {
      ...taskData,
      userId,
    });
    setTasks([...tasks, res.data]);
  };

  const updateTask = async (id, updatedData) => {
    const res = await axios.put(`${backendUrl}/tasks/${id}`, {
      ...updatedData,
      userId,
    });
    setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
  };

  const deleteTask = async (id) => {
    await axios.delete(`${backendUrl}/tasks/${id}`, { data: { userId } });
    setTasks(tasks.filter((task) => task._id !== id));
  };

  const togglePinTask = async (id) => {
    const res = await axios.put(`${backendUrl}/tasks/${id}/pin`, { userId });
    setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        editTask,
        setEditTask,
        isModalOpen,
        setModalOpen,
        togglePinTask,
        userId,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
