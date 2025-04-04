import { Link } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar"

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h1 className="text-4xl font-bold mb-4">Welcome to Deepfake Detector</h1>
        <p className="text-lg text-gray-700 mb-6">
          Your AI companion to identify manipulated media. Defend truth with tech.
        </p>
        <Link to="/about" className="text-blue-600 hover:underline">
          Learn more about our project
        </Link>
      </main>

      <Footer />
    </div>
  )
}

export default App;