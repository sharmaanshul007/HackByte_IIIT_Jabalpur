import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthProvider.jsx";

const Login = () => {
	const [formData, setFormData] = useState({ email: "", password: "" });
	const [errorMsg, setErrorMsg] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { setIsLoggedIn } = useAuth();

	const LoginFunc = async (formData) => {
		const { email, password } = formData;

		// Client-side validation
		if (!email || !password) {
			setErrorMsg("Please enter both email and password.");
			return;
		}

		try {
			setLoading(true);
			setErrorMsg("");

			const res = await axios.post("http://127.0.0.1:8000/login", formData);

			if (res.status === 200) {
				const data = res.data;

				if (data.message === "Login successful") {
					console.log("Login successful!");
					setIsLoggedIn(true);
					navigate("/");
				} else {
					setErrorMsg(data.message || "Login failed. Please try again.");
				}
			} else {
				setErrorMsg("Unexpected response from the server.");
			}
		} catch (error) {
			if (error.response) {
				// Server responded with a status outside 2xx
				setErrorMsg(error.response.data.message || "Invalid credentials.");
			} else if (error.request) {
				// Request was made but no response received
				setErrorMsg("No response from server. Please check your connection.");
			} else {
				// Something else went wrong
				setErrorMsg("An error occurred during login.");
			}
			console.error("Login error:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
				<h2 className="text-2xl font-bold text-center text-blue-600">Login</h2>
				<form
					className="mt-6"
					onSubmit={(e) => {
						e.preventDefault();
						LoginFunc(formData);
					}}
				>
					{errorMsg && (
						<p className="mb-4 text-red-600 text-sm text-center">{errorMsg}</p>
					)}
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700">
							Email
						</label>
						<input
							type="email"
							placeholder="Enter your email"
							value={formData.email}
							onChange={(e) =>
								setFormData({ ...formData, email: e.target.value })
							}
							className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700">
							Password
						</label>
						<input
							type="password"
							placeholder="Enter your password"
							value={formData.password}
							onChange={(e) =>
								setFormData({ ...formData, password: e.target.value })
							}
							className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
					<button
						type="submit"
						disabled={loading}
						className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition cursor-pointer disabled:opacity-60"
					>
						{loading ? "Logging in..." : "Login"}
					</button>
				</form>
				<p className="mt-4 text-center text-sm text-gray-600">
					Don't have an account?{" "}
					<Link
						to="/signup"
						className="text-blue-600 hover:underline"
					>
						Sign up
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;
