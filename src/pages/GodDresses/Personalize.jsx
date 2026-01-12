import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { personalizeData } from '../../data/data'
import images from '../../assets/images';
import { useCart } from '../../context/CartContext';
import { ShoppingBag } from 'lucide-react';

const Personalize = () => {
    const { addToCart } = useCart();
    const [selectedProduct, setSelectedProduct] = useState(null);

    return (
        <>
<section className="pt-40 w-full py-16 px-4 md:px-10 lg:px-20 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
  Adorn Your Deity With Divine Elegance
</h2>

<p className="text-gray-600 text-base sm:text-lg mb-6">
  Discover beautifully crafted god dresses made with devotion and fine detailing. 
  Perfect for daily rituals, festivals, and special pooja occasions.
</p>

          <button className="px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition">
            Explore Collection
          </button>
        </div>

        {/* RIGHT IMAGE GRID */}
        <div className="grid grid-cols-2 gap-4">

<div className="overflow-hidden ">
  <img
    src={images.godDress1}
    alt="Gift 1"
    className="w-full h-full object-cover hover:scale-110 transition duration-500"
  />
</div>

<div className="overflow-hidden ">
  <img
    src={images.godDress2}
    alt="Gift 2"
    className="w-full h-full object-cover hover:scale-110 transition duration-500"
  />
</div>

<div className="overflow-hidden ">
  <img
    src={images.godDress3}
    alt="Gift 3"
    className="w-full h-full object-cover hover:scale-110 transition duration-500"
  />
</div>

<div className="overflow-hidden ">
  <img
    src={images.godDress4}
    alt="Gift 4"
    className="w-full h-full object-cover hover:scale-110 transition duration-500"
  />
</div>

</div>


      </div>
    </section>


  {/* --- Banner Section --- */}
  <section className="relative w-full overflow-hidden">
                <div className="relative w-full h-[320px] sm:h-[420px] md:h-[520px] lg:h-[800px]">
                    <img
                        src={images.godStatue}
                        alt="Spiritual Gifts"
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-black/20"></div>

                    <div className="absolute inset-0 flex items-center">
                        <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8">
                            <div className="max-w-xl text-left">
                                <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                                    Elevate Your Spiritual Space
                                </h2>

                                <p className="mt-4 text-white/90 text-sm sm:text-base md:text-lg leading-relaxed">
                                    Handcrafted idols, brass diyas, and home mandir décor that brings sanctity and positivity to your living space.
                                </p>

                                <button className="mt-6 inline-flex items-center rounded-xl bg-white px-6 py-3 text-sm sm:text-base font-semibold text-black hover:bg-gray-100 transition">
                                    Explore Divine Products
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
  </section>

  <div className="pt-[72px] md:pt-[80px] relative w-full overflow-hidden">
  {!selectedProduct && (
    <div className="w-full px-3 sm:px-6 lg:px-10 py-6">
      <header className="mb-6">
        <nav className="text-xs text-gray-500 mb-2">
          Home &gt; Traditional God Statues & Idols
        </nav>

        <h1 className="text-xl sm:text-2xl font-black italic uppercase">
          Traditional God Statues & Idols
        </h1>
      </header>

      {/* ✅ RESPONSIVE GRID:
          mobile: 1
          tablet: 2
          laptop: 3
          desktop: 4
          big screen: 5
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {personalizeData.map((product) => (
          <div
            key={product.id}
            className="flex flex-row bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 w-full transition-all hover:shadow-md"
          >
            {/* LEFT IMAGE */}
            <div className="relative bg-[#f2f2f2] w-[40%] min-w-[40%] flex flex-col justify-between p-2">
              
              {/* Badge */}
              <div className="absolute top-1 left-1 bg-black text-white text-[8px] font-bold px-2 py-[2px] rounded z-10">
                ✍️ ENGRAVING
              </div>

              {/* Image */}
              <div className="w-full flex-1 flex items-center justify-center overflow-hidden">
                <img
                  src={product.imageURL}
                  alt={product.name}
                  className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Yellow Patti */}
              <div className="mt-1 bg-yellow-400 text-black text-[9px] font-black py-[2px] uppercase italic text-center rounded">
                {product.playback}
              </div>
            </div>

            {/* RIGHT CONTENT */}
            <div className="p-2 flex flex-col justify-between w-[60%]">
              <div>
                {/* Rating */}
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-1 text-[10px] font-bold">
                    <span className="text-yellow-400">★</span>
                    <span>{product.rating}</span>
                    <span className="text-gray-300">|</span>
                    <span className="text-gray-400">{product.reviews}</span>
                    <span className="text-emerald-500">✅</span>
                  </div>

                  <div className="bg-[#fff9e6] text-[#856404] text-[8px] font-black px-2 py-[1px] rounded border border-yellow-100 uppercase">
                    Best
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-[11px] sm:text-[12px] md:text-[13px] font-bold text-slate-800 leading-tight mb-1 line-clamp-2">
                  {product.name}
                </h3>

                {/* Price */}
                <div className="flex flex-wrap items-center gap-1 mb-1">
                  <span className="text-sm font-black text-slate-900">
                    ₹{product.price}
                  </span>
                  <span className="text-gray-400 line-through text-[10px]">
                    ₹{product.originalPrice}
                  </span>
                  <span className="text-emerald-500 font-bold text-[10px]">
                    {product.discount}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {product.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="bg-blue-50 text-slate-500 text-[8px] px-2 py-[1px] rounded-full border border-blue-100 font-bold uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-1">
                <Link
                  to={`/product/${product.slug}`}
                  className="flex-1 bg-[#88013C] text-white py-1.5 rounded-md font-bold text-[10px] uppercase italic text-center"
                >
                  View
                </Link>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    addToCart(product, 1)
                  }}
                  className="flex-1 bg-[#1a202c] text-white py-1.5 rounded-md font-bold text-[10px] uppercase italic flex items-center justify-center gap-1"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )}
</div>



        </>
    )
}

export default Personalize