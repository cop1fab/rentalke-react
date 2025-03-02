import { useState } from "react";
import axios from "axios";

interface EditListingModalProps {
  listing: any;
  onClose: () => void;
  onUpdate: (updatedListing: any) => void;
  tenantId: string | null;
  accessToken: string | null;
}

const API_BASE_URL = "http://localhost:8000/api/v1";

const EditListingModal: React.FC<EditListingModalProps> = ({ listing, onClose, onUpdate, tenantId, accessToken }) => {
  const [brand, setBrand] = useState(listing.brand);
  const [type, setType] = useState(listing.type);
  const [pricePerDay, setPricePerDay] = useState(listing.price_per_day);
  const [stateOfCharge, setStateOfCharge] = useState(listing.state_of_charge);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ Handle Form Submission
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    if (!tenantId || !accessToken) {
      setError("Tenant or authentication details are missing.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.patch(
        `${API_BASE_URL}/listings/${tenantId}/cars/${listing.id}/update/`,
        { brand, type, price_per_day: pricePerDay, state_of_charge: stateOfCharge },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ Listing Updated:", response.data);
      onUpdate(response.data); // ✅ Update parent state with new listing
      onClose(); // ✅ Close modal after update
    } catch (err: any) {
      console.error("❌ API Error:", err);
      setError("Failed to update listing.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]">
      <div className="bg-white p-6 rounded-lg shadow-xl w-[400px] relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Edit Listing</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">✖</button>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        {/* Form Inputs */}
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Brand</label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Price per Day ($)</label>
            <input
              type="number"
              value={pricePerDay}
              onChange={(e) => setPricePerDay(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">State of Charge (%)</label>
            <input
              type="number"
              value={stateOfCharge}
              onChange={(e) => setStateOfCharge(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditListingModal;
