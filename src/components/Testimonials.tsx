import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import avatar1 from "../../public/assets/avatar1.png";
import avatar2 from "../../public/assets/avatar2.png";
import avatar3 from "../../public/assets/avatar3.png";

const testimonials = [
  {
    id: 1,
    name: "Jacky Ng'ang'a",
    role: "Co-founder, BYD KE",
    avatar: avatar1,
    feedback:
      "RentalKe is a solution to all my problems, I was able to set up and started accepting payments",
  },
  {
    id: 2,
    name: "Ismael bin Ahmed",
    role: "Managing Director, KEGO",
    avatar: avatar2,
    feedback:
      "The management of my business hasn't been this easier",
  },
  {
    id: 3,
    name: "Onyango Charles",
    role: "CEO, Greener Drives",
    avatar: avatar3,
    feedback:
      "The fact that, I didn't have to hire a time to build this was a gamechanger for me",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="w-full py-24 px-6 md:px-12 lg:px-20 flex flex-col items-center max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-left w-full mb-10">
        <p className="text-indigo-600 font-semibold uppercase tracking-wide">
          Testimonials
        </p>
        <h2 className="text-4xl font-bold text-gray-900 mt-2">
          What they say about us
        </h2>
      </div>

      {/* Testimonials Cards */}
      <div className="relative flex items-center w-full">
        {/* Left Arrow */}
        <button
          className="absolute left-0 bg-gray-200 p-3 rounded-full hover:bg-gray-300 transition"
          onClick={prevTestimonial}
        >
          <FaChevronLeft className="text-gray-600 text-lg" />
        </button>

        {/* Testimonials Grid */}
        <div className="flex space-x-6 overflow-hidden w-full">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`flex flex-col bg-white shadow-lg rounded-lg p-6 transition-all ${
                index === currentIndex ? "opacity-100 scale-105" : "opacity-50"
              }`}
            >
              {/* User Info */}
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>

              {/* Feedback */}
              <p className="text-gray-600">{testimonial.feedback}</p>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          className="absolute right-0 bg-gray-200 p-3 rounded-full hover:bg-gray-300 transition"
          onClick={nextTestimonial}
        >
          <FaChevronRight className="text-gray-600 text-lg" />
        </button>
      </div>
    </section>
  );
};

export default Testimonials;
