import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
    return (
        <Link
            to={`/category/${category.slug}`}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col group block"
        >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50">
                <img
                    src={category.imageUrl || "https://placehold.co/400x300?text=Category"}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow">
                <h3 className="font-bold text-lg sm:text-xl text-gray-900 group-hover:text-[#88013C] transition-colors duration-300 line-clamp-2">
                    {category.name}
                </h3>

                <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500 group-hover:text-[#88013C] transition-colors">
                        Explore Collection
                    </span>
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#88013C] transition-colors duration-300">
                        <svg
                            className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CategoryCard;
