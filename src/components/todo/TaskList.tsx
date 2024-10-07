import { useState } from "react";
import FilterTasks from "./FilterTasks";
import TaskItem from "./TaskItem";
import { useTodos } from "../../context/TodoContext";
import SortTasks from "./SortTasks";

function TaskList() {
  const { getTasks: tasks } = useTodos();
  const [filter, setFilter] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <SortTasks sortBy={sortBy} setSortBy={setSortBy} />
        <FilterTasks filter={filter} setFilter={setFilter} />
      </div>

      {tasks(sortBy, filter).length ? (
        <table className="min-w-full table-fixed divide-y divide-stone-300">
          <thead className="bg-gray-100">
            <tr>
              <th scope="col" className="p-4">
                <span className="sr-only">No.</span>
              </th>
              <th
                scope="col"
                className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase"
              >
                Title
              </th>
              <th
                scope="col"
                className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase"
              >
                Priority
              </th>
              <th
                scope="col"
                className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase"
              >
                Status
              </th>
              <th scope="col" className="p-4">
                <span className="sr-only">Action</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tasks(sortBy, filter).map((task, index) => (
              <TaskItem key={task.id} task={task} index={index + 1} />
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-sm text-rose-500 shadow rounded border-stone-300 py-2.5 px-3.5">
          List is empty
        </p>
      )}
    </>
  );
}

export default TaskList;
