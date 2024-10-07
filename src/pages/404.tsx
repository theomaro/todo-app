import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col gap-8 items-center justify-center h-screen">
      <p>Page Not Found</p>

      <Link className="py-3 px-4 bg-sky-700 text-white rounded w-fit" to="/">
        Go Back Home
      </Link>
    </div>
  );
}

export default NotFound;
