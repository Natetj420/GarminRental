import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-purple-600">
          MyBrand
        </Link>
        <nav className="space-x-4">
          <Link to="/" className="text-gray-700 hover:text-purple-600 transition">
            Home
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-purple-600 transition">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
