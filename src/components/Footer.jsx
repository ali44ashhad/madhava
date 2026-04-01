import React, { useEffect, useMemo, useState } from "react";
import { ChevronRight, Instagram, Facebook, Youtube, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getStoreCategories } from "../utils/storeApi";

const Footer = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await getStoreCategories();
        if (!alive) return;
        setCategories(Array.isArray(data) ? data : []);
      } catch {
        if (!alive) return;
        setCategories([]);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  const topCategories = useMemo(() => {
    const list = Array.isArray(categories) ? categories : [];
    const firstFive = list
      .filter((c) => c && (c.slug || c.id) && c.name)
      .slice(0, 5)
      .map((c) => ({
        key: c.id ?? c.slug ?? c.name,
        name: c.name,
        path: c.slug ? `/category/${c.slug}` : "/categories",
      }));

    if (firstFive.length > 0) return firstFive;

    // Fallback if categories are unavailable
    return [
      { key: "categories", name: "Browse Categories", path: "/categories" },
      { key: "products", name: "All Products", path: "/products" },
      { key: "cart", name: "Cart", path: "/cart" },
      { key: "orders", name: "My Orders", path: "/orders" },
      { key: "categories", name: "All Categories", path: "/categories" },
    ];
  }, [categories]);

  const shopLinks = [
    { name: "Categories", path: "/categories" },
    { name: "All Products", path: "/products" },
    { name: "Cart", path: "/cart" },
    { name: "My Orders", path: "/orders" },
    { name: "FAQ", path: "/faq" },
    { name: "Contact Us", path: "/contact-us" }
  ];

  const policyLinks = [
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Terms & Conditions", path: "/terms-and-conditions" },
    { name: "Shipping Policy", path: "/shipping-policy" },
    { name: "Return & Refund Policy", path: "/return-policy" },
    { name: "Cancellation Policy", path: "/cancellation-policy" },
    { name: "Disclaimer", path: "/disclaimer" },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  };

  return (
    <>
      <footer className="bg-[#88013C] py-12 px-6 md:px-10 lg:px-24 text-white overflow-hidden">
        <div className="max-w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* LEFT */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-4 space-y-6"
          >
            <Link to="/">
              <h2 className="text-4xl font-black tracking-tight">
                Madhav<span className="text-yellow-300">Gopal</span>
              </h2>
            </Link>

            <p className="text-sm leading-relaxed text-white/80">
              Bringing devotion to your home with premium quality spiritual products, idols, ornaments and temple decor.
            </p>

            <h3 className="text-lg md:text-xl font-bold">
              Get spiritual updates & special offers
            </h3>

            <div className="relative max-w-sm">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full py-3 px-5 border-2 border-gray-400 rounded-xl outline-none shadow-sm text-gray-400"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-1 rounded-full border">
                <ChevronRight className="w-5 h-5 text-[#88013C]" />
              </button>
            </div>

            {/* SOCIAL ICONS */}
            <div className="flex gap-4 pt-4">
              {[Instagram, Facebook, Youtube, MessageCircle].map((Icon, i) => (
                <motion.a
                  key={i}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className="p-2 rounded-full bg-white text-[#88013C] shadow hover:bg-yellow-300 transition"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-10">

            {/* CATEGORIES */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h4 className="font-bold mb-5 text-lg text-yellow-300">Categories</h4>

              <ul className="space-y-3 text-sm font-medium">
                {topCategories.map((item, i) => (
                  <motion.li
                    key={item.key ?? item.name}
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <Link className="hover:text-yellow-300 transition" to={item.path}>
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* SHOP */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h4 className="font-bold mb-5 text-lg text-yellow-300">Shop</h4>
              <ul className="space-y-3 text-sm font-medium">
                {shopLinks.map((item, i) => (
                  <motion.li
                    key={item.name}
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <Link to={item.path} className="hover:text-yellow-300 transition">
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* POLICIES */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h4 className="font-bold mb-5 text-lg text-yellow-300">Policies</h4>

              <ul className=" text-sm font-medium">
                {policyLinks.map((item, i) => (
                  <motion.li
                    key={item.name}
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="mb-2"
                  >
                    <Link to={item.path} className="hover:text-yellow-300 transition">
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

          </div>
        </div>
      </footer>

      {/* COPYRIGHT */}
      <div className="w-full bg-[#6f012f] text-white text-center py-4 px-4 text-sm">
        © {new Date().getFullYear()} MadhavGopal. All Rights Reserved. | Crafted with devotion in India 🇮🇳
      </div>
    </>
  );
};

export default Footer;
