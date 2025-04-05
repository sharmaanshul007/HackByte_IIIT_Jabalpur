import { Link } from "react-router-dom";
import { AlertTriangle, ArrowLeft } from "lucide-react";

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-10 rounded-xl shadow-xl text-center max-w-lg w-full">
                <div className="flex justify-center mb-6">
                    <AlertTriangle className="text-red-500 w-16 h-16" />
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">404 - Page Not Found</h1>
                <p className="text-gray-600 text-lg mb-6">
                    Oops! Looks like you're analyzing a frame that doesn't exist.
                </p>
                <p className="text-sm text-gray-500 mb-8">
                    The page you’re looking for might have been moved, deleted, or never existed. Even our AI couldn’t detect this one!
                </p>
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Go back home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;