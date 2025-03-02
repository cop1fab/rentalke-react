import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import DashboardNavbar from "../components/DashboardHeader";
import ListingControls from "../components/ListingControls";
import Listings from "../components/Listing";
import AddListingModal from "../components/AddListingModal"; // ✅ Import modal
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

  const [listings, setListings] = useState<any[]>([]); // ✅ Store listings
  const [isModalOpen, setIsModalOpen] = useState(false); // ✅ Track modal state

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedTenant = localStorage.getItem("tenant");
    const accessToken: string | null = localStorage.getItem("accessToken");

    if (storedUser && storedTenant) {
      const parsedUser = JSON.parse(storedUser);
      const parsedTenant = JSON.parse(storedTenant);

      setUser({
        name: parsedUser.email,
        role: parsedUser.role || "CLIENT",
        avatar: defaultAvatar,
        tenantId: parsedUser.tenant?.id || null,
        accessToken: accessToken ?? null, // ✅ Ensure it's never undefined
      });

      setTenant({
        logo: parsedTenant.logo || defaultLogo,
        primaryColor: parsedTenant.primary_color || "#4F46E5",
      });

      // ✅ Fetch Listings if Tenant ID & Token exist
      if (parsedUser?.tenant?.id && accessToken) {
        fetchListings(parsedUser.tenant.id, accessToken);
      }
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
    setListings((prevListings) => [newListing, ...prevListings]); // Add new listing
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar logo={tenant.logo} primaryColor={tenant.primaryColor} />
      <div className="flex flex-col flex-grow">
        <DashboardNavbar
          primaryColor={tenant.primaryColor}
          user={user ?? { name: "Guest", role: "CLIENT", avatar: defaultAvatar }}
        />

        <ListingControls
          primaryColor={tenant.primaryColor}
          onAddListing={() => {
            console.log("✅ Add Listing button clicked - Opening Modal");
            setIsModalOpen(true);
          }}
        />

        <main className="p-6">
          <Listings
            listings={listings}
            tenantId={user?.tenantId ?? null}  // ✅ Ensure it’s never undefined
            accessToken={user?.accessToken ?? null}  // ✅ Ensure it’s never undefined
          />
        </main>

        {/* ✅ Add Listing Modal */}
        {isModalOpen && (
          <AddListingModal
            onClose={() => {
              console.log("❌ Closing Modal");
              setIsModalOpen(false);
            }}
            onAdd={handleNewListing}
            tenantId={user?.tenantId ?? null}
            accessToken={user?.accessToken ?? null}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
