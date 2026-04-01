import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle, Instagram, Facebook, Youtube, Send } from 'lucide-react';

const ContactUs = () => {
    const contactMethods = [
        {
            icon: <Phone className="w-6 h-6" />,
            title: "Call Us",
            value: "+91 98765 43210",
            description: "Direct assistance for all your queries",
            link: "tel:+919876543210",
            color: "bg-blue-50 text-blue-600"
        },
        {
            icon: <MessageCircle className="w-6 h-6" />,
            title: "WhatsApp",
            value: "+91 98765 43210",
            description: "Instant chat support",
            link: "https://wa.me/919876543210",
            color: "bg-green-50 text-green-600"
        },
        {
            icon: <Mail className="w-6 h-6" />,
            title: "Email Us",
            value: "support@madhavgopal.com",
            description: "Expect a response within 24 hours",
            link: "mailto:support@madhavgopal.com",
            color: "bg-purple-50 text-purple-600"
        },
        {
            icon: <MapPin className="w-6 h-6" />,
            title: "Visit Us",
            value: "Vrindavan, Uttar Pradesh",
            description: "Our spiritual home base",
            link: "https://maps.google.com/?q=Vrindavan",
            color: "bg-red-50 text-red-600"
        }
    ];

    const socialLinks = [
        { icon: <Instagram className="w-5 h-5" />, link: "#", label: "Instagram" },
        { icon: <Facebook className="w-5 h-5" />, link: "#", label: "Facebook" },
        { icon: <Youtube className="w-5 h-5" />, link: "#", label: "Youtube" },
        { icon: <Send className="w-5 h-5" />, link: "#", label: "Telegram" }
    ];

    return (
        <div className="min-h-screen bg-white pb-20">
            {/* Hero Section */}
            <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden bg-[#88013C]">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                </div>
                
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 text-center px-4"
                >
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
                        Get in <span className="text-yellow-400">Touch</span>
                    </h1>
                    <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-medium">
                        Have questions about our products or your order? We're here to help you on your spiritual journey.
                    </p>
                </motion.div>
                
                {/* Decorative Elements */}
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-24 -right-24 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl"
                />
                <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"
                />
            </section>

            {/* Contact Information Cards */}
            <div className="max-w-7xl mx-auto px-6 -mt-16 md:-mt-24 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {contactMethods.map((method, index) => (
                        <motion.a
                            key={index}
                            href={method.link}
                            target={method.link.startsWith('http') ? "_blank" : "_self"}
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5, scale: 1.02 }}
                            className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col items-center text-center group"
                        >
                            <div className={`w-14 h-14 rounded-2xl ${method.color} flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
                                {method.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{method.title}</h3>
                            <p className="text-[#88013C] font-bold mb-3 break-all">{method.value}</p>
                            <p className="text-sm text-gray-500 font-medium">{method.description}</p>
                        </motion.a>
                    ))}
                </div>
            </div>

            {/* Support & Social Section */}
            <div className="max-w-5xl mx-auto px-6 mt-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <h2 className="text-3xl font-black text-gray-900">
                            Connect with our <span className="text-[#88013C]">Community</span>
                        </h2>
                        <p className="text-gray-600 leading-relaxed font-medium">
                            Join thousands of devotees on our social platforms. Stay updated with new arrivals, spiritual insights, and special festive offers.
                        </p>
                        
                        <div className="flex gap-4">
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.link}
                                    whileHover={{ scale: 1.15, backgroundColor: '#88013C', color: '#fff' }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-12 h-12 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center transition-all duration-300 shadow-sm"
                                    aria-label={social.label}
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-[#FFF9E6] rounded-[40px] p-10 relative overflow-hidden group"
                    >
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Customer Support</h3>
                            <p className="text-gray-700 mb-8 font-medium">
                                Our team is available from 9:00 AM to 7:00 PM (IST), Monday to Saturday.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-gray-800 font-semibold">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                    Currently Online
                                </div>
                                <motion.button 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-[#88013C] text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-[#88013C]/20 hover:bg-[#6f012f] transition-all flex items-center gap-3 w-full justify-center"
                                >
                                    Start Live Chat
                                </motion.button>
                            </div>
                        </div>
                        
                        {/* Abstract Background Shapes */}
                        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-yellow-200/50 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700"></div>
                        <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-32 h-32 bg-[#88013C]/5 rounded-full blur-xl"></div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
