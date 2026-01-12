import React from "react";
import ChooseOffer from "./ChooseOffer";
import Offers from "./Offers";
import images from "../../assets/images";
import { useCart } from "../../context/CartContext";


const GiftHero = () => {
    const { addToCart } = useCart();
    
    return (
        <>
            {/* --- Hero Section --- */}
            <section className="pt-[72px] md:pt-[80px] w-full relative overflow-hidden">
                <div className="relative w-full min-h-[calc(100vh-72px)] sm:h-[320px] md:h-[420px] lg:h-[520px]">
                    <img
                        src={images.giftHero} // Replace with a beautiful mandir/god idol hero image
                        alt="Divine Collection Banner"
                        className="absolute inset-0 w-full h-full object-cover object-center"
                    />

                    {/* Overlay for readability */}
                    <div className="absolute inset-0 bg-black/30"></div>

                    {/* Text Content */}
                    <div className="absolute inset-0 flex items-center">
                        <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8">
                            <div className="max-w-xl">
                                <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight">
                                    Explore Our Divine Collection of Idols & Décor
                                </h1>

                                <p className="mt-3 text-white/90 text-sm sm:text-base md:text-lg">
                                    Handcrafted God idols, spiritual ornaments, and home mandir essentials for your sacred space.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Highlight Section --- */}
          <section className="w-full bg-white py-10 sm:py-14 md:py-20">
  <div className="max-w-7xl mx-auto flex flex-col items-center justify-center px-4 text-center">

    <h5 className="text-xl sm:text-2xl md:text-4xl font-light text-black mb-2">
      Spiritual Gifts Enhance Your Home & Mandir
    </h5>

    <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold text-black leading-tight">
      Thoughtful & Sacred Collections
    </h1>

  </div>
</section>

            {/* --- Offers Section --- */}
            <ChooseOffer/>

            {/* --- Another Hero Banner --- */}
          <section className="pt-[72px] md:pt-[80px] w-full relative">
  <div className="relative w-full min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh]">

    <img
      src={images.giftPageImage}
      alt="Divine Collection"
      className="absolute inset-0 w-full h-full object-cover"
    />

    {/* Overlay */}
    <div className="absolute inset-0 bg-black/20"></div>

    {/* Content */}
    <div className="absolute inset-0 flex items-center">
      <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight">
            Discover Idols, Ornaments & Mandir Essentials
          </h1>
        </div>
      </div>
    </div>

  </div>
</section>

            <Offers/>

            {/* --- Last Banner Section --- */}
           {/* <section className="pt-[72px] md:pt-[80px] w-full relative">
  <div className="relative w-full min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh] lg:min-h-[520px]">

    <img
      src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70"
      alt="Spiritual Gifts Banner"
      className="absolute inset-0 w-full h-full object-cover"
    />

     <div className="absolute inset-0 bg-black/30"></div>

     <div className="absolute inset-0 flex items-center">
      <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight">
            Bring Home the Divine Aura
          </h1>
        </div>
      </div>
    </div>

  </div>
</section> */}

        </>
    );
};

export default GiftHero;
