import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "../../data/data";
import LiveSale from "./LiveSale";
import BigDeals from "./BigDeals";
import Explore from "./Explore";
import Reviews from "./Reviews";
import images from "../../assets/images";

const AUTO_DELAY = 4500;

export default function Home() {
  const totalSlides = heroSlides.length;
  const [index, setIndex] = useState(1);
  const [animate, setAnimate] = useState(true);

  const extendedSlides = [
    heroSlides[totalSlides - 1],
    ...heroSlides,
    heroSlides[0],
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, AUTO_DELAY);
    return () => clearInterval(timer);
  }, [index]);

  const handleNext = () => {
    setAnimate(true);
    setIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setAnimate(true);
    setIndex((prev) => prev - 1);
  };

  useEffect(() => {
    if (index === totalSlides + 1) {
      const timeout = setTimeout(() => {
        setAnimate(false);
        setIndex(1);
      }, 700);
      return () => clearTimeout(timeout);
    }
    if (index === 0) {
      const timeout = setTimeout(() => {
        setAnimate(false);
        setIndex(totalSlides);
      }, 700);
      return () => clearTimeout(timeout);
    }
  }, [index, totalSlides]);

  return (
    <>
      <section className="pt-[72px] md:pt-[80px] relative w-full overflow-hidden min-h-[500px] sm:min-h-[600px] md:min-h-[700px] lg:min-h-[800px] flex items-center">

        {/* ===== BACKGROUND LAYERS ===== */}
        <div className="absolute inset-0 z-0 pointer-events-none">

          {/* LEFT IMAGE */}
          <img
  src={images.heroLeftBgImage}
  alt="Background decoration"
  className="
    absolute inset-0
    w-full h-full
    object-cover
    lg:w-[50%]
  "
/>


          {/* LEFT DARK OVERLAY */}
          <div className="absolute inset-0 bg-black/70 lg:w-[50%]"></div>

          {/* RIGHT GRADIENT */}
          <div className="hidden lg:block absolute right-0 top-0 h-full w-[50%] 
            bg-gradient-to-r from-[#0E131B] via-[#1A2531]/90 to-[#1A2531]/70">
          </div>

        </div>

        {/* ===== SLIDER CONTAINER ===== */}
        <div
          className={`flex relative z-10 h-full items-center ${
            animate ? "transition-transform duration-700 ease-in-out" : "transition-none"
          }`}
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {extendedSlides.map((slide, i) => (
            <div
              key={i}
              className={`min-w-full flex items-center min-h-[500px] sm:min-h-[600px] md:min-h-[700px] lg:min-h-[800px]`}
            >
              <div className="mx-auto max-w-7xl px-6 py-8 md:py-12 lg:py-16 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 md:gap-12">

                  {/* LEFT CONTENT */}
                  <div className="space-y-6 text-center lg:text-left">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-white">
                      {slide.title}
                      
                    </h1>
                    <h1 className="inline-block w-fit rounded-md bg-[#88013C]/70 px-3 py-1 text-sm text-white">
  {slide.tag}
</h1>
 
                    <p className="text-lg font-semibold text-white">
                      {slide.subtitle}
                    </p>
                    <button className="rounded-full bg-[#88013C] px-8 py-3 text-white font-semibold hover:opacity-90 transition">
                      {slide.button}
                    </button> <br />  
                    <p className="text-sm text-white">
                      {slide.offer}
                    </p>
                  </div>

                  {/* RIGHT IMAGE */}
                  <div className="flex justify-center">
                    <img
                      src={slide.image}
                      alt="product"
                      className="w-[280px] sm:w-[340px] md:w-[420px] lg:w-[460px] object-contain"
                    />
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ===== NAV BUTTONS ===== */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-[#88013C] p-2 text-white hover:bg-[#88013C]/70"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-[#88013C] p-2 text-white hover:bg-[#88013C]/70"
        >
          <ChevronRight />
        </button>

        {/* ===== DOTS ===== */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {heroSlides.map((_, i) => {
            const isActive =
              index === i + 1 ||
              (index === totalSlides + 1 && i === 0) ||
              (index === 0 && i === totalSlides - 1);

            return (
              <span
                key={i}
                onClick={() => {
                  setAnimate(true);
                  setIndex(i + 1);
                }}
                className={`h-2.5 w-2.5 rounded-full cursor-pointer transition-all ${
                  isActive ? "bg-[#88013C] scale-125" : "bg-white/50"
                }`}
              />
            );
          })}
        </div>

      </section>

      {/* ===== NEXT SECTION ===== */}
      <div className="bg-[#FFD742] py-2 px-4 flex flex-wrap items-center justify-center gap-4 md:gap-8 text-[10px] md:text-xs font-semibold uppercase tracking-tight">
        <div>100% AUTHENTIC PRODUCTS</div>
        <div>Trusted by <b>10000+</b> Devotees</div>
        <div>Handcrafted • Temple Quality • Premium Finish</div>
        <div>Special for Home & Mandir</div>
      </div>

      <LiveSale />
      <BigDeals />
      <Explore />
      <Reviews />
    </>
  );
}
