import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { getStoreProducts } from "../../utils/storeApi";
import images from "../../assets/images";

const AUTO_DELAY = 5000;

export default function NewHero() {
    const [slides, setSlides] = useState([]);
    const [index, setIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    // Fetch featured products on mount
    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                const payload = await getStoreProducts({ page: 1, limit: 7, isFeatured: true });
                const list = Array.isArray(payload?.products)
                    ? payload.products
                    : Array.isArray(payload)
                        ? payload
                        : [];

                if (alive && list.length > 0) {
                    setSlides(list);
                }
            } catch {
                // keep slides empty on error
            } finally {
                if (alive) setLoading(false);
            }
        })();
        return () => { alive = false; };
    }, []);

    // Auto-rotate
    useEffect(() => {
        if (slides.length === 0) return;
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % slides.length);
        }, AUTO_DELAY);
        return () => clearInterval(timer);
    }, [index, slides.length]);

    const handlePrev = () =>
        setIndex((prev) => (prev - 1 + slides.length) % slides.length);
    const handleNext = () =>
        setIndex((prev) => (prev + 1) % slides.length);

    // Build slide data from the current product
    const product = slides[index];

    const tag = product?.categoryName || "FEATURED";
    const title = product?.name || "";
    const subtitle = product?.description || "Handcrafted with love & devotion";
    const price = product?.minPrice ?? 0;
    const mrp = product?.maxMrp ?? 0;
    const percentOff =
        mrp > price && price > 0
            ? Math.round(((mrp - price) / mrp) * 100)
            : null;
    const offer = percentOff
        ? `Starting ₹${Number(price).toLocaleString()} • ${percentOff}% off`
        : price > 0
            ? `Starting ₹${Number(price).toLocaleString()}`
            : "";
    const imageUrl = product?.featuredImageUrl || "";
    const productLink = product ? `/product/${product.id}` : "/products";

    // Show a skeleton placeholder while loading
    if (loading) {
        return (
            <section className="relative w-full overflow-hidden min-h-[420px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-0 flex items-center bg-[#1A2531]">
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <img
                        src={images.heroLeftBgImage}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover lg:object-contain lg:object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-[#1A2531]/80" />
                </div>
                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 md:py-16">
                    <div className="flex items-center justify-center h-[300px] md:h-[400px]">
                        <div className="animate-pulse flex flex-col items-center gap-4">
                            <div className="h-6 w-32 bg-white/20 rounded-full" />
                            <div className="h-12 w-72 bg-white/20 rounded-lg" />
                            <div className="h-4 w-56 bg-white/10 rounded" />
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // If no featured products, don't render the section
    if (slides.length === 0) return null;

    return (
        <section className="relative w-full overflow-hidden min-h-[420px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-0 flex items-center bg-[#1A2531]">
            {/* Background layers */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <img
                    src={images.heroLeftBgImage}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover lg:object-contain lg:object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-[#1A2531]/80" />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 md:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-6 md:gap-10">
                    {/* Left – Text */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="space-y-4 md:space-y-6 text-center lg:text-left"
                        >
                            <span className="inline-block rounded-full bg-[#88013C]/80 px-4 py-1 text-[10px] sm:text-xs font-semibold text-white uppercase tracking-wider">
                                {tag}
                            </span>

                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                                {title}
                            </h1>

                            <p className="text-base sm:text-lg text-white/80 max-w-md mx-auto lg:mx-0 line-clamp-2">
                                {subtitle}
                            </p>

                            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
                                <Link
                                    to={productLink}
                                    className="px-8 py-3 rounded-full bg-[#88013C] text-white font-semibold text-sm sm:text-base hover:bg-[#6f012f] transition shadow-lg shadow-[#88013C]/30"
                                >
                                    SHOP NOW
                                </Link>
                                <Link
                                    to="/categories"
                                    className="px-8 py-3 rounded-full border-2 border-white/30 text-white font-semibold text-sm sm:text-base hover:bg-white/10 transition"
                                >
                                    Browse Categories
                                </Link>
                            </div>

                            {offer && (
                                <p className="text-xs sm:text-sm text-[#FFD742] font-medium">
                                    {offer}
                                </p>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* Right – Image */}
                    <div className="flex justify-center lg:justify-end">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={index}
                                src={imageUrl}
                                alt={title}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5 }}
                                className="w-[200px] sm:w-[260px] md:w-[340px] lg:w-[420px] object-contain drop-shadow-2xl"
                            />
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Navigation arrows */}
            <button
                onClick={handlePrev}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition"
                aria-label="Previous"
            >
                <ChevronLeft size={18} />
            </button>
            <button
                onClick={handleNext}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition"
                aria-label="Next"
            >
                <ChevronRight size={18} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`h-2 rounded-full transition-all duration-300 ${i === index
                            ? "w-8 bg-[#FFD742]"
                            : "w-2 bg-white/40 hover:bg-white/60"
                            }`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
