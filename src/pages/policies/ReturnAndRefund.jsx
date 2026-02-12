import React from "react";

const ReturnAndRefund = () => {
  return (
    <div className="pt-50 w-[95%] mx-auto py-10">

      {/* HEADER */}
      <div className="bg-[#88013c] text-white rounded-2xl p-6 md:p-10 mb-10">
        <h1 className="text-2xl md:text-4xl font-bold">Return & Refund Policy</h1>
        <p className="mt-2 text-sm md:text-base opacity-90">
          Please read our return and refund policy carefully to understand your rights and eligibility.
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
            This Return & Refund Policy explains the conditions under which products purchased from our website can be returned or refunded.
          </p>
        </section>

        {/* 2 */}
        <section>
          <h2 className="text-lg md:text-xl font-bold text-[#88013c] mb-2">
            2. Return Eligibility
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Items must be returned within the specified return period.</li>
            <li>Products must be unused, unwashed, and in original packaging.</li>
            <li>Items must include original tags, labels, and invoices.</li>
          </ul>
        </section>

        {/* 3 */}
        <section>
          <h2 className="text-lg md:text-xl font-bold text-[#88013c] mb-2">
            3. Non-Returnable Items
          </h2>
          <p>
            Certain items such as customized products, perishable goods, personal care items, and items marked as non-returnable are not eligible for return.
          </p>
        </section>

        {/* 4 */}
        <section>
          <h2 className="text-lg md:text-xl font-bold text-[#88013c] mb-2">
            4. Return Process
          </h2>
          <p>
            To initiate a return, please contact our customer support team with your order details. Returns without prior approval may not be accepted.
          </p>
        </section>

        {/* 5 */}
        <section>
          <h2 className="text-lg md:text-xl font-bold text-[#88013c] mb-2">
            5. Return Shipping
          </h2>
          <p>
            Customers may be responsible for return shipping charges unless the return is due to a damaged, defective, or incorrect product.
          </p>
        </section>

        {/* 6 */}
        <section>
          <h2 className="text-lg md:text-xl font-bold text-[#88013c] mb-2">
            6. Refund Processing
          </h2>
          <p>
            Once the returned item is received and inspected, the refund will be processed within the applicable time frame.
          </p>
        </section>

        {/* 7 */}
        <section>
          <h2 className="text-lg md:text-xl font-bold text-[#88013c] mb-2">
            7. Refund Method
          </h2>
          <p>
            Refunds will be issued to the original payment method used at the time of purchase.
          </p>
        </section>

        {/* 8 */}
        <section>
          <h2 className="text-lg md:text-xl font-bold text-[#88013c] mb-2">
            8. Delayed or Missing Refunds
          </h2>
          <p>
            If you have not received your refund within the expected time, please contact our customer support team for assistance.
          </p>
        </section>

        {/* 9 */}
        <section>
          <h2 className="text-lg md:text-xl font-bold text-[#88013c] mb-2">
            9. Exchanges
          </h2>
          <p>
            We only replace items if they are defective or damaged. Exchange requests are subject to product availability.
          </p>
        </section>

        {/* 10 */}
        <section>
          <h2 className="text-lg md:text-xl font-bold text-[#88013c] mb-2">
            10. Policy Updates
          </h2>
          <p>
            We reserve the right to update this Return & Refund Policy at any time. Changes will be posted on this page.
          </p>
        </section>

        {/* 11 */}
        <section>
          <h2 className="text-lg md:text-xl font-bold text-[#88013c] mb-2">
            11. Contact Us
          </h2>
          <p>
            If you have any questions regarding returns or refunds, please contact our customer support through our website.
          </p>
        </section>

      </div>
    </div>
  );
};

export default ReturnAndRefund;
