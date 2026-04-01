import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Eye, Lock, Share2, Cookie, UserCheck, Bell, Info, Mail } from 'lucide-react';

const PrivacyPolicy = () => {
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
            icon: <Info className="w-8 h-8 text-[#88013C]" />,
            title: "1. Introduction",
            content: "This Privacy Policy explains how we collect, use, store, and protect your personal information when you use our website or purchase our products. Your trust is our most valued treasure."
        },
        {
            icon: <Eye className="w-8 h-8 text-[#D4AF37]" />,
            title: "2. Information We Collect",
            content: "We collect personal details such as name, phone number, email address, and shipping address. This also includes your order history and browsing behavior to provide a personalized spiritual experience.",
            list: [
                "Personal identity details (Name, Phone, Email)",
                "Shipping and Billing addresses",
                "Order and payment related information",
                "Browsing behavior and website interactions"
            ]
        },
        {
            icon: <UserCheck className="w-8 h-8 text-[#4A2C2A]" />,
            title: "3. How We Use Your Information",
            content: "Your data helps us serve you better. We use it to process orders, provide support, and improve our services. If you opt-in, we'll also share special updates and offerings.",
            list: [
                "To process and deliver your sacred orders",
                "To provide dedicated customer support",
                "To enhance your browsing experience",
                "To share promotional updates (with your consent)"
            ]
        },
        {
            icon: <Lock className="w-8 h-8 text-[#88013C]" />,
            title: "4. Data Protection & Security",
            content: "We implement divine-grade security measures to protect your personal data from unauthorized access, misuse, or disclosure. Your peace of mind is our priority."
        },
        {
            icon: <Share2 className="w-8 h-8 text-[#D4AF37]" />,
            title: "5. Sharing of Information",
            content: "We believe in transparency. We do not sell or trade your data. It is only shared with trusted partners involved in fulfilling your orders and ensuring timely delivery."
        },
        {
            icon: <Cookie className="w-8 h-8 text-[#4A2C2A]" />,
            title: "6. Cookies & Tracking",
            content: "Our website uses cookies to enhance your experience and analyze traffic. These small files help us remember your preferences and provide a smoother journey."
        },
        {
            icon: <ShieldCheck className="w-8 h-8 text-[#88013C]" />,
            title: "7. Your Rights",
            content: "You have full control over your data. You can access, update, or request deletion of your information at any time. Your rights are respected here."
        },
        {
            icon: <Bell className="w-8 h-8 text-[#D4AF37]" />,
            title: "8. Changes to This Policy",
            content: "As we grow, this policy may evolve. We will post any updates on this page to keep you informed about how we protect your information."
        },
        {
            icon: <Mail className="w-8 h-8 text-[#4A2C2A]" />,
            title: "9. Contact Us",
            content: "Questions about your privacy? Reach out through our contact page. We are here to serve and clarify any doubts you may have."
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
                    <span className="text-[#D4AF37] font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Trust & Transparency</span>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
                        Privacy <span className="text-[#D4AF37]">Policy</span>
                    </h1>
                    <p className="text-lg md:text-xl text-[#FFF9E6]/80 max-w-2xl mx-auto font-light">
                        Understanding how we protect your sacred information and respect your digital sanctuary.
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
                                {index % 2 === 1 && index !== sections.length - 1 && (
                                    <div className="md:hidden">
                                        <LotusDivider />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    <LotusDivider />

                    <div className="bg-[#FFF9E6] p-8 rounded-[2rem] border-2 border-dashed border-[#D4AF37]/30 text-center">
                        <p className="text-[#4A2C2A] font-serif italic text-lg leading-relaxed">
                            "Your privacy is not just a policy for us; it is a sacred trust that we cherish and protect daily."
                        </p>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default PrivacyPolicy;
