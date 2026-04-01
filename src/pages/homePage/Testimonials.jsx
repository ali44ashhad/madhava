import { useRef, useState, useEffect } from "react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { ReviewsData } from "../../utils/constants";

export default function Testimonials() {
    const sliderRef = useRef(null);
    const [canScroll, setCanScroll] = useState({ left: false, right: false });

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
        // Initial check
        setTimeout(checkScroll, 100);

        window.addEventListener("resize", checkScroll);
        return () => window.removeEventListener("resize", checkScroll);
    }, []);

    return (
        <section className="w-full px-4 sm:px-6 lg:px-10 py-10 md:py-14 bg-[#FFF9E6]">
            {/* Heading */}
            <div className="flex flex-col items-center justify-center mb-10 md:mb-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 uppercase tracking-wide">
                    Testimonials
                </h2>
            </div>

            {/* Cards */}
            <div className="relative group max-w-7xl mx-auto">
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
                    className="flex gap-4 sm:gap-5 md:gap-6 overflow-x-auto pb-4 scrollbar-hide scroll-smooth w-full px-2 justify-start"
                >
                    {ReviewsData.map((review, i) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="flex-none w-[85%] sm:w-[60%] md:w-[45%] lg:w-[30%] bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow relative"
                        >
                            {/* Quote icon */}
                            <div className="mb-4">
                                <Quote
                                    size={28}
                                    className="text-[#88013C]/20 rotate-180"
                                    fill="currentColor"
                                />
                            </div>

                            {/* Review text */}
                            <p className="text-sm sm:text-base text-gray-600 leading-relaxed min-h-[80px] mb-4">
                                "{review.text}"
                            </p>

                            {/* Author */}
                            <p className="text-sm font-bold text-gray-900 mb-2">
                                {review.alt}
                            </p>

                            {/* Stars */}
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, si) => (
                                    <Star
                                        key={si}
                                        size={14}
                                        className="text-[#FFD742] fill-[#FFD742]"
                                    />
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
