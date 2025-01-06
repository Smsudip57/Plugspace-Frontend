// src/pages/PrivacyPolicy.js
import React from 'react';
import { ChevronLeft} from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const PrivacyPolicy = () => {

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
        <h1 className="mb-8 text-3xl font-bold text-white">Plugspace Privacy Policy</h1>
        <div className="prose prose-invert max-w-none">
          <p className="text-gray-300">Effective Date: December 2024</p>

          <section className="mb-8">
            <p className="text-gray-300">
              At Plugspace, we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy outlines how we collect, use, store, and protect your data when you visit our website, use our platform, or engage with our services. By using Plugspace, you agree to the collection and use of information in accordance with this Privacy Policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-white">1. Information We Collect</h2>
            <p className="text-gray-300">
              We collect several types of information to provide and improve our services to you. This includes personal data and usage data.
            </p>
            <h3 className="text-xl font-semibold text-white">Personal Data:</h3>
            <p className="text-gray-300">
              Personal data is information that can be used to identify you as an individual. This includes, but is not limited to:
            </p>
            <ul className="pl-6 mt-4 text-gray-300 list-disc">
              <li>Account Information: When you register for an account on Plugspace, we may collect your name, email address, phone number, business name, payment information (credit card or bank details), and other personal contact information.</li>
              <li>Communication Information: Any messages you send to us through our customer support, inquiries, or feedback channels may be stored, including email correspondence, chat messages, and other forms of communication.</li>
            </ul>
            <h3 className="text-xl font-semibold text-white">Usage Data:</h3>
            <p className="text-gray-300">
              We also collect information on how you access and interact with our platform. This data helps us improve your experience and troubleshoot issues. Usage data includes:
            </p>
            <ul className="pl-6 mt-4 text-gray-300 list-disc">
              <li>Log Data: Our servers automatically log information when you visit our platform. This includes your IP address, browser type, browser version, the pages of our site you visit, the time spent on those pages, and other diagnostic data.</li>
              <li>Cookies and Tracking Technologies: Plugspace uses cookies and similar tracking technologies to track your activity on our platform. Cookies are small data files that are placed on your device to help identify your preferences, session information, and interactions with our site. You can control the use of cookies through your browser settings, but disabling cookies may affect some features of the platform.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-2 text-2xl font-semibold text-white">2. How We Use Your Information</h2>
            <p className="mb-4 first-line:text-gray-300">We use the information we collect in the following ways:</p>
            <h2 className="text-xl font-semibold text-white">To Provide and Improve Our Services:</h2>
            <ul className="pl-6 mb-4 text-gray-300 list-disc">
              <li>To process your transactions and manage your subscription.</li>
              <li>To enable you to add products, search, filter, and manage listings.</li>
              <li>To personalize your experience and offer relevant products or features.</li>
              <li>To monitor the performance of the platform and make improvements based on user feedback.</li>
              <li>To provide customer support and resolve issues.</li>
              <li>To ensure compliance with our Terms of Use, prevent fraud, and protect our platform’s security.</li>
            </ul>
            <h2 className="text-xl font-semibold text-white">For Customer Support:</h2>
            <p className="mb-4 text-gray-300">We use your information to provide customer support, resolve issues, and respond to your inquiries. This may involve accessing your account information or transaction history to assist in troubleshooting.</p>
            <h2 className="text-xl font-semibold text-white">For Marketing and Communication:</h2>
            <p className="mb-4 text-gray-300">With your consent, we may use your contact information to send you marketing materials, newsletters, or product updates. You can opt-out of these communications at any time by following the unsubscribe link in any email or contacting us directly.</p>
            <h2 className="text-xl font-semibold text-white">For Legal and Security Purposes:</h2>
            <p className="mb-4 text-gray-300">We may use your information to ensure compliance with our Terms of Use, prevent fraud, and protect our platform’s security. This includes investigating suspicious activities or potential breaches of our policies.</p>

          </section>
          <section className="mb-8">
            <h2 className="mb-2 text-2xl font-semibold text-white">3. Data Storage and Security</h2>
            <p className="mb-4 text-gray-300">Plugspace takes your privacy and the security of your data seriously. We employ industry-standard security measures, including encryption protocols and secure servers, to protect your personal data from unauthorized access, loss, or theft.</p>
            <h2 className="text-xl font-semibold text-white">Data Storage:</h2>
            <p className="mb-4 text-gray-300">We store your personal data in secure data centers, and access to your data is restricted to authorized personnel only. We retain your personal information only as long as necessary for the purposes described in this Privacy Policy or as required by law.</p>
            <h2 className="text-xl font-semibold text-white">Data Retention:</h2>
            <p className="mb-4 text-gray-300">We retain personal data for as long as your account remains active, or as needed to fulfill the purposes for which it was collected, such as processing orders or providing customer support. You can request to delete your account at any time by contacting us, and we will comply with your request in accordance with applicable law.</p>
            <h2 className="text-xl font-semibold text-white">Data Protection Measures:</h2>
            <p className="text-gray-300 ">To ensure that your data remains safe, we implement various safeguards, including but not limited to:</p>
            <ul className="pl-6 mb-4 text-gray-300 list-disc">
              <li>Secure socket layer (SSL) encryption for the transmission of sensitive data such as payment information.</li>
              <li>Regular security audits and updates to ensure the integrity of our platform</li>
              <li>Firewalls and intrusion detection systems to protect against unauthorized access.</li>
            </ul>

          </section>

          <section className="mb-8">
            <h2 className="mb-2 text-2xl font-semibold text-white">4. Sharing Your Information</h2>
            <p className="mb-4 text-gray-300">Plugspace does not sell or rent your personal information to third parties. However, we may share your information under the following circumstances:</p>
            <h2 className="text-xl font-semibold text-white">Service Providers:</h2>
            <p className="mb-4 text-gray-300">We may share your data with third-party service providers who help us perform functions related to the platform, such as payment processing, data analytics, marketing services, and customer support. These providers are required to handle your data securely and use it only for the purposes outlined in our agreements with them.</p>
            <h2 className="text-xl font-semibold text-white">Vendors and Suppliers:</h2>
            <p className="mb-4 text-gray-300">Since Plugspace operates as a dropshipping platform, we may share relevant details with third-party vendors and suppliers to fulfill product orders. This may include your business name, shipping address, and order details. These vendors are responsible for fulfilling the products and may have their own privacy practices that are separate from ours.</p>
            <h2 className="text-xl font-semibold text-white">Legal Requirements:</h2>
            <p className="mb-4 text-gray-300 ">We may disclose your information if required by law or if we believe that such action is necessary to comply with legal processes, enforce our Terms of Use, or protect the rights, property, or safety of Plugspace, its users, or the public.</p>
            <h2 className="text-xl font-semibold text-white">Business Transfers:</h2>
            <p className="mb-4 text-gray-300 ">In the event of a merger, acquisition, or sale of assets, your personal information may be transferred to the acquiring party. We will notify you via email or a prominent notice on our platform before any information is transferred or becomes subject to a different privacy policy.</p>

          </section>
          <section className="mb-8">
            <h2 className="mb-2 text-2xl font-semibold text-white">5. Your Data Rights</h2>
            <h2 className="text-gray-300">As a user of Plugspace, you have certain rights regarding your personal data. These include:</h2>
            <ul className="pl-6 mb-4 text-gray-300 list-disc">
              <li>Access to Your Data: You can request access to the personal data we hold about you. This includes information about how we collect, use, and share your data.</li>
              <li>Correction of Data: If you believe that any personal data we hold is inaccurate or incomplete, you can request that we correct or update it.</li>
              <li>Deletion of Data: You may request that we delete your personal data, subject to certain exceptions, such as when data must be retained for legal or contractual reasons.</li>
              <li>Opt-out of Marketing: You can opt out of receiving marketing emails from us by using the unsubscribe link included in each communication or by contacting us directly.</li>
              <li>Withdrawal of Consent: If you have previously consented to our processing of your personal data, you may withdraw your consent at any time by contacting us.</li>
            </ul>
          </section>
          <section className="mb-8">
            <h2 className="mb-2 text-2xl font-semibold text-white">6. Children’s Privacy</h2>
            <h2 className="text-gray-300">Plugspace is not intended for use by children under the age of 18. We do not knowingly collect or solicit personal information from children. If we become aware that a child under 18 has provided us with personal data, we will take steps to delete such information from our servers.</h2>
          </section>
          <section className="mb-8">
            <h2 className="mb-2 text-2xl font-semibold text-white">7. Cookies and Tracking Technologies</h2>
            <h2 className="text-gray-300">Plugspace uses cookies and other tracking technologies to improve your experience on our platform, analyze usage trends, and enable features such as saving your preferences. By using our platform, you consent to our use of cookies. You can adjust your browser settings to block or delete cookies, but doing so may affect your ability to use certain features of the site.</h2>
          </section>
          <section className="mb-8">
            <h2 className="mb-2 text-2xl font-semibold text-white">8. Changes to This Privacy Policy</h2>
            <h2 className="text-gray-300">We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any significant changes by posting the updated policy on our website or sending you an email. We encourage you to review this Privacy Policy periodically to stay informed about how we protect your data.</h2>
          </section>
          {/* Repeat sections for all parts of the privacy policy document */}
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-white">9. Contact Us</h2>
            <p className="text-gray-300">
              If you have any questions or concerns about this Privacy Policy or how we handle your personal data, please contact us at:
            </p>
            <ul className="pl-6 mt-4 mb-4 text-gray-300 list-disc">
              <li>Email: support@plugspace.io</li>
              <li>Phone: +1-339-399-3778</li>
            </ul>
            <p className="text-xl font-semibold text-gray-300">
              By using Plugspace, you acknowledge that you have read, understood, and agree to this Privacy Policy.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
