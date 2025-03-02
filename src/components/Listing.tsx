interface ListingsProps {
  listings: any[]; // ✅ Accepts fetched listings
  tenantId: string | null;
  accessToken: string | null;
  primaryColor?: string;
}

const Listings: React.FC<ListingsProps> = ({ listings, primaryColor }) => {
  return (
    <div className="max-w-[90%] mx-auto mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.length > 0 ? (
          listings.map((listing, index) => (
            <div key={index} className="bg-white shadow-lg rounded-2xl p-5 w-full max-w-sm">
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
