import { FaLayerGroup, FaGlobe, FaPalette, FaClipboardCheck } from "react-icons/fa"; // Import icons

const features = [
  {
    icon: <FaLayerGroup className="text-indigo-600 text-2xl" />,
    title: "Create an account",
    description: 'Just click the "Get Started" button to create your account.',
  },
  {
    icon: <FaGlobe className="text-indigo-600 text-2xl" />,
    title: "Create a company",
    description:
      "Same way, super simple, just create your company and choose a domain name that represents you.",
  },
  {
    icon: <FaPalette className="text-indigo-600 text-2xl" />,
    title: "Brand your company",
    description:
      "Make it your next home, upload your logo and choose a color that represents you.",
  },
  {
    icon: <FaClipboardCheck className="text-indigo-600 text-2xl" />,
    title: "Start listing",
    description:
      "Et voilà, in a few clicks you will have a website you can share with your clients in just a few clicks.",
  },
];

const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="w-full bg-gray-50 py-24 px-6 md:px-12 lg:px-20 flex flex-col items-center"
    >
      {/* Section Header */}
      <div className="max-w-4xl text-left w-full">
        <p className="text-indigo-600 font-semibold uppercase tracking-wide">
          Get Started Today!
        </p>
        <h2 className="text-4xl font-bold text-gray-900 mt-2">No code, we promise!</h2>
        <p className="text-gray-500 mt-4">
          Setting up your online EV rental business has never been this easy.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-5xl w-full">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className="p-3 bg-indigo-100 rounded-full">{feature.icon}</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
              <p className="text-gray-500">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
