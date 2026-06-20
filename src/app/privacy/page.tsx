'use client';

import { motion } from 'framer-motion';
import { Shield, Eye, Lock, Globe, FileText } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const sections = [
    {
      title: "1. Information We Collect",
      content: "We collect information you provide directly to us when you create an account, make a purchase, or communicate with us. This includes your name, email, shipping address, and payment information."
    },
    {
      title: "2. How We Use Your Information",
      content: "We use the information we collect to process your orders, communicate with you about promotions and products, and improve our services and user experience."
    },
    {
      title: "3. Information Sharing",
      content: "We do not sell your personal information. We may share information with service providers who perform services for us, such as payment processing and shipping."
    },
    {
      title: "4. Your Choices",
      content: "You can access, correct, or delete your personal information through your account settings or by contacting our support team."
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-gray-50 py-24 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Shield className="w-12 h-12 mx-auto mb-6 text-emerald-600" />
          <h1 className="text-5xl font-serif mb-6">Privacy Policy</h1>
          <p className="text-gray-500 text-lg font-light">
            Last Updated: May 2024. Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
        </div>
      </section>

      <section className="py-24 px-4 max-w-4xl mx-auto">
        <div className="prose prose-lg prose-gray max-w-none">
          <p className="text-gray-500 font-light leading-relaxed mb-12">
            Welcome to Glamoura Fashion. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us at privacy@glamoura.com.
          </p>

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
                  <FileText className="w-6 h-6 text-emerald-600" />
                  {section.title}
                </h2>
                <p className="text-gray-500 font-light leading-relaxed">
                  {section.content}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 p-10 bg-emerald-600 rounded-[3rem] text-white">
            <h3 className="text-2xl font-serif mb-4 flex items-center gap-3">
              <Lock className="w-6 h-6" />
              Security Measures
            </h3>
            <p className="font-light opacity-90 leading-relaxed">
              We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information. We use state-of-the-art encryption to ensure your data stays private and secure.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
