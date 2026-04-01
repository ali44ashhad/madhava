import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ShieldCheck, CreditCard, ShoppingBag, Truck, AlertCircle, Scale, Copyright, RefreshCw, Mail } from 'lucide-react';

const TermsAndConditions = () => {
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
            icon: <FileText className="w-8 h-8 text-[#88013C]" />,
            title: "1. Introduction",
            content: "Welcome to our divine products e-commerce website. By accessing or using our website, you agree to be bound by these Terms & Conditions. These terms apply to all users, customers, and visitors of the website."
        },
        {
            icon: <ShoppingBag className="w-8 h-8 text-[#D4AF37]" />,
            title: "2. Nature of Products",
            content: "We sell religious and spiritual products including god idols, statues, ornaments, pooja items, home temple decor, and related spiritual accessories. All products are intended for religious, decorative, and spiritual purposes only."
        },
        {
            icon: <ShieldCheck className="w-8 h-8 text-[#4A2C2A]" />,
            title: "3. Account Responsibility",
            content: "You are responsible for maintaining the confidentiality of your account and personal details. Any activity done through your account will be considered your responsibility."
        },
        {
            icon: <CreditCard className="w-8 h-8 text-[#88013C]" />,
            title: "4. Pricing & Payments",
            content: "All prices are displayed in INR and include applicable taxes unless stated otherwise. We reserve the right to change prices at any time. Payments must be made through available secure methods.",
            list: [
                "Prices in INR including taxes",
                "Right to update prices without notice",
                "Secure payment gateway integration"
            ]
        },
        {
            icon: <RefreshCw className="w-8 h-8 text-[#D4AF37]" />,
            title: "5. Orders & Cancellations",
            content: "Once an order is placed, it cannot be cancelled after it has been shipped. We reserve the right to cancel any order due to stock unavailability, pricing errors, or suspicious activity."
        },
        {
            icon: <Truck className="w-8 h-8 text-[#4A2C2A]" />,
            title: "6. Shipping & Delivery",
            content: "We aim to deliver products within the estimated time. However, delays may occur due to logistics, weather, or unforeseen circumstances beyond our control."
        },
        {
            icon: <AlertCircle className="w-8 h-8 text-[#88013C]" />,
            title: "7. Returns & Refunds",
            content: "Returns or replacements are accepted only for damaged, defective, or wrong products delivered. Products must be returned in original condition and packaging."
        },
        {
            icon: <Scale className="w-8 h-8 text-[#D4AF37]" />,
            title: "8. Religious Sensitivity",
            content: "Our products are created with respect to all religious beliefs. Minor variations in color, design, or finishing may occur due to handcrafted or manufacturing processes."
        },
        {
            icon: <Copyright className="w-8 h-8 text-[#4A2C2A]" />,
            title: "9. Intellectual Property",
            content: "All content, images, logos, and designs on this website are the property of the company and must not be copied or used without prior written permission."
        },
        {
            icon: <Mail className="w-8 h-8 text-[#88013C]" />,
            title: "10. Contact Us",
            content: "For any queries regarding these terms, please contact our support team through the official website channels."
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
                    <span className="text-[#D4AF37] font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Our Commitment</span>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
                        Terms & <span className="text-[#D4AF37]">Conditions</span>
                    </h1>
                    <p className="text-lg md:text-xl text-[#FFF9E6]/80 max-w-2xl mx-auto font-light">
                        The framework of our service, designed to ensure a respectful and harmonious experience for all seekers.
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
                                    <div className="w-14 h-14 rounded-2xl bg-[#F0F4F0] flex items-center justify-center border border-[#88013C]/10">
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
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#88013C]" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    <LotusDivider />

                    <div className="bg-[#F0F4F0] p-8 rounded-[2rem] border-2 border-dashed border-[#88013C]/20 text-center">
                        <p className="text-[#4A2C2A] font-serif italic text-lg leading-relaxed">
                            "By entering this space, you join a community built on respect, faith, and mutual understanding."
                        </p>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default TermsAndConditions;
