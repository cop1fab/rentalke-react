import { FC } from "react";
import { FaFilter, FaFileImport, FaFileExport, FaPlus, FaSearch } from "react-icons/fa";

interface ListingControlsProps {
  primaryColor: string;
}

const ListingControls: FC<ListingControlsProps> = ({ primaryColor }) => {
  return (
    <div className="relative z-10">
      <div className="max-w-[90%] mx-auto bg-white shadow-lg rounded-xl py-4 px-6 flex items-center justify-between mt-4">
        {/* Left: Users Count & Search Bar */}
        <div className="flex items-center space-x-6">
          <h3 className="text-lg font-semibold text-gray-800">
            Cars Listed <span className="bg-gray-200 px-3 py-1 rounded-lg text-sm text-gray-600">18</span>
          </h3>

          {/* Search Bar */}
          <div className="relative bg-gray-100 rounded-full px-4 py-2 flex items-center">
            <FaSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-transparent focus:outline-none ml-2"
            />
          </div>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center space-x-5">
          <button className="flex items-center space-x-2 bg-gray-100 px-5 py-2 rounded-lg text-gray-700 hover:bg-gray-200 transition">
            <FaFilter /> <span>Filter</span>
          </button>

          <button className="flex items-center space-x-2 bg-gray-100 px-5 py-2 rounded-lg text-gray-700 hover:bg-gray-200 transition">
            <FaFileImport /> <span>Import</span>
          </button>

          <button className="flex items-center space-x-2 bg-gray-100 px-5 py-2 rounded-lg text-gray-700 hover:bg-gray-200 transition">
            <FaFileExport /> <span>Export</span>
          </button>

          <button
            className="flex items-center space-x-2 px-6 py-3 rounded-lg text-white hover:brightness-90 transition"
            style={{ backgroundColor: primaryColor }}
          >
            <FaPlus /> <span>Add Listing</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingControls;
