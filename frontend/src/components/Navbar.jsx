import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              Portfolio Builder
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/create"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Create Portfolio
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
