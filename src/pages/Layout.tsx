import { Outlet } from "react-router-dom";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import TodoProvider from "../context/TodoProvider";

function Layout() {
  return (
    <div className="max-w-xl mx-auto">
      <div className="space-y-8 flex flex-col h-screen">
        <Header />
        <TodoProvider>
          <div className="flex-1 px-2">
            <Outlet />
          </div>
        </TodoProvider>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
