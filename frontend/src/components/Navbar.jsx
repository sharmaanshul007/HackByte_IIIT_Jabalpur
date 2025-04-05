import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

import { useAuth } from "../context/AuthProvider.jsx"; // Importing the AuthContext

const Navbar = () => {
	const { pathname } = useLocation();
	const [isOpen, setIsOpen] = useState(false);

	const { isLoggedIn, setIsLoggedIn } = useAuth(); // Check if user is logged in

	const navLinkStyle = (path) =>
		`block px-4 py-2 rounded-md text-sm font-medium transition ${
			pathname === path
				? "text-blue-500 bg-blue-100"
				: "text-gray-700 hover:text-blue-500 hover:bg-gray-100"
		}`;

	return (
		<header className="bg-white border-b border-gray-200 shadow-sm w-full">
			<nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
				{/* Logo */}
				<div className="text-2xl font-bold text-blue-600">
					Deepfake Detector
				</div>

				{/* Desktop Links */}
				<div className="hidden md:flex items-center space-x-6">
					<Link
						to="/"
						className={navLinkStyle("/")}
					>
						Home
					</Link>
					<Link
						to="/about"
						className={navLinkStyle("/about")}
					>
						About
					</Link>
					{!isLoggedIn && (
						<Link
							to="/login"
							className={navLinkStyle("/login")}
						>
							Login
						</Link>
					)}
					{!isLoggedIn && (
						<Link
							to="/signup"
							className={`ml-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition`}
						>
							Sign Up
						</Link>
					)}
					{isLoggedIn && (
						<Link
							to="/"
							onClick={() => {
								localStorage.removeItem("isLoggedIn"); // Clear token on logout
								setIsLoggedIn(false);
							}}
							className={`${navLinkStyle(
								"/"
							)} bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition`}
						>
							Logout
						</Link>
					)}
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
				<div className="md:hidden px-4 pb-4 space-y-2">
					<Link
						to="/"
						onClick={() => setIsOpen(false)}
						className={navLinkStyle("/")}
					>
						Home
					</Link>
					<Link
						to="/about"
						onClick={() => setIsOpen(false)}
						className={navLinkStyle("/about")}
					>
						About
					</Link>

					{!isLoggedIn && (
						<Link
							to="/login"
							onClick={() => setIsOpen(false)}
							className={navLinkStyle("/login")}
						>
							Login
						</Link>
					)}
					{!isLoggedIn && (
						<Link
							to="/signup"
							onClick={() => setIsOpen(false)}
							className="block px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition"
						>
							Sign Up
						</Link>
					)}
					{isLoggedIn && (
						<Link
							to="/"
							onClick={() => {
								localStorage.removeItem("isLoggedIn"); // Clear token on logout
								setIsOpen(false);
								setIsLoggedIn(false);
							}}
							className={`${navLinkStyle(
								"/"
							)} bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition`}
						>
							Logout
						</Link>
					)}
				</div>
			)}
		</header>
	);
};

export default Navbar;
