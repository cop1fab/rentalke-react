const Footer = () => {
  return (
    <footer className="w-full bg-[#4F46E5] text-white py-6 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Copyright Text */}
        <p className="text-sm">
          Copyright ©{new Date().getFullYear()}, All rights reserved | Powered by RentalsKE
        </p>

        {/* Terms and Conditions */}
        <a href="#" className="text-sm hover:underline">
          Terms and Conditions
        </a>
      </div>
    </footer>
  );
};

export default Footer;
