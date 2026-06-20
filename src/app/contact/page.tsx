'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, Globe } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gray-900 py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1534536281715-e28d76689b4d?q=80&w=2000')] bg-cover bg-center" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif mb-6"
          >
            Get in Touch
          </motion.h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">
            Whether you have a question about our collections, shipping, or anything else, our team is ready to help you.
          </p>
        </div>
      </section>

      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-serif mb-8">Send us a Message</h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">First Name</label>
                  <input type="text" className="w-full bg-gray-50 border-none rounded-xl px-6 py-4 focus:ring-2 focus:ring-black transition-all" placeholder="John" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Last Name</label>
                  <input type="text" className="w-full bg-gray-50 border-none rounded-xl px-6 py-4 focus:ring-2 focus:ring-black transition-all" placeholder="Doe" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
                <input type="email" className="w-full bg-gray-50 border-none rounded-xl px-6 py-4 focus:ring-2 focus:ring-black transition-all" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Subject</label>
                <select className="w-full bg-gray-50 border-none rounded-xl px-6 py-4 focus:ring-2 focus:ring-black transition-all appearance-none">
                  <option>General Inquiry</option>
                  <option>Order Status</option>
                  <option>Returns & Exchanges</option>
                  <option>Partnership</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Message</label>
                <textarea rows={6} className="w-full bg-gray-50 border-none rounded-xl px-6 py-4 focus:ring-2 focus:ring-black transition-all resize-none" placeholder="How can we help you?"></textarea>
              </div>
              <button className="bg-black text-white px-12 py-5 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-gray-800 transition-all flex items-center gap-3 shadow-xl">
                Send Message <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:pl-10"
          >
            <h2 className="text-3xl font-serif mb-12">Contact Information</h2>
            
            <div className="space-y-10">
              <div className="flex gap-6">
                <div className="bg-pink-50 p-4 rounded-2xl h-fit">
                  <MapPin className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest mb-2">Our Flagship Store</h4>
                  <p className="text-gray-500 font-light leading-relaxed">
                    123 Fashion Avenue, Suite 500<br />
                    New York, NY 10001<br />
                    United States
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="bg-blue-50 p-4 rounded-2xl h-fit">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest mb-2">Phone Support</h4>
                  <p className="text-gray-500 font-light leading-relaxed">
                    Main Line: +1 (555) 000-1111<br />
                    Toll Free: 1-800-GLAMOUR
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="bg-purple-50 p-4 rounded-2xl h-fit">
                  <Mail className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest mb-2">Email Support</h4>
                  <p className="text-gray-500 font-light leading-relaxed">
                    support@glamoura.com<br />
                    concierge@glamoura.com
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="bg-emerald-50 p-4 rounded-2xl h-fit">
                  <Clock className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest mb-2">Business Hours</h4>
                  <p className="text-gray-500 font-light leading-relaxed">
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 10:00 AM - 4:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            {/* Live Chat CTA */}
            <div className="mt-16 bg-gray-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
              <div className="relative z-10">
                <MessageCircle className="w-10 h-10 mb-6 text-pink-400" />
                <h3 className="text-2xl font-serif mb-4">Live Chat</h3>
                <p className="text-gray-400 mb-8 font-light">
                  Need an immediate answer? Our stylists are available for live chat during business hours.
                </p>
                <button className="bg-white text-black px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-gray-100 transition-all">
                  Start Chatting
                </button>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
