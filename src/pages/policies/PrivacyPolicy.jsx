import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="pt-30 w-[95%] mx-auto py-10">

      {/* HEADER */}
      <div className="bg-[#88013c] text-white rounded-2xl p-6 md:p-10 mb-10">
        <h1 className="text-2xl md:text-4xl font-bold">Privacy Policy</h1>
        <p className="mt-2 text-sm md:text-base opacity-90">
          Your privacy is important to us. Please read this policy carefully to understand how we handle your data.
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
            This Privacy Policy explains how we collect, use, store, and protect your personal information when you use our website or purchase our products.
          </p>
        </section>

        {/* 2 */}
        <section>
          <h2 className="text-lg md:text-xl font-bold text-[#88013c] mb-2">
            2. Information We Collect
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Personal details such as name, phone number, email address, and shipping address.</li>
            <li>Order and payment related information.</li>
            <li>Browsing behavior and interaction with our website.</li>
          </ul>
        </section>

        {/* 3 */}
        <section>
          <h2 className="text-lg md:text-xl font-bold text-[#88013c] mb-2">
            3. How We Use Your Information
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To process and deliver your orders.</li>
            <li>To provide customer support and order updates.</li>
            <li>To improve our website, services, and user experience.</li>
            <li>To send offers, updates, and promotional messages (if you opt in).</li>
          </ul>
        </section>

        {/* 4 */}
        <section>
          <h2 className="text-lg md:text-xl font-bold text-[#88013c] mb-2">
            4. Data Protection & Security
          </h2>
          <p>
            We implement appropriate security measures to protect your personal data from unauthorized access, misuse, or disclosure.
          </p>
        </section>

        {/* 5 */}
        <section>
          <h2 className="text-lg md:text-xl font-bold text-[#88013c] mb-2">
            5. Sharing of Information
          </h2>
          <p>
            We do not sell, trade, or rent your personal information to third parties. Your data may only be shared with trusted service providers for order fulfillment and delivery.
          </p>
        </section>

        {/* 6 */}
        <section>
          <h2 className="text-lg md:text-xl font-bold text-[#88013c] mb-2">
            6. Cookies & Tracking Technologies
          </h2>
          <p>
            Our website may use cookies and similar technologies to enhance your browsing experience and analyze website traffic.
          </p>
        </section>

        {/* 7 */}
        <section>
          <h2 className="text-lg md:text-xl font-bold text-[#88013c] mb-2">
            7. Your Rights
          </h2>
          <p>
            You have the right to access, update, or request deletion of your personal data. You may also opt out of promotional communications at any time.
          </p>
        </section>

        {/* 8 */}
        <section>
          <h2 className="text-lg md:text-xl font-bold text-[#88013c] mb-2">
            8. Third-Party Services
          </h2>
          <p>
            Our website may contain links to third-party websites. We are not responsible for the privacy practices of those websites.
          </p>
        </section>

        {/* 9 */}
        <section>
          <h2 className="text-lg md:text-xl font-bold text-[#88013c] mb-2">
            9. Children's Privacy
          </h2>
          <p>
            Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children.
          </p>
        </section>

        {/* 10 */}
        <section>
          <h2 className="text-lg md:text-xl font-bold text-[#88013c] mb-2">
            10. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes will be posted on this page.
          </p>
        </section>

        {/* 11 */}
        <section>
          <h2 className="text-lg md:text-xl font-bold text-[#88013c] mb-2">
            11. Contact Us
          </h2>
          <p>
            If you have any questions about this Privacy Policy or how we handle your data, please contact us through our website.
          </p>
        </section>

      </div>
    </div>
  );
};

export default PrivacyPolicy;
