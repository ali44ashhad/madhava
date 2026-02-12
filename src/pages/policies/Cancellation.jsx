import React from "react";

const Cancellation = () => {
  return (
    <div className="pt-50 w-[95%] mx-auto py-10">

      {/* HEADER */}
      <div className="bg-[#88013c] text-white rounded-2xl p-6 md:p-10 mb-10">
        <h1 className="text-2xl md:text-4xl font-bold">Cancellation Policy</h1>
        <p className="mt-2 text-sm md:text-base opacity-90">
          Please read our cancellation policy carefully to understand your rights and options.
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
            This Cancellation Policy outlines the terms and conditions under which orders placed on our website can be canceled.
          </p>
        </section>

        {/* 2 */}
        <section>
          <h2 className="text-lg md:text-xl font-bold text-[#88013c] mb-2">
            2. Order Cancellation by Customer
          </h2>
          <p>
            Customers may cancel their order before it has been processed or shipped. Once the order is shipped, cancellation requests will not be accepted.
          </p>
        </section>

        {/* 3 */}
        <section>
          <h2 className="text-lg md:text-xl font-bold text-[#88013c] mb-2">
            3. How to Cancel an Order
          </h2>
          <p>
            To cancel an order, please contact our customer support team as soon as possible with your order details.
          </p>
        </section>

        {/* 4 */}
        <section>
          <h2 className="text-lg md:text-xl font-bold text-[#88013c] mb-2">
            4. Cancellation After Shipping
          </h2>
          <p>
            Orders that have already been shipped cannot be canceled. In such cases, customers may refer to our Return or Refund Policy.
          </p>
        </section>

        {/* 5 */}
        <section>
          <h2 className="text-lg md:text-xl font-bold text-[#88013c] mb-2">
            5. Cancellation by Seller
          </h2>
          <p>
            We reserve the right to cancel orders due to reasons such as product unavailability, pricing errors, or unforeseen circumstances. In such cases, a full refund will be initiated.
          </p>
        </section>

        {/* 6 */}
        <section>
          <h2 className="text-lg md:text-xl font-bold text-[#88013c] mb-2">
            6. Refund on Cancellation
          </h2>
          <p>
            If an order is successfully canceled, the refund will be processed to the original payment method within the applicable time frame.
          </p>
        </section>

        {/* 7 */}
        <section>
          <h2 className="text-lg md:text-xl font-bold text-[#88013c] mb-2">
            7. Non-Cancellable Items
          </h2>
          <p>
            Certain items such as customized products, perishable goods, or items marked as non-cancellable are not eligible for cancellation.
          </p>
        </section>

        {/* 8 */}
        <section>
          <h2 className="text-lg md:text-xl font-bold text-[#88013c] mb-2">
            8. Delayed Cancellation Requests
          </h2>
          <p>
            Cancellation requests received after the order has been processed may not be accepted.
          </p>
        </section>

        {/* 9 */}
        <section>
          <h2 className="text-lg md:text-xl font-bold text-[#88013c] mb-2">
            9. Policy Updates
          </h2>
          <p>
            We may update this Cancellation Policy from time to time. Any changes will be reflected on this page.
          </p>
        </section>

        {/* 10 */}
        <section>
          <h2 className="text-lg md:text-xl font-bold text-[#88013c] mb-2">
            10. Contact Us
          </h2>
          <p>
            If you have any questions regarding cancellations, please contact our customer support through our website.
          </p>
        </section>

      </div>
    </div>
  );
};

export default Cancellation;
