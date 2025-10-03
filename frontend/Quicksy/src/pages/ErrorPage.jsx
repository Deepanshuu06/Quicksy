import React from "react";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center text-center px-6 bg-white">
    
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
        Oops! Something went wrong.
      </h1>
      <p className="text-gray-500 text-sm sm:text-base max-w-md mb-6">
        The page you're looking for doesn't exist, or an unexpected error has occurred.  
      </p>

      <Link to="/">
        <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition">
          Go back to Homepage
        </button>
      </Link>
    </div>
  );
}

export default ErrorPage;
