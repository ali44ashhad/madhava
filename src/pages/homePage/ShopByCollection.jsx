import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import images from "../../assets/images";

const collections = [
    {
        title: "God Dresses",
        subtitle: "Beautiful attire for your deity",
        image: images.godDress1,
        link: "/categories",
    },
    {
        title: "Statues & Idols",
        subtitle: "Handcrafted divine sculptures",
        image: images.godStatue,
        link: "/categories",
    },
    {
        title: "Pooja Essentials",
        subtitle: "Everything for your daily pooja",
        image: images.poojaThalli3,
        link: "/categories",
    },
];

export default function ShopByCollection() {
    return (
        <section className="w-full px-4 sm:px-6 lg:px-10 py-10 md:py-14 bg-gradient-to-b from-gray-50/50 to-white">
            {/* Heading */}
            <div className="flex flex-col items-center justify-center mb-10 md:mb-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 uppercase tracking-wide">
                    Shop by Collection
                </h2>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                {collections.map((col, i) => (
                    <motion.div
                        key={col.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                    >
                        <Link
                            to={col.link}
                            className="group block relative overflow-hidden rounded-2xl aspect-[4/3] sm:aspect-[3/4] lg:aspect-[4/3]"
                        >
                            {/* Image */}
                            <img
                                src={col.image}
                                alt={col.title}
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                loading="lazy"
                            />

                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                            {/* Text */}
                            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                                    {col.title}
                                </h3>
                                <p className="text-sm text-white/80 mb-3">{col.subtitle}</p>
                                <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#FFD742] group-hover:gap-2 transition-all">
                                    Explore
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </span>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
