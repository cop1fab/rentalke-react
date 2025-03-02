import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo Section */}
        <div className="flex items-center">
          <img src={logo} alt="RentalsKE Logo" className="h-10 w-auto" />
        </div>

        {/* Navigation Links - Closer to Login Button */}
        <div className="flex space-x-8 ml-auto">
          {[
            { name: "Home", to: "home" },
            { name: "How it works", to: "features" },
            { name: "Why Choose Us", to: "payments" },
            { name: "Testimonials", to: "testimonials" },
          ].map((item) => (
            <ScrollLink
              key={item.name}
              to={item.to}
              smooth={true}
              duration={800}
              offset={-80} // Adjust offset for fixed navbar
              spy={true}
              activeClass="text-indigo-600 font-semibold"
              className="text-gray-500 hover:text-indigo-600 transition cursor-pointer"
            >
              {item.name}
            </ScrollLink>
          ))}
        </div>

        {/* Login Button */}
        <Link to="/login" className="ml-8 bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition">
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
