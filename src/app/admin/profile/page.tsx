'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UserCheck,
  Shield,
  Key,
  Calendar,
  Lock,
  Globe,
  Plus,
  Trash2,
  CheckCircle,
  Eye,
  EyeOff,
  Database
} from 'lucide-react';

export default function AdminProfilePage() {
  const [showKeys, setShowKeys] = useState<{ [key: string]: boolean }>({});
  const [apiKeys, setApiKeys] = useState([
    { name: 'Storefront Client JWT', key: 'glam_pk_live_84129480124801948190', created: 'May 1, 2026', usage: 'Storefront API' },
    { name: 'Stock Sync Hook', key: 'glam_sk_live_9381940182498192839281', created: 'May 10, 2026', usage: 'Warehouse Automation' }
  ]);
  const [newKeyName, setNewKeyName] = useState('');
  const [showKeyForm, setShowKeyForm] = useState(false);

  // Security Credentials State
  const [currPassword, setCurrPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const toggleKeyVisibility = (name: string) => {
    setShowKeys(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const handleCreateKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName) return;

    const newKey = {
      name: newKeyName,
      key: `glam_pk_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
      created: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      usage: 'General API Integration'
    };

    setApiKeys([...apiKeys, newKey]);
    setNewKeyName('');
    setShowKeyForm(false);
  };

  const handleDeleteKey = (name: string) => {
    setApiKeys(apiKeys.filter(k => k.name !== name));
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currPassword || !newPassword || newPassword !== confirmPassword) return;

    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setCurrPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }, 3000);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <span className="text-xs text-amber-500 font-bold uppercase tracking-widest block mb-1">Administrative Node</span>
        <h1 className="text-3xl font-serif font-black text-white tracking-tight">Profile & Security</h1>
        <p className="text-sm text-neutral-400 mt-1">Configure credentials, access key scopes, audit active sessions, and check permissions.</p>
      </div>

      {/* Main Grid split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Profile Card & Info */}
        <div className="bg-neutral-900/50 backdrop-blur-md p-6 rounded-2xl border border-neutral-800 flex flex-col items-center text-center h-fit">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center font-bold text-neutral-950 shadow-xl shadow-amber-500/10 text-3xl">
              AK
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-4 border-neutral-900 rounded-full" />
          </div>

          <h3 className="text-xl font-serif font-bold text-white">Alexander Knight</h3>
          <p className="text-xs text-amber-500 font-bold uppercase tracking-wider mt-1.5">Super Admin / System Architect</p>
          
          <div className="w-full mt-6 py-4.5 border-t border-b border-neutral-850 flex justify-around text-xs">
            <div>
              <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest block">Access Grade</span>
              <span className="font-semibold text-white mt-1 block">Level 1 (All)</span>
            </div>
            <div className="w-px bg-neutral-850" />
            <div>
              <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest block">Node Status</span>
              <span className="font-semibold text-emerald-450 mt-1 block">Active / Verified</span>
            </div>
          </div>

          <div className="w-full mt-6 space-y-3.5 text-left text-xs">
            <div className="flex justify-between items-center text-neutral-400">
              <span className="font-medium">Primary Email</span>
              <span className="font-semibold text-neutral-300">alex@glamoura.luxury</span>
            </div>
            <div className="flex justify-between items-center text-neutral-400">
              <span className="font-medium">Register Date</span>
              <span className="font-semibold text-neutral-300">May 1, 2026</span>
            </div>
            <div className="flex justify-between items-center text-neutral-400">
              <span className="font-medium">Client Device</span>
              <span className="font-semibold text-neutral-300">macOS / Chrome 124</span>
            </div>
          </div>
        </div>

        {/* Security / Password adjustments */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Change Password Form */}
          <div className="bg-neutral-900/50 backdrop-blur-md p-6 rounded-2xl border border-neutral-800">
            <div className="pb-4 border-b border-neutral-850 mb-6">
              <h3 className="text-lg font-serif font-bold text-white flex items-center gap-2">
                <Lock className="w-5 h-5 text-amber-500" /> Account Security Credentials
              </h3>
              <p className="text-xs text-neutral-400 mt-1">Alter active password codes to keep your dashboard access locked down.</p>
            </div>

            <form onSubmit={handleUpdatePassword} className="space-y-5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">Current Password</label>
                  <input
                    type="password"
                    value={currPassword}
                    onChange={(e) => setCurrPassword(e.target.value)}
                    className="bg-neutral-950 border border-neutral-850 rounded-xl p-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="bg-neutral-950 border border-neutral-850 rounded-xl p-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">Verify Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-neutral-950 border border-neutral-850 rounded-xl p-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <AnimatePresence>
                  {saveSuccess && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-emerald-450 font-bold flex items-center gap-1.5"
                    >
                      <CheckCircle className="w-4 h-4" /> Password credentials updated!
                    </motion.span>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-neutral-800 hover:bg-neutral-750 border border-neutral-750 text-white font-bold rounded-xl transition-all ml-auto uppercase tracking-wider text-[10px]"
                >
                  Adjust Password
                </button>
              </div>
            </form>
          </div>

          {/* Integration API keys */}
          <div className="bg-neutral-900/50 backdrop-blur-md p-6 rounded-2xl border border-neutral-800">
            <div className="flex justify-between items-center pb-4 border-b border-neutral-850 mb-6">
              <div>
                <h3 className="text-lg font-serif font-bold text-white flex items-center gap-2">
                  <Key className="w-5 h-5 text-amber-500" /> Integration API Scope Keys
                </h3>
                <p className="text-xs text-neutral-400 mt-1">Acquire client tokens to adjust catalog products from external processes.</p>
              </div>

              <button
                onClick={() => setShowKeyForm(!showKeyForm)}
                className="p-2 bg-neutral-950 hover:bg-neutral-800 border border-neutral-850 text-neutral-400 hover:text-white rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Slide input form for keys */}
            <AnimatePresence>
              {showKeyForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden mb-6"
                >
                  <form onSubmit={handleCreateKey} className="flex gap-3 bg-neutral-950 p-4 border border-neutral-850 rounded-xl">
                    <input
                      type="text"
                      placeholder="e.g. ERP Stock Sync Client"
                      value={newKeyName}
                      onChange={(e) => setNewKeyName(e.target.value)}
                      className="flex-1 bg-transparent border-b border-neutral-800 focus:border-amber-500 text-xs text-white focus:outline-none pb-1"
                      required
                    />
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-amber-500 text-neutral-950 font-bold text-[10px] rounded-lg uppercase tracking-wider"
                    >
                      Generate Key
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* List keys */}
            <div className="space-y-4">
              {apiKeys.map((k) => (
                <div key={k.name} className="p-3 bg-neutral-950 rounded-xl border border-neutral-850 flex justify-between items-center text-xs">
                  <div className="space-y-1.5 max-w-[70%]">
                    <span className="font-semibold text-white block">{k.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-neutral-500 select-all block truncate">
                        {showKeys[k.name] ? k.key : '••••••••••••••••••••••••••••••••'}
                      </span>
                      <button
                        onClick={() => toggleKeyVisibility(k.name)}
                        className="text-neutral-500 hover:text-neutral-350"
                      >
                        {showKeys[k.name] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <span className="text-[10px] text-neutral-500 block">Created {k.created} • Scope: {k.usage}</span>
                  </div>

                  <button
                    onClick={() => handleDeleteKey(k.name)}
                    className="p-2 bg-rose-950/20 hover:bg-rose-950/60 border border-rose-900/30 text-rose-500 hover:text-rose-400 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
