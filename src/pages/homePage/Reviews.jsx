import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { ReviewsData } from '../../data/data';

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Continuous Auto-Loop
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === ReviewsData.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 py-10">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-medium">
          In the <span className="font-bold border-b-2 border-red-500 pb-1">Press</span>
        </h2>
      </div>

      {/* Main Carousel Wrapper */}
      <div className="relative bg-[#f1f3f5] rounded-[2rem] overflow-hidden">

        {/* The Sliding Track */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {ReviewsData.map((item, index) => (
            <div key={index} className="min-w-full flex flex-col md:flex-row min-h-[350px]">

              {/* Left Side: Logo */}
              <div className="w-full md:w-1/3 bg-[#d9e1e7] flex items-center justify-center min-h-[180px]">
                <img
                  src={item.logoImg}
                  alt={item.alt}
                  className="max-w-auto md:max-w-auto object-cover p-0"
                />
              </div>

              {/* Right Side: Content */}
              <div className="w-full md:w-2/3 flex flex-col items-center justify-center p-8 md:p-16 text-center relative bg-[#f1f3f5]">
                <div className="mb-6">
                  <Quote size={40} fill="currentColor" className="text-gray-300 rotate-180" />
                </div>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl font-medium">
                  "{item.text}"
                </p>

              </div>

            </div>
          ))}
        </div>

        {/* Navigation Controls - Positioned relative to the container */}
        <div className="absolute bottom-6 left-0 right-0 md:left-[33.33%] flex justify-center gap-4 z-10">
          <button
            onClick={() => setCurrentIndex((prev) => (prev === 0 ? ReviewsData.length - 1 : prev - 1))}
            className="p-2.5 rounded-full bg-gray-200/80 hover:bg-gray-300 transition-all text-gray-600 shadow-sm"
            aria-label="Previous slide"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={() => setCurrentIndex((prev) => (prev === ReviewsData.length - 1 ? 0 : prev + 1))}
            className="p-2.5 rounded-full bg-gray-200/80 hover:bg-gray-300 transition-all text-gray-600 shadow-sm"
            aria-label="Next slide"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>

      {/* Slide Indicators (Optional but recommended for UX) */}
      <div className="flex justify-center mt-6 gap-2">
        {ReviewsData.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 transition-all duration-300 rounded-full ${currentIndex === idx ? 'w-8 bg-red-500' : 'w-2 bg-gray-300'
              }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Reviews;