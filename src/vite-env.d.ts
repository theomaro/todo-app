/// <reference types="vite/client" />

export interface Task {
  id?: readonly string;
  title: string;
  description?: string;
  completed: boolean;
  priority: string;
}
