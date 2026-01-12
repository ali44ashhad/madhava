import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="pt-30 w-[95%] mx-auto py-10">

      {/* HEADER */}
      <div className="bg-[#88013c] text-white rounded-2xl p-6 md:p-10 mb-10">
        <h1 className="text-2xl md:text-4xl font-bold">Terms & Conditions</h1>
        <p className="mt-2 text-sm md:text-base opacity-90">
          Please read these terms carefully before using our website or placing any order.
        </p>
      </div>

      {/* CONTENT */}
      <div className="space-y-8 text-gray-700 text-sm md:text-base leading-relaxed">

        {/* 1 */}
        <section>
          <h2 className="text-lg md:text-xl font-bold text-[#88013c] mb-2">
            1. Introduction
          </h2>
          <p>
            Welcome to our divine products e-commerce website. By accessing or using our website, you agree to be bound by these Terms & Conditions. These terms apply to all users, customers, and visitors of the website.
          </p>
        </section>

        {/* 2 */}
        <section>
          <h2 className="text-lg md:text-xl font-bold text-[#88013c] mb-2">
            2. Nature of Products
          </h2>
          <p>
            We sell religious and spiritual products including god idols, statues, ornaments, pooja items, home temple decor, and related spiritual accessories. All products are intended for religious, decorative, and spiritual purposes only.
          </p>
        </section>

        {/* 3 */}
        <section>
          <h2 className="text-lg md:text-xl font-bold text-[#88013c] mb-2">
            3. Account & User Responsibility
          </h2>
          <p>
            You are responsible for maintaining the confidentiality of your account and personal details. Any activity done through your account will be considered your responsibility.
          </p>
        </section>

        {/* 4 */}
        <section>
          <h2 className="text-lg md:text-xl font-bold text-[#88013c] mb-2">
            4. Pricing & Payments
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>All prices are displayed in INR and include applicable taxes unless stated otherwise.</li>
            <li>We reserve the right to change prices at any time without prior notice.</li>
            <li>Payments must be made through the available secure payment methods on the website.</li>
          </ul>
        </section>

        {/* 5 */}
        <section>
          <h2 className="text-lg md:text-xl font-bold text-[#88013c] mb-2">
            5. Orders & Cancellations
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Once an order is placed, it cannot be cancelled after it has been shipped.</li>
            <li>We reserve the right to cancel any order due to stock unavailability, pricing errors, or suspicious activity.</li>
          </ul>
        </section>

        {/* 6 */}
        <section>
          <h2 className="text-lg md:text-xl font-bold text-[#88013c] mb-2">
            6. Shipping & Delivery
          </h2>
          <p>
            We aim to deliver products within the estimated time. However, delays may occur due to logistics, weather, or unforeseen circumstances.
          </p>
        </section>

        {/* 7 */}
        <section>
          <h2 className="text-lg md:text-xl font-bold text-[#88013c] mb-2">
            7. Returns & Refunds
          </h2>
          <p>
            Returns or replacements are accepted only for damaged, defective, or wrong products delivered. Products must be returned in original condition and packaging.
          </p>
        </section>

        {/* 8 */}
        <section>
          <h2 className="text-lg md:text-xl font-bold text-[#88013c] mb-2">
            8. Religious Sensitivity Disclaimer
          </h2>
          <p>
            Our products are created with respect to all religious beliefs. Minor variations in color, design, or finishing may occur due to handcrafted or manufacturing processes.
          </p>
        </section>

        {/* 9 */}
        <section>
          <h2 className="text-lg md:text-xl font-bold text-[#88013c] mb-2">
            9. Intellectual Property
          </h2>
          <p>
            All content, images, logos, and designs on this website are the property of the company and must not be copied or used without permission.
          </p>
        </section>

        {/* 10 */}
        <section>
          <h2 className="text-lg md:text-xl font-bold text-[#88013c] mb-2">
            10. Limitation of Liability
          </h2>
          <p>
            We are not liable for any indirect, incidental, or consequential damages arising from the use of our website or products.
          </p>
        </section>

        {/* 11 */}
        <section>
          <h2 className="text-lg md:text-xl font-bold text-[#88013c] mb-2">
            11. Changes to Terms
          </h2>
          <p>
            We reserve the right to update these Terms & Conditions at any time without prior notice. Continued use of the website means you accept the updated terms.
          </p>
        </section>

        {/* 12 */}
        <section>
          <h2 className="text-lg md:text-xl font-bold text-[#88013c] mb-2">
            12. Contact Us
          </h2>
          <p>
            If you have any questions regarding these Terms & Conditions, please contact our support team through the website.
          </p>
        </section>

      </div>
    </div>
  );
};

export default TermsAndConditions;
