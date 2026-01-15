import React from 'react'
import images from '../../assets/images'
import { homedecorProducts } from '../../data/data'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { ShoppingBag } from 'lucide-react'
const ShopByCategories = () => {

  const { addToCart } = useCart();
  
  return (
    <>

    {/* hero section */}
<div className="w-full bg-[#f8f9fa] pt-[72px] md:pt-[80px]">
  {/* 72px / 80px = navbar height */}

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
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-10">
    {homedecorProducts.map((product) => (
  <Link
    key={product.id}
    to={`/home-decor/${product.slug}`}
    className="block"
  >
    <div className="group bg-gray-50 rounded-2xl overflow-hidden border border-transparent hover:border-gray-200 transition-all">
      
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

        {/* Specs Bar */}
        <div className="absolute bottom-0 w-full bg-[#ffce1c] py-1 px-3 flex justify-between items-center text-[11px] font-bold">
          <span>{product.specs}</span>
          <span className="flex items-center gap-1">⭐ {product.rating}</span>
        </div>
      </div>

      <div className="p-4 bg-white">
        <h3 className="font-bold text-sm mb-2 truncate">{product.name}</h3>
        <hr className="border-dashed mb-2" />
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg font-black">
            ₹{product.price.toLocaleString()}
          </span>
          <span className="text-gray-400 line-through text-xs">
            ₹{product.oldPrice.toLocaleString()}
          </span>
          <span className="text-green-500 font-bold text-[11px]">
            {product.discount}
          </span>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addToCart(product, 1);
          }}
          className="w-full bg-[#88013C] text-white py-2 rounded-lg font-semibold hover:bg-[#88013C]/90 transition-all flex items-center justify-center gap-2 text-xs mt-2"
        >
          <ShoppingBag size={14} />
          <span>Add to Cart</span>
        </button>
      </div>

    </div>
  </Link>
))}

  </div>
</section>


    </>
  )
}

export default ShopByCategories