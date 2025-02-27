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
  const [sortOption, setSortOption] = useState("");
  const [sortDropDown, setSortDropdown] = useState(false);

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

  // Sort tasks based on the selected option
  if (sortOption === "progress") {
    filteredTasks.sort((a, b) => a.progress.localeCompare(b.progress));
  } else if (sortOption === "priority") {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 }; // Custom sorting order
    filteredTasks.sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
    );
  }

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
        />
        <AddNewTask />
        <TaskLists filterItems={filterItems} />
      </div>
    </>
  );
};
