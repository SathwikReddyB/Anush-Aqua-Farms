import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  Truck,
  CheckCircle,
  MapPin,
  Calendar,
  RefreshCw,
  ChevronRight,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { api } from '@/lib/api';
// import { orders as mockOrders } from '@/data/mockData';
import { useCart } from '@/contexts/CartContext';
import type { Order, OrderStatus } from '@/types';

const statusConfig: Record<OrderStatus, { label: string; color: string; icon: typeof Package }> = {
  'placed': { label: 'Order Placed', color: 'bg-blue-100 text-blue-700', icon: Package },
  'packed': { label: 'Packed', color: 'bg-yellow-100 text-yellow-700', icon: Package },
  'out-for-delivery': { label: 'Out for Delivery', color: 'bg-orange-100 text-orange-700', icon: Truck },
  'delivered': { label: 'Delivered', color: 'bg-green-100 text-green-700', icon: CheckCircle },
  'cancelled': { label: 'Cancelled', color: 'bg-red-100 text-red-700', icon: X }
};

export function Orders() {
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const { reorder } = useCart();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await api.getMyOrders();
        setOrders(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchOrders();
  }, []);

  const activeOrders = orders.filter(o =>
    o.status !== 'delivered' && o.status !== 'cancelled'
  );
  const pastOrders = orders.filter(o =>
    o.status === 'delivered' || o.status === 'cancelled'
  );

  const handleReorder = (orderId: string) => {
    reorder(orderId);
    window.location.href = '/cart';
  };

  return (
    <main className="min-h-screen bg-slate-50 pt-8 pb-16">
      <div className="container-main">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="heading-3 text-slate-900">My Orders</h1>
          <Link to="/products">
            <Button className="btn-primary">
              Place New Order
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>

            {/* Tabs */}
            <div className="flex gap-2 mb-8">
              <button
                onClick={() => setActiveTab('active')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'active'
                  ? 'bg-teal-600 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-100'
                  }`}
              >
                Active Orders ({activeOrders.length})
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'history'
                  ? 'bg-teal-600 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-100'
                  }`}
              >
                Order History ({pastOrders.length})
              </button>
            </div>

            {/* Orders List */}
            <div className="space-y-4">
              {(activeTab === 'active' ? activeOrders : pastOrders).map((order) => {
                const status = statusConfig[order.status];
                const StatusIcon = status.icon;

                return (
                  <div key={order.id} className="card bg-white p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${status.color}`}>
                          <StatusIcon className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{order.id}</p>
                          <p className="text-sm text-slate-500">
                            {new Date(order.orderDate).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={status.color}>{status.label}</Badge>
                        {order.isRecurring && (
                          <Badge variant="outline" className="text-teal-600 border-teal-200">
                            <RefreshCw className="w-3 h-3 mr-1" />
                            {order.recurringFrequency}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center gap-2 bg-slate-50 rounded-full px-3 py-1.5">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-6 h-6 rounded-full object-contain"
                          />
                          <span className="text-sm">{item.quantity}× {item.product.name}</span>
                        </div>
                      ))}
                    </div>

                    {/* Order Details */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-4 border-t">
                      <div className="flex items-center gap-6">
                        <div>
                          <p className="text-xs text-slate-400">Total</p>
                          <p className="font-bold text-lg text-teal-600">₹{order.totalAmount}</p>
                        </div>
                        <div className="hidden md:block">
                          <p className="text-xs text-slate-400">Delivery</p>
                          <p className="font-medium">{order.deliveryDate}</p>
                        </div>
                        <div className="hidden md:block">
                          <p className="text-xs text-slate-400">Slot</p>
                          <p className="font-medium">{order.deliverySlot}</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="px-4 py-2 rounded-full border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors"
                        >
                          Track Order
                        </button>
                        <button
                          onClick={() => handleReorder(order.id)}
                          className="px-4 py-2 rounded-full bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition-colors flex items-center gap-2"
                        >
                          <RefreshCw className="w-4 h-4" />
                          Reorder
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {(activeTab === 'active' ? activeOrders : pastOrders).length === 0 && (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {activeTab === 'active' ? 'No active orders' : 'No order history'}
                </h3>
                <p className="text-slate-500 mb-6">Place your first order to get started.</p>
                <Link to="/products">
                  <Button className="btn-primary">
                    Browse Products
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            )}
          </>
        )}
      </div>


      {/* Tracking Modal */}
      {
        selectedOrder && (
          <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedOrder(null)}
          >
            <div
              className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-slate-900">Order Tracking</h2>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm text-slate-500">Order ID</p>
                    <p className="font-semibold">{selectedOrder.id}</p>
                  </div>
                  <Badge className={statusConfig[selectedOrder.status].color}>
                    {statusConfig[selectedOrder.status].label}
                  </Badge>
                </div>

                {/* Timeline */}
                <div className="space-y-6">
                  {selectedOrder.trackingHistory.map((event, index) => {
                    const isLast = index === selectedOrder.trackingHistory.length - 1;

                    return (
                      <div key={index} className="flex gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isLast ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-500'
                          }`}>
                          {isLast ? <Truck className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
                        </div>
                        <div className="flex-1 pb-6 border-b border-slate-100 last:border-0">
                          <p className="font-medium text-slate-900">{event.status}</p>
                          <p className="text-sm text-slate-500">{event.description}</p>
                          {event.location && (
                            <p className="text-sm text-teal-600 flex items-center gap-1 mt-1">
                              <MapPin className="w-3 h-3" />
                              {event.location}
                            </p>
                          )}
                          <p className="text-xs text-slate-400 mt-2">
                            {new Date(event.timestamp).toLocaleString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 bg-slate-50 rounded-xl p-4">
                  <p className="text-sm text-slate-500 mb-2">Expected Delivery</p>
                  <p className="font-medium flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-teal-600" />
                    {selectedOrder.deliveryDate}, {selectedOrder.deliverySlot}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </main >
  );
}
