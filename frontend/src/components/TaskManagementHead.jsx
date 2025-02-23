import { IoSearch } from "react-icons/io5";
import { MdAdd, MdOutlineSort } from "react-icons/md";
import { useTasks } from "../context/TaskContext";

export const TaskManagementHead = ({togglePopup}) => {

  const { dispatch } = useTasks();
  return (
    <>
      <div className="flex flex-col px-10 py-3 justify-center gap-2.5">
        <div className="md:hidden search-bar w-full flex items-center border-2 mx-auto border-text-color gap-2 p-1 rounded-md">
          <IoSearch size={25} />
          <input
            type="text"
            name="search-bar"
            id="search-bar"
            className="border-none focus:outline-none w-full"
            placeholder="Search task title"
          />
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-text-color text-2xl font-bold">
            Manage Your Task
          </h1>
          <div className="flex items-center gap-7">
            <MdOutlineSort size={25} />
            <button
              onClick={togglePopup}
              className="bg-button-bg md:hidden flex justify-center items-center gap-1 px-5 py-3 font-bold rounded-lg border-2 border-text-color cursor-pointer"
            >
              <MdAdd size={20} />
            </button>
            <button
              onClick={() => dispatch({ type: 'SET_EDIT_TASK', payload: null })}
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
