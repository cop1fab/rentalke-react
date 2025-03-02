import { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";

interface ListingsProps {
  listings: any[];
  tenantId: string | null;
  accessToken: string | null;
  primaryColor?: string;
}

const Listings: React.FC<ListingsProps> = ({ listings, primaryColor }) => {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  // ✅ Handle Dropdown Toggle
  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <div className="max-w-[90%] mx-auto mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.length > 0 ? (
          listings.map((listing, index) => (
            <div key={index} className="relative bg-white shadow-lg rounded-2xl p-5 w-full max-w-sm">
              {/* Three-Dot Menu */}
              <div className="absolute top-3 right-3">
                <button onClick={() => toggleDropdown(index)} className="p-2 rounded-full hover:bg-gray-100">
                  <FaEllipsisV className="text-gray-600" />
                </button>

                {/* Dropdown Menu */}
                {openDropdown === index && (
                  <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border z-50">
                    <button className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full text-left">
                      View Details
                    </button>
                    <button className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full text-left">
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
              {listing.photos.length > 0 && (
                <img src={listing.photos[0].image} alt="Car" className="w-full h-32 object-cover mt-4 rounded-lg" />
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No listings available.</p>
        )}
      </div>
    </div>
  );
};

export default Listings;
