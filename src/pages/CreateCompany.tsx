import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBuilding, FaGlobe } from "react-icons/fa";
import axios from "axios";
import TextInput from "../components/TextInput";
import FileUpload from "../components/FileUpload";
import ColorPicker from "../components/ColorPicker";
import authImage from "../assets/auth-image.png";
import logo from "../assets/logo.svg";

const API_URL = "http://localhost:8000/api/v1/tenants/create/";

const CreateCompany = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [domain, setDomain] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [primaryColor, setPrimaryColor] = useState("#4F46E5");
  const [secondaryColor, setSecondaryColor] = useState("#A5B4FC");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Validate logo before setting
  const handleLogoUpload = (file: File) => {
    const allowedFormats = ["image/png", "image/jpeg", "image/jpg"];
    const maxSize = 2 * 1024 * 1024; // 2MB

    if (!allowedFormats.includes(file.type)) {
      setError("Only PNG, JPG, and JPEG files are allowed.");
      return;
    }

    if (file.size > maxSize) {
      setError("File size must be less than 2MB.");
      return;
    }

    setError(null);
    setLogoFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!companyName || !domain || !primaryColor || !secondaryColor || !logoFile) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("name", companyName.trim()); // ✅ Change `domain` to `name`
    formData.append("domain", domain.trim());
    formData.append("primary_color", primaryColor.trim());
    formData.append("secondary_color", secondaryColor.trim());
    formData.append("logo", logoFile);

    // ✅ Debugging: Log FormData before sending
    formData.forEach((value, key) => console.log(`${key}:`, value));

    try {
      const response = await axios.post(API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("API Response:", response.data);

      // ✅ Save company data in LocalStorage
      localStorage.setItem("company", JSON.stringify(response.data));

      // ✅ Redirect to registration page
      navigate("/register");
    } catch (err: any) {
      console.error("API Error:", err.response?.data);
      setError(err.response?.data?.name?.[0] || "Failed to create company. Please try again.");
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

          <h1 className="text-3xl font-bold text-gray-900">Let’s brand your business</h1>

          {/* Error Message */}
          {error && <p className="text-red-500 mt-4">{error}</p>}

          {/* Form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <TextInput
              icon={<FaBuilding className="text-gray-500" />}
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />

            <TextInput
              icon={<FaGlobe className="text-gray-500" />}
              placeholder="Company Domain (e.g., rentalske.com)"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
            />

            <div className="mt-2">
              <FileUpload onUpload={handleLogoUpload} fileName={logoFile ? logoFile.name : null} />
            </div>

            <ColorPicker label="Choose your primary color" color={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} />
            <ColorPicker label="Choose your secondary color" color={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} />

            {/* Continue Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium text-lg hover:bg-indigo-700 transition mt-4"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Continue"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateCompany;
