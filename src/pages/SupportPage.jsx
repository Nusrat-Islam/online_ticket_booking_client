import React from "react";
import { motion } from "framer-motion";

const SupportPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 px-6 py-12 flex flex-col justify-center items-center gap-10">

      {/* Page Title */}
      <motion.h1
        className="text-3xl font-bold text-blue-500 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Support
      </motion.h1>

      {/* Intro Paragraph */}
      <motion.p
        className="text-lg md:text-xl max-w-3xl text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        Our support team is always ready to assist you. Whether you have a question, 
        need technical assistance, or want to provide feedback, we strive to respond 
        quickly and efficiently. Your satisfaction is our top priority, and we ensure 
        that every issue is resolved with care.
      </motion.p>

      {/* Support Info Blocks */}
      <motion.div
        className="space-y-6 max-w-3xl text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <p>📧 <strong>Email:</strong> support@example.com – Reach out to us anytime, 
        we reply within 24 hours.</p>

        <p>📞 <strong>Phone:</strong> +880 123 456 789 – Our phone lines are 
        open from 9 AM to 9 PM daily.</p>

        <p>💬 <strong>Live Chat:</strong> Available 24/7 on our platform for instant 
        assistance and guidance.</p>

        <p>🛠️ <strong>Technical Support:</strong> Facing issues with the platform? 
        Our dedicated tech team is ready to solve any problem quickly and efficiently.</p>

        <p>📋 <strong>FAQs:</strong> Check our Frequently Asked Questions section 
        for quick answers to common queries, saving you time and effort.</p>

        <p>💡 <strong>Feedback:</strong> Your suggestions help us grow. Share your 
        ideas and improvements, and we’ll make the platform better for everyone.</p>

        <p>📝 <strong>Guides & Tutorials:</strong> Step-by-step tutorials to help 
        you make the most of our platform and get the answers you need quickly.</p>

        <p>🔒 <strong>Privacy & Security:</strong> We value your privacy and 
        security. Learn how we protect your data and maintain confidentiality.</p>
      </motion.div>
    </div>
  );
};

export default SupportPage;
