import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { allProducts } from '../../data/data'
import { useCart } from '../../context/CartContext'
import { ShoppingBag } from 'lucide-react'

const ChooseOffer = () => {
  const { addToCart } = useCart()
  const [activeTab, setActiveTab] = useState("All Deals")

  // ✅ AUTO-GENERATE CATEGORIES FROM DATA
  const categories = useMemo(() => {
    const cats = allProducts.map(item => item.category)
    return ["All Deals", ...new Set(cats)]
  }, [])

  // ✅ FILTER PRODUCTS
  const filteredProducts =
    activeTab === "All Deals"
      ? allProducts
      : allProducts.filter(item => item.category === activeTab)

  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 py-10">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          Gifting <span className="underline decoration-[#88013C] underline-offset-8">Deals</span>
        </h2>
        <button className="text-blue-600 font-medium flex items-center hover:underline">
          View All <span className="ml-1 text-xl">→</span>
        </button>
      </div>

      {/* ✅ DYNAMIC FILTER TABS */}
      <div className="flex gap-4 overflow-x-auto no-scrollbar mb-8 pb-2">
        {categories.map((tab) => (
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

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-5">
        {filteredProducts.map((product) => {
          const productSlug = product.slug || `product-${product.id}`

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

                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* SPECS BAR */}
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
                    e.preventDefault()
                    e.stopPropagation()
                    addToCart(product, 1)
                  }}
                  className="w-full bg-[#88013C] text-white py-2 rounded-lg font-semibold hover:bg-[#88013C]/90 transition-all flex items-center justify-center gap-2 text-xs mt-2"
                >
                  <ShoppingBag size={14} />
                  <span>Add to Cart</span>
                </button>
              </div>
            </Link>
          )
        })}

        {filteredProducts.length === 0 && (
          <p className="col-span-full text-center text-gray-400 py-10 italic">
            No products found in this category.
          </p>
        )}
      </div>

    </section>
  )
}

export default ChooseOffer
