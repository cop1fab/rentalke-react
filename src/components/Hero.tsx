import { Link } from "react-scroll";
import heroImage from "../assets/hero-image.png";
import { FaPlay } from "react-icons/fa";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-32 md:py-40 lg:py-48 bg-white"
    >
      {/* Left Text Section */}
      <div className="max-w-lg text-left">
        <h3 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Manage your EV Rental <br /> Easily  with us
        </h3>
        <p className="mt-4 text-gray-600 text-lg">
          Just list your electric <br /> vehicle with RentalsKE, <br />
          and get clients at your fingertips.
        </p>

        {/* CTA Buttons */}
        <div className="mt-6 flex items-center space-x-4">
          <Link
            to="features"
            smooth={true}
            duration={800}
            className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg text-lg hover:bg-indigo-700 transition cursor-pointer"
          >
            Get Started
          </Link>
          <Link
            to="why-choose-us"
            smooth={true}
            duration={800}
            className="px-6 py-3 border border-indigo-600 text-indigo-600 font-medium rounded-lg text-lg hover:bg-indigo-100 transition cursor-pointer flex items-center space-x-2"
          >
            <FaPlay className="text-indigo-600 text-sm" />
            <span>How it Works</span>
          </Link>
        </div>
      </div>

      {/* Right Image Section - Fixed 775x435 size */}
      <div className="mt-10 md:mt-0 flex justify-end">
        <img
          src={heroImage}
          alt="Electric Car Charging"
          className="w-[775px] h-[435px] object-cover rounded-lg shadow-md"
        />
      </div>
    </section>
  );
};

export default Hero;
