import React, { useState } from 'react';
import { ArrowRightCircle } from 'lucide-react'; 
import { blogsData } from '../../data/data';

const Blogs = () => {
  const [activeTab, setActiveTab] = useState('Popular');

  const tabs = ['Popular', 'Latest'];
  
  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 py-10">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-6">
          <h2 className="text-3xl font-bold border-b-4 border-red-500 pb-1">Blogs</h2>
          
          {/* Tabs */}
          <div className="bg-gray-200 p-1 rounded-full">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeTab === tab 
                  ? 'bg-black text-white shadow-lg' 
                  : 'text-gray-600 hover:text-black'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <button className="flex items-center gap-2 text-blue-900 font-bold hover:underline self-end md:self-auto">
          View All <ArrowRightCircle size={20} />
        </button>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {blogsData.map((blog) => (
          <div key={blog.id} className="bg-white rounded-[32px] overflow-hidden flex flex-col group shadow-sm hover:shadow-md transition-shadow">
            {/* Image Container */}
            <div className="relative h-48 overflow-hidden">
              <img 
                src={blog.image} 
                alt={blog.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            {/* Content Container */}
            <div className="p-6 flex flex-col flex-grow bg-[#f8f9fa]">
              <span className="text-gray-400 text-sm mb-2">{blog.date}</span>
              <h3 className="text-lg font-bold text-gray-900 leading-tight mb-3 line-clamp-2 group-hover:text-blue-900">
                {blog.title}
              </h3>
              <p className="text-gray-500 text-sm line-clamp-3 mb-6">
                {blog.description}
              </p>
              
              {/* Read More Button */}
              <button className="mt-auto w-full py-3 px-4 border border-gray-300 rounded-full flex items-center justify-center gap-2 font-bold text-gray-800 hover:bg-black hover:text-white transition-colors duration-300 group/btn">
                Read More 
                <ArrowRightCircle size={18} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blogs;