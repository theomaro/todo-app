import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="px-4 py-2 text-slate-800 flex justify-between items-center bg-sky-600 rounded-t">
      <h1 className="font-semibold capitalize text-lg md:text-xl text-white">
        Tasks
      </h1>

      <ul className="flex items-center justify-between">
        <li>
          <Link
            className="py.1.5 px-2.5 font-medium text-white text-sm md:text-base"
            to="/"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            className="py.1.5 px-2.5 font-medium text-white text-sm md:text-base"
            to="/todos"
          >
            Todos
          </Link>
        </li>
        <li>
          <Link
            className="py.1.5 px-2.5 font-medium text-white text-sm md:text-base"
            to="/todos/add"
          >
            Add Task
          </Link>
        </li>

        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
