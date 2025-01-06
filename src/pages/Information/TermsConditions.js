// src/pages/TermsAndConditions.js
import React from 'react';
import { ChevronLeft} from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const TermsConditions = () => {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container px-4 py-12 mx-auto">
      <button
          onClick={() => navigate('/')}
          className="flex items-center mb-4 mr-4 text-gray-300 hover:text-white"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Back to Home
        </button>
        <h1 className="mb-8 text-3xl font-bold text-white">Plugspace App Terms & Conditions and Policy</h1>
        <div className="prose prose-invert max-w-none">
          <p className="text-gray-300">Effective Date: December 2024</p>

          <section className="mb-8">
            <p className="text-gray-300">
              Welcome to Plugspace! Our platform provides a unique opportunity for sellers to connect with high-profit, trending products sourced directly from factories and vendors worldwide. By using Plugspace, you acknowledge that you understand and agree to the terms set forth in this policy. Please take the time to read and understand these terms before using our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-white">1. General Overview</h2>
            <p className="text-gray-300">
              Plugspace is a dropshipping platform designed to connect sellers with trending, high-profit products from factories and vendors. We act as a third-party marketplace, providing a wide selection of goods sourced from global suppliers. Sellers use the platform to discover products and list them for sale on their own e-commerce stores or other sales channels.
            </p>
            <p className="text-gray-300">
              Plugspace does not hold any inventory, manufacture products, or handle shipments directly. The products listed on our platform are provided by third-party vendors and factories, and it is the responsibility of the seller to communicate with these suppliers and manage their orders accordingly.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-white">2. Our Role and Limitations</h2>
            <p className="text-gray-300">
              Plugspace is strictly an intermediary platform, connecting sellers to third-party vendors and factories. We do not sell products directly to customers, nor do we engage in the final fulfillment of orders. The relationship between the seller and the vendor is strictly between the two parties, and we do not assume responsibility for the product quality, shipping times, or customer service issues that arise from the use of the products sold through our platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-white">3. No Guarantee of Product Quality</h2>
            <p className="text-gray-300">
              While we work hard to provide access to high-profit and trending products, Plugspace cannot and does not guarantee the quality of any product listed on our platform. The responsibility for ensuring the quality and suitability of products lies solely with the sellers and their respective vendors. Sellers are encouraged to communicate directly with vendors, review product samples when possible, and assess any third-party reviews to verify product quality before listing them for sale on their sites.
            </p>
            <p className="text-gray-300">
              We make no representations or warranties regarding the condition, reliability, or authenticity of the products provided by third-party vendors. Any issues with product quality or satisfaction should be handled directly between the seller and the vendor.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-white">4. No Guarantee of Shipping Time</h2>
            <p className="text-gray-300">
              Plugspace provides a platform for sellers to access products from global vendors and factories. We do not guarantee specific shipping times for products. The shipping times vary greatly depending on the vendor, the product type, the shipping method chosen, and the destination country. Since the platform connects sellers to third-party vendors, we cannot control or influence the fulfillment process, and shipping times can be subject to delays caused by factors such as customs clearance, natural disasters, vendor capacity, and other unforeseen circumstances.
            </p>
            <p className="text-gray-300">
              We strongly encourage sellers to communicate with their vendors and suppliers to confirm shipping timelines before promoting products to customers. Sellers must set realistic expectations for their customers regarding shipping durations. Plugspace will not be held responsible for delays in the delivery of products.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-white">5. Returns and Refunds</h2>
            <p className="text-gray-300">
              Since Plugspace operates as a dropshipping platform, we do not accept returns or provide refunds for any products sold through our platform. The products are shipped directly from the vendors to the end customers, and it is the responsibility of the seller to manage their own return and refund policies.
            </p>
            <p className="text-gray-300">
              Sellers should clearly communicate to their customers that returns are not accepted for products purchased through their store. We strongly advise sellers to ensure that customers understand this policy before completing any transactions. If any disputes arise regarding returns, the seller must resolve them directly with the customer and/or the vendor.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-white">6. Seller Responsibilities</h2>
            <ul className="pl-6 mt-4 text-gray-300 list-disc">
              <li>Product Listings: You are responsible for the accuracy, legality, and transparency of the product listings on your store.</li>
              <li>Customer Service: You must provide customer support for any questions or concerns related to the products you sell.</li>
              <li>Pricing: You are responsible for setting your own prices. Plugspace does not dictate or influence the pricing of products.</li>
              <li>Compliance: Ensure your business complies with all applicable laws, regulations, and tax obligations.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-white">7. Dispute Resolution</h2>
            <p className="mb-4 text-gray-300">
              If a dispute arises between a seller and a customer, it is the responsibility of the seller to address the issue. Plugspace is not a party to any transactions between sellers and customers and does not intervene unless they directly involve our platform or terms of service.
            </p>
            <p className="text-gray-300">
            In the case of disputes related to product quality, shipping times, or other issues, the seller is solely responsible for resolving the issue with the vendor or factory and may offer a solution to their customer at their discretion.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-white">8. Platform Usage and Prohibited Activities</h2>
            <p className="text-gray-300 ">
            By using Plugspace, you agree not to engage in any activities that may damage, disable, or overburden the platform. The following activities are prohibited:            </p>
            <ul className="pl-6 mt-4 text-gray-300 list-disc">
              <li>Selling prohibited or illegal items: Sellers must not list any products that are illegal, counterfeit, or violate any intellectual property rights.</li>
              <li>Misleading or fraudulent behavior: Sellers must not mislead customers about the quality, authenticity, or origin of products.</li>
              <li>Spamming or phishing: Sellers should refrain from using our platform for unsolicited marketing activities.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-white">9. Modifications to Terms and Conditions</h2>
            <p className="text-gray-300">
            Plugspace reserves the right to modify or update these Terms & Conditions at any time. Sellers will be notified of any significant changes via email or within the platform itself. It is the responsibility of the seller to review these terms regularly to stay informed about any updates.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-white">10. Limitation of Liability</h2>
            <p className="text-gray-300">
            To the fullest extent permitted by law, Plugspace shall not be liable for any loss, damage, or expense arising out of the use of the platform, including but not limited to any issues related to product quality, shipping delays, or customer disputes. By using Plugspace, you agree to indemnify and hold harmless Plugspace, its affiliates, officers, employees, and vendors from any claims, losses, or damages arising from your use of the platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-white">11. Contact Us</h2>
            <p className="text-gray-300">
            If you have any questions about these Terms & Conditions or need assistance with using the Plugspace platform, please contact us at:
            </p>
            <ul className="pl-6 mt-4 text-gray-300 list-disc">
              <li>Email: support@plugspace.io</li>
              <li>Phone: +1-339-399-3778</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
