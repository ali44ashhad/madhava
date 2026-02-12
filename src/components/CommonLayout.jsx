import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getStoreProducts, getStoreSubcategories } from "../utils/storeApi";
import ProductCard from "./ProductCard";

const CommonLayout = () => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const { getCartCount } = useCart();
  const [priceFilter, setPriceFilter] = useState("all"); // all | under2000 | under5000 | above5000
  const [sortBy, setSortBy] = useState("default"); // default | priceLow | priceHigh | popularity

  // Subcategories + products from backend
  const [subcategories, setSubcategories] = useState([]);
  const [subcatLoading, setSubcatLoading] = useState(true);
  
  const [products, setProducts] = useState([]);
  const [productLoading, setProductLoading] = useState(true);

  const activeSubcategorySlug = searchParams.get("sub") || "";

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
        // Best-effort: if backend supports categorySlug/subcategorySlug filters, this works directly.
        const payload = await getStoreProducts({
          page: 1,
          limit: 200,
          categorySlug: slug,
          subcategorySlug: activeSubcategorySlug || undefined,
        });
        const list = Array.isArray(payload?.products)
          ? payload.products
          : Array.isArray(payload)
            ? payload
            : [];

        // Fallback client-side filtering (in case backend doesn't support the params)
        const filtered = activeSubcategorySlug
          ? list.filter(
              (p) =>
                (p?.category?.slug || "").toLowerCase() === slug.toLowerCase() &&
                (p?.subcategory?.slug || "").toLowerCase() ===
                  activeSubcategorySlug.toLowerCase()
            )
          : list.filter(
              (p) => (p?.category?.slug || "").toLowerCase() === slug.toLowerCase()
            );

        if (!alive) return;
        setProducts(filtered);
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
  }, [slug, activeSubcategorySlug]);

  // ✅ Filter + Sort logic (on backend products)
  const finalProducts = useMemo(() => {
    let list = [...(products || [])];

    // Map to a sortable price number (prefer sellingPrice)
    const getPrice = (p) => {
      const sku = p?.skus?.[0];
      const sp = Number(sku?.sellingPrice);
      const mrp = Number(sku?.mrp);
      return Number.isFinite(sp) && sp > 0 ? sp : Number.isFinite(mrp) ? mrp : 0;
    };

    // PRICE FILTER;
    if (priceFilter === "under2000") {
      list = list.filter((p) => getPrice(p) <= 2000);
    } else if (priceFilter === "under5000") {
      list = list.filter((p) => getPrice(p) <= 5000);
    } else if (priceFilter === "above5000") {
      list = list.filter((p) => getPrice(p) > 5000);
    }

    // SORT
    if (sortBy === "priceLow") {
      list.sort((a, b) => getPrice(a) - getPrice(b));
    } else if (sortBy === "priceHigh") {
      list.sort((a, b) => getPrice(b) - getPrice(a));
    } else if (sortBy === "popularity") {
      list.sort((a, b) => (b?.rating || 0) - (a?.rating || 0));
    }

    return list;
  }, [products, priceFilter, sortBy]);

  return (
    <section className="pt-50 max-w-[1400px] mx-auto px-6 py-10">

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
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">
          <span className="capitalize">{slug?.replaceAll("-", " ")}</span>
        </h1>

        {/* Cart Count */}
        <div className="text-sm font-semibold text-[#88013C]">
          Cart: {getCartCount()} items
        </div>
      </div>

      {/* Subcategories */}
      <div className="mb-8">
        <div className="flex items-center justify-between gap-4 mb-4">
          <h2 className="text-lg font-bold text-gray-900">Shop by Subcategory</h2>
          {activeSubcategorySlug ? (
            <button
              type="button"
              onClick={() => {
                const next = new URLSearchParams(searchParams);
                next.delete("sub");
                setSearchParams(next, { replace: false });
              }}
              className="text-sm font-semibold text-[#88013C] hover:underline"
            >
              Clear filter
            </button>
          ) : null}
        </div>

        {subcatLoading ? (
          <div className="text-sm text-gray-500">Loading subcategories…</div>
        ) : subcategories.length === 0 ? (
          <div className="text-sm text-gray-500">
            No subcategories found for this category.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {subcategories.map((sc) => {
              const isActive =
                (sc?.slug || "").toLowerCase() === activeSubcategorySlug.toLowerCase();
              return (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => {
                    const next = new URLSearchParams(searchParams);
                    next.set("sub", sc.slug);
                    setSearchParams(next, { replace: false });
                  }}
                  className={`text-left bg-white rounded-2xl border p-3 hover:shadow-sm transition ${
                    isActive ? "border-[#88013C]" : "border-gray-200"
                  }`}
                >
                  <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 mb-3">
                    <img
                      src={sc.imageUrl || "https://placehold.co/300x300?text=Subcategory"}
                      alt={sc.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="font-semibold text-sm text-gray-900 line-clamp-1">
                    {sc.name}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    View products →
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Filter & Sort */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:justify-between sm:items-center mb-6 sm:mb-8">

{/* PRICE FILTER */}
<select
  value={priceFilter}
  onChange={(e) => setPriceFilter(e.target.value)}
  className="
    border px-3 py-2 sm:px-5 sm:py-2
    rounded-lg bg-gray-50 text-sm sm:text-base
    w-full sm:w-auto
  "
>
  <option value="all">Filter By Price</option>
  <option value="under2000">Under ₹2,000</option>
  <option value="under5000">Under ₹5,000</option>
  <option value="above5000">Above ₹5,000</option>
</select>

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
  <option value="default">Sort By</option>
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

        {/* {finalProducts.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            {!productLoading ? "No products found." : null}
          </p>
        )} */}

{finalProducts.map(product => (
  <ProductCard key={product.id} product={product} className="h-full" />
))}


      </div>

    </section>
  );
};

export default CommonLayout;
