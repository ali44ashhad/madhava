import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import images from '../assets/images';

/**
 * A reusable Status Page component for 404, 401, 403 etc.
 * 
 * @param {Object} props
 * @param {string} props.title - The main heading (e.g., "404")
 * @param {string} props.subtitle - The secondary heading (e.g., "Page Not Found")
 * @param {string} props.message - Descriptive text
 * @param {string} props.buttonText - Text for the CTA button
 * @param {string} props.buttonLink - Link for the CTA button
 * @param {React.ReactNode} props.icon - Optional icon or element to display
 */
const StatusPage = ({ 
    title, 
    subtitle, 
    message, 
    buttonText = "Back to Home", 
    buttonLink = "/", 
    icon 
}) => {
    // Dynamic font size based on title length
    const titleSizeClass = title.length > 4 
        ? "text-5xl sm:text-7xl md:text-8xl" 
        : "text-8xl md:text-9xl";

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#FFF9E6] px-4 py-20 relative overflow-hidden">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-2xl w-full text-center relative z-10"
            >
                {/* Decorative element / Logo */}
                <div className="mb-6 flex justify-center">
                    {icon || (
                        <motion.img 
                            src={images.madhavGopal} 
                            alt="MadhavGopal" 
                            className="w-24 h-auto opacity-90"
                            animate={{ 
                                scale: [1, 1.05, 1],
                                rotate: [0, 2, -2, 0]
                            }}
                            transition={{ 
                                duration: 5, 
                                repeat: Infinity, 
                                ease: "easeInOut" 
                            }}
                        />
                    )}
                </div>

                <h1 className={`${titleSizeClass} font-bold text-[#88013C] mb-4 drop-shadow-sm leading-tight`}>
                    {title}
                </h1>
                
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                    {subtitle}
                </h2>
                
                <p className="text-gray-600 mb-10 text-lg md:text-xl leading-relaxed max-w-lg mx-auto">
                    {message}
                </p>

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Link
                        to={buttonLink}
                        className="inline-block bg-[#88013C] text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-[#6a0129] transition-all duration-300"
                    >
                        {buttonText}
                    </Link>
                </motion.div>
            </motion.div>

            {/* Subtle background decoration - fixed positioning to avoid layout shift */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-0 opacity-[0.05] pointer-events-none">
                <img src={images.krishnaFlute} alt="" className="w-[400px] md:w-[600px] animate-pulse" />
            </div>
        </div>
    );
};

export default StatusPage;
