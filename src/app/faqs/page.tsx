'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Search, HelpCircle } from 'lucide-react';

const faqs = [
  {
    category: "Orders",
    questions: [
      { q: "How can I track my order?", a: "Once your order has been shipped, you will receive an email with a tracking number and a link to the courier's website. You can also track your order directly on our 'Track Order' page." },
      { q: "Can I cancel or change my order?", a: "We process orders quickly to ensure fast delivery. You can cancel or modify your order within 1 hour of placing it by contacting our support team." },
      { q: "What payment methods do you accept?", a: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, and Google Pay." }
    ]
  },
  {
    category: "Shipping",
    questions: [
      { q: "How much does shipping cost?", a: "We offer free standard shipping on all orders over 150. For orders under 150, shipping rates vary by location and will be calculated at checkout." },
      { q: "Do you ship internationally?", a: "Yes, we ship to over 50 countries worldwide. International shipping times and costs vary depending on the destination." },
      { q: "How long will it take to receive my order?", a: "Standard shipping typically takes 3-5 business days within the US. International shipping can take 7-14 business days." }
    ]
  },
  {
    category: "Returns",
    questions: [
      { q: "What is your return policy?", a: "We offer a 30-day return policy for most items. Products must be in original condition with tags attached. Some exclusions apply to intimate apparel and custom pieces." },
      { q: "How do I initiate a return?", a: "Visit our 'Returns' portal, enter your order number and email, and follow the instructions to generate a prepaid shipping label." },
      { q: "When will I receive my refund?", a: "Refunds are processed within 5-7 business days after we receive and inspect your return. The funds will be credited back to your original payment method." }
    ]
  }
];

export default function FAQsPage() {
  const [activeCategory, setActiveCategory] = useState("Orders");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="bg-white min-h-screen pt-20">
      {/* Header */}
      <section className="bg-gray-50 py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <HelpCircle className="w-12 h-12 mx-auto mb-6 text-pink-600" />
          <h1 className="text-5xl font-serif mb-6">Frequently Asked Questions</h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg font-light">
            Everything you need to know about our products, shipping, and services.
          </p>

          <div className="mt-12 max-w-xl mx-auto relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for a question..."
              className="w-full bg-white border-none rounded-2xl px-16 py-5 shadow-xl focus:ring-2 focus:ring-pink-500 transition-all"
            />
          </div>
        </div>
      </section>

      <section className="py-24 px-4 max-w-4xl mx-auto">
        {/* Category Tabs */}
        <div className="flex justify-center gap-4 mb-16 overflow-x-auto pb-4">
          {faqs.map((cat) => (
            <button
              key={cat.category}
              onClick={() => {
                setActiveCategory(cat.category);
                setOpenIndex(0);
              }}
              className={`px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs transition-all whitespace-nowrap {
                activeCategory === cat.category ? 'bg-black text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.find(c => c.category === activeCategory)?.questions.map((faq, idx) => (
            <div
              key={idx}
              className={`border rounded-[2rem] transition-all overflow-hidden {
                openIndex === idx ? 'border-pink-500 bg-pink-50/30' : 'border-gray-100'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-8 text-left"
              >
                <span className="text-lg font-serif font-medium">{faq.q}</span>
                {openIndex === idx ? <Minus className="w-5 h-5 text-pink-600" /> : <Plus className="w-5 h-5 text-gray-400" />}
              </button>

              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-8 pb-8 text-gray-500 font-light leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-24 bg-black rounded-[3rem] p-12 text-center text-white">
          <h2 className="text-3xl font-serif mb-4">Still have questions?</h2>
          <p className="text-gray-400 mb-8 font-light">Can't find the answer you're looking for? Please chat with our friendly team.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-black px-10 py-4 rounded-xl font-bold uppercase tracking-widest text-xs">
              Contact Support
            </button>
            <button className="border border-white/30 px-10 py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-all">
              Live Chat
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
