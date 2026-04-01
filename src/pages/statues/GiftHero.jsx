import React, { useEffect, useState } from "react";
import images from "../../assets/images";
// import { homedecorProducts } from "../../data/data";
import { getStoreProducts } from "../../utils/storeApi";
import ProductCard from "../../components/ProductCard";

const GiftHero = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        const payload = await getStoreProducts({
          page: 1,
          limit: 40,
          categorySlug: "statues",
        });
        const list = Array.isArray(payload?.products)
          ? payload.products
          : Array.isArray(payload)
            ? payload
            : [];
        if (!alive) return;
        const filtered = list.filter(
          (p) => (p?.category?.slug || "").toLowerCase() === "statues"
        );
        setProducts(filtered.length ? filtered : list);
      } catch {
        if (!alive) return;
        setProducts([]);
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const list = products;

  return (
    <>
      {/* --- Hero Section --- */}
      <section className="w-full relative overflow-hidden">
        <div className="relative w-full min-h-[calc(100vh-72px)] sm:h-[320px] md:h-[420px] lg:h-[520px]">
          <img
            src={images.giftHero}
            alt="Divine Collection Banner"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />

          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-black/30"></div>

          {/* Text Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8">
              <div className="max-w-xl">
                <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight">
                  Explore Our Divine Collection of Idols & Décor
                </h1>

                <p className="mt-3 text-white/90 text-sm sm:text-base md:text-lg">
                  Handcrafted God idols, spiritual ornaments, and home mandir essentials
                  for your sacred space.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Highlight Section --- */}
      <section className="w-full bg-white py-10 sm:py-14 md:py-20">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center px-4 text-center">
          <h5 className="text-xl sm:text-2xl md:text-4xl font-light text-black mb-2">
            Spiritual Gifts Enhance Your Home & Mandir
          </h5>

          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold text-black leading-tight">
            Thoughtful & Sacred Collections
          </h1>
        </div>
      </section>

      <section className="w-full px-4 sm:px-6 lg:px-10 py-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Gifting <span className="underline decoration-[#88013C] underline-offset-8">Deals</span>
          </h2>

          <button className="text-blue-600 font-medium flex items-center hover:underline">
            View All <span className="ml-1 text-xl">→</span>
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-10">
          {loading && (
            <p className="col-span-full text-center text-gray-500">
              Loading products…
            </p>
          )}

          {list.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
};

export default GiftHero;