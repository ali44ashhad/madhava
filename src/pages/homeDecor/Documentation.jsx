import React from "react";

const Documentation = () => {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8 py-10 md:py-14 lg:py-18">

        {/* ================= MAIN HEADING ================= */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-gray-200 tracking-tight uppercase mb-4">
          Explore Our Exciting Range of Corporate Gifts
        </h1>

        <p className="text-base sm:text-lg text-gray-600 mb-10">
          Shop Exclusive Corporate Gifts at{" "}
          <span className="font-semibold text-gray-900">
            FNA Marketplace
          </span>
        </p>

        {/* ================= CONTENT ================= */}
        <div className="space-y-6 text-gray-700 text-sm sm:text-base leading-relaxed">

          <p>
            In today’s fast-paced business environment, corporate gifting has
            evolved beyond a simple token of appreciation. It has become a
            strategic approach to building relationships, enhancing brand
            loyalty, and creating meaningful connections with employees,
            clients, and business partners.
          </p>

          <p>
            At <span className="font-semibold">FNA Marketplace</span>, we
            understand the importance of thoughtful gifting. Our carefully
            curated selection of corporate gift items blends functionality,
            elegance, and innovation—ensuring every gift leaves a lasting
            impression.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 pt-6">
            Premium Corporate Gifts That Make an Impact
          </h2>

          <p>
            Choosing the right corporate gift means striking the perfect
            balance between utility, sophistication, and brand alignment.
            FNA Marketplace offers premium tech products and lifestyle
            accessories that are practical, stylish, and memorable.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 pt-6">
            Corporate Gifts for Employees
          </h2>

          <p>
            Reward dedication and inspire performance with corporate gifts
            for employees that add value to everyday life. Our gifting
            solutions help boost morale, motivation, and workplace
            engagement.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 pt-6">
            Corporate Gifts for Clients & Partners
          </h2>

          <p>
            Strengthen business relationships with thoughtful corporate gifts
            for clients and partners. Our premium gift options reflect
            professionalism, trust, and long-term commitment.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 pt-6">
            Custom & Branded Corporate Gifts
          </h2>

          <p>
            Personalised corporate gifts enhance brand recall and visibility.
            With custom branding options, every gift becomes a powerful
            reminder of your company’s identity and values.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 pt-6">
            Why Corporate Gifting Matters in Business
          </h2>

          <p>
            Corporate gifting plays a crucial role in enhancing brand
            perception, strengthening relationships, and encouraging loyalty.
            Thoughtfully chosen corporate gift items can improve employee
            engagement, client retention, and overall brand visibility.
          </p>

          <p>
            At FNA Marketplace, our corporate gifting solutions focus on
            quality, usability, and modern design—ensuring that every gift
            represents your brand in the best possible way.
          </p>

        </div>

        {/* ================= CTA ================= */}
        <div className="mt-12">
          <button className="rounded-xl bg-gray-900 px-8 py-4 text-sm sm:text-base font-bold uppercase text-white hover:bg-black transition">
            Explore Corporate Gifts
          </button>
        </div>

      </div>
    </section>
  );
};

export default Documentation;
