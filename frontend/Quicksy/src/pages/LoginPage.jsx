import React from "react";
import axios from "axios";

function LoginPage() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting login:", { email, password });
        try {
            const res = await axios.post('http://localhost:7777/api/v1/auth/login', {
                email: email,
                password: password,
            });
            console.log("Login successful:", res.data);
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

  return (
    <div className="flex items-center justify-center px-4 py-12 bg-gray-50 min-h-[calc(100vh-64px)]">
      {/* Adjust 64px to match your navbar height if it's different */}

      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-6">
          Login to Quicksy
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email or Phone Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email or Phone</label>
            <input
              id="email"
              type="text"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
