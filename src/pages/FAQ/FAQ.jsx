import React from 'react';
import { motion } from 'framer-motion';
import { 
    HelpCircle, 
    Truck, 
    CreditCard, 
    RotateCcw, 
    Package, 
    Info, 
    ChevronDown,
    MapPin,
    Clock,
    ShieldCheck,
    Sparkles,
    MessageCircle,
    ArrowRight
} from 'lucide-react';

const FAQ = () => {
    const fadeIn = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    // SVG Decorations
    const LotusDivider = () => (
        <div className="flex justify-center my-12 opacity-20">
            <svg width="120" height="40" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 0C55 10 65 15 80 15C65 15 55 20 50 35C45 20 35 15 20 15C35 15 45 10 50 0Z" fill="#88013C" />
                <circle cx="50" cy="17.5" r="3" fill="#D4AF37" />
                <path d="M0 17.5H15M85 17.5H100" stroke="#88013C" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        </div>
    );

    const faqData = [
        {
            category: "General & Identity",
            icon: <Info className="w-6 h-6 text-[#88013C]" />,
            questions: [
                {
                    q: "What is MadhavGopal?",
                    a: "MadhavGopal is a premium spiritual lifestyle brand dedicated to bringing devotion into every home. We specialize in handcrafted idols, divine dresses, and sacred ornaments that bridge traditional craftsmanship with modern elegance."
                },
                {
                    q: "Where are you located?",
                    a: "We are based in India, the heart of spiritual heritage. Our creations are crafted by master artisans from various spiritual hubs across the country and delivered globally to seekers like you."
                }
            ]
        },
        {
            category: "Orders & Shipping",
            icon: <Truck className="w-6 h-6 text-[#D4AF37]" />,
            questions: [
                {
                    q: "How can I track my order?",
                    a: "Once your order is shipped, you will receive a tracking link via email and WhatsApp. You can also track your order directly from the 'My Orders' section in your profile."
                },
                {
                    q: "What is the estimated delivery time?",
                    a: "Orders within India typically reach you in 5-7 business days. International shipping may take 10-15 business days depending on the destination and customs clearance."
                }
            ]
        },
        {
            category: "Payments & Security",
            icon: <CreditCard className="w-6 h-6 text-[#4A2C2A]" />,
            questions: [
                {
                    q: "Which payment methods do you accept?",
                    a: "We accept all major credit/debit cards, UPI, Wallets, and Net Banking. We also offer Cash on Delivery (COD) for most pin codes within India."
                },
                {
                    q: "Is my payment information secure?",
                    a: "Absolutely. We use industry-standard encrypted payment gateways (PCI-DSS compliant) to ensure your financial data is always protected and never stored on our servers."
                }
            ]
        },
        {
            category: "Returns & Refunds",
            icon: <RotateCcw className="w-6 h-6 text-[#88013C]" />,
            questions: [
                {
                    q: "What is your return policy?",
                    a: "We offer a 7-day return policy for products that are damaged, defective, or different from what was ordered. Please ensure the item is in its original packaging with all tags intact."
                },
                {
                    q: "How long does a refund take?",
                    a: "Once we receive and inspect the returned item, your refund will be processed within 5-7 business days to your original payment method."
                }
            ]
        },
        {
            category: "Product Care & Quality",
            icon: <Sparkles className="w-6 h-6 text-[#D4AF37]" />,
            questions: [
                {
                    q: "How should I care for my divine idols?",
                    a: "We recommend cleaning your idols with a soft, dry microfiber cloth. Avoid using harsh chemicals or abrasive materials to preserve the intricate finish and sanctity of the piece."
                },
                {
                    q: "Are the fabrics used for deity dresses premium?",
                    a: "Yes, we use only the highest quality silks, velvets, and organic cottons. Each dress is adorned with hand-embroided details designed to provide the utmost comfort and beauty to your deities."
                }
            ]
        }
    ];

    return (
        <div className="bg-[#FFFBFA] min-h-screen font-sans text-[#4A2C2A] pb-24 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div 
                    animate={{ 
                        x: [0, 80, 0],
                        y: [0, 60, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[-5%] right-[-5%] w-[500px] h-[500px] bg-[#88013C]/5 rounded-full blur-[100px]" 
                />
                <motion.div 
                    animate={{ 
                        x: [0, -60, 0],
                        y: [0, 80, 0],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[20%] left-[-10%] w-[400px] h-[400px] bg-[#D4AF37]/10 rounded-full blur-[100px]" 
                />
            </div>

            {/* Hero Section */}
            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-[#88013C] py-24 md:py-32">
                {/* Decorative Grid */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                    style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/p6.png')" }}>
                </div>
                
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2 }}
                    className="relative z-10 text-center px-6 pb-24 md:pb-36"
                >
                    <div className="flex justify-center mb-8">
                        <motion.div 
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 shadow-xl"
                        >
                            <HelpCircle className="w-10 h-10 text-[#D4AF37]" />
                        </motion.div>
                    </div>
                    <span className="text-[#D4AF37] font-bold tracking-[0.4em] uppercase text-sm mb-4 block">Spiritual Support</span>
                    <h1 className="text-6xl md:text-8xl font-black text-white mb-6 leading-tight tracking-tighter">
                        Divine <span className="text-[#D4AF37]">Guidance</span>
                    </h1>
                    <p className="text-xl md:text-3xl text-[#FFF9E6]/80 max-w-4xl mx-auto font-light leading-relaxed">
                        Find clarity on your spiritual journey with our frequently asked questions. 
                        We are here to assist you at every step of your devotional path.
                    </p>
                </motion.div>

                {/* Decorative Bottom Wave */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] fill-[#FFFBFA]">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
                    </svg>
                </div>
            </section>

            {/* Support Card Container */}
            <div className="max-w-6xl mx-auto px-6 -mt-8 md:-mt-12 relative z-20">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-[2.5rem] p-10 md:p-14 shadow-[0_40px_80px_-20px_rgba(136,1,60,0.15)] border border-[#D4AF37]/10 flex flex-col md:flex-row items-center justify-between gap-10"
                >
                    <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                        <div className="w-20 h-20 bg-[#F0F4F0] rounded-[1.5rem] flex items-center justify-center border border-[#88013C]/10 shadow-sm">
                            <ShieldCheck className="w-10 h-10 text-[#88013C]" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-3xl font-black text-[#88013C]">Trusted Support</h3>
                            <div className="flex items-center justify-center md:justify-start gap-2 text-gray-500 font-medium">
                                <Clock size={18} className="text-[#D4AF37]" />
                                <span>Mon - Sat: 10AM - 7PM IST</span>
                            </div>
                        </div>
                    </div>
                    
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.location.href='/contact-us'}
                        className="px-12 py-5 bg-[#88013C] text-white rounded-full font-black text-lg shadow-2xl hover:bg-[#6f012f] transition-all flex items-center gap-3"
                    >
                        Connect With Us <ArrowRight size={20} />
                    </motion.button>
                </motion.div>
            </div>

            {/* FAQ Sections */}
            <section className="max-w-7xl mx-auto px-6 mt-32 relative z-10">
                <LotusDivider />
                
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="space-y-32"
                >
                    {faqData.map((group) => (
                        <div key={group.category} className="space-y-12">
                            <div className="flex items-center gap-6 border-b border-[#D4AF37]/20 pb-8">
                                <div className="w-16 h-16 bg-white rounded-2xl shadow-lg border border-[#D4AF37]/10 flex items-center justify-center">
                                    {group.icon}
                                </div>
                                <h2 className="text-5xl font-black text-[#88013C] tracking-tight">{group.category}</h2>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                {group.questions.map((item) => (
                                    <motion.div 
                                        key={item.q}
                                        variants={fadeIn}
                                        whileHover={{ y: -5 }}
                                        className="bg-white p-10 md:p-12 rounded-[2.5rem] shadow-[0_15px_45px_-10px_rgba(0,0,0,0.05)] border border-[#D4AF37]/5 hover:border-[#D4AF37]/30 transition-all duration-500 relative group overflow-hidden"
                                    >
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-bl-[8rem] group-hover:bg-[#D4AF37]/10 transition-colors" />
                                        
                                        <div className="relative z-10 flex flex-col gap-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-[#FFF9E6] flex items-center justify-center border border-[#D4AF37]/20">
                                                    <span className="text-lg font-black text-[#D4AF37]">Q</span>
                                                </div>
                                                <h4 className="text-2xl font-black text-[#4A2C2A] leading-tight group-hover:text-[#88013C] transition-colors">
                                                    {item.q}
                                                </h4>
                                            </div>
                                            <div className="pl-14 border-l-2 border-[#D4AF37]/10 ml-5">
                                                <p className="text-lg text-gray-600 leading-relaxed font-medium">
                                                    {item.a}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </section>


            {/* Bottom Contact Section */}
            <section className="max-w-5xl mx-auto px-6 mt-32 text-center pb-20">
                <LotusDivider />
                <div className="bg-[#88013C] p-16 md:p-24 rounded-[4rem] text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/p6.png')" }}></div>
                    <div className="absolute top-[-20%] left-[-10%] w-[400px] h-[400px] bg-[#D4AF37]/10 rounded-full blur-[80px]"></div>
                    
                    <div className="relative z-10 space-y-8">
                        <h3 className="text-4xl md:text-6xl font-black mb-6">Still Have <span className="text-[#D4AF37]">Questions?</span></h3>
                        <p className="text-xl text-[#FFF9E6]/80 font-light max-w-2xl mx-auto mb-12 leading-relaxed">
                            Our team of spiritual consultants is ready to help you find exactly what you're looking for.
                        </p>
                        
                        <div className="flex flex-wrap justify-center gap-12 md:gap-24">
                            <div className="space-y-4">
                                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto border border-white/20 shadow-xl">
                                    <MapPin className="text-[#D4AF37]" size={32} />
                                </div>
                                <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest opacity-60">Visit Sanctuary</p>
                                <p className="text-2xl font-black">Vrindavan, India</p>
                            </div>
                            <div className="space-y-4">
                                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto border border-white/20 shadow-xl">
                                    <MessageCircle className="text-[#D4AF37]" size={32} />
                                </div>
                                <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest opacity-60">WhatsApp Care</p>
                                <p className="text-2xl font-black">+91 12345 67890</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FAQ;
