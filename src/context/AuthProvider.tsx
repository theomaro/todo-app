import { ReactNode, useEffect, useState } from "react";
import AuthContext, { User } from "./AuthContext";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const newUser: User | null = storedUser ? JSON.parse(storedUser) : null;
    if (newUser) setUser(newUser);
  }, [setUser]);

  const login = (userData: User) => {
    setUser(userData);

    // save user data in localStorage
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);

    // remove user data from localStorage
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
