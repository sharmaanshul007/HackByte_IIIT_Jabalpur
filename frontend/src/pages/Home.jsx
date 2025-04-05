import {
	ShieldCheck,
	Search,
	UploadCloud,
	BarChart2,
	Video,
	Eye,
	Sparkles
} from "lucide-react";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
	const { isLoggedIn } = useAuth();
	return (
		<div className="bg-white text-gray-900 font-sans">
			{/* Hero Section */}
			<section className="px-6 md:px-20 py-20 text-center border-b border-gray-200">
				<div className="max-w-4xl mx-auto">
					<div className="flex justify-center mb-4 text-6xl">🕵️‍♂️</div>
					<h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
						Detect Deepfakes in Seconds
					</h1>
					<p className="text-lg text-gray-600 mb-6">
						Upload videos to instantly identify manipulated media using our
						AI-powered deepfake detection platform.
					</p>

					<div className="flex justify-center gap-4 mt-8">
						<Link
							to="/upload"
							className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition"
						>
							Upload & Detect
						</Link>

						<button
							onClick={() => {
								if (isLoggedIn) {
									axios.get("http://127.0.0.1:8000/capture/cam");
								} else {
									window.location.href = "/login";
								}
							}}
							className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition cursor-pointer"
						>
							Webcam Detection
						</button>
						<button
							onClick={() => {
								if (isLoggedIn) {
									axios.get("http://127.0.0.1:8000/capture/screen");
								} else {
									window.location.href = "/login";
								}
							}}
							className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition cursor-pointer"
						>
							Live Screen Detection
						</button>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="px-6 md:px-20 py-24 bg-gray-50 border-b border-gray-200">
				<div className="max-w-6xl mx-auto text-center">
					<h2 className="text-4xl font-bold text-gray-800 mb-14">
						What You Can Do <span className="ml-1">🔍</span>
					</h2>

					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
						{[
							{
								icon: <UploadCloud className="w-7 h-7 text-indigo-600" />,
								title: "Upload",
								desc: "Easily upload images or videos — no login required. Just drag, drop, and go."
							},
							{
								icon: <Search className="w-7 h-7 text-indigo-600" />,
								title: "Analyze",
								desc: "Let our deep learning model inspect your file for signs of manipulation."
							},
							{
								icon: <BarChart2 className="w-7 h-7 text-indigo-600" />,
								title: "Results",
								desc: "Get clear results with confidence scores and explainability insights."
							}
						].map((item, i) => (
							<div
								key={i}
								className="bg-white p-6 rounded-2xl border border-indigo-300 hover:shadow-md hover:border-gray-200 transition-all duration-200"
							>
								<div className="flex items-center gap-3 mb-4">
									<div className="p-3 bg-indigo-100 rounded-full shadow-sm">
										{item.icon}
									</div>
									<h3 className="text-lg font-semibold text-gray-800">
										{item.title}
									</h3>
								</div>
								<p className="text-sm text-gray-600 leading-relaxed">
									{item.desc}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Platform Features Section */}
			<section className="px-6 md:px-20 py-24 bg-white">
				<div className="max-w-5xl mx-auto text-center">
					<div className="text-5xl mb-3">🚀</div>
					<h2 className="text-3xl font-bold text-gray-800 mb-12">
						Why Choose Us
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
						{[
							{
								icon: <Video className="w-6 h-6 text-indigo-600" />,
								title: "Media Flexibility",
								desc: "Detect deepfakes in both videos and images. Support for all common formats."
							},
							{
								icon: <ShieldCheck className="w-6 h-6 text-indigo-600" />,
								title: "Secure & Private",
								desc: "Your files are processed securely and never stored. GDPR compliant."
							},
							{
								icon: <Eye className="w-6 h-6 text-indigo-600" />,
								title: "Visual Insights",
								desc: "Coming soon: heatmaps highlighting regions of interest or manipulation."
							},
							{
								icon: <Sparkles className="w-6 h-6 text-indigo-600" />,
								title: "Confidence Reports",
								desc: "Each analysis comes with confidence scores to help you make informed decisions."
							}
						].map((feature, i) => (
							<div
								key={i}
								className="flex items-start gap-4 bg-gray-50 p-5 rounded-lg border-l-4 border-indigo-600 shadow-sm"
							>
								<div className="mt-1">{feature.icon}</div>
								<div>
									<h4 className="text-md font-semibold text-gray-800">
										{feature.title}
									</h4>
									<p className="text-sm text-gray-600 mt-1 leading-relaxed">
										{feature.desc}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="px-6 md:px-20 py-16 bg-gray-100 text-center">
				<div className="text-4xl my-4">🧪</div>
				<h2 className="text-2xl font-semibold mb-4">Try It for Free</h2>
				<p className="text-gray-600 mb-6">
					Upload your first media file and see how our platform detects
					deepfakes in real time.
				</p>
				<Link
					href="/upload"
					className="bg-slate-900 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-slate-800 transition"
				>
					Get Started →
				</Link>
			</section>
		</div>
	);
}
