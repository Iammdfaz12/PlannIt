import { useContext } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDelete, MdPushPin } from "react-icons/md";
import { RiUnpinFill } from "react-icons/ri";
import TaskContext from "../context/TaskContext";

export const TaskLists = ({filterItems}) => {
  const { tasks, setEditTask, deleteTask, setModalOpen, togglePinTask } =
    useContext(TaskContext);

  //Pin/Unpin
  const sortedTasks = [...filterItems].sort((a, b) => b.pinned - a.pinned);

  return (
    <>
      <div className="bg-secondary rounded-md shadow-md mx-10 p-5">
        <div className="flex flex-col md:grid md:grid-cols-3 lg:grid-cols-4 gap-2.5">
          {tasks.length === 0 ? (
            <p className="text-center text-gray-500">No tasks added yet.</p>
          ) : (
            sortedTasks.map((task) => (
              <div
                key={task._id}
                className="bg-task-card flex flex-col gap-3.5 p-4 border-1 rounded-md hover:shadow-lg transition-all"
              >
                <div className="flex justify-between">
                  <p className="font-bold">{task.category}</p>
                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        setEditTask(task);
                        setModalOpen(true);
                      }}
                    >
                      <AiOutlineEdit size={20} />
                    </button>
                    <button onClick={() => deleteTask(task._id)}>
                      <MdDelete size={20} />
                    </button>
                    <button onClick={() => togglePinTask(task._id)}>
                      {task.pinned ? (
                        <RiUnpinFill size={20} />
                      ) : (
                        <MdPushPin size={20} />
                      )}
                    </button>
                  </div>
                </div>
                <h1 className="font-bold">{task.title}</h1>
                <p>{task.description}</p>
                <div className="flex items-center font-medium justify-between">
                  <p>{task.progress}</p>
                  <p>{task.priority}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};
