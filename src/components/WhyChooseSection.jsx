// components/WhyChooseSection.js
import React from 'react';
import { motion } from 'framer-motion';
import FeatureCard from './FeatureCard';
import { FaChalkboardTeacher, FaCertificate, FaUsers } from 'react-icons/fa';

const WhyChooseSection = ({ setActiveSection }) => {
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection('why-choose');
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(document.querySelector('#why-choose'));
    return () => observer.disconnect();
  }, [setActiveSection]);

  const features = [
    {
      icon: <FaChalkboardTeacher />,
      title: "Expert Instructors",
      description: "Learn from industry experts with years of experience in their fields."
    },
    {
      icon: <FaCertificate />,
      title: "Certified Courses",
      description: "Gain certifications that are recognized by top employers worldwide."
    },
    {
      icon: <FaUsers />,
      title: "Community Support",
      description: "Join a vibrant community of learners to exchange knowledge and grow together."
    }
  ];

  return (
    <section id="why-choose" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Why Choose EduLearn?
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;