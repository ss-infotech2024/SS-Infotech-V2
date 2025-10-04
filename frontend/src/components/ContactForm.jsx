import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faLocationDot, faMessage } from "@fortawesome/free-solid-svg-icons";
import { motion, useAnimation } from "framer-motion";
const ContactForm = () => {
   const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4, // delay between text reveal
      },
    },
  };

  // child animation (blur → clear + fade + slide)
  const item = {
    hidden: { opacity: 0, filter: "blur(8px)", y: 30 },
    show: { 
      opacity: 1, 
      filter: "blur(0px)", 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

    const items = [
    {
      id: 1,
      icon: faPhone,
      title: "01 Call Us",
      details: ["9850942048", "8446691425"],
    },
    {
      id: 2,
      icon: faLocationDot,
      title: "02 Location",
      details: ["Pune", "Nagpur"],
    },
    {
      id: 3,
      icon: faMessage,
      title: "03 Message Us",
      details: ["ssinfotechtnp@gmail.com"],
    },
  ];
  return(
    <>
    <div className="bg-gray-50 min-h-screen px-40">
<h2 className="pt-12 text-3xl font-bold text-center mb-8" style={{ color: "#AB1EA9" }}>
        Our Contact
      </h2>
      <p className="text-center text-gray-600 mb-16">Feel Free To Ask Us Anything</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Card - Contact Form */}
        <div className="bg-white shadow-lg rounded-2xl p-8">
          <form className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Name</label>
              <input
                type="text"
                placeholder="Enter your Name"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
                style={{ borderColor: "#AB1EA9", focus: "#AB1EA9" }}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter a valid email address"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
                style={{ borderColor: "#AB1EA9" }}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Message</label>
              <textarea
                rows="4"
                placeholder="Enter your message"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
                style={{ borderColor: "#AB1EA9" }}
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold text-white"
              style={{ backgroundColor: "#AB1EA9" }}
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Right Card - Info */}
        <div className="bg-white shadow-lg rounded-2xl p-8">
          <motion.div
            className="rounded-2xl p-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            >
            <motion.h3
                className="text-2xl font-bold mb-4"
                style={{ color: "#AB1EA9" }}
                variants={item}
            >
                Join Us
            </motion.h3>

            <motion.p className="text-gray-700 mb-4" variants={item}>
                We share a vision of dedicating our intelligence and expertise to help create a
                world that is strengthened through Information Technology. This means inventing
                new technologies.
            </motion.p>

            <motion.p className="text-gray-700 mb-4" variants={item}>
                It is only skills and not degree that can help you grow. But if you are one of
                those who believe in getting along with skills then we have got you covered.
            </motion.p>

            <motion.p className="text-gray-700 font-medium" variants={item}>
                Start Your Career with{" "}
                <span style={{ color: "#AB1EA9" }}>S.S InfoTech</span> Training Modules to get your Dream Job!
            </motion.p>
            </motion.div>
        </div>
      </div>
      </div>
    </>
  )
}
export default ContactForm;