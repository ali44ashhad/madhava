import React, { useEffect, useState } from 'react';
import images from '../../assets/images';
import { homedecorProducts } from '../../data/data';
import { getStoreProducts } from '../../utils/storeApi';
import ProductCard from '../../components/ProductCard';

const ShopByCategories = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        const payload = await getStoreProducts({ page: 1, limit: 40 });
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
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const list = products.length ? products : homedecorProducts;

  return (
    <>
      {/* hero section */}
      <div className="w-full bg-[#f8f9fa] pt-[72px] md:pt-[80px]">
        <section className="relative w-full min-h-[calc(100vh-72px)] flex flex-col md:flex-row overflow-hidden">
          {/* LEFT : IMAGE */}  
          <div className="w-full md:w-1/2 relative aspect-[4/3] md:aspect-auto md:min-h-full">
            <img
              src={images.orderHeroPage}
              alt="Gratitude Now Comes with Great Audio - GIFT boAt"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* RIGHT : CONTENT */}
          <div className="w-full md:w-1/2 flex items-center">
            <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 py-10 sm:py-14 md:py-20 bg-white">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
                Transform Your Home Décor
              </h2>

              <p className="text-lg sm:text-xl md:text-2xl font-medium text-slate-800 italic mb-2">
                Elevate your space with divine & handcrafted décor.
              </p>

              <p className="text-gray-500 text-base sm:text-lg mb-8">
                Discover premium idols, wall décor & artistic showpieces for every corner of your home.
              </p>

              <button className="w-full sm:w-auto bg-[#1a202c] hover:bg-black text-white py-4 px-10 rounded-xl font-bold text-base sm:text-lg transition-all active:scale-[0.98] shadow-lg">
                Explore Collection
              </button>
            </div>
          </div>
        </section>
      </div>

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
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-6">
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

export default ShopByCategories;