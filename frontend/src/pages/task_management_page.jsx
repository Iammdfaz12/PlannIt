import { useContext, useEffect, useState } from "react";
import { AddNewTask } from "../components/AddNewTask";
import { TaskLists } from "../components/TaskList";
import { TaskManagementHead } from "../components/TaskManagementHead";
import { TaskManagementNavBar } from "../components/TaskManagementNavBar";
import TaskContext from "../context/TaskContext";

export const TaskManagementPage = () => {
  const { tasks } = useContext(TaskContext);
  const [searchTitle, setSearchTitle] = useState("");
  const [filterItems, setFilteritems] = useState(tasks);

  useEffect(() => {
    setFilteritems(tasks);
  }, [tasks]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchTitle(query);

    if (query === "") {
      setFilteritems(tasks);
    } else {
      const filteredTasks = tasks.filter((task) => {
        return task.title.toLowerCase().includes(query.toLowerCase());
      });
      setFilteritems(filteredTasks);
    }
  };

  // Handle sorting functionality
  const handleSort = (criteria) => {
    let filteredTasks = [...tasks]; // Create a copy of tasks

    if (
      criteria === "Not Started" ||
      criteria === "In Progress" ||
      criteria === "Completed"
    ) {
      // Filter by progress
      filteredTasks = tasks.filter((task) => task.progress === criteria);
    } else if (
      criteria === "High" ||
      criteria === "Medium" ||
      criteria === "Low"
    ) {
      // Filter by priority
      filteredTasks = tasks.filter((task) => task.priority === criteria);
    }

    setFilteritems(filteredTasks); // Update filterItems with filtered tasks
  };

  // Handle clear sort functionality
  const handleClearSort = () => {
    setFilteritems(tasks); // Reset filterItems to show all tasks
  };

  return (
    <>
      <div>
        <TaskManagementNavBar
          searchTitle={searchTitle}
          handleSearch={handleSearch}
        />
        <TaskManagementHead
          searchTitle={searchTitle}
          handleSearch={handleSearch}
          onSort={handleSort}
          onClearSort={handleClearSort}
        />
        <AddNewTask />
        <TaskLists filterItems={filterItems} />
      </div>
    </>
  );
};
