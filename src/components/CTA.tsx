import appleStore from "../assets/apple-store-logo.png";
import googlePlay from "../assets/android-playstore-logo.png";

const CTA = () => {
  return (
    <section className="w-full flex justify-center py-24 px-6">
      <div
        className="bg-gradient-to-r from-[#4F46E5] to-[#A5B4FC] rounded-xl w-full max-w-4xl text-center px-8 py-16 shadow-lg"
      >
        <h2 className="text-3xl md:text-4xl font-semibold text-white">
          Join million people who already trust us
        </h2>
        <p className="text-white mt-4 text-lg">
          We also have a white-label mobile application for convenience.
        </p>

        {/* App Store Buttons */}
        <div className="mt-6 flex justify-center space-x-4">
          <a href="#" className="hover:opacity-80 transition">
            <img src={appleStore} alt="Download on the Apple Store" className="h-12" />
          </a>
          <a href="#" className="hover:opacity-80 transition">
            <img src={googlePlay} alt="Get it from Google Play" className="h-12" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTA;
