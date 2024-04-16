import { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTasksAction,
  deleteTaskAction,
  updateTaskStatusAction,
} from '../redux/features/todo/todoSlice';
import { toast } from 'react-toastify';

const Home = () => {
  const dispatch = useDispatch();

  const tasksList = useSelector((state) => state.todo.allTasks);

  const [task, setTask] = useState('');
  const [openedStatusNo, setOpenedStatusNo] = useState(null);
  const [allTasks, setAllTasks] = useState([]);

  useEffect(() => {
    localStorage.setItem('allTasks', JSON.stringify(tasksList));
    setAllTasks(tasksList);
  }, [tasksList]);

  // add task
  const addTaskHandler = (e) => {
    e.preventDefault();

    if (task) {
      dispatch(
        addTasksAction([...tasksList, { taskName: task, status: 'pending' }])
      );

      setTask('');
      toast.success('Task Added Successfully!', {
        position: 'top-right',
        autoClose: 1500,
        closeOnClick: true,
      });
    } else {
      toast.error('Please Assign a Task!', {
        position: 'top-right',
        autoClose: 1500,
        closeOnClick: true,
      });
    }
  };

  // update task status
  const taskStatusHandler = (index, status) => {
    const updatedTasks = allTasks.map((task, i) => {
      if (i === index) {
        return { ...task, status };
      }
      return task;
    });
    dispatch(updateTaskStatusAction(updatedTasks));
    setOpenedStatusNo(null);

    toast.success('Task Status Updated Successfully!', {
      position: 'top-right',
      autoClose: 1500,
      closeOnClick: true,
    });
  };

  // delete task
  const deleteTaskHandler = (index) => {
    const updatedTasks = tasksList.filter((_, i) => i !== index);
    dispatch(deleteTaskAction(updatedTasks));

    toast.info('Task Deleted Successfully!', {
      position: 'top-right',
      autoClose: 1500,
      closeOnClick: true,
    });
  };

  return (
    <section className="py-12 md:py-20 min-h-screen flex justify-center items-center bg-slate-900 text-white overflow-x-hidden">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center justify-center gap-y-8 max-w-[600px] mx-auto">
          {/* headline */}
          <h2 className="text-center font-semibold text-3xl md:text-5xl uppercase">
            Your <span className="text-teal-500"> Todo </span>Solution
          </h2>

          {/* task adding input form */}
          <div className="bg-slate-600 shadow-xl p-8 md:px-12 rounded-lg w-full">
            <form onSubmit={addTaskHandler}>
              <input
                type="text"
                placeholder="Add Your Task..."
                className="py-2 px-3 text-white border-0 border-b-2 border-slate-400 focus:outline-slate-400 bg-transparent w-full font-semibold text-xl"
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
              <button
                type="submit"
                className="bg-teal-500 hover:bg-sky-600 py-3 px-8 rounded-md mt-6 w-full duration-500 uppercase font-bold"
              >
                Add Task
              </button>
            </form>
          </div>

          {/* todo list */}
          <div className="bg-slate-600 shadow-xl pt-4 rounded-lg w-full">
            <h4 className="text-center font-semibold text-3xl py-4">
              Your Tasks
            </h4>
            <div className="flex flex-col overflow-x-auto">
              <div className="inline-block min-w-full pt-2">
                <div className="overflow-x-auto">
                  <table className="min-w-full font-light">
                    <thead className="border-b border-slate-500 font-bold">
                      <tr>
                        <th scope="col" className="p-4">
                          Task
                        </th>
                        <th scope="col" className="p-4">
                          Status
                        </th>
                        <th scope="col" className="p-4">
                          Delete
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {allTasks.map((item, i) => {
                        return (
                          <tr
                            className={`bg-opacity-20 font-medium ${
                              i !== allTasks.length - 1 &&
                              'border-b border-slate-500'
                            } ${item.status === 'pending' && 'bg-red-600'} ${
                              item.status === 'completed' && 'bg-emerald-600'
                            } ${item.status === 'in progress' && 'bg-sky-600'}`}
                            key={i}
                          >
                            <td className="whitespace-nowrap text-ellipsis max-w-[180px] overflow-x-hidden px-6 py-4 text-center capitalize">
                              {item.taskName}
                            </td>
                            <td className="relative whitespace-nowrap px-6 py-4">
                              <button
                                className={`bg-opacity-80 hover:bg-opacity-85 text-center p-1.5 rounded-md duration-300 flex items-center justify-center gap-1 cursor-pointer capitalize w-[120px] mx-auto ${
                                  item.status === 'pending' && 'bg-red-600'
                                } ${
                                  item.status === 'completed' &&
                                  'bg-emerald-600'
                                } ${
                                  item.status === 'in progress' && 'bg-sky-600'
                                }`}
                                onClick={() =>
                                  setOpenedStatusNo(
                                    openedStatusNo === i ? null : i
                                  )
                                }
                              >
                                {item.status}{' '}
                                <IoMdArrowDropdown className="text-lg -mb-1" />
                              </button>
                              {openedStatusNo === i && (
                                <ul className="absolute top-[82%] left-1/2 -translate-x-1/2 bg-slate-500 rounded-md flex flex-col min-w-[120px] z-[1000]">
                                  <li
                                    className="py-1.5 px-3 w-full cursor-pointer hover:bg-red-600"
                                    onClick={() =>
                                      taskStatusHandler(i, 'pending')
                                    }
                                  >
                                    Pending
                                  </li>
                                  <li
                                    className="py-1.5 px-3 w-full cursor-pointer hover:bg-sky-600"
                                    onClick={() =>
                                      taskStatusHandler(i, 'in progress')
                                    }
                                  >
                                    In Progress
                                  </li>
                                  <li
                                    className="py-1.5 px-3 w-full cursor-pointer hover:bg-emerald-600"
                                    onClick={() =>
                                      taskStatusHandler(i, 'completed')
                                    }
                                  >
                                    Completed
                                  </li>
                                </ul>
                              )}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-red-600 text-xl duration-300 cursor-pointer hover:text-red-500 flex items-center justify-center mt-1.5">
                              <FaTrash onClick={() => deleteTaskHandler(i)} />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
