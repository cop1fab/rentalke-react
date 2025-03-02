import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import DashboardNavbar from "../components/DashboardHeader";
import ListingControls from "../components/ListingControls";
import Listings from "../components/Listing";
import defaultLogo from "../assets/logo.svg";
import defaultAvatar from "../assets/men.png";

const Dashboard = () => {
  const [tenant, setTenant] = useState({
    logo: defaultLogo,
    primaryColor: "#4F46E5",
    secondaryColor: "#e40707",
  });

  const [user, setUser] = useState<{
    name: string;
    role: string;
    avatar: string;
    tenantId: string | null;
    accessToken: string | null;
  } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedTenant = localStorage.getItem("tenant");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser({
        name: parsedUser.email,
        role: parsedUser.role || "CLIENT",
        avatar: defaultAvatar,
        tenantId: parsedUser.tenant || null,
        accessToken: localStorage.getItem("token") || null,
      });
    }

    if (storedTenant) {
      const parsedTenant = JSON.parse(storedTenant);
      console.log("🎨 Loaded Tenant Data:", parsedTenant);

      setTenant({
        logo: parsedTenant.logo ? parsedTenant.logo : defaultLogo,
        primaryColor: parsedTenant.primary_color || "#4F46E5",
        secondaryColor: parsedTenant.secondary_color || "#e40707",
      });
    }
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar logo={tenant.logo} primaryColor={tenant.primaryColor} />

      {/* Main Content */}
      <div className="flex flex-col flex-grow">
        {/* Navbar */}
        <DashboardNavbar primaryColor={tenant.primaryColor} user={user ?? { name: "Guest", role: "CLIENT", avatar: defaultAvatar }} />

        {/* Listing Controls */}
        <ListingControls primaryColor={tenant.primaryColor} />

        {/* Listings Section */}
        <main className="p-6">
          <Listings tenantId={user?.tenantId ?? null} accessToken={user?.accessToken ?? null} primaryColor={tenant.primaryColor} listings={[]} />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
