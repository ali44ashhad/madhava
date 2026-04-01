import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { getStoreCategories } from "../../utils/storeApi";

export default function CategoryCircles() {
    const [categories, setCategories] = useState([]);
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
                const cats = await getStoreCategories();
                if (alive) {
                    setCategories(Array.isArray(cats) ? cats : []);
                    // Initialize scroll check after categories load
                    setTimeout(checkScroll, 100);
                }
            } catch {
                if (alive) setCategories([]);
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

    if (loading) {
        return (
            <section className="w-full px-4 sm:px-6 lg:px-10 py-10 md:py-14">
                <div className="text-center text-gray-400 text-sm py-8">Loading categories…</div>
            </section>
        );
    }

    if (!categories.length) return null;

    return (
        <section className="w-full px-4 sm:px-6 lg:px-10 py-10 md:py-14 bg-[#FFF9E6]">
            {/* Heading */}
            <div className="flex flex-col items-center justify-center mb-10 md:mb-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 uppercase tracking-wide">
                    Shop by Category
                </h2>
            </div>

            {/* Scrollable Container with Arrows */}
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
                    className={`flex gap-4 sm:gap-6 overflow-x-auto pb-4 scrollbar-hide scroll-smooth px-2 ${(!canScroll.left && !canScroll.right) ? 'justify-center' : 'justify-start'}`}
                >
                    {categories.map((cat, i) => (
                        <motion.div
                            key={cat.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05, duration: 0.4 }}
                        >
                            <Link
                                to={`/category/${cat.slug}`}
                                className="flex flex-col items-center group cursor-pointer min-w-[80px] sm:min-w-[100px]"
                            >
                                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-white border-2 border-gray-100 group-hover:border-[#88013C] overflow-hidden flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
                                    <img
                                        src={cat.imageUrl || "https://placehold.co/100?text=Category"}
                                        alt={cat.name}
                                        className="w-full h-full object-cover p-1.5 rounded-full group-hover:scale-110 transition-transform duration-300"
                                        loading="lazy"
                                    />
                                </div>
                                <span className="mt-2 text-[10px] sm:text-xs md:text-sm font-semibold text-gray-700 group-hover:text-[#88013C] text-center leading-tight max-w-[80px] sm:max-w-[100px] line-clamp-2 transition-colors">
                                    {cat.name}
                                </span>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
