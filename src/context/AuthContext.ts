import { createContext, useContext } from "react";

const AuthContext = createContext<{
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}>({
  user: null,
  login: () => {},
  logout: () => {},
});

export type User = {
  email: string;
  name: string;
};

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext)
    throw new Error("useAuth must be used within a AuthProvider");

  return authContext;
};

export default AuthContext;
