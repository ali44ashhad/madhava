import React, { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getStoreProducts } from "../../utils/storeApi";
import ProductCard from "../../components/ProductCard";

const LiveSale = () => {
  const sliderRef = useRef(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const payload = await getStoreProducts({
          page: 1,
          limit: 6,
          categorySlug: "statues",
          subcategorySlug: "idols",
        });
        const list = Array.isArray(payload?.products)
          ? payload.products
          : Array.isArray(payload)
            ? payload
            : [];
        if (!alive) return;
        setProducts(list);
      } catch {
        if (!alive) return;
        setProducts([]);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const scroll = (dir) => {
    const slider = sliderRef.current;
    if (!slider?.firstChild) return;
    const cardWidth = slider.firstChild.offsetWidth + 16;
    slider.scrollBy({
      left: dir === "left" ? -cardWidth * 2 : cardWidth * 2,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-semibold">
          Sale <span className="font-bold">Is Live</span>
        </h2>
        <button className="text-sm font-medium text-blue-600 hover:underline">
          View All →
        </button>
      </div>

      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className="absolute -left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow"
          aria-label="Previous"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute -right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow"
          aria-label="Next"
        >
          <ChevronRight size={18} />
        </button>

        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide pb-2"
        >
          {products.map((item) => (
            <div
              key={item.id}
              className="flex-none w-[70%] sm:w-[48%] md:w-[32%] lg:w-[16.5%]"
            >
              <ProductCard product={item} showTimer timerText="12h: 24m: 13s" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveSale;
