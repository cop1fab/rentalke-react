import { FaCar, FaTags, FaStar, FaChartBar, FaCog, FaHeadset } from "react-icons/fa";

interface SidebarProps {
  logo: string;
  primaryColor: string;
}

const Sidebar: React.FC<SidebarProps> = ({ logo, primaryColor }) => {
  console.log("🟢 Sidebar Received Logo:", logo);
  console.log("🎨 Sidebar Primary Color:", primaryColor);

  return (
    <aside className="w-64 h-screen shadow-lg p-6 flex flex-col justify-between" style={{ backgroundColor: primaryColor }}>
      {/* ✅ Logo Section */}
      <div>
        <img src={logo} alt="Tenant Logo" className="h-10 mb-6 object-contain" onError={(e) => (e.currentTarget.src = "/src/assets/logo.svg")} />

        {/* ✅ Navigation Links */}
        <nav>
          <ul className="space-y-4 text-white">
            <li className="flex items-center space-x-3 font-semibold">
              <FaCar /> <span>Dashboard</span>
            </li>
            <li className="flex items-center space-x-3 hover:opacity-75">
              <FaTags /> <span>Bargains</span>
            </li>
            <li className="flex items-center space-x-3 hover:opacity-75">
              <FaStar /> <span>Reviews</span>
            </li>
            <li className="flex items-center space-x-3 hover:opacity-75">
              <FaChartBar /> <span>Reports</span>
            </li>
          </ul>
        </nav>
      </div>

      {/* ✅ Help & Settings */}
      <div className="space-y-4 text-white">
        <div className="flex items-center space-x-3 hover:opacity-75">
          <FaHeadset /> <span>Help Center</span>
        </div>
        <div className="flex items-center space-x-3 hover:opacity-75">
          <FaCog /> <span>Settings</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
