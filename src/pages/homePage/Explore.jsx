import React from 'react';
import { ExploreData } from '../../data/data'
const Explore = () => {

  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 py-10">
      {/* Header Section */}
      <div className="flex items-center gap-2 mb-8 ml-2">
        <span className="text-2xl font-light text-gray-800">Explore</span>
        <span className="text-2xl font-bold border-b-2 border-red-500 pb-1">Bestsellers</span>
      </div>

      {/* Responsive Grid - Horizontal scroll on mobile, Grid on desktop */}
      <div className="flex overflow-x-auto pb-4 gap-4 md:grid md:grid-cols-5 md:overflow-visible">
        {ExploreData.map((item) => (
          <div key={item.id} className="min-w-[250px] md:min-w-0 group cursor-pointer">
            <div className="relative aspect-square overflow-hidden rounded-[24px] bg-black">
              {/* Static Poster Image */}
              <img 
                src={item.poster} 
                alt={item.title} 
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
              />
              
              {/* Video Element - Controlled by inline events */}
              <video
                src={item.video}
                muted
                loop
                playsInline
                onMouseEnter={(e) => e.target.play()}
                onMouseLeave={(e) => {
                    e.target.pause();
                    e.target.currentTime = 0; // Resets video on leave
                }}
                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
            </div>
            
            {/* Title */}
            <h3 className="mt-4 text-center text-sm md:text-base font-bold text-gray-900 tracking-tight">
              {item.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Explore;