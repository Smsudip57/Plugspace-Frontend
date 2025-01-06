// src/pages/AboutUs.js
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
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
        <h1 className="mb-8 text-3xl font-bold text-white">About Us - Plugspace</h1>
        <div className="prose prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white">Welcome to Plugspace!</h2>
            <p className="text-gray-300">
              At Plugspace, we are revolutionizing the way entrepreneurs and online sellers access high-profit, trending products. Our platform is designed to empower dropshippers and e-commerce businesses by providing an easy, seamless connection to a wide range of suppliers, factories, and vendors. With an emphasis on profitability and efficiency, Plugspace offers a robust solution to help you grow your online business while saving time and maximizing your potential returns.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white">Our Mission</h2>
            <p className="text-gray-300">
              Our mission is simple: To connect sellers with the best high-profit products in the market. We aim to make sourcing and selling online easier and more profitable for everyone, from new entrepreneurs to seasoned e-commerce veterans. By offering access to trending products and top-tier suppliers, we help you grow your business with confidence.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white">What We Do</h2>
            <p className="text-gray-300">
              Plugspace acts as a dynamic marketplace that bridges the gap between entrepreneurs, e-commerce sellers, and global suppliers. Our platform offers:
            </p>
            <ul className="pl-6 mt-4 text-gray-300 list-disc">
              <li>
                <strong>Trending, High-Profit Products:</strong> We curate a selection of the most profitable, high-demand products that offer great margins, ensuring you have access to the best items to sell to your customers.
              </li>
              <li>
                <strong>Seamless Integration with Suppliers:</strong> Plugspace connects you directly to factories and vendors, giving you access to a broad range of products without the need for managing inventory.
              </li>
              <li>
                <strong>Efficient Dropshipping Solutions:</strong> We provide a platform where you can list and sell products on your store, and your orders are automatically fulfilled by your chosen vendors, streamlining the entire process.
              </li>
              <li>
                <strong>Advanced Product Search & Filtering:</strong> Our intuitive platform allows you to easily search for products by image, category, or filter by specific criteria such as profit margins, shipping time, and vendor rating.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white">Why Plugspace?</h2>
            <ul className="pl-6 mt-4 text-gray-300 list-disc">
              <li>
                <strong>Access to High-Profit Products:</strong> We focus on finding the most profitable products with high margins, allowing sellers to make the most of each sale.
              </li>
              <li>
                <strong>No Inventory Hassles:</strong> As a dropshipping platform, you don’t have to worry about holding inventory. We connect you directly to the suppliers, who handle all the shipping and logistics.
              </li>
              <li>
                <strong>Customizable Subscription Plans:</strong> Whether you’re just starting out or are an established business looking for more flexibility, our subscription plans are tailored to meet your needs. From basic plans to premium services, we provide options that allow you to grow your business at your own pace.
              </li>
              <li>
                <strong>Global Supplier Network:</strong> We connect you to a network of global suppliers who offer quality products at competitive prices, giving you access to a diverse range of goods.
              </li>
              <li>
                <strong>No Hidden Fees:</strong> Transparency is important to us. With Plugspace, you can rest assured that there are no hidden fees. We offer affordable subscription packages based on your business needs.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white">Our Values</h2>
            <ul className="pl-6 mt-4 text-gray-300 list-disc">
              <li><strong>Integrity:</strong> We believe in honesty and transparency in all our dealings. Our platform is designed to ensure that you get the best possible service and products, with no hidden agendas.</li>
              <li><strong>Innovation:</strong> We are constantly innovating to ensure our platform evolves with the ever-changing landscape of e-commerce. Our goal is to provide the tools and features that will help your business succeed.</li>
              <li><strong>Customer-Centric:</strong> Your satisfaction is our priority. We strive to provide exceptional customer service and support to help you every step of the way.</li>
              <li><strong>Simplicity:</strong> Running an online business should be simple. That’s why we’ve designed Plugspace to be an intuitive, easy-to-use platform that saves you time and effort.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white">Our Team</h2>
            <p className="text-gray-300">
              Plugspace is built by a team of passionate professionals with expertise in e-commerce, technology, and customer service. Our goal is to continuously improve our platform to meet the needs of our diverse user base. Whether you are a small business owner or a large-scale seller, we’re here to help you succeed in your e-commerce journey.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white">Our Future Vision</h2>
            <p className="text-gray-300">
              At Plugspace, we are constantly striving to enhance the features and capabilities of our platform. Our vision is to become the leading platform for dropshipping and e-commerce sellers worldwide, providing innovative solutions that make sourcing and selling high-profit products easier than ever. We are committed to staying ahead of the curve in the e-commerce space, offering cutting-edge tools and insights that will help our users achieve greater success.            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white">Join the Plugspace Community</h2>
            <p className="text-gray-300">
              Whether you’re new to dropshipping or an experienced seller, Plugspace is the perfect partner to help you grow your business. Start exploring trending products today and discover how our platform can boost your e-commerce success.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white">Contact Us</h2>
            <p className="text-gray-300">
              If you have any questions or would like to learn more about how Plugspace can help your business, don’t hesitate to get in touch with us.
            </p>
            <ul className="pl-6 mt-4 mb-4 text-gray-300 list-disc">
              <li><strong>Phone:</strong> +1-339-399-3778</li>
              <li><strong>Email:</strong> support@plugspace.io</li>
            </ul>
            <p className="text-gray-300">
              Thank you for choosing Plugspace! We look forward to being part of your e-commerce journey.            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
