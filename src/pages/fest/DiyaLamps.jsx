import React from 'react'
import { Link } from 'react-router-dom'
import { diyaLampData } from '../../data/data'
import { useCart } from '../../context/CartContext'
import { ShoppingBag } from 'lucide-react'


const DiyaLamps = () => {
  const { addToCart } = useCart();
  
  return (
    <>


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
    
{diyaLampData.map((product) => (
  <Link to={`/diya-lamps/${product.slug}`} key={product.id}>
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

export default DiyaLamps