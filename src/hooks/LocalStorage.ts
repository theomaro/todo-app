import { useEffect, useState } from "react";
import { Task } from "../vite-env";

function useLocalStorage(
  key: string,
  initialValue: Task[]
): [Task[], React.Dispatch<React.SetStateAction<Task[]>>] {
  const [tasks, setTasks] = useState<Task[]>(() => {
    // Load initial data from local storage
    const localTasks = localStorage.getItem(key);
    return localTasks ? JSON.parse(localTasks) : initialValue;
  });

  // Save value to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(tasks));
  }, [key, tasks]);

  return [tasks, setTasks];
}

export default useLocalStorage;
