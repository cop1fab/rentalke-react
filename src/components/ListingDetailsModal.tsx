import { FC } from "react";

interface ListingDetailsModalProps {
  listing: any;
  onClose: () => void;
}

const ListingDetailsModal: FC<ListingDetailsModalProps> = ({ listing, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]">
      <div className="bg-white p-6 rounded-lg shadow-xl w-[500px] max-h-[90vh] overflow-auto relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">{listing.brand} | {listing.type}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            ✖
          </button>
        </div>

        {/* Details */}
        <div className="space-y-4">
          <p><strong>Price per Day:</strong> ${listing.price_per_day}</p>
          <p><strong>State of Charge:</strong> {listing.state_of_charge}%</p>
          <p><strong>Available From:</strong> {new Date(listing.available_from).toDateString()}</p>
          <p><strong>Created At:</strong> {new Date(listing.created_at).toLocaleString()}</p>

          {/* Display Car Images */}
          {listing.photos.length > 0 ? (
            <div className="grid grid-cols-2 gap-2">
              {listing.photos.map((photo: any, index: number) => (
                <img key={index} src={photo.image} alt="Car" className="w-full h-32 object-cover rounded-lg" />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No images available.</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailsModal;
