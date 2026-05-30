import React from 'react';
import { motion } from 'framer-motion';
import {
    ShieldCheck,
    Eye,
    Lock,
    Share2,
    UserCheck,
    Bell,
    Info,
    Mail,
    Database,
    Server,
    Users,
    Phone,
    Clock,
} from 'lucide-react';

const PrivacyPolicy = () => {
    const fadeIn = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const LotusDivider = () => (
        <div className="flex justify-center my-8 sm:my-10 md:my-12 opacity-20" aria-hidden="true">
            <svg width="100" height="40" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 sm:w-20 md:w-[100px] h-auto">
                <path d="M50 0C55 10 65 15 80 15C65 15 55 20 50 35C45 20 35 15 20 15C35 15 45 10 50 0Z" fill="#88013C" />
                <circle cx="50" cy="17.5" r="2.5" fill="#D4AF37" />
                <path d="M0 17.5H15M85 17.5H100" stroke="#88013C" strokeWidth="1" strokeLinecap="round" />
            </svg>
        </div>
    );

    const PolicyList = ({ items, className = '' }) => (
        <ul className={`space-y-2 sm:space-y-2.5 pl-3 sm:pl-4 ml-0.5 sm:ml-0 border-l-2 border-[#D4AF37]/30 ${className}`}>
            {items.map((item, i) => (
                <li key={i} className="text-sm sm:text-base text-[#4A2C2A]/70 flex items-start gap-2.5 font-medium leading-relaxed pr-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0 mt-2" />
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );

    const sections = [
        {
            icon: <Info className="w-6 h-6 sm:w-8 sm:h-8 text-[#88013C]" />,
            title: '1. Introduction',
            paragraphs: [
                'Welcome to Madhav Gopal. We value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and protect information when you use our mobile application and services.',
                'By using our application, you agree to the collection and use of information in accordance with this Privacy Policy.',
            ],
        },
        {
            icon: <Eye className="w-6 h-6 sm:w-8 sm:h-8 text-[#D4AF37]" />,
            title: '2. Information We Collect',
            subsections: [
                {
                    title: 'Personal Information',
                    content: 'When you create an account or place an order, we may collect:',
                    list: [
                        'Full Name',
                        'Mobile Number',
                        'Email Address',
                        'Delivery Address',
                        'Order History',
                        'Customer Support Information',
                    ],
                },
                {
                    title: 'Location Information',
                    content: 'With your permission, we may access your device location to:',
                    list: [
                        'Detect delivery addresses',
                        'Improve delivery services',
                        'Help you use current location features',
                    ],
                    footer: 'Location access is requested only when needed.',
                },
                {
                    title: 'Payment Information',
                    content: 'Payments are securely processed through Razorpay.',
                    listLabel: 'We do not store:',
                    list: [
                        'Debit card numbers',
                        'Credit card numbers',
                        'CVV numbers',
                        'Banking passwords',
                        'UPI PINs',
                    ],
                },
            ],
        },
        {
            icon: <UserCheck className="w-6 h-6 sm:w-8 sm:h-8 text-[#4A2C2A]" />,
            title: '3. How We Use Your Information',
            content: 'We use your information to:',
            list: [
                'Create and manage your account',
                'Authenticate users through OTP verification',
                'Process and deliver orders',
                'Manage payments and refunds',
                'Provide customer support',
                'Improve app performance and user experience',
                'Prevent fraud and misuse',
                'Send order updates and service notifications',
            ],
        },
        {
            icon: <Share2 className="w-6 h-6 sm:w-8 sm:h-8 text-[#D4AF37]" />,
            title: '4. Information Sharing',
            paragraphs: [
                'We do not sell, rent, or trade personal information.',
                'Information may be shared only with:',
            ],
            list: [
                'Delivery and logistics partners',
                'Payment processors such as Razorpay',
                'Service providers required for app operations',
                'Government authorities when required by law',
            ],
        },
        {
            icon: <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-[#88013C]" />,
            title: '5. Data Security',
            content: 'We use industry-standard security practices to protect your information, including:',
            list: [
                'Secure HTTPS connections',
                'Encrypted authentication tokens',
                'Restricted access controls',
                'Secure cloud infrastructure',
            ],
            footer:
                'While we strive to protect your information, no method of electronic transmission or storage is completely secure.',
        },
        {
            icon: <Database className="w-6 h-6 sm:w-8 sm:h-8 text-[#D4AF37]" />,
            title: '6. Data Retention',
            content: 'We retain information only as long as necessary to:',
            list: [
                'Provide services',
                'Fulfill orders',
                'Meet legal obligations',
                'Resolve disputes',
            ],
            footer: 'Users may request deletion of their account and associated personal information.',
        },
        {
            icon: <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8 text-[#4A2C2A]" />,
            title: '7. Your Rights',
            content: 'You may:',
            list: [
                'Access your personal information',
                'Update your profile details',
                'Manage delivery addresses',
                'Request account deletion',
                'Withdraw location permissions through device settings',
            ],
        },
        {
            icon: <Server className="w-6 h-6 sm:w-8 sm:h-8 text-[#88013C]" />,
            title: '8. Third-Party Services',
            content: 'Our application may use trusted third-party services including:',
            list: [
                'Razorpay (Payment Processing)',
                'Location Services',
                'Cloud Hosting Services',
            ],
            footer: 'These providers operate under their own privacy policies.',
        },
        {
            icon: <Users className="w-6 h-6 sm:w-8 sm:h-8 text-[#D4AF37]" />,
            title: "9. Children's Privacy",
            paragraphs: [
                'Our services are not intended for children under 13 years of age.',
                'We do not knowingly collect personal information from children. If such information is discovered, it will be removed promptly.',
            ],
        },
        {
            icon: <Bell className="w-6 h-6 sm:w-8 sm:h-8 text-[#88013C]" />,
            title: '10. Changes to This Privacy Policy',
            paragraphs: [
                'We may update this Privacy Policy from time to time.',
                'Updated versions will be published within the application and on our official platforms. Continued use of the app after updates constitutes acceptance of the revised policy.',
            ],
        },
        {
            icon: <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-[#4A2C2A]" />,
            title: '11. Contact Us',
            content: 'Madhav Gopal – Divine Puja Store',
            contact: {
                email: 'info@worldmarketview.com',
                phone: '+91 98880 31436',
                hours: 'Monday – Saturday, 10:00 AM – 7:00 PM IST',
            },
        },
    ];

    const bodyText = 'text-[#4A2C2A]/70 leading-relaxed font-medium text-sm sm:text-base';

    return (
        <div className="min-h-screen bg-[#FFF9E6] font-sans text-[#4A2C2A] pb-12 sm:pb-16 md:pb-20 relative overflow-x-hidden">
            {/* Login-style ambient background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                <div className="absolute top-[-10%] right-[-10%] w-[min(500px,90vw)] h-[min(500px,90vw)] bg-[#88013C]/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[20%] left-[-10%] w-[min(500px,90vw)] h-[min(500px,90vw)] bg-[#D4AF37]/10 rounded-full blur-[120px]" />
            </div>

            {/* Hero */}
            <section className="relative flex items-center justify-center overflow-hidden bg-[#88013C] px-4 sm:px-6 lg:px-8 py-14 sm:py-16 md:py-20 min-h-[min(36vh,420px)] sm:min-h-[40vh]">
                <div
                    className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 0)',
                        backgroundSize: '40px 40px',
                    }}
                />
                <div className="absolute top-[-20%] right-[-10%] w-48 sm:w-72 h-48 sm:h-72 bg-[#D4AF37]/10 rounded-full blur-[80px] pointer-events-none" aria-hidden="true" />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="relative z-10 w-full max-w-3xl mx-auto text-center"
                >
                    <span className="text-[#D4AF37] font-black tracking-[0.2em] sm:tracking-[0.3em] uppercase text-xs sm:text-sm mb-3 sm:mb-4 block">
                        Trust & Transparency
                    </span>
                    <h1 className="text-[2rem] leading-tight sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-3 sm:mb-4 md:mb-5">
                        Privacy <span className="text-[#D4AF37]">Policy</span>
                    </h1>
                    <p className="text-[#D4AF37] font-bold text-sm sm:text-base md:text-lg mb-1.5 sm:mb-2 px-1">
                        Madhav Gopal – Divine Puja Store
                    </p>
                    <p className="text-xs sm:text-sm text-[#FFF9E6]/70 mb-4 sm:mb-5 md:mb-6 font-medium">
                        Effective Date: May 2026
                    </p>
                    <p className={`${bodyText} !text-[#FFF9E6]/80 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-1 sm:px-2`}>
                        How we collect, use, store, and protect your information when you use our mobile application and services.
                    </p>
                </motion.div>
            </section>

            {/* Content card */}
            <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 md:-mt-10 relative z-20">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="bg-white/70 backdrop-blur-2xl rounded-3xl sm:rounded-[2.5rem] md:rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(136,1,60,0.15)] border border-white/50 px-5 py-8 sm:px-8 sm:py-10 md:px-12 md:py-12 lg:px-14 lg:py-14"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 sm:gap-x-10 sm:gap-y-12 md:gap-x-12 md:gap-y-14 lg:gap-y-16">
                        {sections.map((section, index) => (
                            <motion.div
                                key={index}
                                variants={fadeIn}
                                className={[
                                    'flex flex-col gap-3 sm:gap-4',
                                    section.subsections ? 'md:col-span-2' : '',
                                    index < sections.length - 1
                                        ? 'pb-10 sm:pb-12 md:pb-0 border-b border-[#4A2C2A]/8 md:border-b-0'
                                        : '',
                                ].join(' ')}
                            >
                                <div className="flex items-start sm:items-center gap-3 sm:gap-4 mb-0.5 sm:mb-1">
                                    <div className="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-[#FFF9E6] flex items-center justify-center border border-[#D4AF37]/20 shrink-0">
                                        {section.icon}
                                    </div>
                                    <h2 className="text-base sm:text-lg md:text-xl font-black text-[#88013C] leading-snug pt-0.5 sm:pt-0">
                                        {section.title}
                                    </h2>
                                </div>

                                <div className="flex flex-col gap-3 sm:gap-3.5 w-full min-w-0">
                                    {section.paragraphs && section.paragraphs.length > 0 && (
                                        <div className="flex flex-col gap-3 sm:gap-3.5">
                                            {section.paragraphs.map((para, i) => (
                                                <p key={i} className={bodyText}>
                                                    {para}
                                                </p>
                                            ))}
                                        </div>
                                    )}

                                    {section.content && (
                                        <p className={bodyText}>{section.content}</p>
                                    )}

                                    {section.list && (
                                        <PolicyList items={section.list} className="mt-0.5 sm:mt-1" />
                                    )}

                                    {section.footer && (
                                        <p className={`${bodyText} !text-[#4A2C2A]/60 text-sm italic pt-1`}>
                                            {section.footer}
                                        </p>
                                    )}

                                    {section.subsections && (
                                        <div className="flex flex-col gap-6 sm:gap-7 md:gap-8 mt-1 sm:mt-2">
                                            {section.subsections.map((sub, i) => (
                                                <div
                                                    key={i}
                                                    className="flex flex-col gap-2.5 sm:gap-3 pl-3 sm:pl-4 md:pl-5 border-l-2 border-[#88013C]/10"
                                                >
                                                    <h3 className="text-sm sm:text-base font-black text-[#4A2C2A]">
                                                        {sub.title}
                                                    </h3>
                                                    {sub.content && (
                                                        <p className={bodyText}>{sub.content}</p>
                                                    )}
                                                    {sub.listLabel && (
                                                        <p className="text-[#4A2C2A]/80 font-bold text-sm sm:text-base pt-0.5">
                                                            {sub.listLabel}
                                                        </p>
                                                    )}
                                                    {sub.list && (
                                                        <PolicyList items={sub.list} className="mt-0.5" />
                                                    )}
                                                    {sub.footer && (
                                                        <p className={`${bodyText} !text-[#4A2C2A]/60 text-sm italic pt-0.5`}>
                                                            {sub.footer}
                                                        </p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {section.contact && (
                                        <div className="flex flex-col gap-3 sm:gap-3.5 pt-1 sm:pt-2 text-[#4A2C2A]/70 font-medium text-sm sm:text-base">
                                            <p className="flex items-start sm:items-center gap-2.5 sm:gap-3">
                                                <Mail className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#88013C] shrink-0 mt-0.5 sm:mt-0" />
                                                <a
                                                    href={`mailto:${section.contact.email}`}
                                                    className="hover:text-[#88013C] transition-colors break-all leading-relaxed"
                                                >
                                                    {section.contact.email}
                                                </a>
                                            </p>
                                            <p className="flex items-center gap-2.5 sm:gap-3">
                                                <Phone className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#88013C] shrink-0" />
                                                <a
                                                    href={`tel:${section.contact.phone.replace(/\s/g, '')}`}
                                                    className="hover:text-[#88013C] transition-colors"
                                                >
                                                    {section.contact.phone}
                                                </a>
                                            </p>
                                            <p className="flex items-start gap-2.5 sm:gap-3">
                                                <Clock className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#88013C] shrink-0 mt-0.5" />
                                                <span className="leading-relaxed">
                                                    Support Hours: {section.contact.hours}
                                                </span>
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <LotusDivider />

                    <div className="bg-[#FFF9E6]/80 mx-0 sm:mx-1 px-5 py-6 sm:px-8 sm:py-8 md:px-10 md:py-9 rounded-2xl sm:rounded-[1.75rem] md:rounded-[2rem] border-2 border-dashed border-[#D4AF37]/30 text-center">
                        <p className="text-[#4A2C2A] font-medium italic text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                            &ldquo;Your privacy is not just a policy for us; it is a sacred trust that we cherish and protect daily.&rdquo;
                        </p>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default PrivacyPolicy;
