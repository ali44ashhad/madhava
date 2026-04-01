import React from 'react';
import { motion } from 'framer-motion';
import { Truck, MapPin, Clock, Timer, IndianRupee, Search, AlertTriangle, Home, Package, Mail } from 'lucide-react';

const Shipping = () => {
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

    const LotusDivider = () => (
        <div className="flex justify-center my-12 opacity-20">
            <svg width="100" height="40" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 0C55 10 65 15 80 15C65 15 55 20 50 35C45 20 35 15 20 15C35 15 45 10 50 0Z" fill="#88013C" />
                <circle cx="50" cy="17.5" r="2.5" fill="#D4AF37" />
                <path d="M0 17.5H15M85 17.5H100" stroke="#88013C" strokeWidth="1" strokeLinecap="round" />
            </svg>
        </div>
    );

    const sections = [
        {
            icon: <Truck className="w-8 h-8 text-[#88013C]" />,
            title: "1. Introduction",
            content: "This Shipping Policy explains the terms, timelines, and conditions related to the journey of your sacred products from our hands to your home."
        },
        {
            icon: <MapPin className="w-8 h-8 text-[#D4AF37]" />,
            title: "2. Shipping Locations",
            content: "We currently ship to selected locations across India. Delivery availability may vary based on your pin code and local logistics support."
        },
        {
            icon: <Clock className="w-8 h-8 text-[#4A2C2A]" />,
            title: "3. Order Processing Time",
            content: "Orders are typically prepared with care within 1–3 business days after confirmation. Orders placed on weekends or divine holidays will be processed on the next business day."
        },
        {
            icon: <IndianRupee className="w-8 h-8 text-[#88013C]" />,
            title: "5. Shipping Charges",
            content: "Shipping charges, if applicable, represent the cost of safe passage for your items. These are calculated and displayed transparently at checkout.",
            list: [
                "Flat rates or weight-based calculation",
                "Free shipping on eligible orders",
                "Transparent checkout breakdown"
            ]
        },
        {
            icon: <Timer className="w-8 h-8 text-[#D4AF37]" />,
            title: "4. Shipping Time",
            content: "Once dispatched, delivery usually takes 3–7 business days depending on your location and the efficiency of our courier partners."
        },
        {
            icon: <Search className="w-8 h-8 text-[#4A2C2A]" />,
            title: "6. Order Tracking",
            content: "Once your order is shipped, you will receive tracking details via email or SMS to monitor your delivery status in real-time."
        },
        {
            icon: <AlertTriangle className="w-8 h-8 text-[#88013C]" />,
            title: "7. Delays & Issues",
            content: "While we strive for timeliness, delays may occur due to weather, courier issues, or unforeseen circumstances beyond our control."
        },
        {
            icon: <Home className="w-8 h-8 text-[#D4AF37]" />,
            title: "8. Address Accuracy",
            content: "Customers are responsible for providing accurate shipping information. We are not liable for delays or losses caused by incorrect address details."
        },
        {
            icon: <Package className="w-8 h-8 text-[#4A2C2A]" />,
            title: "9. Damaged Packages",
            content: "If your package arrives damaged, please contact our support team within 24 hours of delivery. We will resolve the issue with priority."
        },
        {
            icon: <Mail className="w-8 h-8 text-[#88013C]" />,
            title: "11. Contact Us",
            content: "If you have any questions regarding shipping or delivery, please reach out to us through our website support channels."
        }
    ];

    return (
        <div className="bg-[#FFFBFA] min-h-screen font-sans text-[#4A2C2A] pb-20">
            {/* Hero Section */}
            <section className="relative h-[40vh] flex items-center justify-center overflow-hidden bg-[#88013C]">
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(#D4AF37 1px, transparent 0)", backgroundSize: "40px 40px" }}></div>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="relative z-10 text-center px-4"
                >
                    <span className="text-[#D4AF37] font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Delivering Devotion</span>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
                        Shipping <span className="text-[#D4AF37]">Policy</span>
                    </h1>
                    <p className="text-lg md:text-xl text-[#FFF9E6]/80 max-w-2xl mx-auto font-light">
                        Understanding how your sacred treasures travel to reach your spiritual sanctuary.
                    </p>
                </motion.div>
            </section>

            {/* Content Section */}
            <section className="max-w-5xl mx-auto px-6 -mt-10 relative z-20">
                <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="bg-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(136,1,60,0.1)] p-8 md:p-16 border border-[#D4AF37]/10"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {sections.map((section, index) => (
                            <motion.div 
                                key={index} 
                                variants={fadeIn}
                                className="space-y-4"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-[#FFF9E6] flex items-center justify-center border border-[#D4AF37]/20">
                                        {section.icon}
                                    </div>
                                    <h2 className="text-xl font-black text-[#88013C]">{section.title}</h2>
                                </div>
                                <p className="text-gray-600 leading-relaxed font-medium">
                                    {section.content}
                                </p>
                                {section.list && (
                                    <ul className="space-y-2 pl-4 border-l-2 border-[#D4AF37]/30">
                                        {section.list.map((item, i) => (
                                            <li key={i} className="text-sm text-gray-500 flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    <LotusDivider />

                    <div className="bg-[#FFF9E6] p-8 rounded-[2rem] border-2 border-dashed border-[#D4AF37]/30 text-center">
                        <p className="text-[#4A2C2A] font-serif italic text-lg leading-relaxed">
                            "We handle every package with the same devotion as the artisan who crafted its contents."
                        </p>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default Shipping;
