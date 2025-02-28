import { useContext, useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { MdAdd, MdOutlineSort } from "react-icons/md";
import TaskContext from "../context/TaskContext";

export const TaskManagementHead = ({
  onSort,
  onClearSort,
  searchTitle,
  handleSearch,
}) => {
  const { setModalOpen, setEditTask } = useContext(TaskContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSort = (criteria) => {
    onSort(criteria); // Pass the selected criteria to the parent component
    setIsDropdownOpen(false); // Close the dropdown after selection
  };

  const handleClearSort = () => {
    onClearSort(); // Clear the sort
    setIsDropdownOpen(false); // Close the dropdown
  };

  const handleOutsideClick = (e) => {
    if (!e.target.closest("#sort-dropdown")) {
      setIsDropdownOpen(false);
    }
  };

  // Attach and detach the event listener
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <div className="flex flex-col relative px-10 py-3 justify-center gap-2.5">
        <div className="md:hidden search-bar w-full flex items-center border-2 mx-auto border-text-color gap-2 p-1 rounded-md">
          <IoSearch size={25} />
          <input
            type="text"
            name="search-bar"
            id="search-bar"
            className="border-none focus:outline-none w-full"
            placeholder="Search task title"
            value={searchTitle}
            onChange={handleSearch}
          />
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-text-color text-2xl font-bold">
            Manage Your Task
          </h1>
          <div id="sort-dropdown" className="flex items-center relative gap-7">
            {/* Sort Button */}
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="cursor-pointer relative"
            >
              <MdOutlineSort size={25} />
            </button>

            {/* Sort Dropdown options */}
            {isDropdownOpen && (
              <div className="absolute top-10 right-30 md:right-40 w-[200px] md:w-full bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <div className="p-2">
                  <h3 className="font-semibold mb-2">Sort by Progress</h3>
                  <button
                    onClick={() => handleSort("Not Started")}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Not Started
                  </button>
                  <button
                    onClick={() => handleSort("In Progress")}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    In Progress
                  </button>
                  <button
                    onClick={() => handleSort("Completed")}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Completed
                  </button>
                </div>
                <div className="p-2 border-t border-gray-200">
                  <h3 className="font-semibold mb-2">Sort by Priority</h3>
                  <button
                    onClick={() => handleSort("High")}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    High
                  </button>
                  <button
                    onClick={() => handleSort("Medium")}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Medium
                  </button>
                  <button
                    onClick={() => handleSort("Low")}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Low
                  </button>
                </div>
                <div className="p-2 border-t border-gray-200">
                  <button
                    onClick={handleClearSort}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                  >
                    Clear Sort
                  </button>
                </div>
              </div>
            )}
            {/* Small Screen Task Add Button */}
            <button
              onClick={() => {
                setEditTask(null); // Resets edit task state
                setModalOpen(true); // Opens modal for adding a new task
              }}
              className="bg-button-bg md:hidden flex justify-center items-center gap-1 px-5 py-3 font-bold rounded-lg border-2 border-text-color cursor-pointer"
            >
              <MdAdd size={20} />
            </button>
            {/* Add Button */}
            <button
              onClick={() => {
                setEditTask(null);
                setModalOpen(true); // Opens modal for adding a new task
              }}
              className="bg-button-bg hidden md:flex justify-center items-center gap-1 px-5 py-3 font-bold rounded-lg border-2 border-text-color cursor-pointer"
            >
              <MdAdd size={20} /> New Task
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
