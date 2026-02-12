import React, { useEffect, useState } from 'react';
import { getStoreProducts } from '../../utils/storeApi';
import ProductCard from '../../components/ProductCard';

const Explore = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        const payload = await getStoreProducts({ page: 1, limit: 20 });
        const list = Array.isArray(payload?.products)
          ? payload.products
          : Array.isArray(payload)
            ? payload
            : [];
        if (!alive) return;
        setProducts(list.slice(0, 10));
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

  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 py-10">
      {/* Header Section */}
      <div className="flex items-center gap-2 mb-8 ml-2">
        <span className="text-2xl font-light text-gray-800">Explore</span>
        <span className="text-2xl font-bold border-b-2 border-red-500 pb-1">
          Bestsellers
        </span>
      </div>

      {/* Cards – single ProductCard look, no Add to Cart / Buy Now */}
      <div className="flex overflow-x-auto pb-4 gap-3 sm:gap-4 md:grid md:grid-cols-5 md:overflow-visible scrollbar-hide">
        {loading && (
          <div className="text-sm text-gray-500 col-span-full">Loading products…</div>
        )}
        {products.map((p) => (
          <div key={p.id} className="min-w-[160px] sm:min-w-[180px] md:min-w-0">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Explore;