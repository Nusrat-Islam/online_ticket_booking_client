import React from "react";
import { motion } from "framer-motion";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-6 py-12 text-gray-800">

      <motion.h1
        className="text-3xl  font-bold text-blue-400 mb-12 mt-5 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        About Us
      </motion.h1>

      <motion.div
        className="max-w-4xl text-center space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <p className="text-lg md:text-xl text-black">
          Welcome to our platform! We started with a simple idea: to provide a seamless, 
          user-friendly experience for everyone. Over the years, our team has grown 
          and evolved, constantly improving our services to meet the needs of our users.
        </p>

        <p className="text-lg md:text-xl text-black">
          <strong>Mission:</strong> Our mission is to deliver a reliable, elegant, and 
          efficient platform that simplifies your daily tasks. We strive to make technology 
          accessible, intuitive, and enjoyable for everyone.
        </p>

        <p className="text-lg md:text-xl text-black">
          <strong>Vision:</strong> We envision a world where our platform becomes the 
          go-to solution for users who value simplicity, speed, and effectiveness. 
          Our goal is to set the standard for quality and user experience in our industry.
        </p>

        <p className="text-lg md:text-xl text-black">
          <strong>Core Values:</strong> Integrity, Innovation, User-Focus, Reliability, 
          Collaboration, and Excellence. These values guide every decision we make 
          and every feature we build.
        </p>

        <p className="text-lg md:text-xl text-black">
          <strong>Our Story:</strong> What began as a small project among friends has 
          grown into a thriving platform serving thousands of users. Through dedication, 
          creativity, and a focus on quality, we have created a product that adapts to 
          the modern user's needs while remaining simple and elegant.
        </p>

        <p className="text-lg md:text-xl text-black">
          <strong>Why Choose Us:</strong> We prioritize our users above all. Every feature, 
          every update, and every decision is made with your experience in mind. 
          Our platform is designed to be intuitive, responsive, and visually appealing, 
          giving you a tool that’s not just useful, but enjoyable to use.
        </p>

        <p className="text-lg md:text-xl text-black">
          Thank you for being a part of our journey. We are committed to continuous 
          improvement and innovation, always keeping your needs and satisfaction at the core.
        </p>
      </motion.div>
    </div>
  );
};

export default AboutPage;
