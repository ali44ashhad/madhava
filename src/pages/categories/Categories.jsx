import React, { useState, useEffect } from 'react';
import { getStoreCategories } from '../../utils/storeApi';
import CategoryCard from '../../components/CategoryCard';
import CircleLoader from "react-spinners/CircleLoader";
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let alive = true;

        const fetchCategories = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getStoreCategories();
                if (alive) {
                    setCategories(data || []);
                }
            } catch (err) {
                if (alive) {
                    setError(err.message || "Failed to load categories.");
                }
            } finally {
                if (alive) {
                    setLoading(false);
                }
            }
        };

        fetchCategories();

        return () => {
            alive = false;
        };
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                
                {/* Back Button */}
                <div className="mb-8">
                    <Link 
                        to="/" 
                        className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-[#88013C] transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                </div>

                {/* Header Section */}
                <div className="text-center mb-12 sm:mb-16">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                        Shop by <span className="text-[#88013C]">Category</span>
                    </h1>
                    <p className="text-gray-500 max-w-2xl mx-auto text-base sm:text-lg">
                        Discover our wide range of premium products thoughtfully organized just for you.
                    </p>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col items-center justify-center min-h-[40vh]">
                        <CircleLoader color="#88013C" size={60} />
                        <p className="mt-6 text-gray-500 font-medium">Loading categories...</p>
                    </div>
                )}

                {/* Error State */}
                {!loading && error && (
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-xl mx-auto text-center">
                        <svg className="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <h3 className="text-lg font-semibold text-red-800 mb-2">Oops! Something went wrong</h3>
                        <p className="text-red-600 mb-6">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-2 bg-red-100 hover:bg-red-200 text-red-700 font-medium rounded-xl transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && categories.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm max-w-3xl mx-auto">
                        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-12 h-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No Categories Found</h3>
                        <p className="text-gray-500">Check back later for exciting new categories.</p>
                    </div>
                )}

                {/* Categories Grid */}
                {!loading && !error && categories.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                        {categories.map((category) => (
                            <CategoryCard key={category.id} category={category} />
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
};

export default Categories;
