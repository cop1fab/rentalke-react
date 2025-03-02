import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPhone, FaLock } from "react-icons/fa";
import axios from "axios";
import TextInput from "../components/TextInput";
import authImage from "../assets/auth-image.png";
import defaultLogo from "../assets/logo.svg";

const API_URL = "http://localhost:8000/api/v1/auth/register/";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); // ✅ Fixed naming issue
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [tenantData, setTenantData] = useState({
    name: "",
    id: "",
    logo: defaultLogo,
    primaryColor: "#4F46E5",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ Load tenant data from local storage
  useEffect(() => {
    const storedTenant = localStorage.getItem("company");
    if (storedTenant) {
      const parsedTenant = JSON.parse(storedTenant);
      console.log("Loaded Tenant Data:", parsedTenant);

      setTenantData({
        name: parsedTenant.tenant?.name || "",
        id: parsedTenant.tenant?.id || "", // If the backend returns `id`
        logo: parsedTenant.tenant?.logo || defaultLogo,
        primaryColor: parsedTenant.tenant?.primary_color || "#4F46E5",
      });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !tenantData.name) {
      setError("All fields are required.");
      return;
    }
    if (!termsAccepted) {
      setError("You must accept the terms and conditions.");
      return;
    }

    setLoading(true);
    setError(null);

    const payload = {
      email,
      password,
      tenant_name: tenantData.name, // ✅ Use stored tenant name
    };

    try {
      console.log("Sending Payload:", payload);
      const response = await axios.post(API_URL, payload, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("API Response:", response.data);
      localStorage.setItem("user", JSON.stringify(response.data)); // ✅ Store user data
      navigate("/login"); // ✅ Redirect to login page
    } catch (err: any) {
      console.error("Full API Error:", err);
      console.error("Error Response:", err.response?.data);

      const errorMessage =
        err.response?.data?.tenant_name ||
        err.response?.data?.message ||
        "Failed to register. Please try again.";

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
          {/* Tenant Branding Logo */}
          <div className="flex justify-start mb-6">
            <img src={tenantData.logo} alt="Tenant Logo" className="h-10" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">Create An Account and Get Started</h1>

          {/* Error Message */}
          {error && <p className="text-red-500 mt-4">{error}</p>}

          {/* Form */}
          <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
            <TextInput
              icon={<FaPhone className="text-gray-500" />}
              placeholder="Email Address"
              value={email} // ✅ Fixed state usage
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextInput
              icon={<FaLock className="text-gray-500" />}
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Auto-filled Tenant Name */}
            <div
              className="bg-gray-100 p-3 rounded-lg text-gray-800 font-semibold"
              style={{ borderLeft: `5px solid ${tenantData.primaryColor}` }}
            >
              Tenant: {tenantData.name || "Loading..."}
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={() => setTermsAccepted(!termsAccepted)}
                className="h-4 w-4 mt-1 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label className="text-gray-600 text-sm">
                By creating an account, you confirm that you agree with our{" "}
                <a href="#" className="text-indigo-600 hover:underline">
                  terms and conditions
                </a>
              </label>
            </div>

            {/* Continue Button */}
            <button
              type="submit"
              className="w-full text-white py-3 rounded-lg font-medium text-lg hover:opacity-90 transition"
              disabled={loading}
              style={{ backgroundColor: tenantData.primaryColor }}
            >
              {loading ? "Registering..." : "Continue"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
