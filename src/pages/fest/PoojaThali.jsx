import React from 'react'
import { poojaThaliData } from '../../data/data'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { ShoppingBag } from 'lucide-react'
import images from '../../assets/images'

const PoojaThali = () => {
  const { addToCart } = useCart();
  
  return (
    <>

{/* --- Banner Section --- */}
<section className="pt-20 relative w-full overflow-hidden bg-black">

  {/* Aspect ratio wrapper */}
  <div className="relative w-full aspect-[16/9] sm:aspect-[16/7] lg:aspect-[16/6]">

  <img
  src={images.godStatue}
  alt="Spiritual Gifts"
  className="
    absolute inset-0
    w-full h-full
    object-contain-cover lg:object-cover
    object-top
  "
/>


    {/* Overlay */}
    <div className="absolute inset-0 bg-black/40"></div>

    {/* Content */}
    <div className="absolute inset-0 flex items-center">
      <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl text-left">

          <h2 className="text-white text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Elevate Your Spiritual Space
          </h2>

          <p className="mt-3 sm:mt-4 text-white/90 text-xs sm:text-base md:text-lg leading-relaxed">
            Handcrafted idols, brass diyas, and home mandir décor that brings sanctity and positivity to your living space.
          </p>

          <button className="mt-4 sm:mt-6 inline-flex items-center rounded-xl bg-white px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-black hover:bg-gray-100 transition">
            Explore Divine Products
          </button>

        </div>
      </div>
    </div>

  </div>
</section>




      <section className="pt-30 w-full px-4 sm:px-6 lg:px-10 py-10">
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
    
{poojaThaliData.map((product) => (
  <Link to={`/pooja-thali/${product.slug}`} key={product.id}>
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
          <span className="text-lg font-black">₹{product.price.toLocaleString()}</span>
          <span className="text-gray-400 line-through text-xs">₹{product.oldPrice.toLocaleString()}</span>
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

export default PoojaThali