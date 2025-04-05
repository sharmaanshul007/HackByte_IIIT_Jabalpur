import { useRef, useState } from "react";
import { UploadCloud, FileCheck2 } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

export default function UploadFile() {
	const videoRef = useRef(null);

	const [result, setResult] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const [previewUrl, setPreviewUrl] = useState("");

	return (
		<div className="bg-white text-gray-900">
			<Navbar />
			<main className="min-h-screen px-4 py-12 md:px-20 bg-gray-50">
				{/* Header */}
				<section className="max-w-4xl mx-auto text-center mb-16">
					<div className="text-5xl mb-4">🧠</div>
					<h1 className="text-4xl font-bold text-gray-800 mb-3">
						Detect Deepfakes Instantly
					</h1>
					<p className="text-lg text-gray-600">
						Upload an video to analyze its authenticity using our
						AI-powered detection system.
					</p>
				</section>

				{/* Upload Box */}
				<section className="max-w-3xl mx-auto bg-white border border-gray-200 shadow-md rounded-2xl p-8">
					<div className="flex flex-col items-center text-center">
						<UploadCloud className="w-12 h-12 text-indigo-600 mb-3" />
						<h2 className="text-xl font-semibold text-gray-800 mb-2">
							Upload Your Media File
						</h2>
						{/* <p className="text-sm text-gray-500 mb-4">
							Accepted formats: <strong>JPG</strong>, <strong>PNG</strong>,{" "}
							<strong>MP4</strong>
						</p> */}

						{/* Upload Button */}
						<label
							htmlFor="fileInput"
							className="cursor-pointer inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition"
						>
							<UploadCloud className="w-4 h-4" />
							Choose File
						</label>
						<input
							id="fileInput"
							type="file"
							// accept="image/*,video/*"
							ref={videoRef}
							className="hidden"
							onChange={(e) => {
								const uploadedFile = e.target.files[0];
								if (uploadedFile)
									setPreviewUrl(URL.createObjectURL(uploadedFile));
							}}
						/>
					</div>

					{/* Preview Section */}
					{videoRef.current?.files[0] && (
						<div className="mt-8 border-t pt-6">
							<div className="flex items-center gap-3 text-gray-700 mb-3">
								<FileCheck2 className="w-5 h-5 text-green-600" />
								<p className="font-medium">{videoRef.current?.files[0].name}</p>
							</div>

							<video
								src={previewUrl}
								controls
								className="rounded-lg border w-full max-h-[500px]"
							/>

							<p className="text-sm text-gray-500 mt-2">
								Size:{" "}
								{(videoRef.current?.files[0].size / 1024 / 1024).toFixed(2)} MB
							</p>
						</div>
					)}
					<button
						className="cursor-pointer border bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition mt-4"
						onClick={async () => {
							try {
								setIsLoading(true);
								const response = await axios.post(
									`http://127.0.0.1:8000/check`,
									{ file: videoRef.current?.files[0] },
									{
										headers: {
											"Content-Type": "multipart/form-data",
											"Access-Control-Allow-Origin": "*"
										}
									}
								);
								// if (response.data.fake > response.data.real)
								// 	console.log("Fake");
								// else console.log("Real");
								if (response.data.fake > response.data.real)
									setResult("The video appears to be FAKE.");
								else
									setResult("The video appears to be REAL.");

								setIsLoading(false);
							} catch (error) {
								console.error("Error uploading file:", error);
							}
						}}
					>
						Send
					</button>
				</section>
			</main>


			{isLoading && (
				<div className="flex flex-col items-center justify-center mt-8 pt-6 text-gray-700">
					{/* Spinner */}
					<div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3" />

					{/* Optional loading text */}
					<p className="text-sm font-medium text-gray-600">
						Analyzing your media, please wait...
					</p>
				</div>
			)}

			{!isLoading && result && (
				<div className="mt-12 flex justify-center animate-fade-in-up">
					<div
						className={`w-full max-w-xl p-6 rounded-2xl shadow-lg border-2 transition-all duration-500
        ${result.includes("FAKE")
								? "bg-red-50 border-red-200 text-red-700"
								: "bg-green-50 border-green-200 text-green-700"
							}`}
					>
						{/* Header */}
						<div className="flex flex-col items-center text-center">
							<div className="text-5xl mb-2">
								{result.includes("FAKE") ? "🚨" : "✅"}
							</div>
							<h2 className="text-2xl font-bold mb-1">
								{result.includes("FAKE")
									? "Potential Deepfake Detected"
									: "This Video Appears Authentic"}
							</h2>
							<p className="text-sm text-gray-600 mb-4 max-w-md">
								{result.includes("FAKE")
									? "Our AI-powered system has identified characteristics in this media that are commonly found in deepfakes. Please verify from trusted sources before sharing."
									: "This media does not show typical signs of manipulation. While no system is 100% accurate, this appears to be authentic."}
							</p>

							{/* Status Pill */}
							<span
								className={`px-4 py-1 rounded-full font-medium text-sm 
            ${result.includes("FAKE")
										? "bg-red-100 text-red-800"
										: "bg-green-100 text-green-800"
									}`}
							>
								{result}
							</span>
						</div>
					</div>
				</div>
			)}

			<Footer />
		</div>
	);
}
