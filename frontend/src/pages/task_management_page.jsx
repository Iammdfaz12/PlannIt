import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { AddNewTask } from "../components/AddNewTask";
import { TaskLists } from "../components/TaskList";
import { TaskManagementHead } from "../components/TaskManagementHead";
import { TaskManagementNavBar } from "../components/TaskManagementNavBar";
import { auth } from "../services/FirebaseConfig";

export const TaskManagementPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [name, setName] = useState("");
  const [editingTask, setEditingTask] = useState(null);

  const togglePopup = () => setShowPopup(!showPopup);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      console.log("New Task:", task); // Replace this with your task saving logic
      setTask("");
      togglePopup(); // Close the pop-up after adding the task
    }
  };

  const handleUpdateTask = (taskId, updatedTask) => {
    setTasks(prevTasks => prevTasks.map(task =>
      task.id === taskId ? { ...task, ...updatedTask } : task
    ));
    setEditingTask(null);
  };

  useEffect(() => {
    const showName = onAuthStateChanged(auth, (user) => {
      if (user) {
        const name = user.displayName;
        setName(user.displayName);
        localStorage.setItem("displayName", name); // Save to localStorage
      } else {
        localStorage.removeItem("displayName");
      }
    });
    return () => showName();
  }, []);

  return (
    <>
      <div>
        <TaskManagementNavBar name={name} />
        <TaskManagementHead
          showPopup={showPopup}
          setShowPopup={setShowPopup}
          togglePopup={togglePopup}
        />
        <AddNewTask
          showPopup={showPopup}
          setShowPopup={setShowPopup}
          togglePopup={togglePopup}
          handleSubmit={handleSubmit}
          handleUpdate={handleUpdateTask}
        />
        <TaskLists togglePopup={togglePopup} editingTask={editingTask} setEditingTask={setEditingTask}/>
      </div>
    </>
  );
};
