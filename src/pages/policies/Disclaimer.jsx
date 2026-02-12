import React from "react";

const Disclaimer = () => {
  return (
    <div className="pt-50 w-[95%] mx-auto py-10">

      {/* HEADER */}
      <div className="bg-[#88013c] text-white rounded-2xl p-6 md:p-10 mb-10">
        <h1 className="text-2xl md:text-4xl font-bold">Disclaimer</h1>
        <p className="mt-2 text-sm md:text-base opacity-90">
          Please read this disclaimer carefully before using our website or services.
        </p>
      </div>

      {/* CONTENT */}
      <div className="space-y-8 text-gray-700 text-sm md:text-base leading-relaxed">

        {/* 1 */}
        <section>
          <h2 className="text-lg md:text-xl font-bold text-[#88013c] mb-2">
            1. General Information
          </h2>
          <p>
            The information provided on this website is for general informational purposes only. While we strive to keep the information accurate and up to date, we make no warranties of any kind regarding completeness, accuracy, or reliability.
          </p>
        </section>

        {/* 2 */}
        <section>
          <h2 className="text-lg md:text-xl font-bold text-[#88013c] mb-2">
            2. No Professional Advice
          </h2>
          <p>
            The content on this website does not constitute professional, legal, financial, or medical advice. Any reliance you place on such information is strictly at your own risk.
          </p>
        </section>

        {/* 3 */}
        <section>
          <h2 className="text-lg md:text-xl font-bold text-[#88013c] mb-2">
            3. Product Information
          </h2>
          <p>
            We make every effort to display product details, descriptions, and prices accurately. However, we do not guarantee that all product information is error-free, complete, or current.
          </p>
        </section>

        {/* 4 */}
        <section>
          <h2 className="text-lg md:text-xl font-bold text-[#88013c] mb-2">
            4. Limitation of Liability
          </h2>
          <p>
            Under no circumstances shall we be liable for any loss or damage arising from the use of this website or reliance on the information provided.
          </p>
        </section>

        {/* 5 */}
        <section>
          <h2 className="text-lg md:text-xl font-bold text-[#88013c] mb-2">
            5. External Links
          </h2>
          <p>
            Our website may contain links to third-party websites. We do not have control over the content or availability of those sites and do not endorse them.
          </p>
        </section>

        {/* 6 */}
        <section>
          <h2 className="text-lg md:text-xl font-bold text-[#88013c] mb-2">
            6. Website Availability
          </h2>
          <p>
            We do not guarantee uninterrupted or error-free access to our website and may suspend or withdraw services without prior notice.
          </p>
        </section>

        {/* 7 */}
        <section>
          <h2 className="text-lg md:text-xl font-bold text-[#88013c] mb-2">
            7. User Responsibility
          </h2>
          <p>
            Users are responsible for ensuring that any products, services, or information obtained through this website meet their requirements.
          </p>
        </section>

        {/* 8 */}
        <section>
          <h2 className="text-lg md:text-xl font-bold text-[#88013c] mb-2">
            8. Changes to Disclaimer
          </h2>
          <p>
            We reserve the right to modify this Disclaimer at any time. Changes will be effective immediately upon posting on this page.
          </p>
        </section>

        {/* 9 */}
        <section>
          <h2 className="text-lg md:text-xl font-bold text-[#88013c] mb-2">
            9. Consent
          </h2>
          <p>
            By using our website, you hereby consent to this Disclaimer and agree to its terms.
          </p>
        </section>

        {/* 10 */}
        <section>
          <h2 className="text-lg md:text-xl font-bold text-[#88013c] mb-2">
            10. Contact Us
          </h2>
          <p>
            If you have any questions regarding this Disclaimer, please contact us through our website.
          </p>
        </section>

      </div>
    </div>
  );
};

export default Disclaimer;
