import React, { useState } from 'react';
import { Headphones, Watch, Smartphone, Laptop, Speaker, Gamepad2, Tv, Camera, Mouse, ShoppingBag
} from "lucide-react";
import { Link } from 'react-router-dom';
import { allProducts, categories } from '../../data/data';
import { useCart } from '../../context/CartContext';
import images from '../../assets/images';



const BigDeals = () => {
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState("All Deals");

  // 2. Filter Logic: If 'All Deals', show everything. Else, match the category.
 const filteredProducts = activeTab === "All Deals" 
  ? allProducts 
  : allProducts.filter(item => item.category === activeTab)
const tabs = [
  "All Deals",
  "God Furniture",
  "Laddu Gopal Items",
  "God Accessories",
  "Puja Items",
  "God Dresses",
  "Spiritual Items",
];

  return (
    <div className="bg-white min-h-screen px-4 md:px-10 py-8 text-gray-900">
      
      {/* --- BIG DEALS SECTION --- */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Big <span className="underline decoration-[#88013C] underline-offset-8">Deals</span></h2>
          <button className="text-blue-600 font-medium flex items-center hover:underline">View All <span className="ml-1 text-xl">→</span></button>
        </div>

        {/* Filter Navigation */}
        <div className="flex gap-4 overflow-x-auto no-scrollbar mb-8 pb-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full whitespace-nowrap text-sm font-semibold transition-all ${
                activeTab === tab 
                ? "bg-gray-100 text-black shadow-inner" 
                : "text-gray-400 hover:text-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-5">
          {filteredProducts.map((product) => {
            const productSlug = product.slug || `product-${product.id}`;
            return (
              <Link
                key={product.id}
                to={`/product/${productSlug}`}
                className="group bg-gray-50 rounded-2xl overflow-hidden border border-transparent hover:border-gray-200 transition-all block"
              >
                <div className="relative aspect-square">
                  {product.badge && (
                    <span className="absolute top-2 left-2 bg-black text-white text-[10px] px-2 py-1 font-bold rounded-sm z-10">
                      ● {product.badge}
                    </span>
                  )}
                  <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  
                  {/* Specs Bar */}
                  <div className="absolute bottom-0 w-full bg-[#ffce1c] py-1 px-3 flex justify-between items-center text-[11px] font-bold">
                    <span>{product.specs}</span>
                    <span className="flex items-center gap-1">⭐ {product.rating}</span>
                  </div>
                </div>

                <div className="p-4 bg-white">
                  <h3 className="font-bold text-sm mb-2 truncate">{product.name}</h3>
                  <hr className="border-dashed mb-2" />
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg font-black">₹{product.price.toLocaleString()}</span>
                    <span className="text-gray-400 line-through text-xs">₹{product.oldPrice.toLocaleString()}</span>
                    <span className="text-green-500 font-bold text-[11px]">{product.discount}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      addToCart(product, 1);
                    }}
                    className="w-full bg-[#88013C] text-white py-2 rounded-lg font-semibold hover:bg-[#88013C]/90 transition-all flex items-center justify-center gap-2 text-xs mt-2"
                  >
                    <ShoppingBag size={14} />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </Link>
            );
          })}
          {filteredProducts.length === 0 && (
             <p className="col-span-full text-center text-gray-400 py-10 italic">No products found in this category.</p>
          )}
        </div>
      </section>

      
    <div className="relative w-[100%] m-auto">
  <img
    src={images.exploreBg}
    alt="Divine Banner"
    className="
      w-full
      sm:w-[100%]
      md:w-[100%]
      lg:w-[100%]
      xl:w-[100%]

      h-auto

      max-h-[220px]
      sm:max-h-[300px]
      md:max-h-[380px]
      lg:max-h-[480px]
      xl:max-h-[800px]

      object-cover-contain
    "
  />
</div>

      {/* --- SHOP BY CATEGORIES SECTION --- */}
 <section>
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-bold">Find What <span className="underline decoration-[#88013C] underline-offset-8">You Love</span></h2>
          <button className="text-blue-600 font-medium flex items-center hover:underline">View All <span className="ml-1 text-xl">→</span></button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-8">
          {categories.map((cat, idx) => (
            <div key={idx} className="flex flex-col items-center group cursor-pointer">
              <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mb-3 group-hover:bg-gray-100 transition-colors">
                 <img src={cat.img} alt={cat.name} className="w-12 h-12 object-contain" />
              </div>
              <p className="text-[11px] font-bold text-center leading-tight">{cat.name}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default BigDeals;