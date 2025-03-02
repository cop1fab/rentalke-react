interface DashboardNavbarProps {
  primaryColor: string;
  user: { name: string; role: string; avatar: string };
}

const DashboardHeader: React.FC<DashboardNavbarProps> = ({ primaryColor, user }) => {
  return (
    <div className="relative z-10">
      <div
        className="max-w-[90%] mx-auto bg-white shadow-lg rounded-xl py-4 px-6 flex items-center justify-between mt-6"
        style={{ borderBottom: `3px solid ${primaryColor}` }}
      >
        <h1 className="text-2xl font-semibold text-gray-900">My Listing</h1>

        {/* Notification & Profile */}
        <div className="flex items-center space-x-4">
          <button className="relative">
            <span className="absolute top-0 right-0 bg-blue-500 h-2 w-2 rounded-full"></span>
            🔔
          </button>
          <div className="flex items-center space-x-2">
            <img src={user.avatar} alt="User Avatar" className="w-10 h-10 rounded-full object-cover" />
            <div>
              <h3 className="text-sm font-medium">{user.name}</h3>
              <p className="text-xs text-gray-500">{user.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
