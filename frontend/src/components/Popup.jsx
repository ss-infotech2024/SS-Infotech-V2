import React, { useEffect, useState } from "react";

export default function Popup({ duration = 20, onClose }) {
  const [timer, setTimer] = useState(duration);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!visible) return;

    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setVisible(false);
          clearInterval(countdown);
          if (onClose) onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[999] animate-fadeIn">
      <div className="bg-white text-gray-900 rounded-2xl shadow-xl p-8 w-96 max-w-[90%] relative transform scale-105 animate-popIn">
        {/* Close Button */}
        <button
          onClick={() => {
            setVisible(false);
            if (onClose) onClose();
          }}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-2xl font-bold transition"
        >
          ✕
        </button>

        {/* Header */}
        <h2 className="text-2xl md:text-3xl font-bold mb-3 text-blue-600 text-center">
          🎉 Welcome to SS Infotech
        </h2>
        <p className="text-md md:text-lg mb-6 text-center text-gray-700">
          Discover our latest updates, opportunities, and services today.
        </p>

        {/* Redirect Button */}
        <div className="flex justify-center mb-4">
          <a
            href="https://skill2success.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:bg-blue-700 transition duration-300"
          >
            Visit S2S Website
          </a>
        </div>

        {/* Countdown */}
        <div className="text-center text-gray-500 font-medium">
          Closing in <span className="font-bold">{timer}</span> seconds...
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        @keyframes popIn {
          0% { transform: scale(0.9); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-popIn {
          animation: popIn 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
