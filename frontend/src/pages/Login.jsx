import { data, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
// import { useAuth } from "../context/AuthProvider.jsx";
// import { useNavigate } from "react-router-dom";

const LoginFunc = (formData) => {
    const res = axios.post("http://127.0.0.1:8000/login", formData)
    .then((res) => res.json())
    .then((data) => {   
        console.log(data);
        if (data.status === "success") {
            console.log("Login successful!");
            // Redirect to the upload page or perform any other action
        } else {
            console.log("Login failed:", data.message);
            // Show an error message to the user
        }
    })
    .catch((error) => { 
        console.error("Error during login:", error);
        // Handle the error (e.g., show an error message to the user)
    });
    console.log("data", formData);
    // const { setIsLoggedIn } = useAuth();
}

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-blue-600">Login</h2>
                <form className="mt-6"
                    onSubmit={(e) => {
                        e.preventDefault();
                        LoginFunc(formData); // Call the function when the form is submitted
                    }}
                >
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input 
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        value={formData.email}
                        type="email" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your email" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" 
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        value={formData.password}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your password" />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition cursor-pointer">
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;