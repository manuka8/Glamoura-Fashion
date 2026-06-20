'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  ShoppingBag,
  Truck,
  MessageSquare,
  Gift,
  MapPin,
  CreditCard,
  ArrowRight,
  Clock,
  ChevronDown,
  ChevronUp,
  Check,
  Send,
  Sparkles,
  ShieldCheck,
  Package,
  Calendar,
  Phone,
  Bookmark,
  Heart,
  Star,
  Award
} from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';
import Image from 'next/image';

// Mock Customer Profile
const CUSTOMER_PROFILE = {
  name: 'Sadun Gunathilaka',
  email: 'sadung@gmail.com',
  memberSince: 'Oct 2025',
  tier: 'Platinum Elite Member',
  points: 1250,
  phone: '+94 77 345 1720',
  shippingAddress: '12 Royal Garden, Colombo 07, Sri Lanka'
};

// Mock Orders
const MOCK_ORDERS = [
  {
    id: 'ORD-9842',
    date: 'May 15, 2026',
    total: 185000,
    status: 'Shipped',
    items: [
      {
        name: 'Cashmere Trench Coat',
        price: 185000,
        color: 'Camel',
        size: 'M',
        qty: 1,
        image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200&q=80'
      }
    ],
    address: '12 Royal Garden, Colombo 07, Sri Lanka',
    paymentMethod: 'Stripe Credit Card ending in 4242',
    trackingNumber: 'GSE-849182390-LK',
    carrier: 'Glamoura Express'
  },
  {
    id: 'ORD-8715',
    date: 'April 20, 2026',
    total: 163000,
    status: 'Delivered',
    items: [
      {
        name: 'Silk Slip Dress',
        price: 95000,
        color: 'Emerald Green',
        size: 'S',
        qty: 1,
        image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=200&q=80'
      },
      {
        name: 'Gold Plated Wave Cuff',
        price: 68000,
        color: 'Gold',
        size: 'OS',
        qty: 1,
        image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=200&q=80'
      }
    ],
    address: '12 Royal Garden, Colombo 07, Sri Lanka',
    paymentMethod: 'Stripe Credit Card ending in 4242',
    trackingNumber: 'GSE-849180124-LK',
    carrier: 'Glamoura Express'
  }
];

// Pre-populated Concierge Chat History
const INITIAL_CHAT = [
  { id: 1, sender: 'concierge', text: 'Good morning Sadun. Welcome to the Glamoura Concierge. My name is Anil, your dedicated personal stylist.', time: '10:00 AM' },
  { id: 2, sender: 'concierge', text: 'I am delighted to report that your tailored Cashmere Trench Coat has passed our final signature inspection and is being wrapped in linen-lined packaging.', time: '10:02 AM' },
  { id: 3, sender: 'user', text: 'Thank you Anil! That sounds wonderful. Is there any way to expedite the delivery? I have an evening gala on Wednesday.', time: '10:15 AM' },
  { id: 4, sender: 'concierge', text: 'Certainly, Sadun. I have adjusted your shipping status to GSE Priority Express. Our courier will contact you on Wednesday morning to arrange a secure hand-delivered drop-off at your Colombo 07 address.', time: '10:18 AM' }
];

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'track' | 'messages'>('overview');
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  
  // Tracking State
  const [trackSearchId, setTrackSearchId] = useState('ORD-9842');
  const [activeTrackOrder, setActiveTrackOrder] = useState<typeof MOCK_ORDERS[0] | null>(MOCK_ORDERS[0]);
  const [trackError, setTrackError] = useState('');

  // Messages State
  const [chatMessages, setChatMessages] = useState(INITIAL_CHAT);
  const [newMessage, setNewMessage] = useState('');
  const [isConciergeTyping, setIsConciergeTyping] = useState(false);

  // Theme colors
  const theme = {
    black: '#000000',
    rose: '#FFB7C5',
    lightRose: '#FFF0F3',
    blue: '#87CEEB',
    lightBlue: '#F0F8FF',
    green: '#98FB98',
    lightGreen: '#F0FFF0',
    darkGray: '#1A1A1A',
    mediumGray: '#666666',
    lightGray: '#F5F5F5'
  };

  // Synchronize dynamic tracking selection
  const handleTrackSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const searchId = trackSearchId.trim().toUpperCase();
    const found = orders.find(o => o.id === searchId);

    if (found) {
      setActiveTrackOrder(found);
      setTrackError('');
    } else {
      setActiveTrackOrder(null);
      setTrackError('We were unable to locate an order matching that ID.');
    }
  };

  const selectOrderToTrack = (orderId: string) => {
    setTrackSearchId(orderId);
    const found = orders.find(o => o.id === orderId);
    if (found) {
      setActiveTrackOrder(found);
      setTrackError('');
      setActiveTab('track');
    }
  };

  // Handles Simulated Concierge Chat Answers
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMsg = {
      id: chatMessages.length + 1,
      sender: 'user',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    const inputMsg = newMessage;
    setNewMessage('');
    setIsConciergeTyping(true);

    // Concierge answers after short delay
    setTimeout(() => {
      setIsConciergeTyping(false);
      
      let replyText = "Thank you for contacting the Glamoura Styling Vault. A dedicated personal shopper has logged your inquiry and will call you on your verified phone shortly.";
      
      const lower = inputMsg.toLowerCase();
      if (lower.includes('order') || lower.includes('ship') || lower.includes('track')) {
        replyText = `Absolutely, Isabella. I have reviewed order ORD-9842. The courier has left our Colombo sorting depot and is scheduled to reach your location on Wednesday morning. You will receive an SMS containing the private delivery code.`;
      } else if (lower.includes('sizing') || lower.includes('size') || lower.includes('tailor')) {
        replyText = `Certainly! I will coordinate directly with our master tailor. We can schedule a bespoke fitting at our flagship boutique or arrange for a specialist to visit your home. Please let us know which day suits you best.`;
      } else if (lower.includes('dress') || lower.includes('slip') || lower.includes('emerald')) {
        replyText = `The Emerald Silk Slip Dress is cut from fluid 22-momme Mulberry silk satin. It drapes beautifully. If you require any matching accessories, I would be delighted to put together a private catalog for you.`;
      }

      const conciergeMsg = {
        id: chatMessages.length + 2,
        sender: 'concierge',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatMessages(prev => [...prev, conciergeMsg]);
    }, 1500);
  };

  const getTabColors = (tabId: string) => {
    switch(tabId) {
      case 'overview':
        return { bg: theme.rose, text: theme.black, light: theme.lightRose };
      case 'orders':
        return { bg: theme.blue, text: theme.black, light: theme.lightBlue };
      case 'track':
        return { bg: theme.green, text: theme.black, light: theme.lightGreen };
      case 'messages':
        return { bg: theme.rose, text: theme.black, light: theme.lightRose };
      default:
        return { bg: theme.black, text: 'white', light: theme.lightGray };
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans" style={{ backgroundColor: theme.lightGray }}>
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Welcome VIP Card Banner with Gradient Background */}
        <div 
          className="relative rounded-3xl p-8 sm:p-10 overflow-hidden shadow-2xl border"
          style={{
            background: `linear-gradient(135deg, ${theme.black} 0%, #1a1a1a 50%, ${theme.black} 100%)`,
            borderColor: theme.rose
          }}
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200')] bg-cover bg-center opacity-5" />
          
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ backgroundColor: theme.rose }} />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl opacity-20" style={{ backgroundColor: theme.blue }} />
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <span 
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border mb-3"
                style={{ 
                  backgroundColor: `${theme.rose}20`,
                  color: theme.rose,
                  borderColor: `${theme.rose}30`
                }}
              >
                <Sparkles className="w-3.5 h-3.5" /> {CUSTOMER_PROFILE.tier}
              </span>
              <h1 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-white">
                Welcome back, {CUSTOMER_PROFILE.name}
              </h1>
              <p className="text-sm text-gray-400 mt-1">Exclusive client access since {CUSTOMER_PROFILE.memberSince}. Enjoy priority shipping and boutique assistance.</p>
            </div>

            {/* Premium quick stats meters */}
            <div className="flex gap-6 sm:gap-10 border-t md:border-t-0 pt-6 md:pt-0 w-full md:w-auto text-xs" style={{ borderColor: `${theme.rose}30` }}>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest block" style={{ color: theme.rose }}>Available Points</span>
                <span className="text-2xl font-serif font-bold text-white mt-1 block">{CUSTOMER_PROFILE.points} pts</span>
              </div>
              <div className="w-px hidden sm:block" style={{ backgroundColor: `${theme.rose}30` }} />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest block" style={{ color: theme.blue }}>Active Shipments</span>
                <span className="text-2xl font-serif font-bold text-white mt-1 block">1 Order</span>
              </div>
            </div>
          </div>
        </div>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Dashboard Left Sidebar Tabs */}
          <div className="lg:col-span-1 space-y-3">
            {[
              { id: 'overview', name: 'Profile Overview', icon: User, desc: 'VIP Status & Account', color: theme.rose },
              { id: 'orders', name: 'My Orders', icon: ShoppingBag, desc: 'Transaction history', color: theme.blue },
              { id: 'track', name: 'Track Order', icon: Truck, desc: 'Dispatched shipments', color: theme.green },
              { id: 'messages', name: 'Chat with seller', icon: MessageSquare, desc: 'Private stylist chat', color: theme.rose }
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    "w-full flex items-center gap-4 px-5 py-4 rounded-2xl border text-left transition-all duration-300 relative group",
                    isActive
                      ? "shadow-lg"
                      : "hover:shadow-md"
                  )}
                  style={{
                    backgroundColor: isActive ? theme.black : 'white',
                    borderColor: isActive ? tab.color : '#e5e5e5',
                  }}
                >
                  <tab.icon 
                    className="w-5 h-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
                    style={{ 
                      color: isActive ? tab.color : theme.mediumGray,
                    }} 
                  />
                  <div className="flex flex-col flex-1">
                    <span 
                      className="text-sm font-semibold tracking-wide"
                      style={{ color: isActive ? 'white' : theme.black }}
                    >
                      {tab.name}
                    </span>
                    <span 
                      className="text-[10px] font-normal transition-colors"
                      style={{ color: isActive ? tab.color : '#999' }}
                    >
                      {tab.desc}
                    </span>
                  </div>
                  <ArrowRight 
                    className="w-3.5 h-3.5 transition-all duration-300"
                    style={{ 
                      color: isActive ? tab.color : 'transparent',
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'translateX(0)' : 'translateX(-8px)'
                    }} 
                  />
                </button>
              );
            })}
          </div>

          {/* Dashboard Right Main Panels */}
          <div className="lg:col-span-3 min-h-[480px]">
            <AnimatePresence mode="wait">
              
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="bg-white rounded-3xl p-6 sm:p-8 border shadow-sm space-y-8"
                  style={{ borderColor: theme.lightRose }}
                >
                  <div>
                    <h2 className="text-2xl font-serif font-bold" style={{ color: theme.black }}>Profile Details</h2>
                    <p className="text-xs mt-1" style={{ color: theme.mediumGray }}>Manage private accounts, delivery preferences, and vip privilege logs.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t" style={{ borderColor: theme.lightRose }}>
                    <div 
                      className="p-5 rounded-2xl border transition-all hover:shadow-md"
                      style={{ 
                        backgroundColor: theme.lightRose,
                        borderColor: theme.rose
                      }}
                    >
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5" style={{ color: theme.black }}>
                          <MapPin className="w-4 h-4" style={{ color: theme.rose }} /> Primary Shipping Destination
                        </span>
                        <p className="text-xs font-semibold leading-relaxed mt-3" style={{ color: theme.black }}>
                          {CUSTOMER_PROFILE.shippingAddress}
                        </p>
                      </div>
                      <button 
                        className="text-[10px] uppercase tracking-wider font-bold text-left mt-6 transition-colors hover:underline"
                        style={{ color: theme.black }}
                      >
                        Edit Address
                      </button>
                    </div>

                    <div 
                      className="p-5 rounded-2xl border transition-all hover:shadow-md"
                      style={{ 
                        backgroundColor: theme.lightRose,
                        borderColor: theme.rose
                      }}
                    >
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5" style={{ color: theme.black }}>
                          <Phone className="w-4 h-4" style={{ color: theme.rose }} /> Verified Contact Node
                        </span>
                        <p className="text-xs font-semibold leading-relaxed mt-3" style={{ color: theme.black }}>
                          Phone: {CUSTOMER_PROFILE.phone}
                          <br />
                          Email: {CUSTOMER_PROFILE.email}
                        </p>
                      </div>
                      <button 
                        className="text-[10px] uppercase tracking-wider font-bold text-left mt-6 transition-colors hover:underline"
                        style={{ color: theme.black }}
                      >
                        Update Contact Details
                      </button>
                    </div>
                  </div>

                  {/* Active order quick recap banner */}
                  <div 
                    className="rounded-2xl p-5 border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all hover:shadow-md"
                    style={{ 
                      backgroundColor: theme.lightBlue,
                      borderColor: theme.blue
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div 
                        className="p-3 rounded-xl border"
                        style={{ 
                          backgroundColor: `${theme.blue}20`,
                          borderColor: theme.blue
                        }}
                      >
                        <Package className="w-6 h-6" style={{ color: theme.blue }} />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold" style={{ color: theme.black }}>Current active order: ORD-9842</h4>
                        <p className="text-xs mt-0.5" style={{ color: theme.mediumGray }}>Status: Shipped via GSE Priority Express. Estimated arrival: Wednesday.</p>
                      </div>
                    </div>
                    <button
                      onClick={() => selectOrderToTrack('ORD-9842')}
                      className="px-4.5 py-2.5 text-white font-bold rounded-xl text-xs uppercase tracking-widest shadow-sm transition-all hover:shadow-md"
                      style={{ backgroundColor: theme.blue }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.black}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = theme.blue}
                    >
                      Track Package
                    </button>
                  </div>
                </motion.div>
              )}

              {/* TAB 2: MY ORDERS */}
              {activeTab === 'orders' && (
                <motion.div
                  key="orders"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-6"
                >
                  <div 
                    className="bg-white rounded-3xl p-6 sm:p-8 border shadow-sm"
                    style={{ borderColor: theme.lightBlue }}
                  >
                    <h2 className="text-2xl font-serif font-bold" style={{ color: theme.black }}>My Orders History</h2>
                    <p className="text-xs mt-1" style={{ color: theme.mediumGray }}>Review active transactions, return options, and obtain signature receipts.</p>
                  </div>

                  <div className="space-y-4">
                    {orders.map((order) => {
                      const isExpanded = expandedOrderId === order.id;
                      const isShipped = order.status === 'Shipped';

                      return (
                        <div
                          key={order.id}
                          className="bg-white rounded-2xl border shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
                          style={{ borderColor: theme.lightBlue }}
                        >
                          {/* Order Brief Summary Header */}
                          <div
                            onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                            className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 cursor-pointer transition-colors hover:bg-gray-50"
                          >
                            <div className="flex flex-wrap gap-x-6 gap-y-2 items-center">
                              <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider block" style={{ color: theme.mediumGray }}>Order ID</span>
                                <span className="text-sm font-semibold mt-0.5 block" style={{ color: theme.black }}>{order.id}</span>
                              </div>
                              <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider block" style={{ color: theme.mediumGray }}>Checkout Date</span>
                                <span className="text-sm mt-0.5 block" style={{ color: theme.mediumGray }}>{order.date}</span>
                              </div>
                              <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider block" style={{ color: theme.mediumGray }}>Total Spent</span>
                                <span className="text-sm font-bold mt-0.5 block" style={{ color: theme.black }}>{formatCurrency(order.total)}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-4 self-stretch sm:self-auto justify-between sm:justify-end border-t sm:border-t-0 pt-4 sm:pt-0" style={{ borderColor: theme.lightBlue }}>
                              <span 
                                className="px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest border"
                                style={{
                                  backgroundColor: isShipped ? `${theme.blue}20` : `${theme.green}20`,
                                  color: isShipped ? theme.blue : theme.green,
                                  borderColor: isShipped ? `${theme.blue}30` : `${theme.green}30`
                                }}
                              >
                                {order.status}
                              </span>
                              
                              {isExpanded ? 
                                <ChevronUp className="w-5 h-5" style={{ color: theme.mediumGray }} /> : 
                                <ChevronDown className="w-5 h-5" style={{ color: theme.mediumGray }} />
                              }
                            </div>
                          </div>

                          {/* Expanded Order Items breakdown */}
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="border-t p-6 space-y-6"
                                style={{ 
                                  borderColor: theme.lightBlue,
                                  backgroundColor: `${theme.lightBlue}10`
                                }}
                              >
                                <div className="space-y-4">
                                  <span className="text-[10px] font-bold uppercase tracking-widest block" style={{ color: theme.mediumGray }}>Purchased Articles</span>
                                  {order.items.map((item, idx) => (
                                    <div 
                                      key={idx} 
                                      className="flex justify-between items-center bg-white p-4 rounded-xl border shadow-sm"
                                      style={{ borderColor: theme.lightBlue }}
                                    >
                                      <div className="flex items-center gap-4">
                                        <div className="w-12 h-16 relative rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border" style={{ borderColor: theme.lightBlue }}>
                                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                                        </div>
                                        <div className="text-xs">
                                          <h4 className="font-semibold" style={{ color: theme.black }}>{item.name}</h4>
                                          <p className="mt-1" style={{ color: theme.mediumGray }}>Color: {item.color} • Size: {item.size} • Qty: {item.qty}</p>
                                        </div>
                                      </div>
                                      <span className="text-xs font-bold" style={{ color: theme.black }}>{formatCurrency(item.price)}</span>
                                    </div>
                                  ))}
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t text-xs" style={{ borderColor: theme.lightBlue }}>
                                  <div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider block mb-1.5" style={{ color: theme.mediumGray }}>Delivery Address</span>
                                    <p className="leading-relaxed font-medium" style={{ color: theme.black }}>{order.address}</p>
                                  </div>
                                  <div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider block mb-1.5" style={{ color: theme.mediumGray }}>Payment details</span>
                                    <p className="leading-relaxed font-medium" style={{ color: theme.black }}>{order.paymentMethod}</p>
                                  </div>
                                </div>

                                {/* Actions bottom strip */}
                                <div className="flex flex-wrap justify-between items-center gap-3 pt-6 border-t" style={{ borderColor: theme.lightBlue }}>
                                  <button
                                    onClick={() => selectOrderToTrack(order.id)}
                                    className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-colors hover:gap-2"
                                    style={{ color: theme.blue }}
                                  >
                                    Track Courier Dispatch <ArrowRight className="w-3.5 h-3.5" />
                                  </button>
                                  
                                  <div className="flex gap-2">
                                    <button 
                                      className="px-4 py-2 text-[10px] uppercase font-bold tracking-wider rounded-xl transition-all hover:shadow-md"
                                      style={{ 
                                        backgroundColor: 'white',
                                        color: theme.mediumGray,
                                        border: `1px solid ${theme.lightBlue}`
                                      }}
                                    >
                                      Receipt Invoice
                                    </button>
                                    <button 
                                      className="px-4 py-2 text-[10px] uppercase font-bold tracking-wider rounded-xl transition-all hover:shadow-md"
                                      style={{ 
                                        backgroundColor: 'white',
                                        color: theme.rose,
                                        border: `1px solid ${theme.lightRose}`
                                      }}
                                    >
                                      Return Item
                                    </button>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* TAB 3: TRACK ORDER */}
              {activeTab === 'track' && (
                <motion.div
                  key="track"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="bg-white rounded-3xl p-6 sm:p-8 border shadow-sm space-y-8"
                  style={{ borderColor: theme.lightGreen }}
                >
                  <div>
                    <h2 className="text-2xl font-serif font-bold" style={{ color: theme.black }}>Track Package Shipment</h2>
                    <p className="text-xs mt-1" style={{ color: theme.mediumGray }}>Audit active courier routes and estimated delivery timelines.</p>
                  </div>

                  {/* Tracking ID Search form */}
                  <form onSubmit={handleTrackSearch} className="flex gap-3 p-4 rounded-2xl border max-w-xl" style={{ backgroundColor: theme.lightGreen, borderColor: theme.green }}>
                    <input
                      type="text"
                      placeholder="e.g. ORD-9842"
                      value={trackSearchId}
                      onChange={(e) => setTrackSearchId(e.target.value)}
                      className="flex-1 bg-white border rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2"
                      style={{ borderColor: theme.lightGreen }}
                      required
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 text-white font-bold rounded-xl text-xs uppercase tracking-widest transition-all hover:shadow-md"
                      style={{ backgroundColor: theme.green }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.black}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = theme.green}
                    >
                      Track Order
                    </button>
                  </form>

                  {/* Feedback messaging */}
                  {trackError && <div className="text-xs font-bold" style={{ color: theme.rose }}>{trackError}</div>}

                  {activeTrackOrder && (
                    <div className="space-y-8 pt-4 border-t" style={{ borderColor: theme.lightGreen }}>
                      
                      {/* Shipment Brief Card */}
                      <div 
                        className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-5 rounded-2xl border text-xs"
                        style={{ 
                          backgroundColor: theme.lightGreen,
                          borderColor: theme.green
                        }}
                      >
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider block" style={{ color: theme.mediumGray }}>Courier / Carrier</span>
                          <span className="font-bold mt-1 block" style={{ color: theme.black }}>{activeTrackOrder.carrier}</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider block" style={{ color: theme.mediumGray }}>Tracking Ref</span>
                          <span className="font-mono font-bold mt-1 block select-all" style={{ color: theme.green }}>{activeTrackOrder.trackingNumber}</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider block" style={{ color: theme.mediumGray }}>Estimated delivery</span>
                          <span className="font-bold mt-1 block" style={{ color: theme.black }}>Wednesday, May 20</span>
                        </div>
                      </div>

                      {/* Interactive Visual Shipping Progress Timeline */}
                      <div className="relative py-4 pr-4">
                        <div className="absolute left-[15px] top-6 bottom-6 w-0.5" style={{ backgroundColor: theme.lightGreen }} />
                        
                        <div className="space-y-8 relative">
                          {[
                            { step: 'Order registered', desc: 'Secure purchase receipt cleared from digital registers.', date: activeTrackOrder.date, done: true },
                            { step: 'Boutique Tailoring Audit', desc: 'Custom structural lining adjustments & quality assurance completed.', date: 'May 16, 2026', done: true },
                            { step: 'Handed to Courier (Dispatched)', desc: 'Consigned to Glamoura Priority Logistics sorting units.', date: 'May 17, 2026', done: activeTrackOrder.status === 'Shipped' || activeTrackOrder.status === 'Delivered', active: activeTrackOrder.status === 'Shipped' },
                            { step: 'Out for Private Delivery', desc: 'Personal hand-delivery stylist assigned for drop-off.', date: 'May 18, 2026', done: activeTrackOrder.status === 'Delivered', active: false },
                            { step: 'Hand-Delivered Signature verified', desc: 'Secure verification cleared at primary address.', date: 'May 19, 2026', done: activeTrackOrder.status === 'Delivered', active: false }
                          ].map((node, index) => (
                            <div key={index} className="flex gap-6 items-start">
                              {/* Node Bulbs */}
                              <div 
                                className="w-8.5 h-8.5 rounded-full flex items-center justify-center border-2 z-10 bg-white transition-all"
                                style={{
                                  backgroundColor: node.done ? theme.green : 'white',
                                  borderColor: node.done ? theme.green : (node.active ? theme.green : theme.lightGreen),
                                  color: node.done ? 'white' : (node.active ? theme.green : theme.mediumGray)
                                }}
                              >
                                {node.done ? <Check className="w-4 h-4 stroke-[3]" /> : <Clock className="w-4 h-4" />}
                              </div>

                              {/* Node Texts */}
                              <div className="text-xs">
                                <h4 className="font-bold" style={{ color: (node.done || node.active) ? theme.black : theme.mediumGray }}>
                                  {node.step}
                                </h4>
                                <p className="mt-1 max-w-md" style={{ color: theme.mediumGray }}>{node.desc}</p>
                                <span className="text-[10px] font-bold block mt-1.5" style={{ color: theme.green }}>{node.date}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  )}
                </motion.div>
              )}

              {/* TAB 4: BOUTIQUE CONCIERGE CHAT */}
              {activeTab === 'messages' && (
                <motion.div
                  key="messages"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="bg-white rounded-3xl border shadow-sm h-[580px] flex flex-col overflow-hidden"
                  style={{ borderColor: theme.lightRose }}
                >
                  {/* Chat header */}
                  <div className="p-6 border-b flex items-center gap-4" style={{ backgroundColor: theme.lightRose, borderColor: theme.rose }}>
                    <div className="relative">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm"
                        style={{ 
                          background: `linear-gradient(135deg, ${theme.rose}, ${theme.black})`,
                          color: 'white'
                        }}
                      >
                        J
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 border-2 border-white rounded-full animate-pulse" style={{ backgroundColor: theme.green }} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold" style={{ color: theme.black }}>Anil</h3>
                      <p className="text-[10px] font-bold tracking-wider uppercase" style={{ color: theme.rose }}>Head Stylist / Concierge Support</p>
                    </div>
                  </div>

                  {/* Messages chat area */}
                  <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-gray-50 flex flex-col justify-end text-xs">
                    <div className="space-y-4">
                      {chatMessages.map((msg) => {
                        const isConcierge = msg.sender === 'concierge';
                        return (
                          <div
                            key={msg.id}
                            className={cn(
                              "flex gap-3 max-w-[80%] items-start",
                              isConcierge ? "mr-auto flex-row" : "ml-auto flex-row-reverse"
                            )}
                          >
                            <div 
                              className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-[10px] flex-shrink-0 border"
                              style={{
                                backgroundColor: isConcierge ? theme.black : theme.rose,
                                borderColor: isConcierge ? theme.rose : theme.rose,
                                color: isConcierge ? 'white' : theme.black
                              }}
                            >
                              {isConcierge ? 'J' : 'IR'}
                            </div>

                            <div className="space-y-1">
                              <div 
                                className="p-3.5 rounded-2xl leading-relaxed font-sans shadow-sm"
                                style={{
                                  backgroundColor: isConcierge ? 'white' : theme.black,
                                  color: isConcierge ? theme.black : 'white',
                                  borderRadius: isConcierge ? '1rem 1rem 1rem 0' : '1rem 1rem 0 1rem'
                                }}
                              >
                                {msg.text}
                              </div>
                              <span className="text-[9px] font-medium block" style={{ color: theme.mediumGray }}>
                                {msg.time}
                              </span>
                            </div>
                          </div>
                        );
                      })}

                      {/* simulated typing bubbles */}
                      {isConciergeTyping && (
                        <div className="flex gap-3 max-w-[80%] items-start mr-auto">
                          <div 
                            className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-[10px] text-white"
                            style={{ backgroundColor: theme.black }}
                          >
                            J
                          </div>
                          <div className="bg-white border rounded-2xl rounded-tl-none p-3 shadow-sm flex items-center gap-1" style={{ borderColor: theme.lightRose }}>
                            <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: theme.mediumGray, animationDelay: '0ms' }} />
                            <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: theme.mediumGray, animationDelay: '150ms' }} />
                            <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: theme.mediumGray, animationDelay: '300ms' }} />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Message submit panel */}
                  <form onSubmit={handleSendMessage} className="p-4 border-t bg-white flex gap-3" style={{ borderColor: theme.lightRose }}>
                    <input
                      type="text"
                      placeholder="Type a message to Anil..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1 border rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2"
                      style={{ borderColor: theme.lightRose }}
                      required
                    />
                    <button
                      type="submit"
                      className="p-3.5 text-white rounded-xl transition-all shadow-sm flex items-center justify-center hover:shadow-md"
                      style={{ backgroundColor: theme.rose }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.black}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = theme.rose}
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  );
}