import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import images from "../../assets/images";

export default function FestiveBanner() {
    return (
        <section className="w-full px-4 sm:px-6 lg:px-10 py-6 md:py-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative w-full overflow-hidden rounded-2xl md:rounded-3xl min-h-[200px] sm:min-h-[260px] md:min-h-[340px] lg:min-h-0 bg-[#88013C]"
            >
                {/* Background Image */}
                <img
                    src={images.exploreBg}
                    alt="Festive Collection"
                    className="absolute inset-0 w-full h-full object-cover lg:object-contain lg:object-center"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#88013C]/90 via-[#88013C]/60 to-transparent" />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-start justify-center h-full min-h-[200px] sm:min-h-[260px] md:min-h-[340px] lg:min-h-0 px-6 sm:px-10 md:px-16 py-8 lg:py-12">
                    <span className="inline-block bg-[#FFD742] text-[#88013C] text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full mb-3 sm:mb-4 uppercase tracking-wider">
                        Limited Time Offer
                    </span>

                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight max-w-lg">
                        Festive
                        <br />
                        <span className="text-[#FFD742]">Collection</span>
                    </h2>

                    <p className="mt-2 sm:mt-3 text-sm sm:text-base text-white/80 max-w-md">
                        Decorate your mandir with our special festive range. Premium quality, divine beauty.
                    </p>

                    <Link
                        to="/categories"
                        className="mt-4 sm:mt-6 inline-flex items-center gap-2 bg-white text-[#88013C] font-bold text-sm sm:text-base px-6 py-2.5 sm:px-8 sm:py-3 rounded-full hover:bg-[#FFD742] transition shadow-lg"
                    >
                        Explore Now
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </motion.div>
        </section>
    );
}
