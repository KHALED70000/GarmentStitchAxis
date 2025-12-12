import React from 'react';
import { BsShieldFillExclamation } from "react-icons/bs";

const Error404 = () => {
  return (
    <div className="h-screen bg-gray-900 flex justify-center items-center p-4">
      <div className="flex flex-col items-center text-center space-y-4">
        {/* Icon */}
        <BsShieldFillExclamation className="text-9xl text-purple-500 animate-pulse" />

        {/* 404 Heading */}
        <h1 className="text-9xl font-extrabold text-white">404</h1>

        {/* Subheading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-300">
          Oops! This page is not available
        </h2>

        {/* Optional: Back button */}
        <a
          href="/"
          className="mt-6 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
};
export default Error404;