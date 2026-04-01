import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, CheckCircle2, XOctagon, FileSearch, Truck, CreditCard, HelpCircle, ShieldCheck, Mail } from 'lucide-react';

const ReturnAndRefund = () => {
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
            icon: <RefreshCw className="w-8 h-8 text-[#88013C]" />,
            title: "1. Introduction",
            content: "This Return & Refund Policy explains the conditions under which products purchased from our website can be returned or refunded with ease."
        },
        {
            icon: <CheckCircle2 className="w-8 h-8 text-[#D4AF37]" />,
            title: "2. Return Eligibility",
            content: "Items must be returned within the specified period. Products must be unused, unwashed, and in their original divine packaging with all tags intact.",
            list: [
                "Return within specified period",
                "Unused and original condition",
                "Original tags and invoices required"
            ]
        },
        {
            icon: <XOctagon className="w-8 h-8 text-[#4A2C2A]" />,
            title: "3. Non-Returnable Items",
            content: "Certain items such as customized products, perishable goods, or personal care items are not eligible for return due to hygiene and customization reasons."
        },
        {
            icon: <FileSearch className="w-8 h-8 text-[#88013C]" />,
            title: "4. Return Process",
            content: "To initiate a return, please contact our support team. We will guide you through the process to ensure a smooth transition of the sacred items."
        },
        {
            icon: <Truck className="w-8 h-8 text-[#D4AF37]" />,
            title: "5. Return Shipping",
            content: "Customers may be responsible for return shipping charges unless the return is due to a damaged, defective, or incorrect product delivered by us."
        },
        {
            icon: <ShieldCheck className="w-8 h-8 text-[#4A2C2A]" />,
            title: "6. Refund Processing",
            content: "Once the returned item is received and inspected by our artisans, the refund will be processed within the applicable time frame to your original payment method."
        },
        {
            icon: <CreditCard className="w-8 h-8 text-[#88013C]" />,
            title: "7. Refund Method",
            content: "Refunds will be issued directly to the original payment method used during the purchase, ensuring a secure and familiar return of your funds."
        },
        {
            icon: <HelpCircle className="w-8 h-8 text-[#D4AF37]" />,
            title: "9. Exchanges",
            content: "We only replace items if they are defective or damaged. Exchange requests are subject to product availability and artisan approval."
        },
        {
            icon: <Mail className="w-8 h-8 text-[#4A2C2A]" />,
            title: "11. Contact Us",
            content: "If you have any questions regarding returns or refunds, please reach out through our website. We are here to assist your spiritual journey."
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
                    <span className="text-[#D4AF37] font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Satisfaction Guaranteed</span>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
                        Return & <span className="text-[#D4AF37]">Refund</span>
                    </h1>
                    <p className="text-lg md:text-xl text-[#FFF9E6]/80 max-w-2xl mx-auto font-light">
                        Ensuring your peace of mind with a transparent and respectful process for returns and refunds.
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
                            "Your satisfaction is our prayer. We strive to make every interaction as harmonious as our products."
                        </p>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default ReturnAndRefund;
