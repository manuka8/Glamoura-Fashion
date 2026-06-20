'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { ShoppingCart, Search, Filter, Eye, Clock, Truck, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type Order = {
  id: string;
  user_id: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total_amount: number;
  created_at: string;
  shipping_address: any;
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) setOrders(data);
    setLoading(false);
  }

  async function updateStatus(orderId: string, newStatus: Order['status']) {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId);

    if (!error) {
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    }
  }

  const getStatusStyle = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-50 text-yellow-700 border-yellow-100';
      case 'processing': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'shipped': return 'bg-indigo-50 text-indigo-700 border-indigo-100';
      case 'delivered': return 'bg-green-50 text-green-700 border-green-100';
      case 'cancelled': return 'bg-red-50 text-red-700 border-red-100';
      default: return 'bg-gray-50 text-gray-700 border-gray-100';
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending': return Clock;
      case 'processing': return ShoppingCart;
      case 'shipped': return Truck;
      case 'delivered': return CheckCircle;
      case 'cancelled': return XCircle;
      default: return Clock;
    }
  };

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-serif font-semibold text-gray-900">Order & Delivery</h1>
        <p className="text-sm text-gray-500 mt-1">Track and manage customer orders and shipping status.</p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Pending Orders</p>
          <p className="text-2xl font-semibold">{orders.filter(o => o.status === 'pending').length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">In Transit</p>
          <p className="text-2xl font-semibold">{orders.filter(o => o.status === 'shipped').length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Completed Today</p>
          <p className="text-2xl font-semibold">{orders.filter(o => o.status === 'delivered').length}</p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 text-xs uppercase tracking-widest font-bold text-gray-500">Order ID</th>
              <th className="px-6 py-4 text-xs uppercase tracking-widest font-bold text-gray-500">Date</th>
              <th className="px-6 py-4 text-xs uppercase tracking-widest font-bold text-gray-500">Amount</th>
              <th className="px-6 py-4 text-xs uppercase tracking-widest font-bold text-gray-500">Status</th>
              <th className="px-6 py-4 text-xs uppercase tracking-widest font-bold text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              [1, 2, 3].map(i => (
                <tr key={i} className="animate-pulse">
                  <td className="px-6 py-4" colSpan={5}>
                    <div className="h-10 bg-gray-50 rounded-lg w-full"></div>
                  </td>
                </tr>
              ))
            ) : orders.length > 0 ? (
              orders.map((order) => {
                const StatusIcon = getStatusIcon(order.status);
                return (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-900 font-mono">#{order.id.slice(0, 8).toUpperCase()}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {order.total_amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border",
                        getStatusStyle(order.status)
                      )}>
                        <StatusIcon className="w-3 h-3" />
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        className="text-xs border-gray-200 rounded-lg focus:ring-0 focus:border-black py-1"
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value as Order['status'])}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-20 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
