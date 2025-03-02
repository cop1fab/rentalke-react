import mpesaLogo from "../assets/mpesa-logo.png";
import airtelLogo from "../assets/airtel-logo.png";
import bankCardLogo from "../assets/bank-card.png";

const PaymentSection = () => {
  return (
    <section
      id="payments"
      className="w-full bg-white py-24 px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto"
    >
      {/* Left Payment Box */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-1/2">
        <h3 className="text-lg font-semibold text-gray-900">Payment Made Easy</h3>
        <p className="text-gray-500 text-sm mt-1">With all payment methods you are used to</p>
        <div className="mt-4 border-t pt-4">
          <p className="text-2xl font-bold text-gray-900">KES 10,000</p>
        </div>

        {/* Payment Methods */}
        <div className="mt-6">
          <p className="text-sm font-semibold text-gray-800">Pay With</p>
          <p className="text-gray-500 text-xs mb-4">Select method you want to use for payment</p>

          <div className="flex space-x-4">
            <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg">
              <img src={mpesaLogo} alt="M-Pesa" className="h-6" />
              <span className="ml-2 text-gray-700 text-sm">MPESA</span>
            </div>
            <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg">
              <img src={airtelLogo} alt="Airtel Money" className="h-6" />
              <span className="ml-2 text-gray-700 text-sm">Airtel</span>
            </div>
            <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg">
              <img src={bankCardLogo} alt="Bank Card" className="h-6" />
              <span className="ml-2 text-gray-700 text-sm">Bank Card</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Text Section */}
      <div className="w-full md:w-1/2 md:pl-12 text-left mt-12 md:mt-0">
        <p className="text-indigo-600 font-semibold uppercase tracking-wide">
          Accept Payments like a pro
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
          Nothing has changed, yet a lot has changed
        </h2>
        <p className="text-gray-500 mt-4">
          Enjoy greener rentals and accept payment the normal way.
        </p>
      </div>
    </section>
  );
};

export default PaymentSection;
