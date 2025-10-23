"use client";
import { motion } from "framer-motion";
import { CgWebsite } from "react-icons/cg";
import { MdTabletAndroid } from "react-icons/md";
import { RiVideoLine } from "react-icons/ri";
import { FaSearchengin } from "react-icons/fa6";
export default function WhyChooseUs() {
 const features = [
    {
      icon: <CgWebsite className="w-12 h-12 text-indigo-600 group-hover:text-white transition-all duration-500" />,
      title: "Static Website",
      text: "We create robust static websites that are fast, secure, and easy to maintain, perfect for showcasing your business online.",
    },
    {
      icon: <MdTabletAndroid className="w-12 h-12 text-indigo-600 group-hover:text-white transition-all duration-500" />,
      title: "Android Development",
      text: "We develop innovative Android applications tailored to your needs, enhancing user engagement and business growth.",
    },
    {
      icon: <RiVideoLine className="w-12 h-12 text-indigo-600 group-hover:text-white transition-all duration-500" />,
      title: "Digital Marketing",
      text: "Our digital marketing strategies boost your online presence, driving traffic and conversions with targeted campaigns.",
    },
    {
      icon: <FaSearchengin className="w-12 h-12 text-indigo-600 group-hover:text-white transition-all duration-500" />,
      title: "Search Engine Optimization (SEO)",
      text: "We enhance your online visibility with expert SEO strategies, improving search rankings and driving organic traffic to your website.",
    },
  ];
  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: i * 0.2 },
    }),
  };

  return (
    <section className="relative py-20 overflow-hidden ">
      {/* Background Image + Overlay */}
      <div className="absolute inset-0 z-[-1]">
        <img
          src="/service/service/bg.png"
          alt="background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0  from-purple-950 via-purple-950 to-purple-700" />
      </div>

      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center text-white"
        >
          <div className="inline-flex items-center justify-center space-x-2 text-sm tracking-wide uppercase text-indigo-300">
            <span className="w-6 h-[2px] bg-indigo-400" />
            <span>Why Choose Us</span>
            <span className="w-6 h-[2px] bg-indigo-400" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mt-4">
            Why Clients Choose SS Infotech
          </h2>
          <p className="mt-4 text-gray-300 max-w-xl mx-auto">
            We combine expertise, innovation, and dedication to deliver IT solutions that empower businesses to thrive in a digital-first world.
          </p>
        </motion.div>

        {/* Features */}
         <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="bg-white border border-gray-200 rounded-2xl p-8 flex gap-6 items-start hover:shadow-xl transition-all duration-500 group"
            >
              <div className="w-24 h-24 bg-indigo-100 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:bg-indigo-600">
                {feature.icon}
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                  {feature.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}