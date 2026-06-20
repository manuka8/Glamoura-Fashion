'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Package, MapPin, CheckCircle, Clock } from 'lucide-react';

export default function TrackOrderPage() {
  const [trackingId, setTrackingId] = useState('');
  const [isTracking, setIsTracking] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTracking(true);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-gray-50 py-32 text-center border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <Package className="w-16 h-16 mx-auto mb-8 text-black opacity-20" />
          <h1 className="text-5xl md:text-7xl font-serif mb-6">Track Your Order</h1>
          <p className="text-gray-500 max-w-xl mx-auto text-lg font-light">
            Stay updated on your shipment's journey from our warehouse to your doorstep.
          </p>

          <form onSubmit={handleTrack} className="mt-16 max-w-2xl mx-auto flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="Enter Order Number or Tracking ID"
                className="w-full bg-white border-none rounded-2xl px-16 py-6 shadow-2xl focus:ring-2 focus:ring-black transition-all"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-black text-white px-12 py-6 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-gray-800 transition-all shadow-xl shadow-black/20"
            >
              Track Now
            </button>
          </form>
        </div>
      </section>

      {/* Tracking Results (Mockup) */}
      <section className="py-24 px-4 max-w-4xl mx-auto">
        {!isTracking ? (
          <div className="text-center py-12">
            <div className="inline-block p-10 bg-gray-50 rounded-[3rem]">
              <p className="text-gray-400 font-light">Enter your tracking information above to see live updates.</p>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            {/* Summary Card */}
            <div className="bg-black text-white rounded-[3rem] p-12 shadow-2xl relative overflow-hidden">
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                <div>
                  <span className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] block mb-2">Order ID</span>
                  <p className="text-xl font-mono font-bold">#GLM-99283-X</p>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] block mb-2">Estimated Arrival</span>
                  <p className="text-xl font-serif">October 24, 2024</p>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] block mb-2">Status</span>
                  <p className="text-xl font-serif text-pink-400">In Transit</p>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
            </div>

            {/* Timeline */}
            <div className="relative pl-12 space-y-12 before:absolute before:left-5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
              {[
                { status: "Arrived at Local Facility", location: "New York, NY", date: "Oct 20, 2:45 PM", completed: true, active: true },
                { status: "Departed from Distribution Center", location: "Jersey City, NJ", date: "Oct 19, 10:30 AM", completed: true, active: false },
                { status: "Order Processed", location: "Jersey City, NJ", date: "Oct 18, 4:15 PM", completed: true, active: false },
                { status: "Order Confirmed", location: "System", date: "Oct 18, 9:00 AM", completed: true, active: false }
              ].map((step, i) => (
                <div key={i} className="relative group">
                  <div className={`absolute -left-[35px] top-1 w-6 h-6 rounded-full flex items-center justify-center z-10 border-4 border-white shadow-sm transition-all {
                    step.active ? 'bg-pink-600 scale-125' : step.completed ? 'bg-gray-900' : 'bg-gray-200'
                  }`}>
                    {step.completed && <CheckCircle className="w-3 h-3 text-white" />}
                  </div>
                  <div>
                    <h4 className={`text-lg font-serif mb-1 {step.active ? 'text-pink-600 font-bold' : 'text-gray-900'}`}>
                      {step.status}
                    </h4>
                    <p className="text-sm text-gray-500 font-light flex items-center gap-3">
                      <MapPin className="w-3 h-3" /> {step.location}
                      <span className="w-1 h-1 bg-gray-300 rounded-full" />
                      <Clock className="w-3 h-3" /> {step.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </section>
    </div>
  );
}
