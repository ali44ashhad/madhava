import React, { useRef } from "react";
import { Star, ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { liveSaleProduct } from "../../data/data";
// import images from "../../assets/images";
import { useCart } from "../../context/CartContext";


const LiveSale = () => {
  const sliderRef = useRef(null);
  const { addToCart } = useCart();

  const scroll = (dir) => {
    const slider = sliderRef.current;
    if (!slider) return;

    const cardWidth = slider.firstChild.offsetWidth + 16;
    slider.scrollBy({
      left: dir === "left" ? -cardWidth * 2 : cardWidth * 2,
      behavior: "smooth",
    });
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <>
      {/* SALE IS LIVE */}
      <section className="w-full px-4 sm:px-6 lg:px-10 py-10">
        {/* HEADER */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-semibold">
            Sale <span className="font-bold">Is Live</span>
          </h2>
          <button className="text-sm font-medium text-blue-600 hover:underline">
            View All →
          </button>
        </div>

        {/* CAROUSEL WRAPPER */}
        <div className="relative">
          {/* LEFT ARROW */}
          <button
            onClick={() => scroll("left")}
            className="absolute -left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow hover:bg-gray-100"
          >
            <ChevronLeft size={18} />
          </button>

          {/* RIGHT ARROW */}
          <button
            onClick={() => scroll("right")}
            className="absolute -right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow hover:bg-gray-100"
          >
            <ChevronRight size={18} />
          </button>

          {/* SCROLL AREA */}
          <div
            ref={sliderRef}
            className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide"
          >
            {liveSaleProduct.map((item, index) => {
              const productSlug = item.slug || `product-${item.id || index}`;
              return (
                <Link
                  key={index}
                  to={`/product/${productSlug}`}
                  className="
                    flex-none
                    w-[70%]
                    sm:w-[48%]
                    md:w-[32%]
                    lg:w-[16.5%]
                    rounded-xl border bg-white shadow-sm hover:shadow-md transition block
                  "
                >
                  {/* IMAGE */}
                  <div className="relative overflow-hidden rounded-t-xl">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-[180px] w-full object-cover"
                    />

                    {item.badge && (
                      <span className="absolute left-2 top-2 rounded-md bg-black px-2 py-0.5 text-xs text-white">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* INFO */}
                  <div className="p-3 space-y-2">
                    <div className="flex items-center justify-between text-xs bg-yellow-400 rounded px-2 py-1">
                      <span>{item.feature}</span>
                      <span className="flex items-center gap-1">
                        <Star size={12} /> {item.rating}
                      </span>
                    </div>

                    <h3 className="text-sm font-semibold line-clamp-2">
                      {item.name}
                    </h3>

                    <div className="flex items-center gap-2">
                      <span className="font-bold text-base">₹{item.price}</span>
                      <span className="text-xs line-through text-gray-400">
                        ₹{item.mrp}
                      </span>
                    </div>

                    <p className="text-xs text-green-600 font-semibold">
                      {item.discount}% off
                    </p>

                    <button
                      onClick={(e) => handleAddToCart(e, item)}
                      className="w-full mt-2 bg-[#88013C] text-white py-2 rounded-lg font-semibold hover:bg-[#88013C]/90 transition-all flex items-center justify-center gap-2 text-xs"
                    >
                      <ShoppingCart size={14} />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* NIRVANA SECTION — UNTOUCHED */}
    




 
    </>
  );
};

export default LiveSale;
