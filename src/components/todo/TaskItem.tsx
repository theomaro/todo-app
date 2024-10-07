import { Task } from "../../vite-env";
import { useTodos } from "../../context/TodoContext";
import { Link } from "react-router-dom";
import { RiDeleteBin6Line, RiEditBoxLine } from "@remixicon/react";

function TaskItem({ task, index }: TaskItemProps) {
  const { deleteTask, toggleTask } = useTodos();

  return (
    <tr>
      <td className="py-2 px-4 w-4">{index}</td>
      <td className="py-2 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
        {task.title}
      </td>
      <td className="py-2 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
        {task.priority}
      </td>
      <td className="py-2 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
        <div className="flex items-center gap-x-2">
          <input
            type="checkbox"
            name={task.title}
            id={task.id}
            checked={task.completed}
            onChange={() => toggleTask(task.id)}
          />
          <label htmlFor={task.id}>
            {task.completed ? "completed" : "pending"}
          </label>
        </div>
      </td>
      <td className="py-2 px-6 text-sm font-medium text-right whitespace-nowrap">
        <div className=" flex items-center gap-2 justify-end">
          <Link to={`/edit/${task.id}`}>
            <RiEditBoxLine size={14} className="fill-orange-500" />
          </Link>

          <button onClick={() => deleteTask(task.id)}>
            <RiDeleteBin6Line size={14} className="fill-rose-500" />
          </button>
        </div>
      </td>
    </tr>
  );
}

interface TaskItemProps {
  task: Task;
  index: number;
}

export default TaskItem;
