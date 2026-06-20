'use client';

import { motion } from 'framer-motion';
import { Gavel, Scale, AlertCircle, FileCheck } from 'lucide-react';

export default function TermsOfServicePage() {
  const sections = [
    {
      title: "1. Agreement to Terms",
      content: "By accessing or using our website, you agree to be bound by these Terms of Service and all applicable laws and regulations."
    },
    {
      title: "2. Intellectual Property",
      content: "All content on this website, including text, graphics, logos, and images, is the property of Glamoura Fashion and protected by copyright laws."
    },
    {
      title: "3. User Conduct",
      content: "You agree not to use the website for any unlawful purpose or in any way that could damage or disable the website's functionality."
    },
    {
      title: "4. Limitation of Liability",
      content: "Glamoura Fashion shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of the website."
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-gray-50 py-24 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Scale className="w-12 h-12 mx-auto mb-6 text-blue-600" />
          <h1 className="text-5xl font-serif mb-6">Terms of Service</h1>
          <p className="text-gray-500 text-lg font-light">
            Please read these terms carefully before using our services.
          </p>
        </div>
      </section>

      <section className="py-24 px-4 max-w-4xl mx-auto">
        <div className="prose prose-lg prose-gray max-w-none">
          <div className="space-y-12">
            {sections.map((section, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-10 rounded-[2.5rem]"
              >
                <h2 className="text-2xl font-serif mb-4 flex items-center gap-3">
                  <FileCheck className="w-6 h-6 text-blue-600" />
                  {section.title}
                </h2>
                <p className="text-gray-500 font-light leading-relaxed">
                  {section.content}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 p-10 bg-blue-600 rounded-[3rem] text-white">
            <h3 className="text-2xl font-serif mb-4 flex items-center gap-3">
              <AlertCircle className="w-6 h-6" />
              Governing Law
            </h3>
            <p className="font-light opacity-90 leading-relaxed">
              These terms shall be governed by and construed in accordance with the laws of the State of New York, without regard to its conflict of law provisions. Any dispute arising under these terms shall be subject to the exclusive jurisdiction of the state and federal courts located in New York County.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
