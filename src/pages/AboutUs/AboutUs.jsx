import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Award, Star, Users, CheckCircle, Quote } from 'lucide-react';

const AboutUs = () => {
    const fadeIn = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    // Themed Colors:
    // Burgundy: #88013C
    // Gold: #D4AF37
    // Cream: #FFF9E6
    // Deep Brown: #4A2C2A
    // Soft Sage: #F0F4F0

    const values = [
        {
            icon: <Heart className="w-10 h-10 text-[#88013C]" />,
            title: "Divine Devotion",
            description: "Our work is a form of worship, rooted in deep respect for spiritual traditions.",
            bgColor: "bg-[#FFF9E6]"
        },
        {
            icon: <Award className="w-10 h-10 text-[#D4AF37]" />,
            title: "Master Artisans",
            description: "Traditional soul meets modern precision in every handcrafted piece.",
            bgColor: "bg-[#F0F4F0]"
        },
        {
            icon: <Star className="w-10 h-10 text-[#4A2C2A]" />,
            title: "Premium Soul",
            description: "Finest materials curated to create lasting spiritual companions.",
            bgColor: "bg-[#FDF2F2]"
        },
        {
            icon: <Users className="w-10 h-10 text-[#88013C]" />,
            title: "Global Family",
            description: "Serving seekers across the globe with humility and absolute transparency.",
            bgColor: "bg-[#FFF9E6]"
        }
    ];

    // SVG Dividers
    const LotusDivider = () => (
        <div className="flex justify-center my-12 opacity-20">
            <svg width="100" height="40" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 0C55 10 65 15 80 15C65 15 55 20 50 35C45 20 35 15 20 15C35 15 45 10 50 0Z" fill="#88013C" />
                <circle cx="50" cy="17.5" r="2.5" fill="#D4AF37" />
                <path d="M0 17.5H15M85 17.5H100" stroke="#88013C" strokeWidth="1" strokeLinecap="round" />
            </svg>
        </div>
    );

    const WaveDividerTop = () => (
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-[1]">
             <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] fill-[#FFF9E6]">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
            </svg>
        </div>
    );

    return (
        <div className="bg-[#FFFBFA] min-h-screen font-sans overflow-hidden text-[#4A2C2A]">
            {/* Hero Section */}
            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
                <div 
                    className="absolute inset-0 bg-cover bg-center z-0 scale-110"
                    style={{ 
                        backgroundImage: "url('https://images.unsplash.com/photo-1542152345-d851410f925c?q=80&w=2070&auto=format&fit=crop')",
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#FFF9E6]/80 via-[#FFF9E6]/60 to-[#FFFBFA] z-[1]" />
                
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative z-10 text-center px-4"
                >
                    <span className="text-[#88013C] font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Our Legacy of Faith</span>
                    <h1 className="text-6xl md:text-8xl font-black text-[#88013C] mb-6 tracking-tight">
                        Sacred <span className="text-[#D4AF37]">Stories</span>
                    </h1>
                    <p className="text-xl md:text-3xl text-gray-700 font-light max-w-3xl mx-auto leading-relaxed">
                        Crafting instruments of devotion that bridge the gap between the material and the divine.
                    </p>
                </motion.div>
                
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce">
                    <div className="w-1 h-12 bg-gradient-to-b from-[#88013C] to-transparent rounded-full opacity-50"></div>
                </div>
            </section>

            {/* Brand Story Section */}
            <section className="relative py-24 px-6 md:px-12 lg:px-24 bg-white">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        className="space-y-8"
                    >
                        <div className="inline-block px-4 py-1 bg-[#FDF2F2] border-l-4 border-[#88013C] text-[#88013C] font-bold text-sm">
                            ESTABLISHED WITH DEVOTION
                        </div>
                        <h2 className="text-5xl md:text-6xl font-black text-[#88013C] leading-[1.1]">
                            The Soul of <br/><span className="text-[#D4AF37]">MadhavGopal</span>
                        </h2>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-[2px] bg-[#D4AF37]"></div>
                            <div className="w-4 h-4 rounded-full border-2 border-[#D4AF37]"></div>
                            <div className="w-12 h-[2px] bg-[#D4AF37]"></div>
                        </div>
                        <p className="text-xl text-gray-700 leading-relaxed font-medium">
                            MadhavGopal was born from a simple yet profound desire: to make every home a sanctuary of peace and devotion. 
                        </p>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Inspired by the timeless beauty of Indian spiritual traditions, we embarked on a journey to preserve the sanctity of divine art. For us, every product is not just an item of commerce, but a medium of connection—a reminder of the infinite grace that surrounds us.
                        </p>
                        
                        <div className="bg-[#FFF9E6] p-10 rounded-[2rem] border-2 border-dashed border-[#D4AF37]/30 relative">
                            <Quote className="absolute -top-4 -left-4 w-12 h-12 text-[#D4AF37] opacity-20" />
                            <p className="text-2xl text-[#4A2C2A] font-serif italic italic leading-relaxed">
                                "Our mission is to serve as a humble bridge between the artisan's devotion and your spiritual space."
                            </p>
                        </div>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="relative"
                    >
                        <div className="rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(74,44,42,0.3)] border-8 border-white">
                            <img 
                                src="https://images.unsplash.com/photo-1544733422-251e532ca221?q=80&w=2070&auto=format&fit=crop" 
                                alt="Artisan working" 
                                className="w-full h-auto hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#D4AF37]/10 rounded-full blur-3xl -z-10"></div>
                        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-[#88013C]/5 rounded-full blur-3xl -z-10"></div>
                    </motion.div>
                </div>
                
                <LotusDivider />
            </section>

            {/* Core Values Section */}
            <section className="relative bg-[#FFF9E6]/30 py-32 px-6 md:px-12 lg:px-24">
                <WaveDividerTop />
                
                <div className="max-w-7xl mx-auto text-center mb-20 relative z-10">
                    <motion.span 
                        variants={fadeIn}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-[#D4AF37] font-bold uppercase tracking-widest text-sm"
                    >
                        Deeply Rooted
                    </motion.span>
                    <motion.h2 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        className="text-5xl font-black text-[#88013C] mt-4"
                    >
                        Our Sacred Pillars
                    </motion.h2>
                    <div className="w-24 h-1.5 bg-[#D4AF37] mx-auto mt-6 rounded-full opacity-30"></div>
                </div>

                <motion.div 
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto relative z-10"
                >
                    {values.map((value, index) => (
                        <motion.div 
                            key={index}
                            variants={fadeIn}
                            className={`${value.bgColor} p-10 rounded-[2.5rem] text-center group hover:shadow-[0_40px_80px_-15px_rgba(136,1,60,0.1)] transition-all duration-500 border border-[#D4AF37]/10 hover:-translate-y-2`}
                        >
                            <div className="flex justify-center mb-6 transform group-hover:scale-110 transition-transform duration-500">
                                {value.icon}
                            </div>
                            <h3 className="text-2xl font-black text-[#4A2C2A] mb-4">{value.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{value.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Quality Section */}
            <section className="py-32 px-6 md:px-12 lg:px-24 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <motion.div 
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="relative order-2 lg:order-1"
                    >
                        <div className="relative z-10 rounded-[4rem] overflow-hidden shadow-2xl border-4 border-[#FFF9E6]">
                            <img 
                                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop" 
                                alt="Quality detail" 
                                className="w-full h-auto"
                            />
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border-2 border-[#D4AF37]/10 rounded-full -z-0 rotate-12"></div>
                    </motion.div>

                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        className="order-1 lg:order-2 space-y-10"
                    >
                        <div className="space-y-4">
                            <span className="text-[#88013C] font-black italic text-4xl opacity-10 block">Quality Uncompromised</span>
                            <h2 className="text-5xl font-black text-[#88013C]">Crafted for the <span className="text-[#D4AF37]">Divine</span></h2>
                        </div>
                        
                        <p className="text-xl text-gray-700 leading-relaxed font-light">
                            Quality is not just a standard at MadhavGopal; it is a sacred promise. Each material, from the rich fabrics of our dresses to the pure metals of our idols, undergoes rigorous selection.
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {[
                                { title: "Hand-Carved", color: "text-[#88013C]" },
                                { title: "Ethical Sourcing", color: "text-[#D4AF37]" },
                                { title: "Divine Energy", color: "text-[#4A2C2A]" },
                                { title: "Lifetime Service", color: "text-[#88013C]" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 group">
                                    <div className={`w-12 h-12 rounded-2xl bg-[#FFF9E6] flex items-center justify-center group-hover:rotate-12 transition-transform`}>
                                        <CheckCircle className={`w-6 h-6 ${item.color}`} />
                                    </div>
                                    <span className="text-[#4A2C2A] font-bold text-lg">{item.title}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative bg-[#88013C] py-32 px-6 text-center overflow-hidden">
                {/* Decorative Pattern Overlay */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(#D4AF37 1px, transparent 0)", backgroundSize: "40px 40px" }}></div>
                
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto space-y-12 relative z-10"
                >
                    <div className="flex justify-center gap-4 opacity-50">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="w-3 h-3 rounded-full border border-[#D4AF37]"></div>
                        ))}
                    </div>
                    
                    <h2 className="text-5xl md:text-7xl font-black text-white leading-tight">
                        Begin Your Sacred <br/><span className="text-[#D4AF37]">Transformation</span>
                    </h2>
                    
                    <p className="text-xl md:text-2xl text-[#FFF9E6]/80 font-light max-w-2xl mx-auto leading-relaxed">
                        Join our family of seekers and bring home the essence of peace and devotion.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => window.location.href='/products'}
                            className="bg-[#D4AF37] text-[#4A2C2A] px-12 py-5 rounded-full font-black text-xl shadow-2xl hover:bg-white transition-all"
                        >
                            Shop Collection
                        </motion.button>
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => window.location.href='/contact-us'}
                            className="bg-transparent border-2 border-white/30 text-white px-12 py-5 rounded-full font-bold text-xl hover:bg-white/10 transition-all backdrop-blur-sm"
                        >
                            Contact Us
                        </motion.button>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default AboutUs;
