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

  // ✅ Fetch Listings
  const fetchListings = async (tenantId: number, token: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/listings/${tenantId}/cars/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setListings(response.data);
    } catch (error) {
      console.error("❌ Error fetching listings:", error);
    }
  };

  // ✅ Handle New Listing Submission
  const handleNewListing = (newListing: any) => {
    setListings((prevListings) => [newListing, ...prevListings]);
  };

  // ✅ Handle Listing Update
  const handleUpdateListing = (updatedListing: any) => {
    setListings((prevListings) =>
      prevListings.map((listing) =>
        listing.id === updatedListing.id ? updatedListing : listing
      )
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar logo={tenant.logo} primaryColor={tenant.primaryColor} />
      <div className="flex flex-col flex-grow">
        <DashboardNavbar primaryColor={tenant.primaryColor} user={user ?? { name: "Guest", role: "CLIENT", avatar: defaultAvatar }} />

        <ListingControls
          primaryColor={tenant.primaryColor}
          onAddListing={() => setIsModalOpen(true)}
        />

        <main className="p-6">
          <Listings
            listings={listings}
            tenantId={user?.tenantId ?? null}
            accessToken={user?.accessToken ?? null}
            onUpdateListing={handleUpdateListing} // ✅ Ensure update works properly
          />
        </main>

        {/* ✅ Add Listing Modal */}
        {isModalOpen && (
          <AddListingModal
            onClose={() => setIsModalOpen(false)}
            onAdd={handleNewListing}
            tenantId={user?.tenantId ?? ""}
            accessToken={user?.accessToken ?? ""}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
