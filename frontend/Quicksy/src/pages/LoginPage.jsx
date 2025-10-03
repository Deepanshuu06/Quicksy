import React from "react";

function LoginPage() {
  return (
    <div className="flex items-center justify-center px-4 py-12 bg-gray-50 min-h-[calc(100vh-64px)]">
      {/* Adjust 64px to match your navbar height if it's different */}

      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-6">
          Login to Quicksy
        </h2>

        <form className="space-y-5">
          {/* Email or Phone Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email or Phone
            </label>
            <input
              type="text"
              placeholder="you@example.com or 9876543210"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Login
          </button>

          {/* Signup / Forgot Links */}
          <div className="text-sm text-center text-gray-600 mt-4">
            <p>
              Don’t have an account?{" "}
              <a href="/register" className="text-green-600 font-medium hover:underline">
                Sign up
              </a>
            </p>
            <p className="mt-2">
              <a href="/forgot-password" className="text-gray-500 hover:underline">
                Forgot password?
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
