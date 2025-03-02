import { FC, useState } from "react";
import axios from "axios";

interface AddListingModalProps {
  onClose: () => void;
  onAdd: (listing: any) => void;
  tenantId: string | null;
  accessToken: string | null;
}

const API_BASE_URL = "http://localhost:8000/api/v1";

const AddListingModal: FC<AddListingModalProps> = ({ onClose, onAdd, tenantId, accessToken }) => {
  // Form State
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [pricePerDay, setPricePerDay] = useState("");
  const [stateOfCharge, setStateOfCharge] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // ✅ Handle Form Submission
  const handleSubmit = async () => {
    console.log("🚀 Submitting Listing...");

    if (!tenantId || !accessToken) {
      setError("Tenant or authentication details missing.");
      console.error("🚨 Missing Tenant ID or Access Token", { tenantId, accessToken });
      return;
    }

    if (!brand || !type || !pricePerDay || !stateOfCharge || !availableFrom || photos.length === 0) {
      setError("Please fill in all fields.");
      console.warn("🚨 Form fields missing:", { brand, type, pricePerDay, stateOfCharge, availableFrom, photos });
      return;
    }

    // ✅ Create FormData object
    const formData = new FormData();
    formData.append("brand", brand);
    formData.append("type", type);
    formData.append("price_per_day", pricePerDay);
    formData.append("state_of_charge", stateOfCharge);
    formData.append("available_from", availableFrom);

    // ✅ Append multiple image files
    photos.forEach((file) => {
      formData.append("photos", file);
    });

    console.log("📤 Sending API Request to:", `${API_BASE_URL}/listings/${tenantId}/cars/create/`);
    console.log("📦 FormData Payload:", formData);

    setLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/listings/${tenantId}/cars/create/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data", // ✅ Must be multipart/form-data
          },
        }
      );

      console.log("✅ API Response:", response.data);
      onAdd(response.data);
      onClose();
    } catch (err: any) {
      console.error("❌ API Error:", err);
      setError(err.response?.data?.message || "Failed to create listing.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]">
      <div className="bg-white p-6 rounded-lg shadow-xl w-[400px] relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add a Car Listing</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            ✖
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        {/* Form */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Car Brand (e.g. Toyota)"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="text"
            placeholder="Car Type (e.g. SUV)"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="number"
            placeholder="Price per Day ($)"
            value={pricePerDay}
            onChange={(e) => setPricePerDay(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="number"
            placeholder="State of Charge (%)"
            value={stateOfCharge}
            onChange={(e) => setStateOfCharge(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="date"
            value={availableFrom}
            onChange={(e) => setAvailableFrom(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* File Upload Input */}
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => {
              if (e.target.files) {
                setPhotos(Array.from(e.target.files)); // ✅ Store selected files
              }
            }}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddListingModal;
