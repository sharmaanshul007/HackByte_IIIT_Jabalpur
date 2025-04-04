import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinkStyle = (path) =>
    `block px-4 py-2 rounded-md text-sm font-medium ${
      pathname === path
        ? "text-blue-500 bg-blue-100"
        : "text-gray-700 hover:text-blue-500 hover:bg-gray-100"
    }`;

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm w-full">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600">Deepfake Detector</div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className={navLinkStyle("/")}>
            Home
          </Link>
          <Link to="/about" className={navLinkStyle("/about")}>
            About
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 hover:text-blue-600 transition"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          <Link to="/" onClick={() => setIsOpen(false)} className={navLinkStyle("/")}>
            Home
          </Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className={navLinkStyle("/about")}>
            About
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;