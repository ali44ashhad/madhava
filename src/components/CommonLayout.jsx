import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getStoreProducts, getStoreSubcategories } from "../utils/storeApi";
import ProductCard from "./ProductCard";
import { ArrowLeft } from "lucide-react";

const CommonLayout = () => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const { getCartCount } = useCart();
  const [maxPriceUi, setMaxPriceUi] = useState(null); // number | null (no filter)
  const [maxPriceFilter, setMaxPriceFilter] = useState(null); // debounced value sent to backend
  const [sortBy, setSortBy] = useState("newest"); // newest | oldest | priceLow | priceHigh | popularity

  // Subcategories + products from backend
  const [subcategories, setSubcategories] = useState([]);
  const [subcatLoading, setSubcatLoading] = useState(true);

  const [products, setProducts] = useState([]);
  const [productLoading, setProductLoading] = useState(true);

  const [sliderMax, setSliderMax] = useState(20000);

  const activeSubcategorySlug = searchParams.get("sub") || "";

  // Reset slider when navigating between subcategories/categories
  useEffect(() => {
    setMaxPriceUi(null);
    setMaxPriceFilter(null);
    setSliderMax(20000);
  }, [slug, activeSubcategorySlug]);

  // Debounce backend filtering while dragging slider
  useEffect(() => {
    const t = setTimeout(() => {
      setMaxPriceFilter(maxPriceUi);
    }, 250);
    return () => clearTimeout(t);
  }, [maxPriceUi]);

  useEffect(() => {
    if (!slug) return;
    let alive = true;
    (async () => {
      setSubcatLoading(true);
      try {
        const subs = await getStoreSubcategories({ categorySlug: slug });
        if (!alive) return;
        setSubcategories(Array.isArray(subs) ? subs : []);
      } catch {
        if (!alive) return;
        setSubcategories([]);
      } finally {
        if (!alive) return;
        setSubcatLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [slug]);

  useEffect(() => {
    if (!slug) return;
    let alive = true;
    (async () => {
      setProductLoading(true);
      try {
        // Backend-driven filters/sort
        const payload = await getStoreProducts({
          page: 1,
          limit: 99,
          categorySlug: slug,
          subcategorySlug: activeSubcategorySlug || undefined,
          sort: sortBy || undefined,
          maxPrice: typeof maxPriceFilter === "number" ? maxPriceFilter : undefined,
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
      } finally {
        if (!alive) return;
        setProductLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [slug, activeSubcategorySlug, sortBy, maxPriceFilter]);

  // Stabilize slider max so it doesn't shrink when results are filtered by the slider itself.
  useEffect(() => {
    const list = Array.isArray(products) ? products : [];
    const derivedMax = list.reduce((acc, p) => {
      const v = Number(p?.maxPrice ?? p?.minPrice ?? 0);
      return Number.isFinite(v) ? Math.max(acc, v) : acc;
    }, 0);

    if (derivedMax > 0) {
      // When no filter is applied, snap sliderMax to the real max for this subcategory.
      // When filtered, don't shrink sliderMax (prevents thumb jumping).
      if (maxPriceFilter == null) setSliderMax(derivedMax);
      else setSliderMax((prev) => Math.max(prev, derivedMax));
    }
  }, [products, maxPriceFilter]);

  const sliderStep = useMemo(() => {
    return sliderMax <= 5000 ? 50 : sliderMax <= 20000 ? 100 : 250;
  }, [sliderMax]);

  return (
    <section className="max-w-[1400px] mx-auto px-6 py-10">

      {/* Breadcrumb */}
      <p className="text-sm text-gray-500 mb-4">
        Home / <span className="capitalize">{slug}</span>
        {activeSubcategorySlug ? (
          <>
            {" "}
            / <span className="capitalize">{activeSubcategorySlug.replaceAll("-", " ")}</span>
          </>
        ) : null}
      </p>

      {/* Heading */}
      {!activeSubcategorySlug && (
        <div className="flex flex-col gap-4 mb-10">
          <div className="flex items-center justify-between">
            <Link 
              to="/categories" 
              className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-[#88013C] transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Categories
            </Link>

            {!subcatLoading && subcategories.length > 0 && (
              <div className="text-sm font-semibold text-gray-500">
                {subcategories.length} {subcategories.length === 1 ? 'Subcategory' : 'Subcategories'}
              </div>
            )}
          </div>

          <h1 className="text-3xl font-bold">
            <span className="capitalize">{slug?.replaceAll("-", " ")}</span>
          </h1>
        </div>
      )}

      {/* Subcategories View - Only show if NO subcategory is selected */}
      {!activeSubcategorySlug && (
        <div className="mb-8">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h2 className="text-xl font-bold text-gray-900">Choose a Subcategory</h2>
          </div>

          {subcatLoading ? (
            <div className="text-sm text-gray-500">Loading subcategories…</div>
          ) : subcategories.length === 0 ? (
            <div className="text-sm text-gray-500">
              No subcategories found for this category.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {subcategories.map((sc) => {
                return (
                  <button
                    key={sc.id}
                    type="button"
                    onClick={() => {
                      const next = new URLSearchParams(searchParams);
                      next.set("sub", sc.slug);
                      setSearchParams(next, { replace: false });
                    }}
                    className={`text-left bg-white rounded-2xl border p-4 hover:shadow-lg hover:border-[#88013C] transition-all group`}
                  >
                    <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 mb-4 block relative">
                      <img
                        src={sc.imageUrl || "https://placehold.co/300x300?text=Subcategory"}
                        alt={sc.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="font-bold text-base text-gray-900 line-clamp-1 group-hover:text-[#88013C] transition-colors">
                      {sc.name}
                    </div>
                    <div className="text-sm text-gray-500 mt-1 group-hover:text-[#88013C] transition-colors">
                      Explore items →
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {activeSubcategorySlug && (
        <>
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                const next = new URLSearchParams(searchParams);
                next.delete("sub");
                setSearchParams(next, { replace: false });
              }}
              className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-[#88013C] transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Subcategories
            </button>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            <span className="capitalize">{activeSubcategorySlug.replaceAll("-", " ")}</span>
          </h1>
        </div>

          {/* Filter & Sort */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:justify-between sm:items-center mb-6 sm:mb-8">

            {/* PRICE FILTER (Max price slider) */}
            <div className="w-full sm:w-[360px] rounded-lg border bg-gray-50 px-3 py-2 sm:px-4 sm:py-2.5">
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-medium text-gray-700">Max price</div>
                <button
                  type="button"
                  onClick={() => {
                    setMaxPriceUi(null);
                    setMaxPriceFilter(null);
                  }}
                  className="text-xs font-semibold text-gray-500 hover:text-[#88013C] transition-colors"
                >
                  Clear
                </button>
              </div>
              <div className="mt-2 flex items-center gap-3">
                <input
                  type="range"
                  min={0}
                  max={sliderMax}
                  step={sliderStep}
                  value={typeof maxPriceUi === "number" ? maxPriceUi : sliderMax}
                  onChange={(e) => setMaxPriceUi(Number(e.target.value))}
                  className="w-full accent-[#88013C]"
                />
                <div className="shrink-0 text-sm font-semibold text-gray-800 tabular-nums">
                  ₹{Number(typeof maxPriceUi === "number" ? maxPriceUi : sliderMax).toLocaleString()}
                </div>
              </div>
            </div>

            {/* SORT */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="
                border px-3 py-2 sm:px-5 sm:py-2
                rounded-lg bg-gray-50 text-sm sm:text-base
                w-full sm:w-auto
              "
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="popularity">Popularity</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
            </select>

          </div>


          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {productLoading && (
              <p className="col-span-full text-center text-gray-500">
                Loading products…
              </p>
            )}

            {!productLoading && products.length === 0 && (
              <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-gray-100">
                <p className="text-gray-500 text-lg">No products found for this subcategory.</p>
              </div>
            )}

            {products.map(product => (
              <ProductCard key={product.id} product={product} className="h-full" />
            ))}

          </div>
        </>
      )}

    </section>
  );
};

export default CommonLayout;
