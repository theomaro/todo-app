import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTodos } from "../../context/TodoContext";
import { Task } from "../../vite-env";

function TaskForm() {
  const { addTask, editTask, getTask, deleteTask } = useTodos();
  const [task, setTask] = useState<Task>({
    id: "",
    title: "",
    description: "",
    completed: false,
    priority: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      setTask({
        id: "",
        title: "",
        description: "",
        completed: false,
        priority: "",
      });
      return;
    }

    const task = getTask(id);
    if (task) {
      setTask({
        id: task.id,
        title: task.title,
        description: task.description,
        completed: task.completed,
        priority: task.priority,
      });
    }
  }, [id, getTask]);

  function handleSubmit(ev: FormEvent<HTMLFormElement>): void {
    ev.preventDefault();

    if (!task.title || !task.priority) return;

    if (id) editTask(id, task);
    else addTask(task);

    navigate("/todos");
  }

  return (
    <form
      className="rounded shadow border border-sky-100 pb-6 pt-4 px-4 md:px-6 mx-3"
      onSubmit={handleSubmit}
    >
      <h2 className="font-medium text-xl text-sky-500 mb-4">
        {id ? "Edit" : "Create New"} Task
      </h2>

      <div className="flex flex-col mb-4">
        <label
          htmlFor="description"
          className="capitalize font-medium mb-1 text-sm"
        >
          title
        </label>
        <input
          className="text-stone-700 text-sm py-1.5 px-2.5 border border-sky-400 rounded outline-none placeholder:text-sm"
          type="text"
          id="text"
          name="text"
          placeholder="Add your task..."
          value={task.title}
          onChange={(ev) => setTask({ ...task, title: ev.target.value })}
        />
      </div>

      <div className="flex flex-col mb-4">
        <label
          htmlFor="description"
          className="capitalize font-medium mb-1 text-sm"
        >
          description
        </label>
        <textarea
          value={task.description}
          onChange={(ev) => setTask({ ...task, description: ev.target.value })}
          name="description"
          id="description"
          placeholder="Add your description..."
          className="text-stone-700 text-sm py-1.5 px-2.5 border border-sky-400 rounded outline-none placeholder:text-sm"
        ></textarea>
      </div>

      <div className="flex flex-col">
        <h4 className="capitalize font-medium mb-1 text-sm">priority</h4>

        <div className="flex items-center gap-2 text-sm w-20 ms-2 mb-1">
          <input
            value="high"
            checked={task.priority === "high"}
            onChange={(e) => setTask({ ...task, priority: e.target.value })}
            type="radio"
            name="priority"
            id="high"
          />
          <label className="capitalize" htmlFor="high">
            high
          </label>
        </div>

        <div className="flex items-center gap-2 text-sm w-20 ms-2 mb-1">
          <input
            value="medium"
            checked={task.priority === "medium"}
            onChange={(e) => setTask({ ...task, priority: e.target.value })}
            type="radio"
            name="priority"
            id="medium"
          />
          <label className="capitalize" htmlFor="medium">
            medium
          </label>
        </div>

        <div className="flex items-center gap-2 text-sm w-20 ms-2 mb-1">
          <input
            value="low"
            checked={task.priority === "low"}
            onChange={(e) => setTask({ ...task, priority: e.target.value })}
            type="radio"
            name="priority"
            id="low"
          />
          <label className="capitalize" htmlFor="low">
            low
          </label>
        </div>
      </div>

      <div
        className={`me-2 items-center text-sm mt-3 ${id ? "flex" : "hidden"}`}
      >
        <input
          type="checkbox"
          name="completed"
          id="completed"
          checked={task.completed}
          onChange={() => setTask({ ...task, completed: !task.completed })}
          className="me-2"
        />

        <span>Mark as complete</span>
      </div>

      <div className="flex justify-between items-center mt-8">
        <button
          className="bg-sky-400 text-white text-sm text-center font-semibold capitalize py-2 px-3.5 rounded"
          type="submit"
        >
          {id ? "Save" : "Add"}
        </button>

        {id ? (
          <button
            onClick={() => {
              if (id) deleteTask(id);
            }}
            className="bg-rose-400 text-white text-xs text-center font-semibold capitalize py-2 px-3.5 rounded"
          >
            Delete this task
          </button>
        ) : (
          ""
        )}
      </div>
    </form>
  );
}

export default TaskForm;
