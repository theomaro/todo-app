#

## 1. Planning

### 1.1 Objectives

- To build a user-friendly, responsive Todo list application with React.js that helps users manage (add, edit, delete, search and filter) their tasks effectively.

### 1.2 User Stories

1. As a user, I want to **add a new todo item** so that I can track of what I need to do.
2. As a user, I want to **view all my todo items** so that I know what tasks are pending.
3. As a user, I want to **edit existing todo items** so that I can update my plans.
4. As a user, I want to **delete todo items** so that I can remove tasks that are no longer relevant.
5. As a user, I want to **mark todo items as completed** so that I can track what I’ve already done as well as focus on my pending tasks.
6. As a user, I want to **filter tasks** based on their status (all, active, completed) so that I can easily see the tasks I’m interested in.
7. As a user, I want to **search tasks** so that I can find specific tasks quickly
8. As a user, I want to **sort tasks** by title, status and priority.
9. As a user, I want to **persist tasks** so that I can find them whenever I want.

### 1.3 Scope

- **Phase 1**: Basic CRUD operations (Create, Read, Update, Delete) for todo items.
- **Phase 2**: Intermediate features like _persist tasks_, _marking task as complete_, _search_, _sort_ and _filter_ tasks.
- **Phase 3**: Additional features like _due dates_ and _Priority Setting_.

---

## 2. Features

### 2.1 Core Features

1. &#x2714; **Add Todo Item**: Users can add to their to-do list a new task with a title and description.
2. &#x2714; **View Todo List**: Users can display a list of all tasks.
3. &#x2714; **Edit Todo Item**: Users can edit the title and description of an existing task.
4. &#x2714; **Delete Todo Item**: Users can remove a task from their list.
5. &#x2714; **Mark Tasks as Completed**: Users can mark tasks as completed.
6. &#x2714; **Task Priority**: Users can set the priority level for tasks (low, medium, high).

### 2.2 Intermediate features

1. &#x2714; **Filter Tasks**: Users can filter tasks based on their status (e.g., all, active, completed).
2. &#x2714; **Sort Tasks**: Users can sort tasks by different criteria (e.g., due date, priority, status, tasks).
3. &#x274C; **Search Tasks**: Users can find for a specific tasks quickly based on keywords.
4. &#x2714; **Persistent Storage**: Store tasks in the browser's local storage so they persist between sessions.
5. &#x274C; **Due Date/Time and Reminders**: Allow users to set a due date and time for each task
6. &#x274C; **User Authentication**: Users to sign up, log in, and manage their own task lists.

---

## 3. Technology

### 3.1 Core Technologies

1. **React.js**: The main framework for building the user interface.
2. **TypeScript**: For adding static typing to JavaScript.
3. **Context API**: For managing state across the application.
4. **Tailwind CSS**: For styling the application.
5. **Local Storage API**: For data pesistance.
6. **Jest and React Testing Library**: For unit and integration testing.
7. **Vercel**: For easily deploy the React app with minimal configuration.

### 3.2 Tools and Libraries

1. **Vite**: For bootstrapping the React project.
2. **ESLint and Prettier**: For code formatting and linting.
3. **react-icons**: For including icons in the UI.
4. **React Router**: For handling routing and page navigation in the application.
5. **classnames**: For conditional className management.
6. **uuid**: For generating unique identifiers for tasks.
7. **Formik and Yup**: For form management and validation.

---

## 4. Architecture

### 4.1 Component Structure

1. **App.tsx**: The main component that renders the entire application, manages the state of the application and containing the list of todos.
2. **Header**: Component for displaying the app title and navigation links.
3. **TodoProvider.tsx**: Provides the context for managing Todo state.
4. **TodoList.tsx**: The container for displaying the list of todos based on the current filter.
5. **TodoItem.tsx**: Represents a single todo item in the list, handles each todo, allowing users to mark as completed, edit, or delete.
6. **TodoForm.tsx**: Contains the form for adding or editing todo items.
7. **TodoFilter.tsx**: Allows users to filter todos based on their status.
8. **TodoSearch.tsx**: Allows users to search for specific task.
9. **Footer**: Component for displaying footer information and controls.

### 4.2 Data Flow

- **State Management**: Centralizes and Manages the application state using Context API.
- **Props Drilling**: Used for passing data from parent to child components.
- **Persistent Storage**: Used to pesist data and save todos locally if API is not available.

---

## 5. Implementation

### 5.1 Project Setup

1. **Initialize Project**:

   ```bash
   > npm create vite@latest todo-list-app -- --template react
   > cd todo-list-app
   ```

2. **Install Dependencies**:

   ```bash
   npm install react-router-dom tailwindcss
   ```

3. **Start Development Server**

   ```bash
   > npm run dev
   ```

### 5.2 Tailwind CSS Configuration

1. **adding Tailwind CSS to your `tailwind.config.js` file.**

   ```bash
   > npx tailwindcss init
   ```

2. **In your `tailwind.config.js`.**

   ```javascript
   module.exports = {
     content: ["./src/**/*.{js,jsx,ts,tsx}"],
     theme: {
       extend: {},
     },
     plugins: [],
   };
   ```

3. **Include Tailwind in your CSS file**

   ```css
   /* index.css */
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

### 5.3 Folder Structure

```folder
src/
|-- components/
|   |-- TodoForm.tsx
|   |-- TodoItem.tsx
|   |-- TodoList.tsx
|   |-- TodoFilter.tsx
|   |-- TodoSearch.tsx
|-- context/
|   |-- TodoContext.tsx
|-- App.tsx
|-- index.css
|-- main.tsx
|-- vite.env.d.ts (if necessary for defining types/interfaces)
```

This structure organizes components and context logically, making the codebase easy to navigate and maintain.

### 5.4 Component Implementation

#### 5.4.1 App Component

**Purpose:** Serves as the root component that renders the application and manages state and context if necessary.

- **Code:**

  ```tsx
  // App.tsx

  import React from "react";
  import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
  import Header from "./components/Header";
  import TodoFilter from "./components/TodoFilter";
  import TodoList from "./components/TodoList";
  import TodoForm from "./components/TodoForm";
  import Footer from "./components/Footer";
  import { TodoProvider } from "./context/TodoContext";

  const App: React.FC = () => {
    return (
      <Router>
        <TodoProvider>
          <div className="container mx-auto p-4">
            <Header />
            <TodoFilter />
            <Routes>
              <Route path="/" element={<TodoList />} />
              <Route path="/add" element={<TodoForm />} />
              <Route path="/edit/:id" element={<TodoForm />} />
            </Routes>
            <Footer />
          </div>
        </TodoProvider>
      </Router>
    );
  };

  export default App;
  ```

#### 5.4.2 TodoList Component

**Purpose:** Renders a list of TodoItem components.

- **Code:**

  ```tsx
  // TodoList.tsx

  import { useTodos } from "../context/TodoContext";
  import TodoItem from "./TodoItem";

  const TodoList: React.FC = () => {
    const [todos, filter] = useTodos([]);

    const filteredTodos = todos.filter((todo) => {
      if (filter === "all") return true;
      if (filter === "active") return !todo.completed;
      if (filter === "completed") return todo.completed;
      return true;
    });

    return (
      <ul>
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    );
  };

  export default TodoList;
  ```

#### 5.4.3 TodoItem Component

**Purpose:** Displays individual todo items with options to update or delete.

- **Code:**

  ```tsx
  // TodoItem.tsx
  import React from "react";
  import { Link } from "react-router-dom";
  import { useTodos } from "../context/TodoContext";
  import { Todo } from "../types";

  interface TodoItemProps {
    todo: Todo;
  }

  const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
    const { toggleTodo, deleteTodo, editTodo } = useTodos();

    return (
      <li className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <input
            readOnly
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
            className="mr-2"
          />

          <input
            type="text"
            value={todo.title}
            onChange={(e) => editTodo(todo.id, e.target.value)}
            className={`border-none ${todo.completed ? "line-through" : ""}`}
          />

          <input
            type="text"
            value={todo.description}
            onChange={(e) => editTodo(todo.id, e.target.value)}
            className={`border-none ${todo.completed ? "line-through" : ""}`}
          />
        </div>

        <Link to={`/edit/${todo.id}`}>Edit</Link>

        <button onClick={() => deleteTodo(todo.id)} className="text-red-500">
          Delete
        </button>
      </li>
    );
  };

  export default TodoItem;
  ```

#### 5.4.4 TodoForm Component

**Purpose:** Provides a form to add new todo.

- **Code:**

  ```tsx
  // TodoForm.tsx
  import React, { useState } from "react";
  import { useParams, useNavigate } from "react-router-dom";
  import { useTodos } from "../context/TodoContext";
  import { Todo } from "../types";

  const TodoForm: React.FC = () => {
    const [title, setTitle] = useState<Todo>("");
    const [description, setDescription] = useState<Todo>("");
    const { addTodo, editTodo } = useTodos();

    const { id } = useParams();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
      e.preventDefault();

      if (id) {
        // Update (PUT)
        editTodo({ title, description });
        setTitle("");
        setDescription("");

        navigate("/");
      } else {
        // Create (POST)
        addTodo({ title, description });
        setTitle("");
        setDescription("");

        navigate("/");
      }
    };

    return (
      <form onSubmit={handleSubmit} className="mb-4">
        <h2>Add a new task</h2>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="border p-2 w-full"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="border p-2 w-full"
        />
        <button type="submit">Save</button>
      </form>
    );
  };

  export default TodoForm;
  ```

#### 5.4.5 TodoFilter.tsx

Component to filter todos based on their status.

```tsx
// TodoFilter.tsx

import React from "react";
import { useTodos } from "../context/TodoContext";

const TodoFilter: React.FC = () => {
  const { filter, setFilter } = useTodos();

  return (
    <>
      <button onClick={() => setFilter("all")}>All</button>
      <button onClick={() => setFilter("active")}>Active</button>
      <button onClick={() => setFilter("completed")}>Completed</button>
    </>
  );
};

export default TodoFilter;
```

#### 5.4.6 Header Components

**Purpose:** Displays the title of the Todo list app.

- **Code:**

  ```tsx
  // Header.js
  import React from "react";
  import { Link } from "react-router-dom";

  function Header() {
    return (
      <header>
        <h1 className="text-3xl font-bold text-center mb-4">Todo List</h1>

        <nav>
          <Link to="/">Home</Link>
          <Link to="/add">Add Todo</Link>
        </nav>
      </header>
    );
  }

  export default Header;
  ```

#### 5.4.7 Footer Components

**Purpose:** Displays footer information or additional actions.

- **Code:**

  ```tsx
  // Footer.js
  import React from "react";

  function Footer() {
    return (
      <footer>
        <p>© 2024 Todo List App</p>
      </footer>
    );
  }

  export default Footer;
  ```

### 5.5 Context and State Management

The Context API will be used to manage the state of todos across the application. This context will hold the list of todos and provide functions to add, edit, delete, and filter todos.

```tsx
// TodoContext.tsx

import { createContext, useContext, useState } from "react";

interface Todo {
  id: string;
  description: string;
  completed: boolean;
}

interface TodoContextType {
  todos: Todo[];
  addTodo: (description: string) => void;
  editTodo: (id: string, description: string) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  filter: "all" | "active" | "completed";
  setFilter: (filter: "all" | "active" | "completed") => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodos must be used within a TodoProvider");
  }
  return context;
};

export const TodoProvider: React.FC = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const addTodo = (description: string) => {
    setTodos([...todos, { id: uuidv4(), description, completed: false }]);
  };

  const editTodo = (id: string, description: string) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, description } : todo))
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        editTodo,
        deleteTodo,
        toggleTodo,
        filter,
        setFilter,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
```

### 5.6 Local Storage API and Persistent Storage

- **Integrating local storage with a React component**

  ```tsx
  // Storage.tsx;
  import React, { useState, useEffect } from "react";

  function App() {
    const [value, setValue] = useState("");

    // Load initial data from local storage
    useEffect(() => {
      const savedValue = localStorage.getItem("myValue");
      if (savedValue) {
        setValue(savedValue);
      }
    }, []);

    // Save value to local storage whenever it changes
    useEffect(() => {
      localStorage.setItem("myValue", value);
    }, [value]);

    const handleChange = (event) => {
      setValue(event.target.value);
    };

    return (
      <div>
        <input type="text" value={value} onChange={handleChange} />
      </div>
    );
  }

  export default App;
  ```

- **Using Custom Hooks for handling local storage**: For better code organization

  ```javascript
  import { useState, useEffect } from "react";

  function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
      const savedValue = localStorage.getItem(key);
      return savedValue !== null ? JSON.parse(savedValue) : initialValue;
    });

    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
  }

  export default useLocalStorage;
  ```

- **Usage in a component:**

  ```javascript
  import React from "react";
  import useLocalStorage from "./useLocalStorage";

  function App() {
    const [value, setValue] = useLocalStorage("myValue", "");

    const handleChange = (event) => {
      setValue(event.target.value);
    };

    return (
      <div>
        <input type="text" value={value} onChange={handleChange} />
      </div>
    );
  }

  export default App;
  ```

- **React Apps with LocalForage**

  ```ts
  // import localforage
  import localforage from "localforage";

  // Configure LocalForage
  localforage.config({
    name: "todo-app", // Name of the database
    storeName: "todos", // Name of the data store
    version: 1.0, // Database version
    description: "Local storage for my web app", // Description for the database
    size: 5 * 1024 * 1024, // Size of the database in bytes (5 MB in this example)
    driver: [
      localforage.WEBSQL,
      localforage.INDEXEDDB,
      localforage.LOCALSTORAGE,
    ],
  });

  // Save data to local storage
  localforage.setItem("tasks", 1);

  // Load data from local storage
  localforage.getItem("tasks");
  ```

---

## 6. Testing

- **Unit Testing**: Use Jest and React Testing Library to write tests for individual components.
- **Integration Testing**: Test how components interact with each other and the state management.
- **End-to-End Testing**: Consider using Cypress for full integration testing.

---

## 7. Deployment

### 7.1 Build the Project

```bash
npm run build
npm run preview
```

### 7.2 Deploy to Vercel

```bash
npm i -g vercel
npm vercel
```

---

This guide should provide you with a solid foundation to start building a Todo list app using React.js. As you progress, you can expand the app with additional features and optimizations.
