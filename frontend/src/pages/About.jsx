import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const About = () => {
	return (
		<>
			<Navbar />
			<section className="min-h-screen bg-gray-50 flex flex-col items-center px-6 py-10 text-gray-800">
				<div className="max-w-4xl w-full text-center">
					<img
						src="https://cdn-icons-png.flaticon.com/512/3208/3208721.png"
						alt="AI detection"
						className="w-28 h-28 mx-auto mb-6"
					/>
					<h1 className="text-4xl font-bold mb-4">About Our Project</h1>
					<p className="text-lg text-gray-700 mb-6">
						In a digital age where misinformation can spread faster than truth,
						detecting manipulated media like deepfakes is crucial. This
						application is designed to help users verify the authenticity of
						images and videos using an advanced AI model trained to detect
						deepfakes with high accuracy.
					</p>

					<div className="grid md:grid-cols-2 gap-8 text-left mt-10">
						<div>
							<h2 className="text-2xl font-semibold mb-2">🔬 What We Built</h2>
							<ul className="list-disc pl-5 space-y-2 text-gray-700">
								<li>Frontend using React.js & Tailwind CSS</li>
								<li>REST API backend with Python</li>
								<li>Deepfake detection using a pretrained ML model (.pth)</li>
								<li>Real-time results with confidence score</li>
							</ul>
						</div>

						<div>
							<h2 className="text-2xl font-semibold mb-2">🧠 The Technology</h2>
							<ul className="list-disc pl-5 space-y-2 text-gray-700">
								<li>Model trained on FaceForensics++ and Deepfake datasets</li>
								<li>ResNet-based architecture for classification</li>
								<li>Video frame sampling for deeper analysis</li>
								<li>Secure media upload & fast inference</li>
							</ul>
						</div>
					</div>

					<div className="mt-12 text-center">
						<h2 className="text-2xl font-semibold mb-2">👨‍💻 Meet the Team</h2>
						<p className="text-gray-700">
							We’re a team of 4 passionate developers participating in a
							hackathon, driven by the mission to make AI work for digital
							truth. 💡
						</p>
					</div>

					<Link
						to="/"
						className="inline-block mt-10 text-blue-600 hover:underline text-lg"
					>
						← Back to Home page
					</Link>
				</div>
			</section>

			<Footer />
		</>
	);
};

export default About;
