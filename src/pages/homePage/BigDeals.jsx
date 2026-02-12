import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import images from '../../assets/images';
import { getStoreProducts, getStoreCategories } from '../../utils/storeApi';
import ProductCard from '../../components/ProductCard';

const BigDeals = () => {
  const [activeTab, setActiveTab] = useState("All Deals");
  const [backendProducts, setBackendProducts] = useState([]);
  const [backendCategories, setBackendCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Categories and Products from Backend
  useEffect(() => {
    let alive = true;
    const fetchData = async () => {
      setLoading(true);
      try {
        const [prodPayload, catPayload] = await Promise.all([
          getStoreProducts({ page: 1, limit: 60 }),
          getStoreCategories()
        ]);

        if (!alive) return;

        // Handle Product Payload structure
        const prodList = Array.isArray(prodPayload?.products)
          ? prodPayload.products
          : Array.isArray(prodPayload) ? prodPayload : [];
        
        setBackendProducts(prodList);
        setBackendCategories(catPayload || []);
      } catch (error) {
        console.error("Error loading dynamic data:", error);
      } finally {
        if (alive) setLoading(false);
      }
    };

    fetchData();
    return () => { alive = false; };
  }, []);

  // 2. Dynamically create Tabs from the Backend Category Names
  const dynamicTabs = useMemo(() => {
    if (!backendCategories.length) return ["All Deals"];
    // Extract names from backend objects
    const categoryNames = backendCategories.map(cat => cat.name);
    return ["All Deals", ...categoryNames];
  }, [backendCategories]);

  // 3. Filter products based on the selected dynamic tab
  const filteredProducts = useMemo(() => {
    if (activeTab === "All Deals") return backendProducts;

    return backendProducts.filter((p) => {
      const pCatName = p?.category?.name || "";
      return pCatName.toLowerCase() === activeTab.toLowerCase();
    });
  }, [activeTab, backendProducts]);

  return (
    <div className="bg-white min-h-screen px-4 md:px-10 py-8 text-gray-900 overflow-x-hidden">
      
      {/* --- BIG DEALS SECTION --- */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Big <span className="underline decoration-[#88013C] underline-offset-8">Deals</span>
          </h2>
          <button className="text-blue-600 font-medium flex items-center hover:underline">
            View All <span className="ml-1 text-xl">→</span>
          </button>
        </div>

        {/* Dynamic Navigation - HORIZONTAL SCROLL ON MOBILE */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar mb-8 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x">
          {dynamicTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full whitespace-nowrap text-sm font-semibold transition-all snap-start border ${
                activeTab === tab
                  ? "bg-gray-100 text-black border-gray-200 shadow-inner"
                  : "text-gray-400 border-transparent hover:text-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-5">
          {loading ? (
            <p className="col-span-full text-center text-gray-400 py-10">Loading deals...</p>
          ) : (
            filteredProducts.map((product) => (
              <ProductCard key={product.id || product._id} product={product} />
            ))
          )}
          {!loading && filteredProducts.length === 0 && (
            <p className="col-span-full text-center text-gray-400 py-10">No products available in this category.</p>
          )}
        </div>
      </section>

      {/* Banner */}
      <div className="relative w-full mb-16">
        <img
          src={images.exploreBg}
          alt="Banner"
          className="w-full h-auto max-h-[550px] object-cover-contain rounded-2xl"
        />
      </div>

      {/* --- SHOP BY CATEGORIES SECTION --- */}
      <section className="mb-10">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-bold">
            Find What{' '}
            <span className="underline decoration-[#88013C] underline-offset-8">
              You Love
            </span>
          </h2>
        </div>

        {/* Categories - HORIZONTAL SCROLL ON MOBILE */}
        <div className="flex sm:grid sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-6 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 snap-x">
          {backendCategories.map((cat) => (
            <Link
              to={`/category/${cat.slug}`}
              key={cat.id || cat._id}
              className="flex flex-col items-center group cursor-pointer min-w-[95px] sm:min-w-0 snap-center"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-50 flex items-center justify-center mb-3 group-hover:bg-gray-100 transition-all border border-gray-100 overflow-hidden">
                <img
                  src={cat.imageUrl || "https://placehold.co/100?text=Category"}
                  alt={cat.name}
                  className="w-full h-full object-cover p-2"
                />
              </div>
              <p className="text-[10px] sm:text-[11px] font-bold text-center leading-tight max-w-[85px] line-clamp-2">
                {cat.name}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BigDeals;  