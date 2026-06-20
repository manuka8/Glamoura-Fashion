'use client';

import { motion } from 'framer-motion';
import { Truck, RotateCcw, ShieldCheck, Globe, Package, CreditCard } from 'lucide-react';

export default function ShippingReturnsPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-gray-900 to-black py-32 text-white relative overflow-hidden text-center">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-7xl font-serif mb-6"
          >
            Shipping & Returns
          </motion.h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            We strive to provide a seamless delivery experience and a flexible returns policy to ensure your complete satisfaction.
          </p>
        </div>
      </section>

      {/* Shipping Section */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <div className="bg-blue-600 p-3 rounded-2xl text-white">
            <Truck className="w-6 h-6" />
          </div>
          <h2 className="text-4xl font-serif">Shipping Policy</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Globe, title: "Worldwide Shipping", desc: "We deliver to over 50 countries globally. International orders are handled with care to ensure safe arrival." },
            { icon: Package, title: "Standard Delivery", desc: "3-5 business days for domestic orders. Always tracked and insured for your peace of mind." },
            { icon: ShieldCheck, title: "Secure Packaging", desc: "Our luxury packaging ensures your items arrive in pristine condition, ready to be enjoyed." }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-50 p-10 rounded-[3rem] hover:bg-blue-50 transition-colors group"
            >
              <item.icon className="w-10 h-10 mb-6 text-gray-400 group-hover:text-blue-600 transition-colors" />
              <h3 className="text-xl font-serif mb-4">{item.title}</h3>
              <p className="text-gray-500 font-light leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 bg-gray-50 rounded-[3rem] p-12 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="pb-6 font-bold uppercase tracking-widest text-xs">Shipping Method</th>
                <th className="pb-6 font-bold uppercase tracking-widest text-xs">Estimated Time</th>
                <th className="pb-6 font-bold uppercase tracking-widest text-xs">Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="py-6 font-medium">Standard Ground</td>
                <td className="py-6 text-gray-500">3-5 Business Days</td>
                <td className="py-6 font-bold">10.00 (Free over 150)</td>
              </tr>
              <tr>
                <td className="py-6 font-medium">Expedited Shipping</td>
                <td className="py-6 text-gray-500">2 Business Days</td>
                <td className="py-6 font-bold">25.00</td>
              </tr>
              <tr>
                <td className="py-6 font-medium">International Economy</td>
                <td className="py-6 text-gray-500">7-14 Business Days</td>
                <td className="py-6 font-bold">45.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Returns Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-12">
            <div className="bg-pink-600 p-3 rounded-2xl text-white">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h2 className="text-4xl font-serif">Easy Returns</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="bg-white p-10 rounded-[3rem] shadow-sm">
                <h3 className="text-2xl font-serif mb-4">30-Day Policy</h3>
                <p className="text-gray-500 font-light leading-relaxed">
                  We want you to love your purchase. If you're not completely satisfied, you can return your items within 30 days of delivery for a full refund or exchange.
                </p>
              </div>
              <div className="bg-white p-10 rounded-[3rem] shadow-sm">
                <h3 className="text-2xl font-serif mb-4">Free Exchanges</h3>
                <p className="text-gray-500 font-light leading-relaxed">
                  Need a different size or color? We offer free exchanges on all domestic orders. We'll even cover the return shipping for your exchange.
                </p>
              </div>
            </div>

            <div className="bg-pink-600 rounded-[4rem] p-16 text-white">
              <h3 className="text-3xl font-serif mb-8">How to Return</h3>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <span className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold">1</span>
                  <p className="font-light">Visit our Online Returns Portal and enter your order details.</p>
                </div>
                <div className="flex gap-6">
                  <span className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold">2</span>
                  <p className="font-light">Print your pre-paid shipping label provided by our system.</p>
                </div>
                <div className="flex gap-6">
                  <span className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold">3</span>
                  <p className="font-light">Package your items carefully and drop them off at any authorized courier location.</p>
                </div>
              </div>
              <button className="mt-12 bg-white text-pink-600 px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-gray-100 transition-all shadow-xl">
                Start a Return
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
