import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { getStoreProducts } from "../../utils/storeApi";
import ProductCard from "../../components/ProductCard";

export default function FeaturedProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [canScroll, setCanScroll] = useState({ left: false, right: false });
    const sliderRef = useRef(null);

    const checkScroll = () => {
        const slider = sliderRef.current;
        if (!slider) return;
        setCanScroll({
            left: slider.scrollLeft > 0,
            right: slider.scrollLeft + slider.clientWidth < slider.scrollWidth - 1,
        });
    };

    const scroll = (dir) => {
        const slider = sliderRef.current;
        if (!slider) return;
        const scrollAmount = slider.clientWidth * 0.8;
        slider.scrollBy({
            left: dir === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                const payload = await getStoreProducts({ page: 1, limit: 8, isFeatured: true });
                const list = Array.isArray(payload?.products)
                    ? payload.products
                    : Array.isArray(payload)
                        ? payload
                        : [];
                if (alive) {
                    setProducts(list.slice(0, 8));
                    // Initialize scroll check after products load
                    setTimeout(checkScroll, 100);
                }
            } catch {
                if (alive) setProducts([]);
            } finally {
                if (alive) setLoading(false);
            }
        })();

        window.addEventListener("resize", checkScroll);
        return () => { 
            alive = false; 
            window.removeEventListener("resize", checkScroll);
        };
    }, []);

    return (
        <section className="w-full px-4 sm:px-6 lg:px-10 py-10 md:py-14">
            {/* Header */}
            <div className="flex flex-col items-center justify-center mb-10 md:mb-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 uppercase tracking-wide">
                    Featured Products
                </h2>
            </div>

            {/* Grid */}
            {loading ? (
                <div className="text-center text-gray-400 text-sm py-10">Loading products…</div>
            ) : products.length === 0 ? (
                <div className="text-center text-gray-400 text-sm py-10">No products available.</div>
            ) : (
                <div className="relative group mx-auto">
                    {/* Left arrow */}
                    {canScroll.left && (
                        <button
                            onClick={() => scroll("left")}
                            className="absolute -left-2 sm:-left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-md border border-gray-100 hidden md:flex items-center justify-center text-gray-600 hover:text-[#88013C] hover:shadow-lg transition-all duration-300"
                            aria-label="Scroll left"
                        >
                            <ChevronLeft size={18} />
                        </button>
                    )}

                    {/* Right arrow */}
                    {canScroll.right && (
                        <button
                            onClick={() => scroll("right")}
                            className="absolute -right-2 sm:-right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-md border border-gray-100 hidden md:flex items-center justify-center text-gray-600 hover:text-[#88013C] hover:shadow-lg transition-all duration-300"
                            aria-label="Scroll right"
                        >
                            <ChevronRight size={18} />
                        </button>
                    )}

                    <div
                        ref={sliderRef}
                        onScroll={checkScroll}
                        className="flex gap-3 sm:gap-4 md:gap-5 overflow-x-auto overscroll-x-contain scrollbar-hide pb-4 px-1"
                    >
                        {products.map((p, i) => (
                            <motion.div
                                key={p.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05, duration: 0.4 }}
                                className="flex-none w-[48%] sm:w-[32%] md:w-[24%] lg:w-[19%]"
                            >
                                <ProductCard product={p} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}
