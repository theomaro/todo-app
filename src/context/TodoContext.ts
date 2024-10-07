import { createContext, useContext } from "react";
import { Task } from "../vite-env";

const TodoContext = createContext<TodoContextProps>({
  totalTasks: 0,
  totalPending: 0,
  totalCompleted: 0,
  getTask: () => null,
  getTasks: () => [],
  addTask: () => {},
  editTask: () => {},
  deleteTask: () => {},
  toggleTask: () => {},
});

export const useTodos = () => {
  const todoContext = useContext(TodoContext);

  if (!todoContext)
    throw new Error("useTodos must be used within a TodoProvider");

  return todoContext;
};

interface TodoContextProps {
  totalTasks: number;
  totalPending: number;
  totalCompleted: number;
  getTask: (id: string) => Task | null;
  getTasks: (prop: string, filter: string) => Task[];
  addTask: (task: Task) => void;
  editTask: (id: string, task: Task) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
}

export default TodoContext;
