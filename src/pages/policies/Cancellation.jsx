import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, Clock, MessageSquare, Truck, ShieldAlert, BadgeCheck, AlertCircle, RefreshCw, Mail } from 'lucide-react';

const Cancellation = () => {
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
            icon: <XCircle className="w-8 h-8 text-[#88013C]" />,
            title: "1. Introduction",
            content: "This Cancellation Policy outlines the terms and conditions under which orders placed on our website can be canceled with respect and understanding."
        },
        {
            icon: <Clock className="w-8 h-8 text-[#D4AF37]" />,
            title: "2. Order Cancellation",
            content: "Customers may cancel their order before it has been processed or shipped. Once the order is shipped, cancellation requests will not be accepted as it has already begun its journey."
        },
        {
            icon: <MessageSquare className="w-8 h-8 text-[#4A2C2A]" />,
            title: "3. How to Cancel",
            content: "To cancel an order, please contact our customer support team as soon as possible with your order details. We will process your request with priority."
        },
        {
            icon: <Truck className="w-8 h-8 text-[#88013C]" />,
            title: "4. After Shipping",
            content: "Orders that have already been shipped cannot be canceled. In such cases, customers may refer to our Return or Refund Policy for further options."
        },
        {
            icon: <ShieldAlert className="w-8 h-8 text-[#D4AF37]" />,
            title: "5. Cancellation by Seller",
            content: "We reserve the right to cancel orders due to product unavailability, pricing errors, or unforeseen circumstances. In such cases, a full spiritual and financial refund will be initiated."
        },
        {
            icon: <RefreshCw className="w-8 h-8 text-[#4A2C2A]" />,
            title: "6. Refund on Cancellation",
            content: "If an order is successfully canceled, the refund will be processed to the original payment method within the applicable time frame, ensuring a smooth return of your funds."
        },
        {
            icon: <AlertCircle className="w-8 h-8 text-[#88013C]" />,
            title: "7. Non-Cancellable Items",
            content: "Certain items such as customized products, perishable goods, or items marked as non-cancellable are not eligible for cancellation due to their unique nature."
        },
        {
            icon: <BadgeCheck className="w-8 h-8 text-[#D4AF37]" />,
            title: "9. Policy Updates",
            content: "We may update this Cancellation Policy from time to time. Any changes will be reflected on this page to keep our community informed."
        },
        {
            icon: <Mail className="w-8 h-8 text-[#4A2C2A]" />,
            title: "10. Contact Us",
            content: "If you have any questions regarding cancellations, please contact our customer support through our website. We are here to guide you."
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
                    <span className="text-[#D4AF37] font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Flexibility & Fairness</span>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
                        Cancellation <span className="text-[#D4AF37]">Policy</span>
                    </h1>
                    <p className="text-lg md:text-xl text-[#FFF9E6]/80 max-w-2xl mx-auto font-light">
                        Understanding how to pause or reverse your order journey before it reaches your sanctuary.
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
                                    <div className="w-14 h-14 rounded-2xl bg-[#FDF2F2] flex items-center justify-center border border-[#88013C]/10">
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

                    <div className="bg-[#FDF2F2] p-8 rounded-[2rem] border-2 border-dashed border-[#88013C]/20 text-center">
                        <p className="text-[#4A2C2A] font-serif italic text-lg leading-relaxed">
                            "We understand that journeys sometimes change. Our cancellation process is designed to be as effortless as possible."
                        </p>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default Cancellation;
