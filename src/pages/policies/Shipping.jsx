import React from "react";

const Shipping = () => {
  return (
    <div className="pt-50 w-[95%] mx-auto py-10">

      {/* HEADER */}
      <div className="bg-[#88013c] text-white rounded-2xl p-6 md:p-10 mb-10">
        <h1 className="text-2xl md:text-4xl font-bold">Shipping Policy</h1>
        <p className="mt-2 text-sm md:text-base opacity-90">
          Please review our shipping policy to understand how and when your orders will be delivered.
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
            This Shipping Policy explains the terms, timelines, and conditions related to the delivery of products purchased from our website.
          </p>
        </section>

        {/* 2 */}
        <section>
          <h2 className="text-lg md:text-xl font-bold text-[#88013c] mb-2">
            2. Shipping Locations
          </h2>
          <p>
            We currently ship to selected locations. Delivery availability may vary based on your shipping address.
          </p>
        </section>

        {/* 3 */}
        <section>
          <h2 className="text-lg md:text-xl font-bold text-[#88013c] mb-2">
            3. Order Processing Time
          </h2>
          <p>
            Orders are typically processed within 1–3 business days after confirmation. Orders placed on weekends or holidays will be processed on the next business day.
          </p>
        </section>

        {/* 4 */}
        <section>
          <h2 className="text-lg md:text-xl font-bold text-[#88013c] mb-2">
            4. Shipping Time
          </h2>
          <p>
            Once dispatched, delivery usually takes 3–7 business days depending on your location and courier service.
          </p>
        </section>

        {/* 5 */}
        <section>
          <h2 className="text-lg md:text-xl font-bold text-[#88013c] mb-2">
            5. Shipping Charges
          </h2>
          <p>
            Shipping charges, if applicable, will be calculated and displayed at checkout before completing your purchase.
          </p>
        </section>

        {/* 6 */}
        <section>
          <h2 className="text-lg md:text-xl font-bold text-[#88013c] mb-2">
            6. Order Tracking
          </h2>
          <p>
            Once your order is shipped, you will receive tracking details via email or SMS to monitor your delivery status.
          </p>
        </section>

        {/* 7 */}
        <section>
          <h2 className="text-lg md:text-xl font-bold text-[#88013c] mb-2">
            7. Delayed or Failed Deliveries
          </h2>
          <p>
            Delivery delays may occur due to unforeseen circumstances such as weather conditions, courier issues, or incorrect address details.
          </p>
        </section>

        {/* 8 */}
        <section>
          <h2 className="text-lg md:text-xl font-bold text-[#88013c] mb-2">
            8. Address Accuracy
          </h2>
          <p>
            Customers are responsible for providing accurate shipping information. We are not liable for delays or losses caused by incorrect addresses.
          </p>
        </section>

        {/* 9 */}
        <section>
          <h2 className="text-lg md:text-xl font-bold text-[#88013c] mb-2">
            9. Damaged or Missing Packages
          </h2>
          <p>
            If your package arrives damaged or is missing, please contact our customer support team within 24 hours of delivery.
          </p>
        </section>

        {/* 10 */}
        <section>
          <h2 className="text-lg md:text-xl font-bold text-[#88013c] mb-2">
            10. Changes to Shipping Policy
          </h2>
          <p>
            We reserve the right to update this Shipping Policy at any time. Changes will be posted on this page.
          </p>
        </section>

        {/* 11 */}
        <section>
          <h2 className="text-lg md:text-xl font-bold text-[#88013c] mb-2">
            11. Contact Us
          </h2>
          <p>
            If you have any questions regarding shipping or delivery, please contact us through our website.
          </p>
        </section>

      </div>
    </div>
  );
};

export default Shipping;
