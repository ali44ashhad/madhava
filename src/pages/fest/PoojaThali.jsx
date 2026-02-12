import React, { useEffect, useState } from 'react'
import { poojaThaliData } from '../../data/data'
import { getStoreProducts } from '../../utils/storeApi'
import ProductCard from '../../components/ProductCard'
import images from '../../assets/images'

const PoojaThali = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    ;(async () => {
      setLoading(true)
      try {
        const payload = await getStoreProducts({ page: 1, limit: 40 })
        const list = Array.isArray(payload?.products)
          ? payload.products
          : Array.isArray(payload)
            ? payload
            : []
        if (!alive) return
        setProducts(list)
      } catch {
        if (!alive) return
        setProducts([])
      } finally {
        if (!alive) return
        setLoading(false)
      }
    })()
    return () => {
      alive = false
    }
  }, [])
  
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

  {/* Product Grid – ProductCard, no Add to Cart */}
  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-6">
    {loading && (
      <p className="col-span-full text-center text-gray-500">Loading products…</p>
    )}
    {(products.length ? products : poojaThaliData).map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
</section>
    </>
  )
}

export default PoojaThali