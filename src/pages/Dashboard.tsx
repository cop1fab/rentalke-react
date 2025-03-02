import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import DashboardNavbar from "../components/DashboardHeader";
import ListingControls from "../components/ListingControls";
import Listings from "../components/Listing";
import AddListingModal from "../components/AddListingModal";
import defaultLogo from "../assets/logo.svg";
import defaultAvatar from "../assets/men.png";

const API_BASE_URL = "http://localhost:8000/api/v1";

const Dashboard = () => {
  const [tenant, setTenant] = useState({
    logo: defaultLogo,
    primaryColor: "#4F46E5",
  });

  const [user, setUser] = useState<{
    name: string;
    role: string;
    avatar: string;
    tenantId: string | null;
    accessToken: string | null;
  } | null>(null);

  const [listings, setListings] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedTenant = localStorage.getItem("tenant");
    const accessToken = localStorage.getItem("accessToken");

    if (storedUser && storedTenant && accessToken) {
      const parsedUser = JSON.parse(storedUser);
      const parsedTenant = JSON.parse(storedTenant);

      console.log("✅ Loaded User:", parsedUser);
      console.log("✅ Loaded Tenant:", parsedTenant);
      console.log("✅ Loaded Access Token:", accessToken);

      setUser({
        name: parsedUser.email,
        role: parsedUser.role || "CLIENT",
        avatar: defaultAvatar,
        tenantId: parsedTenant.id || null,
        accessToken,
      });

      setTenant({
        logo: parsedTenant.logo || defaultLogo,
        primaryColor: parsedTenant.primary_color || "#4F46E5",
      });

      fetchListings(parsedTenant.id, accessToken);
    } else {
      console.warn("🚨 Missing tenant or accessToken in localStorage.");
    }
  }, []);

  // ✅ Watch isModalOpen to confirm it's toggling
  useEffect(() => {
    console.log("📌 Modal Open State:", isModalOpen);
  }, [isModalOpen]);

  // ✅ Fetch Listings
  const fetchListings = async (tenantId: number, token: string) => {
    try {
      console.log("📥 Fetching listings for tenant ID:", tenantId);
      const response = await axios.get(`${API_BASE_URL}/listings/${tenantId}/cars/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setListings(response.data);
      console.log("✅ Listings fetched successfully:", response.data);
    } catch (error) {
      console.error("❌ Error fetching listings:", error);
    }
  };

  // ✅ Handle New Listing Submission
  const handleNewListing = (newListing: any) => {
    console.log("🚀 Adding new listing:", newListing);
    setListings((prevListings) => [newListing, ...prevListings]);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar logo={tenant.logo} primaryColor={tenant.primaryColor} />
      <div className="flex flex-col flex-grow">
        <DashboardNavbar primaryColor={tenant.primaryColor} user={user ?? { name: "Guest", role: "CLIENT", avatar: defaultAvatar }} />

        <ListingControls
          primaryColor={tenant.primaryColor}
          onAddListing={() => {
            console.log("✅ Opening Modal...");
            setIsModalOpen(true);
          }}
        />

        <main className="p-6">
          <Listings listings={listings} tenantId={user?.tenantId ?? null} accessToken={user?.accessToken ?? null} />
        </main>

        {/* ✅ Add Listing Modal - Now Always Opens */}
        {isModalOpen && (
          <>
            {console.log("📌 Rendering Modal Now! isModalOpen =", isModalOpen)}
            <AddListingModal
              onClose={() => {
                console.log("❌ Closing Modal");
                setIsModalOpen(false);
              }}
              onAdd={handleNewListing}
              tenantId={user?.tenantId ?? ""}
              accessToken={user?.accessToken ?? ""}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
