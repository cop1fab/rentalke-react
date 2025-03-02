import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeatureSection from "../components/FeatureSection";
import PaymentSection from "../components/PaymentSection";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <Navbar />
      <Hero />
      <FeatureSection />
      <PaymentSection />
      <CTA />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default LandingPage;
