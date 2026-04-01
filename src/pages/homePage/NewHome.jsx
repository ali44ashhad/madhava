import NewHero from "./NewHero";
import CategoryCircles from "./CategoryCircles";
import FeaturedProducts from "./FeaturedProducts";
import FestiveBanner from "./FestiveBanner";
import ShopByCollection from "./ShopByCollection";
import NewArrivals from "./NewArrivals";
import Testimonials from "./Testimonials";

export default function NewHome() {
    return (
        <main>
            {/* ① Hero Banner */}
            <NewHero />

            {/* ② Trust Bar */}
            <div className="bg-[#FFD742] py-2.5 overflow-hidden flex whitespace-nowrap text-[10px] sm:text-xs font-semibold uppercase tracking-tight text-gray-900 group">
                <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] lg:animate-none lg:w-full lg:justify-center lg:flex-wrap lg:gap-8">
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className={`flex items-center gap-4 sm:gap-6 lg:gap-8 pr-4 sm:pr-6 lg:pr-0 ${i === 1 ? 'lg:hidden' : ''}`}>
                            <div className="flex items-center gap-1.5">
                                <span className="text-base">✓</span> 100% Authentic Products
                            </div>
                            <span className="lg:hidden">•</span>
                            <div className="flex items-center gap-1.5">
                                <span className="text-base">♥</span> Trusted by <b>10,000+</b> Devotees
                            </div>
                            <span className="lg:hidden">•</span>
                            <div className="flex items-center gap-1.5">
                                <span className="text-base">✦</span> Handcrafted • Temple Quality
                            </div>
                            <span className="lg:hidden">•</span>
                            <div className="flex items-center gap-1.5">
                                <span className="text-base">🚚</span> Free Shipping
                            </div>
                            <span className="lg:hidden">•</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* ③ Shop by Category */}
            <CategoryCircles />

            {/* ④ Featured Products / Bestsellers */}
            <FeaturedProducts />

            {/* ⑤ Festive Banner */}
            <FestiveBanner />

            {/* ⑥ Shop by Collection */}
            <ShopByCollection />

            {/* ⑦ New Arrivals */}
            <NewArrivals />

            {/* ⑧ Testimonials */}
            <Testimonials />
        </main>
    );
}
