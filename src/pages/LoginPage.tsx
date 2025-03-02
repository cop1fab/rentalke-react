import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPhone, FaLock } from "react-icons/fa";
import axios from "axios";
import TextInput from "../components/TextInput";
import authImage from "../assets/auth-image.png";
import logo from "../assets/logo.svg";

const API_URL = "http://localhost:8000/api/v1/auth/login/";

const Login = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phone || !password) {
      setError("Phone number and password are required.");
      return;
    }

    setLoading(true);
    setError(null);

    const payload = {
      email: phone, // ✅ API expects "email" as key
      password,
    };

    try {
      console.log("Logging in with:", payload);
      const response = await axios.post(API_URL, payload, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("API Response:", response.data);

      // ✅ Store token & user info in LocalStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data));

      // ✅ Redirect user to dashboard
      navigate("/dashboard");
    } catch (err: any) {
      console.error("Login Error:", err);
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Invalid credentials. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full h-screen flex">
      {/* Left Image Section */}
      <div className="hidden md:block md:w-1/2 relative">
        <img src={authImage} alt="Branding Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Right Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-8 md:px-16">
        <div className="w-full max-w-md bg-white p-10 rounded-xl shadow-xl">
          {/* Logo */}
          <div className="flex justify-start mb-6">
            <img src={logo} alt="RentalsKE Logo" className="h-10" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back!</h1>
          <p className="text-gray-600 text-sm mb-6">Enter your phone number to log into your account.</p>

          {/* Error Message */}
          {error && <p className="text-red-500 mb-4">{error}</p>}

          {/* Form */}
          <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
            <TextInput
              icon={<FaPhone className="text-gray-500" />}
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <TextInput
              icon={<FaLock className="text-gray-500" />}
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Forgot Password */}
            <div className="text-right text-sm">
              <a href="#" className="text-indigo-600 hover:underline">
                Forgot Password
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium text-lg hover:bg-indigo-700 transition"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* Register Link */}
            <p className="text-sm text-gray-600 text-center mt-4">
              Not registered yet?{" "}
              <a href="/register" className="text-indigo-600 font-medium hover:underline">
                Register Here
              </a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
