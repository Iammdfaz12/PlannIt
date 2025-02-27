import { useContext, useEffect, useState } from "react";
import TaskContext from "../context/TaskContext";

export const AddNewTask = ({ togglePopup, editingTask }) => {
  const {
    addTask,
    updateTask,
    isModalOpen,
    editTask,
    setEditTask,
    setModalOpen,
  } = useContext(TaskContext);

  const [taskData, setTaskData] = useState({
    category: "",
    title: "",
    description: "",
    progress: "Not Started",
    priority: "High",
  });

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (editTask) {
      setTaskData(editTask);
    } else {
      setTaskData({
        category: "",
        title: "",
        description: "",
        progress: "Not Started",
        priority: "High",
      });
    }
  }, [editTask]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !taskData.priority ||
      !taskData.progress ||
      !taskData.title ||
      !taskData.description ||
      !taskData.category
    ) {
      alert("Please fill all fields");
      return;
    }

    if (editTask) {
      updateTask(editTask._id, taskData);
    } else {
      addTask(taskData);
    }

    setTaskData({
      category: "",
      title: "",
      description: "",
      progress: "Not Started",
      priority: "High",
    });

    setModalOpen(false);
    setEditTask(null);
  };

  return (
    <>
      {isModalOpen && (
        <div className="h-full overflow-y-auto md:h-auto absolute inset-0 pt-20 bg-[#ffffff3c] backdrop-blur-sm z-50">
          <div className="add-task-container flex flex-col justify-center items-center bg-secondary w-full md:w-[500px] shadow-2xl rounded-lg px-10 mx-auto">
            <h1 className="pt-5 font-bold text-text-color text-xl">
              {editTask ? "Edit Task" : "Add New Task"}
            </h1>
            <div className="py-8 w-full flex flex-col gap-5">
              <div className="category">
                <p className="text-text-color font-medium text-[20px] pb-3">
                  Select Category:
                </p>
                <div className="category flex gap-3 items-center">
                  <input
                    type="radio"
                    id="mobileApp"
                    name="category"
                    value="Mobile Application"
                    checked={taskData.category === "Mobile Application"}
                    onChange={handleChange}
                    className="hidden peer/mobileApp"
                  />
                  <label
                    className="category-button px-3.5 py-3 border-2 text-[10px] border-mobileapp-text text-mobileapp-text rounded-md cursor-pointer transition duration-300 peer-checked/mobileApp:bg-mobileapp-bg font-bold"
                    htmlFor="mobileApp"
                  >
                    Mobile Application
                  </label>
                  <input
                    type="radio"
                    id="website"
                    name="category"
                    value="Website"
                    checked={taskData.category === "Website"}
                    onChange={handleChange}
                    className="hidden peer/website"
                  />
                  <label
                    className="category-button px-3.5 py-3 border-2 text-[10px] border-website-text text-website-text rounded-md cursor-pointer transition duration-300 peer-checked/website:bg-website-bg font-bold"
                    htmlFor="website"
                  >
                    Website
                  </label>
                  <input
                    type="radio"
                    id="other"
                    name="category"
                    value="Other"
                    checked={taskData.category === "Other"}
                    onChange={handleChange}
                    className="hidden peer/other"
                  />
                  <label
                    className="category-button px-3.5 py-3 text-[10px] border-2 text-other-text border-other-text rounded-lg cursor-pointer transition duration-300 peer-checked/other:bg-other-bg font-bold"
                    htmlFor="other"
                  >
                    Other
                  </label>
                </div>
              </div>
              <div className="w-full flex flex-col gap-2">
                <p className="font-medium text-md text-text-color">
                  Task Title
                </p>
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Enter title"
                  value={taskData.title}
                  onChange={handleChange}
                  className="border-2 border-text-color rounded-md p-1.5 "
                />
              </div>
              <div className="w-full flex flex-col gap-2">
                <p className="font-medium text-md text-text-color">
                  Task Description
                </p>
                <textarea
                  type="text"
                  name="description"
                  id="description"
                  rows={4}
                  value={taskData.description}
                  onChange={handleChange}
                  placeholder="Enter Description"
                  className="border-2 border-text-color rounded-md p-1.5 h-28 resize-none"
                />
              </div>
              <div className="w-full flex justify-between items-center gap-8">
                <div className="flex flex-col gap-2 w-full">
                  <p className="font-medium text-md text-text-color">
                    Task Progress
                  </p>
                  <select
                    name="progress"
                    id="task-progress"
                    value={taskData.progress}
                    onChange={handleChange}
                    className="border-2 px-2 py-1.5 w-full rounded-md focus:outline-3 focus:border-none"
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <p className="font-medium text-md text-text-color">
                    Task Priority
                  </p>
                  <select
                    name="priority"
                    id="task-priority"
                    value={taskData.priority}
                    onChange={handleChange}
                    className="border-2 px-2 py-1.5 w-full rounded-md focus:outline-3 focus:border-none"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setModalOpen(false)}
                  className="border-button-bg border-2 rounded-md font-bold px-5 py-2.5 cursor-pointer text-button-bg hover:bg-button-bg hover:text-text-color hover:border-text-color"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg px-5 py-2.5 bg-button-bg border-2 border-text-color rounded-md font-medium cursor-pointer hover:bg-transparent hover:border-button-bg hover:text-button-bg"
                >
                  {editTask ? "Update Task" : "Add Task"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
