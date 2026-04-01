import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Info, Scale, ShoppingBag, ShieldAlert, Globe, UserCheck, RefreshCw, CheckCircle2, Mail } from 'lucide-react';

const Disclaimer = () => {
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
            title: "1. General Information",
            content: "The information provided on this website is for general informational purposes only. While we strive for accuracy, we make no warranties regarding completeness or reliability."
        },
        {
            icon: <Scale className="w-8 h-8 text-[#D4AF37]" />,
            title: "2. No Professional Advice",
            content: "The content on this website does not constitute professional, legal, or medical advice. Any reliance you place on such information is strictly at your own risk."
        },
        {
            icon: <ShoppingBag className="w-8 h-8 text-[#4A2C2A]" />,
            title: "3. Product Information",
            content: "We make every effort to display products accurately. However, handcrafted items may have minor variations, and we do not guarantee error-free descriptions."
        },
        {
            icon: <AlertTriangle className="w-8 h-8 text-[#88013C]" />,
            title: "4. Limitation of Liability",
            content: "Under no circumstances shall we be liable for any loss or damage arising from the use of this website or reliance on the information provided herein."
        },
        {
            icon: <Globe className="w-8 h-8 text-[#D4AF37]" />,
            title: "5. External Links",
            content: "Our website may contain links to third-party sites. We do not control or endorse the content of these external locations."
        },
        {
            icon: <ShieldAlert className="w-8 h-8 text-[#4A2C2A]" />,
            title: "6. Website Availability",
            content: "We do not guarantee uninterrupted access to our services and may suspend or withdraw features without prior notice for maintenance or updates."
        },
        {
            icon: <UserCheck className="w-8 h-8 text-[#88013C]" />,
            title: "7. User Responsibility",
            content: "Users are responsible for ensuring that any products, services, or information obtained through this website meet their specific spiritual and material requirements."
        },
        {
            icon: <RefreshCw className="w-8 h-8 text-[#D4AF37]" />,
            title: "8. Changes to Disclaimer",
            content: "We reserve the right to modify this Disclaimer at any time. Changes will be effective immediately upon posting to ensure our community stays informed."
        },
        {
            icon: <CheckCircle2 className="w-8 h-8 text-[#4A2C2A]" />,
            title: "9. Consent",
            content: "By using our website, you hereby consent to this Disclaimer and agree to its terms in the spirit of mutual respect and harmony."
        },
        {
            icon: <Mail className="w-8 h-8 text-[#88013C]" />,
            title: "10. Contact Us",
            content: "If you have any questions regarding this Disclaimer, please reach out to us through our official support channels."
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
                    <span className="text-[#D4AF37] font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Clarity & Understanding</span>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
                        Dis<span className="text-[#D4AF37]">claimer</span>
                    </h1>
                    <p className="text-lg md:text-xl text-[#FFF9E6]/80 max-w-2xl mx-auto font-light">
                        Essential information to guide your interaction with our divine space and products.
                    </p>
                </motion.div>
            </section>

            {/* Content Section */}
            <section className="max-w-5xl mx-auto px-6 -mt-10 relative z-20">
                <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="bg-white rounded-[3rem] shadow-[0_50px_100px_-20_rgba(136,1,60,0.1)] p-8 md:p-16 border border-[#D4AF37]/10"
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
                            </motion.div>
                        ))}
                    </div>

                    <LotusDivider />

                    <div className="bg-[#F0F4F0] p-8 rounded-[2rem] border-2 border-dashed border-[#88013C]/20 text-center">
                        <p className="text-[#4A2C2A] font-serif italic text-lg leading-relaxed">
                            "Transparency is the foundation of trust. We share this information to ensure a harmonious journey for every seeker."
                        </p>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default Disclaimer;
