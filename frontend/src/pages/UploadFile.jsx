import { useRef, useState } from "react";
import { UploadCloud, FileCheck2 } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

export default function UploadFile() {
	const videoRef = useRef(null);

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
						Upload an image or video to analyze its authenticity using our
						AI-powered detection engine.
					</p>
				</section>

				{/* Upload Box */}
				<section className="max-w-3xl mx-auto bg-white border border-gray-200 shadow-md rounded-2xl p-8">
					<div className="flex flex-col items-center text-center">
						<UploadCloud className="w-12 h-12 text-indigo-600 mb-3" />
						<h2 className="text-xl font-semibold text-gray-800 mb-2">
							Upload Your Media File
						</h2>
						<p className="text-sm text-gray-500 mb-4">
							Accepted formats: <strong>JPG</strong>, <strong>PNG</strong>,{" "}
							<strong>MP4</strong>
						</p>

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
						className="cursor-pointer border"
						onClick={async () => {
							try {
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
								if (response.data.fake > response.data.real)
									console.log("Fake");
								else console.log("Real");
							} catch (error) {
								console.error("Error uploading file:", error);
							}
						}}
					>
						Send
					</button>
				</section>
			</main>
			<Footer />
		</div>
	);
}
