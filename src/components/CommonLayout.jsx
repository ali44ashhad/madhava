import { useParams } from "react-router-dom";
import { trueWirelessEarpods } from "../data/data";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingBag } from "lucide-react";

const CommonLayout = () => {
  const { slug } = useParams();

  const layoutData = trueWirelessEarpods.find(
    item => item.slug === slug
  );

  const { addToCart, getCartCount } = useCart();
  const [priceFilter, setPriceFilter] = useState("all"); // all | under2000 | under5000 | above5000
  const [sortBy, setSortBy] = useState("default"); // default | priceLow | priceHigh | popularity

  if (!layoutData) {
    return <div className="p-10">Category not found</div>;
  }

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  // ✅ Filter + Sort logic
  const finalProducts = useMemo(() => {
    let products = [...layoutData.products];

    // PRICE FILTER
    if (priceFilter === "under2000") {
      products = products.filter(p => p.price <= 2000);
    } else if (priceFilter === "under5000") {
      products = products.filter(p => p.price <= 5000);
    } else if (priceFilter === "above5000") {
      products = products.filter(p => p.price > 5000);
    }

    // SORT
    if (sortBy === "priceLow") {
      products.sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceHigh") {
      products.sort((a, b) => b.price - a.price);
    } else if (sortBy === "popularity") {
      products.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return products;
  }, [layoutData.products, priceFilter, sortBy]);

  return (
    <section className="pt-30 max-w-[1400px] mx-auto px-6 py-10">

      {/* Breadcrumb */}
      <p className="text-sm text-gray-500 mb-4">
        {layoutData.breadcrumb}
      </p>

      {/* Heading */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">
          {layoutData.heading}
        </h1>

        {/* Cart Count */}
        <div className="text-sm font-semibold text-[#88013C]">
          Cart: {getCartCount()} items
        </div>
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

        {finalProducts.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            No products found.
          </p>
        )}

{finalProducts.map(product => (
  <Link
    to={`/product/${product.slug}`}
    key={product.id}
    className="block"
  >
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">

      <div className="flex flex-row sm:flex-col">

        {/* IMAGE */}
        <img
          src={product.image}
          alt={product.name}
          className="
            w-[120px] h-[120px]
            sm:w-full sm:h-60
            object-cover
          "
        />

        {/* CONTENT */}
        <div className="p-3 sm:p-4 flex flex-col justify-between flex-1">

          <div>
            <h3 className="font-semibold text-sm sm:text-lg line-clamp-2">
              {product.name}
            </h3>

            {/* PRICE */}
            <div className="mt-1 sm:mt-3">
              <span className="text-base sm:text-xl font-bold">
                ₹{product.price?.toLocaleString() || "N/A"}
              </span>

              {product.mrp && (
                <span className="line-through text-gray-400 ml-2 text-xs sm:text-sm">
                  ₹{product.mrp.toLocaleString()}
                </span>
              )}

              {product.discount && (
                <span className="text-green-600 ml-2 text-xs sm:text-sm">
                  {product.discount}
                </span>
              )}
            </div>

            {/* FEATURES */}
            <div className="flex flex-wrap gap-1 sm:gap-2 mt-1 sm:mt-3">
              {product.features?.slice(0, 3).map((f, i) => (
                <span
                  key={i}
                  className="text-[10px] sm:text-xs bg-gray-100 px-2 py-1 rounded-full"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>

          {/* BUTTON */}
          <button
            onClick={(e) => {
              e.preventDefault();
              handleAddToCart(product);
            }}
            className="
              mt-2 sm:mt-4
              w-full bg-[#88013C] hover:bg-[#88013C]/90
              text-white py-2 sm:py-3 rounded-lg
              font-semibold flex items-center justify-center gap-2
              transition-all text-xs sm:text-base
            "
          >
            <ShoppingBag size={16} />
            <span>Add To Cart</span>
          </button>

        </div>
      </div>
    </div>
  </Link>
))}


      </div>

    </section>
  );
};

export default CommonLayout;
