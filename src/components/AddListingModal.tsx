import { FC, useState } from "react";
import axios from "axios";

interface AddListingModalProps {
  onClose: () => void;
  onAdd: (listing: any) => void;
  tenantId: string | null;
  accessToken: string | null;
}

const AddListingModal: FC<AddListingModalProps> = ({ onClose, onAdd, tenantId, accessToken }) => {
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [pricePerDay, setPricePerDay] = useState("");
  const [stateOfCharge, setStateOfCharge] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // ✅ Handle Submit
  const handleSubmit = async () => {
    if (!brand || !type || !pricePerDay || !stateOfCharge || !availableFrom) {
      setError("Please fill in all fields!");
      return;
    }
    if (!tenantId || !accessToken) {
      setError("Tenant or authentication details missing.");
      return;
    }

    setLoading(true);
    setError(null);

    const newListing = {
      brand,
      type,
      price_per_day: pricePerDay,
      state_of_charge: stateOfCharge,
      available_from: availableFrom,
    };

    try {
      console.log("🚀 Submitting New Listing:", newListing);

      const response = await axios.post(
        `http://localhost:8000/api/v1/listings/${tenantId}/cars/create/`,
        newListing,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ API Response:", response.data);
      onAdd(response.data);
      onClose();
    } catch (error) {
      console.error("❌ Error submitting listing:", error);
      setError("Failed to add listing. Please try again.");
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
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Form */}
        <div className="space-y-4">
          <input type="text" placeholder="Car Brand" value={brand} onChange={(e) => setBrand(e.target.value)} className="w-full p-2 border rounded-md" />
          <input type="text" placeholder="Type" value={type} onChange={(e) => setType(e.target.value)} className="w-full p-2 border rounded-md" />
          <input type="number" placeholder="Price per Day" value={pricePerDay} onChange={(e) => setPricePerDay(e.target.value)} className="w-full p-2 border rounded-md" />
          <input type="number" placeholder="State of Charge" value={stateOfCharge} onChange={(e) => setStateOfCharge(e.target.value)} className="w-full p-2 border rounded-md" />
          <input type="date" value={availableFrom} onChange={(e) => setAvailableFrom(e.target.value)} className="w-full p-2 border rounded-md" />
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddListingModal;
