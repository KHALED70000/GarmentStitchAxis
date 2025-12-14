import React, { useState } from "react";

const CustomerFeedback = ({ feedbacks }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? feedbacks.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === feedbacks.length - 1 ? 0 : prev + 1
    );
  };

  if (!feedbacks || feedbacks.length === 0) return null;

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12">
        Customer Feedback
      </h2>

      <div className="relative overflow-hidden">
        {/* Slides */}
        <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {feedbacks.map((fb, index) => (
            <div
              key={index}
              className="min-w-full flex flex-col items-center text-center p-6"
            >
              <p className="text-base italic mb-4">"{fb.comment}"</p>
              <p className="font-semibold">{fb.name}</p>
              <p className="text-sm">{fb.role}</p>
            </div>
          ))}
        </div>

        {/* Prev / Next Buttons */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-2 -translate-y-1/2 border px-3 py-1 rounded"
        >
          &#8592;
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-2 -translate-y-1/2 border px-3 py-1 rounded"
        >
          &#8594;
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-6 gap-2">
        {feedbacks.map((_, idx) => (
          <span
            key={idx}
            className={`w-3 h-3 rounded-full ${
              idx === currentIndex ? "bg-black" : "bg-gray-400"
            }`}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default CustomerFeedback;
