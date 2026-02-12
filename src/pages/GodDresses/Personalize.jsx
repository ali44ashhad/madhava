import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import images from "../../assets/images";
import { useCart } from "../../context/CartContext";
import { getStoreProducts } from "../../utils/storeApi";

const Personalize = () => {
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    (async () => {
      setLoading(true);
      try {
        const payload = await getStoreProducts({ page: 1, limit: 50 });

        const list = Array.isArray(payload?.products)
          ? payload.products
          : Array.isArray(payload)
          ? payload
          : [];

        if (!alive) return;
        setProducts(list);
      } catch (err) {
        if (!alive) return;
        console.error("Product fetch failed", err);
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

  // 🔥 PRICE RESOLVER — MATCHES YOUR API
  const resolvePrice = (product) => {
    const sellingPrice = Number(
      product?.minPrice ??
      product?.sellingPrice ??
      product?.price ??
      0
    );

    const mrp = Number(
      product?.maxPrice ??
      product?.mrp ??
      product?.originalPrice ??
      sellingPrice
    );

    if (Number.isFinite(sellingPrice) && sellingPrice > 0) {
      return { sellingPrice, mrp };
    }

    return null;
  };

  return (
    <>
      {/* HERO */}
      <section className="pt-40 w-full py-16 px-4 md:px-10 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
              Adorn Your Deity With Divine Elegance
            </h2>
            <p className="text-gray-600 text-base sm:text-lg mb-6">
              Discover beautifully crafted god dresses made with devotion and fine detailing.
            </p>
            <button className="px-8 py-3 bg-black text-white rounded-full">
              Explore Collection
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[images.godDress1, images.godDress2, images.godDress3, images.godDress4].map(
              (img, i) => (
                <div key={i} className="overflow-hidden">
                  <img
                    src={img}
                    alt="God Dress"
                    className="w-full h-full object-cover hover:scale-110 transition duration-500"
                  />
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <div className="pt-20 px-3 sm:px-6 lg:px-10">
        {loading && (
          <p className="text-center text-gray-500">Loading products…</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product) => {
  const priceData = resolvePrice(product);

  const imageUrl =
    product?.featuredImageUrl ||
    product?.images?.[0]?.url ||
    "https://placehold.co/600x600?text=Product";

  return (
    <div
      key={product.id}
      className="bg-white rounded-xl hover:translate-y-[-3px] shadow-sm hover:shadow-md transition overflow-hidden flex flex-col"
    >
      {/* IMAGE (TOP) */}
      <div className="w-full aspect-square bg-gray-100 overflow-hidden">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-contain hover:scale-105 transition"
        />
      </div>

      {/* CONTENT (BOTTOM) */}
      <div className="p-3 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-sm font-bold text-slate-800 line-clamp-2">
            {product.name}
          </h3>

          {priceData ? (
            <div className="mt-1">
              <span className="text-base font-black text-slate-900">
                ₹{priceData.sellingPrice.toLocaleString()}
              </span>

              {priceData.mrp > priceData.sellingPrice && (
                <span className="ml-2 text-xs text-gray-400 line-through">
                  ₹{priceData.mrp.toLocaleString()}
                </span>
              )}
            </div>
          ) : (
            <p className="text-xs text-red-500 mt-1">
              Price unavailable
            </p>
          )}
        </div>

        {/* ACTIONS */}
        <div className="flex gap-2 mt-3">
          <Link
            to={`/product/${product.slug || product.id}`}
            className="flex-1 bg-[#88013C] text-white text-xs py-2 rounded font-bold text-center uppercase"
          >
            View
          </Link>

          <button
            disabled={!priceData}
            onClick={() =>
              addToCart(
                {
                  productId: product.id,
                  skuId: null,
                  name: product.name,
                  price: priceData?.sellingPrice,
                  imageUrl,
                },
                1
              )
            }
            className="flex-1 bg-black text-white text-xs py-2 rounded font-bold uppercase disabled:opacity-50"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
})}

        </div>
      </div>
    </>
  );
};

export default Personalize;
