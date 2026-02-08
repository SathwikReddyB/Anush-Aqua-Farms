import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, MapPin, Calendar, Clock, RefreshCcw, ChevronRight, Package, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { deliverySlots } from '@/data/mockData';
import Logo from '@/components/Logo';

const frequencies = [
  { id: 'daily', label: 'Daily' },
  { id: 'weekly', label: 'Weekly' },
  { id: 'biweekly', label: 'Bi-weekly' },
  { id: 'monthly', label: 'Monthly' }
];

export function Cart() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const dateInputRef = useRef<HTMLInputElement>(null);
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    cartTotal,
    cartCount,
    selectedAddress,
    setSelectedAddress,
    selectedDate,
    setSelectedDate,
    selectedSlot,
    setSelectedSlot,
    isRecurring,
    setIsRecurring,
    recurringFrequency,
    setRecurringFrequency,
    FREE_DELIVERY_THRESHOLD,
    deliveryFee
  } = useCart();

  // Get tomorrow's date as minimum
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  // Get date 30 days from now as maximum
  const maxDateObj = new Date();
  maxDateObj.setDate(maxDateObj.getDate() + 30);
  const maxDate = maxDateObj.toISOString().split('T')[0];

  const canCheckout = cartItems.length > 0 && selectedAddress && selectedDate && selectedSlot;

  const handleProceedToPayment = () => {
    if (canCheckout) {
      navigate('/payment');
    }
  };

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 pt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-12 h-12 text-[#0078D4]" />
            </div>
            <h1 className="text-2xl font-bold text-[#1E293B] mb-3">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">
              Add some products to your cart and they will appear here.
            </p>
            <Link to="/products">
              <Button className="bg-[#0078D4] hover:bg-[#0063B1] text-white rounded-full px-8">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/products" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#1E293B]">Shopping Cart</h1>
            <p className="text-gray-600">{cartCount} items</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.product.id}
                className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm flex gap-4 items-center"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-b from-blue-50 to-white rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={item.product.image || '/images/bottle-330ml.png'}
                    alt={item.product.name}
                    className="w-full h-full object-contain p-2"
                    onError={(e) => {
                      e.currentTarget.src = '/images/bottle-330ml.png';
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-[#1E293B] truncate">{item.product.name}</h3>
                  <p className="text-sm text-gray-500">{item.product.volume}</p>
                  <p className="text-[#0078D4] font-semibold mt-1">₹{item.product.price}/{item.product.unit}</p>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - item.product.minOrder)}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + item.product.minOrder)}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}

            {/* Delivery Details */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-[#1E293B] mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#0078D4]" />
                Delivery Details
              </h2>

              {/* Address Selection */}
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-700 mb-3">Select Delivery Address</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {user?.addresses && user.addresses.length > 0 ? (
                    user.addresses.map((addr) => (
                      <button
                        key={addr.id}
                        onClick={() => setSelectedAddress(addr)}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${selectedAddress?.id === addr.id
                          ? 'border-[#0078D4] bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                          }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <span className="font-medium text-[#1E293B]">{addr.label}</span>
                          {addr.isDefault && (
                            <Badge variant="secondary" className="text-xs">Default</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 line-clamp-2">{addr.street}</p>
                        <p className="text-sm text-gray-500">{addr.city}, {addr.state}</p>
                      </button>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-4 border-2 border-dashed border-gray-200 rounded-xl">
                      <p className="text-gray-500 mb-2">No addresses found</p>
                      <Link to="/account?action=add_address">
                        <Button variant="outline" size="sm">Add Address</Button>
                      </Link>
                    </div>
                  )}
                  {/* Always show Add Address option if there are addresses */}
                  {user?.addresses && user.addresses.length > 0 && (
                    <Link to="/account?action=add_address" className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-[#0078D4] hover:bg-blue-50 transition-all text-gray-500 hover:text-[#0078D4] min-h-[120px]">
                      <Plus className="w-8 h-8 mb-2" />
                      <span className="font-medium">Add New Address</span>
                    </Link>
                  )}
                </div>
              </div>

              {/* Date Selection - Fixed with cursor and full click area */}
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Delivery Date
                </p>
                <div className="relative w-fit group">
                  {/* Visual Display Layer (No native styling/selection) */}
                  <div className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all bg-white cursor-pointer
                    ${selectedDate ? 'border-[#0078D4] bg-blue-50/10' : 'border-gray-200 hover:border-gray-300'}
                  `}>
                    <span className={`text-sm font-medium ${selectedDate ? 'text-[#1E293B]' : 'text-gray-400'}`}>
                      {selectedDate ? selectedDate.split('-').reverse().join('-') : 'DD-MM-YYYY'}
                    </span>
                    <Calendar className={`w-5 h-5 transition-colors ${selectedDate ? 'text-[#0078D4]' : 'text-gray-400 group-hover:text-[#0078D4]'}`} />
                  </div>

                  {/* Invisible Interaction Layer */}
                  <input
                    ref={dateInputRef}
                    type="date"
                    min={minDate}
                    max={maxDate}
                    value={selectedDate || ''}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    onClick={() => {
                      try {
                        if ('showPicker' in HTMLInputElement.prototype) {
                          dateInputRef.current?.showPicker();
                        }
                      } catch (e) {
                        // Fallback or ignore if not supported
                      }
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                </div>
              </div>

              {/* Time Slot Selection */}
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Delivery Time Slot
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {deliverySlots.map((slot) => (
                    <button
                      key={slot.id}
                      disabled={!slot.available}
                      onClick={() => setSelectedSlot(slot.time)}
                      className={`p-3 rounded-xl border-2 text-sm transition-all ${selectedSlot === slot.time
                        ? 'border-[#0078D4] bg-blue-50 text-[#0078D4]'
                        : slot.available
                          ? 'border-gray-200 hover:border-gray-300'
                          : 'border-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recurring Order */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <button
                    onClick={() => setIsRecurring(!isRecurring)}
                    className={`w-12 h-6 rounded-full transition-colors relative ${isRecurring ? 'bg-[#0078D4]' : 'bg-gray-300'
                      }`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${isRecurring ? 'left-7' : 'left-1'
                        }`}
                    />
                  </button>
                  <span className="font-medium text-[#1E293B] flex items-center gap-2">
                    <RefreshCcw className="w-4 h-4" />
                    Make this a recurring order
                  </span>
                </div>

                {isRecurring && (
                  <div className="flex flex-wrap gap-2 ml-[60px]">
                    {frequencies.map((freq) => (
                      <button
                        key={freq.id}
                        onClick={() => setRecurringFrequency(freq.id as any)}
                        className={`px-4 py-2 rounded-full text-sm transition-all ${recurringFrequency === freq.id
                          ? 'bg-[#0078D4] text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                      >
                        {freq.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <div className="flex items-center gap-3 mb-6">
                <Logo size={32} />
                <h2 className="text-lg font-semibold text-[#1E293B]">Order Summary</h2>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal ({cartCount} items)</span>
                  <span className="font-medium">₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className={deliveryFee === 0 ? 'text-green-600 font-medium' : 'font-medium'}>
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                  </span>
                </div>
                {isRecurring && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Frequency</span>
                    <span className="font-medium capitalize">{recurringFrequency || 'Weekly'}</span>
                  </div>
                )}
              </div>

              {/* Free Delivery Progress */}
              {cartTotal < FREE_DELIVERY_THRESHOLD && (
                <div className="bg-blue-50 rounded-xl p-3 mb-6">
                  <p className="text-sm text-[#0078D4]">
                    Add ₹{FREE_DELIVERY_THRESHOLD - cartTotal} more for FREE delivery!
                  </p>
                  <div className="mt-2 h-2 bg-blue-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#0078D4] rounded-full transition-all"
                      style={{ width: `${Math.min((cartTotal / FREE_DELIVERY_THRESHOLD) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-[#1E293B]">Total</span>
                  <span className="text-2xl font-bold text-[#0078D4]">₹{cartTotal + deliveryFee}</span>
                </div>
              </div>

              <Button
                onClick={handleProceedToPayment}
                disabled={!canCheckout}
                className="w-full bg-[#0078D4] hover:bg-[#0063B1] text-white rounded-xl py-4 text-lg font-medium disabled:opacity-50"
              >
                Proceed to Payment
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>

              {!canCheckout && (
                <p className="text-center text-sm text-gray-500 mt-3">
                  Please select address, date, and time slot
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
