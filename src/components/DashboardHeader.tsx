import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface DashboardNavbarProps {
  primaryColor: string;
  user: { name: string; role: string; avatar: string };
}

const DashboardHeader: React.FC<DashboardNavbarProps> = ({ primaryColor, user }) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    // ✅ Clear stored user data & redirect
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("tenant");
    navigate("/login");
  };

  return (
    <div className="relative z-20">
      <div
        className="max-w-[90%] mx-auto bg-white shadow-lg rounded-xl py-4 px-6 flex items-center justify-between mt-6"
        style={{ borderBottom: `3px solid ${primaryColor}` }}
      >
        <h1 className="text-2xl font-semibold text-gray-900">My Listing</h1>

        {/* Notification & Profile */}
        <div className="flex items-center space-x-4 relative">
          <button className="relative">
            <span className="absolute top-0 right-0 bg-blue-500 h-2 w-2 rounded-full"></span>
            🔔
          </button>

          {/* Profile Section with Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <img src={user.avatar} alt="User Avatar" className="w-10 h-10 rounded-full object-cover cursor-pointer" />
              <div>
                <h3 className="text-sm font-medium">{user.name}</h3>
                <p className="text-xs text-gray-500">{user.role}</p>
              </div>
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50 border border-gray-200"
                style={{ top: "100%", right: "0px" }} // ✅ Ensures dropdown appears correctly
              >
                <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                  View Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
