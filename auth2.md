#

## user authentication with protected routes

To implement user authentication with protected routes in a ReactJS application using React Router, Context API, React Query, and PocketBase, follow these steps:

### 1. **Set Up PocketBase for Authentication**

- **Create Users Collection**: In PocketBase, create a collection for users, enabling email/password authentication.
- **Set Up PocketBase SDK**: Install and configure the PocketBase SDK in your React project.

```bash
npm install pocketbase
```

```javascript
import PocketBase from "pocketbase";

const pb = new PocketBase("http://localhost:8090");
```

### 2. **Context API for Authentication State**

Create a context to manage authentication state globally.

```javascript
import React, { createContext, useState, useEffect } from "react";
import { pb } from "./pocketbase"; // assuming you have configured PocketBase

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if the user is already logged in
    const storedUser = pb.authStore.model;
    setUser(storedUser);
  }, []);

  const login = async (email, password) => {
    const authData = await pb
      .collection("users")
      .authWithPassword(email, password);
    setUser(authData.user);
  };

  const logout = () => {
    pb.authStore.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
```

### 3. **React Query for Data Fetching**

Use React Query for handling data fetching and caching. It can also be used to fetch authenticated data.

```bash
npm install react-query
```

```javascript
import { useQuery } from "react-query";

const fetchUserData = async () => {
  if (!pb.authStore.isValid) throw new Error("Not authenticated");
  const user = pb.authStore.model;
  return user;
};

export const useUserData = () => {
  return useQuery("userData", fetchUserData, {
    enabled: !!pb.authStore.isValid, // only fetch if user is authenticated
  });
};
```

### 4. **Protected Routes with React Router**

Use React Router to create protected routes that only allow authenticated users to access certain pages.

```bash
npm install react-router-dom
```

```javascript
import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { useAuth } from "./authContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

const App = () => (
  <Router>
    <ProtectedRoute path="/dashboard" component={Dashboard} />
    <Route path="/login" component={Login} />
    {/* Add other routes */}
  </Router>
);
```

### 5. **Login Component**

Implement a login form that interacts with the PocketBase backend through the `login` function provided by the `AuthContext`.

```javascript
import React, { useState } from "react";
import { useAuth } from "./authContext";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      // Redirect to protected route
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
```

### 6. **Logout Functionality**

Implement a logout button that clears the user's authentication data.

```javascript
import React from "react";
import { useAuth } from "./authContext";

const LogoutButton = () => {
  const { logout } = useAuth();

  return <button onClick={logout}>Logout</button>;
};

export default LogoutButton;
```

### 7. **Handling Route Access and Redirects**

Make sure that unauthenticated users are redirected to the login page and that authenticated users can access the protected routes.

By following these steps, you'll have a ReactJS application with user authentication and protected routes using React Router, Context API, React Query, and PocketBase.
