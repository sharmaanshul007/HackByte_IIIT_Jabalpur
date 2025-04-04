// import { Link } from "react-router-dom";

// const Footer = () => {
//   return (
//     <footer className="bg-gray-50 border-t border-gray-200 mt-12">
//       <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-700 text-sm">
        
//         {/* Left: Logo & Description */}
//         <div className="flex flex-col items-start">
//           <h2 className="text-xl font-bold text-blue-600">Deepfake Detector</h2>
//           <p className="mt-2 text-gray-600">
//             An AI-powered tool to identify manipulated media and ensure authenticity.
//             Built with passion for the hackathon 💡
//           </p>
//         </div>

//         {/* Middle: Navigation */}
//         <div className="flex flex-col items-start md:items-center">
//           <h3 className="font-semibold mb-2">Navigation</h3>
//           <Link to="/" className="hover:text-blue-600 transition mb-1">Home</Link>
//           <Link to="/about" className="hover:text-blue-600 transition mb-1">About</Link>
//         </div>

//         {/* Right: Team Credit */}
//         <div className="flex flex-col items-start md:items-end">
//           <h3 className="font-semibold mb-2">Team DeepVision</h3>
//           <p className="text-gray-600">Made with ❤️ by a team of 4 passionate developers.</p>
//           <p className="mt-2 text-xs text-gray-500">
//             © {new Date().getFullYear()} Deepfake Detector. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#111827] text-gray-300 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Left: App Name & Tagline */}
        <div>
          <h2 className="text-2xl font-bold text-blue-400 mb-2">Deepfake Detector</h2>
          <p className="text-sm text-gray-400">
            Your AI companion to identify manipulated media. Defend truth with tech.
          </p>
        </div>

        {/* Middle: Navigation Links */}
        <div className="flex flex-col space-y-2 md:items-center">
          <h3 className="text-lg font-semibold text-gray-200">Quick Links</h3>
          <Link to="/" className="hover:text-blue-400 transition">Home</Link>
          <Link to="/about" className="hover:text-blue-400 transition">About</Link>
        </div>

        {/* Right: Team Info */}
        <div className="md:items-end">
          <h3 className="text-lg font-semibold text-gray-200 mb-2">Built by Team DeepVision</h3>
          <p className="text-sm text-gray-400">
            4 developers. 1 mission. Fighting misinformation with AI.
          </p>
          <p className="text-xs text-gray-500 mt-3">
            © {new Date().getFullYear()} Deepfake Detector. All rights reserved.
          </p>
        </div>
      </div>

      {/* Bottom line */}
      <div className="border-t border-gray-700 text-center py-4 text-xs text-gray-500">
        Built for Hackathons with ❤️ — React, Tailwind, and AI 🔍
      </div>
    </footer>
  );
};

export default Footer;