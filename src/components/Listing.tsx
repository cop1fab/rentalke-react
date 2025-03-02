import { useState, useEffect, useRef } from "react";
import { FaEllipsisV } from "react-icons/fa";
import ListingDetailsModal from "./ListingDetailsModal";
import EditListingModal from "./EditListingModal";

interface ListingsProps {
  listings: any[];
  tenantId: string | null;
  accessToken: string | null;
  primaryColor?: string;
  onUpdateListing: (updatedListing: any) => void; // ✅ Ensure this is passed from Dashboard
}

const Listings: React.FC<ListingsProps> = ({ listings, tenantId, accessToken, primaryColor, onUpdateListing }) => {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [selectedListing, setSelectedListing] = useState<any | null>(null);
  const [editingListing, setEditingListing] = useState<any | null>(null);
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);

  // ✅ Toggle dropdown menu
  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdown !== null) {
        const clickedInside = dropdownRefs.current[openDropdown]?.contains(event.target as Node);
        if (!clickedInside) {
          setOpenDropdown(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

  return (
    <div className="max-w-[90%] mx-auto mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.length > 0 ? (
          listings.map((listing, index) => (
            <div key={listing.id} className="relative bg-white shadow-lg rounded-2xl p-5 w-full max-w-sm">
              {/* Three-Dot Menu */}
              <div className="absolute top-3 right-3">
                <button onClick={() => toggleDropdown(index)} className="p-2 rounded-full hover:bg-gray-100">
                  <FaEllipsisV className="text-gray-600" />
                </button>

                {/* Dropdown Menu */}
                {openDropdown === index && (
                  <div
                    ref={(el) => (dropdownRefs.current[index] = el)}
                    className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border z-50"
                  >
                    <button
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full text-left"
                      onClick={() => setSelectedListing(listing)}
                    >
                      View Details
                    </button>
                    <button
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full text-left"
                      onClick={() => setEditingListing(listing)}
                    >
                      Edit Details
                    </button>
                    <button className="block px-4 py-2 text-sm text-yellow-600 hover:bg-yellow-100 w-full text-left">
                      Soft Delete
                    </button>
                    <button className="block px-4 py-2 text-sm text-red-600 hover:bg-red-100 w-full text-left">
                      Hard Delete
                    </button>
                  </div>
                )}
              </div>

              {/* Listing Details */}
              <h3 className="text-lg font-semibold text-gray-900">{listing.brand} | {listing.type}</h3>
              <p className="text-sm text-gray-600">Price per day: ${listing.price_per_day}</p>
              <p className="text-sm text-gray-600">State of charge: {listing.state_of_charge}%</p>

              {/* Display Car Image */}
              {listing.photos.length > 0 ? (
                <img src={listing.photos[0].image} alt="Car" className="w-full h-32 object-cover mt-4 rounded-lg" />
              ) : (
                <div className="w-full h-32 bg-gray-200 mt-4 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">No Image</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No listings available.</p>
        )}
      </div>

      {/* ✅ Listing Details Modal */}
      {selectedListing && (
        <ListingDetailsModal listing={selectedListing} onClose={() => setSelectedListing(null)} />
      )}

      {/* ✅ Edit Listing Modal */}
      {editingListing && (
        <EditListingModal
          listing={editingListing}
          onClose={() => setEditingListing(null)}
          onUpdate={onUpdateListing} // ✅ Ensure correct function reference
          tenantId={tenantId}
          accessToken={accessToken}
        />
      )}
    </div>
  );
};

export default Listings;
