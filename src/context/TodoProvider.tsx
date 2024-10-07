import { ReactNode } from "react";
import { Task } from "../vite-env";
import TodoContext from "./TodoContext";
import { v4 as uuidV4 } from "uuid";
import { sortBy } from "sort-by-typescript";
import useLocalStorage from "../hooks/LocalStorage";

const TodoProvider = ({ children }: TodoProviderProps) => {
  const [tasks, setTasks] = useLocalStorage("tasks", []);

  const getTask = (id: string): Task =>
    tasks.filter((task) => task.id === id)[0];

  const addTask = (task: Task): void =>
    setTasks([...tasks, { ...task, id: uuidV4() }]);

  const editTask = (id: string, newTask: Task) =>
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              title: newTask.title,
              completed: newTask.completed,
              description: newTask.description,
              priority: newTask.priority,
            }
          : task
      )
    );

  const deleteTask = (id: string): void =>
    setTasks(tasks.filter((task) => task.id !== id));

  const toggleTask = (id: string): void =>
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );

  const getTasks = (prop: string, filter: string): Task[] =>
    tasks.sort(sortBy(prop)).filter((task) => {
      if (filter === "all") return true;
      if (filter === "pending") return !task.completed;
      if (filter === "completed") return task.completed;
      return true;
    });

  const totalTasks = tasks.length;

  const totalPending = tasks.filter((task) => !task.completed).length;

  const totalCompleted = tasks.filter((task) => task.completed).length;

  // const value = useMemo(
  //   () => ({ tasks, setTasks, addTodo }),
  //   [tasks, setTasks, addTodo]
  // );

  return (
    <TodoContext.Provider
      value={{
        getTask,
        getTasks,
        addTask,
        editTask,
        deleteTask,
        toggleTask,
        totalTasks,
        totalPending,
        totalCompleted,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

interface TodoProviderProps {
  children: ReactNode;
}

export default TodoProvider;
