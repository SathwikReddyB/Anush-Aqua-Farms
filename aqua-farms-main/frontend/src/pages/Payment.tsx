import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  CreditCard,
  Banknote,
  ArrowLeft,
  Check,
  Shield,
  Smartphone,
  QrCode,
  CheckCircle2,
  Copy
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useCart } from '@/contexts/CartContext';
import Logo from '@/components/Logo';

const upiApps = [
  { id: 'gpay', name: 'Google Pay', icon: 'https://img.icons8.com/fluency/48/google-pay-new.png' },
  { id: 'phonepe', name: 'PhonePe', icon: 'https://img.icons8.com/color/48/phone-pe.png' },
  { id: 'paytm', name: 'Paytm', icon: 'https://img.icons8.com/3d-fluency/94/paytm.png' },
  { id: 'amazonpay', name: 'Amazon Pay', icon: 'https://img.icons8.com/windows/32/amazon-pay.png' },
];



export function Payment() {
  const navigate = useNavigate();
  const { cartItems, cartTotal, deliveryFee, clearCart, selectedDate, selectedSlot, selectedAddress } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod' | 'qr' | null>(null);
  const [selectedUPIApp, setSelectedUPIApp] = useState<string>('');
  const [upiId, setUpiId] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [copied, setCopied] = useState(false);
  const [finalAmount, setFinalAmount] = useState(0);
  const [showQRModal, setShowQRModal] = useState(false);
  const [qrPaymentStatus, setQrPaymentStatus] = useState<'pending' | 'success' | 'failed'>('pending');

  // Card State
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  const totalAmount = cartTotal + deliveryFee;

  // Validation logic
  const isPaymentValid = (() => {
    if (!paymentMethod) return false;
    if (paymentMethod === 'upi') {
      return !!(selectedUPIApp || (upiId && isVerified));
    }
    if (paymentMethod === 'card') {
      return !!(cardDetails.number && cardDetails.expiry && cardDetails.cvv && cardDetails.name);
    }
    // COD and QR (if scanned) are valid by default selection for now
    return true;
  })();

  const handleCopyUPI = () => {
    navigator.clipboard.writeText('anushaqua@upi');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVerifyUPI = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
    }, 1500);
  };

  const handlePlaceOrder = () => {
    if (paymentMethod === 'qr') {
      setShowQRModal(true);
      setQrPaymentStatus('pending');

      // Simulate QR payment process
      setTimeout(() => {
        setQrPaymentStatus('success');
        // Auto close after success
        setTimeout(() => {
          setShowQRModal(false);
          // Proceed to order success screen
          setFinalAmount(totalAmount);
          setOrderPlaced(true);
          clearCart();
        }, 1500);
      }, 4000); // Wait 4 seconds to simulate scanning and paying
      return;
    }

    setIsProcessing(true);
    setFinalAmount(totalAmount);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setOrderPlaced(true);
      clearCart();
    }, 2000);
  };

  if (orderPlaced) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-[#1E293B] mb-3">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your order. We will deliver your water on time.
          </p>
          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Order Total</span>
              <span className="font-bold text-[#0078D4]">₹{finalAmount}</span>
            </div>
            {selectedDate && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Delivery Date</span>
                <span className="text-sm font-medium">{selectedDate}</span>
              </div>
            )}
            {selectedSlot && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Time Slot</span>
                <span className="text-sm font-medium">{selectedSlot}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Order ID</span>
              <span className="text-sm font-mono font-medium">ORD-{Math.floor(Math.random() * 10000)}</span>
            </div>
          </div>
          <div className="space-y-3">
            <Button
              onClick={() => navigate('/orders')}
              className="w-full bg-[#0078D4] hover:bg-[#0063B1] text-white rounded-xl py-3"
            >
              View Order Details
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="w-full rounded-xl py-3"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <Logo size={32} />
              <span className="font-bold text-lg hidden sm:block text-slate-900">
                Payment
              </span>
            </Link>
            <button
              onClick={() => navigate('/cart')}
              className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-[#0078D4]"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Cart
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content - Payment Methods */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-[#0078D4]" />
                </div>
                <h2 className="font-bold text-xl text-slate-900">Select Payment Method</h2>
              </div>

              <div className="space-y-4">
                {/* UPI Option */}
                <div className={`border rounded-xl p-4 transition-all ${paymentMethod === 'upi' ? 'border-[#0078D4] bg-blue-50/10 shadow-sm' : 'border-gray-200 hover:border-gray-300'}`}>
                  <div className="flex items-start gap-3 cursor-pointer" onClick={() => setPaymentMethod('upi')}>
                    <div className={`w-5 h-5 rounded-full border-2 mt-1 flex items-center justify-center shrink-0 ${paymentMethod === 'upi' ? 'border-[#0078D4]' : 'border-gray-300'}`}>
                      {paymentMethod === 'upi' && <div className="w-2.5 h-2.5 rounded-full bg-[#0078D4]" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Smartphone className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">UPI</p>
                          <p className="text-xs text-slate-500">Pay using UPI apps</p>
                        </div>
                      </div>

                      {paymentMethod === 'upi' && (
                        <div className="mt-4 pl-2 sm:pl-4 animate-fade-in">
                          <p className="text-sm font-medium text-slate-700 mb-3">Select UPI App</p>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                            {upiApps.map((app) => (
                              <button
                                key={app.id}
                                onClick={(e) => { e.stopPropagation(); setSelectedUPIApp(app.id); }}
                                className={`p-3 rounded-xl border transition-all flex flex-col items-center justify-center min-h-[80px] ${selectedUPIApp === app.id
                                  ? 'border-[#0078D4] bg-white ring-1 ring-[#0078D4]'
                                  : 'border-gray-200 bg-white hover:border-[#0078D4]/50'
                                  }`}
                              >
                                <img src={app.icon} alt={app.name} className="w-8 h-8 mb-2 object-contain" />
                                <p className="text-xs font-medium text-slate-700">{app.name}</p>
                              </button>
                            ))}
                          </div>

                          <div className="relative mb-5">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                            <div className="relative flex justify-center text-xs uppercase"><span className="px-2 bg-white text-gray-500">OR</span></div>
                          </div>

                          <div className="space-y-3 mb-5" onClick={e => e.stopPropagation()}>
                            <p className="text-sm font-medium text-slate-700">Pay using UPI ID</p>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={upiId}
                                onChange={(e) => { setUpiId(e.target.value); setIsVerified(false); }}
                                placeholder="e.g. yourname@upi"
                                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0078D4] focus:ring-1 focus:ring-[#0078D4] text-sm"
                              />
                              <Button
                                disabled={!upiId.includes('@') || isVerifying || isVerified}
                                onClick={handleVerifyUPI}
                                className={`rounded-xl px-4 py-2.5 h-auto text-sm min-w-[80px] ${isVerified ? 'bg-green-600 hover:bg-green-700' : 'bg-[#0078D4] hover:bg-[#0063B1]'}`}
                              >
                                {isVerifying ? (
                                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : isVerified ? (
                                  <span className="flex items-center gap-1"><Check className="w-3 h-3" /> Verified</span>
                                ) : (
                                  'Verify'
                                )}
                              </Button>
                            </div>
                            {isVerified && (
                              <p className="text-xs text-green-600 flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" /> Verified Name: John Doe
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Other Payment Methods */}
                {/* QR Code */}
                <div className={`border rounded-xl p-4 transition-all ${paymentMethod === 'qr' ? 'border-[#0078D4] bg-blue-50/10 shadow-sm' : 'border-gray-200 hover:border-gray-300'}`}>
                  <div className="flex items-start gap-3 cursor-pointer" onClick={() => setPaymentMethod('qr')}>
                    <div className={`w-5 h-5 rounded-full border-2 mt-1 flex items-center justify-center shrink-0 ${paymentMethod === 'qr' ? 'border-[#0078D4]' : 'border-gray-300'}`}>
                      {paymentMethod === 'qr' && <div className="w-2.5 h-2.5 rounded-full bg-[#0078D4]" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <QrCode className="w-4 h-4 text-[#0078D4]" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">Scan QR Code</p>
                          <p className="text-xs text-slate-500">Generate QR & pay with any UPI app</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card */}
                <div className={`border rounded-xl p-4 transition-all ${paymentMethod === 'card' ? 'border-[#0078D4] bg-blue-50/10 shadow-sm' : 'border-gray-200 hover:border-gray-300'}`}>
                  <div className="flex items-start gap-3 cursor-pointer" onClick={() => setPaymentMethod('card')}>
                    <div className={`w-5 h-5 rounded-full border-2 mt-1 flex items-center justify-center shrink-0 ${paymentMethod === 'card' ? 'border-[#0078D4]' : 'border-gray-300'}`}>
                      {paymentMethod === 'card' && <div className="w-2.5 h-2.5 rounded-full bg-[#0078D4]" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                          <CreditCard className="w-4 h-4 text-amber-600" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">Credit/Debit Card</p>
                          <p className="text-xs text-slate-500">Visa, Mastercard, RuPay</p>
                        </div>
                      </div>

                      {paymentMethod === 'card' && (
                        <div className="mt-4 pl-2 sm:pl-4 animate-fade-in space-y-4" onClick={e => e.stopPropagation()}>
                          <div>
                            <input
                              type="text"
                              placeholder="Card Number"
                              value={cardDetails.number}
                              onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0078D4] text-sm"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <input
                              type="text"
                              placeholder="MM/YY"
                              value={cardDetails.expiry}
                              onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0078D4] text-sm"
                            />
                            <input
                              type="password"
                              placeholder="CVV"
                              maxLength={3}
                              value={cardDetails.cvv}
                              onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0078D4] text-sm"
                            />
                          </div>
                          <div>
                            <input
                              type="text"
                              placeholder="Card Holder Name"
                              value={cardDetails.name}
                              onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0078D4] text-sm"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>



                {/* COD */}
                <div className={`border rounded-xl p-4 transition-all ${paymentMethod === 'cod' ? 'border-[#0078D4] bg-blue-50/10 shadow-sm' : 'border-gray-200 hover:border-gray-300'}`}>
                  <div className="flex items-start gap-3 cursor-pointer" onClick={() => setPaymentMethod('cod')}>
                    <div className={`w-5 h-5 rounded-full border-2 mt-1 flex items-center justify-center shrink-0 ${paymentMethod === 'cod' ? 'border-[#0078D4]' : 'border-gray-300'}`}>
                      {paymentMethod === 'cod' && <div className="w-2.5 h-2.5 rounded-full bg-[#0078D4]" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <Banknote className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">Cash on Delivery</p>
                          <p className="text-xs text-slate-500">Pay when you receive</p>
                        </div>
                      </div>
                      {paymentMethod === 'cod' && (
                        <div className="mt-4 pl-2 sm:pl-4" onClick={e => e.stopPropagation()}>
                          <p className="text-xs text-amber-700 bg-amber-50 p-3 rounded-lg border border-amber-100">
                            Please ensure you have exact cash amount defined at time of delivery.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500 mt-6 pt-4 border-t border-gray-100">
                <Shield className="w-4 h-4 text-green-600" />
                <span>Your payment is secured with 256-bit SSL encryption</span>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <h3 className="font-bold text-lg text-slate-900 mb-4">Order Summary</h3>

              {/* Items List */}
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="w-14 h-14 bg-gray-50 rounded-lg shrink-0 flex items-center justify-center">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-contain p-2" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">{item.product.name}</p>
                      <p className="text-xs text-gray-500">{item.product.size} x {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold text-slate-900">₹{item.product.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-slate-900">₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery</span>
                  <span className={deliveryFee === 0 ? 'text-green-600 font-medium' : 'font-medium text-slate-900'}>
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                  </span>
                </div>
                {deliveryFee === 0 && (
                  <p className="text-xs text-green-600">You saved ₹50 on delivery!</p>
                )}
              </div>

              <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between items-center mb-6">
                <span className="font-bold text-lg text-slate-900">Total</span>
                <span className="font-bold text-2xl text-[#0078D4]">₹{totalAmount}</span>
              </div>

              {selectedAddress && (
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <p className="text-xs text-gray-500 mb-2 uppercase font-semibold tracking-wider">Delivering to</p>
                  <p className="font-medium text-sm text-slate-900">{selectedAddress.label}</p>
                  <p className="text-xs text-gray-600 mt-0.5 line-clamp-2">
                    {selectedAddress.street}, {selectedAddress.city} - {selectedAddress.pincode}
                  </p>
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => navigate('/cart')}
                  className="flex-1 border-gray-200"
                >
                  Back
                </Button>
                <Button
                  onClick={() => {
                    if (!paymentMethod) {
                      alert('Please select a payment method to proceed.');
                      return;
                    }
                    if (paymentMethod === 'upi' && !selectedUPIApp && !(upiId && isVerified)) {
                      alert('Please select a UPI App or verify your UPI ID to proceed.');
                      return;
                    }
                    if (paymentMethod === 'card' && !isPaymentValid) {
                      alert('Please fill in all card details to proceed.');
                      return;
                    }
                    if (paymentMethod === 'cod') {
                      // Optional: Add strict confirmation for COD if desired, otherwise just proceed
                    }
                    handlePlaceOrder();
                  }}
                  disabled={isProcessing}
                  title={
                    !paymentMethod ? 'Please select a payment method' :
                      paymentMethod === 'upi' && !isPaymentValid ? 'Please select a UPI App or verify your UPI ID' :
                        paymentMethod === 'card' && !isPaymentValid ? 'Please fill in all card details' : ''
                  }
                  className={`flex-[2] bg-[#0078D4] hover:bg-[#0063B1] text-white rounded-xl shadow-lg shadow-blue-500/20 ${!isPaymentValid ? 'cursor-not-allowed opacity-90' : ''}`}
                >
                  {isProcessing ? 'Processing...' : `Pay ₹${totalAmount}`}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={showQRModal} onOpenChange={setShowQRModal}>
        <DialogContent className="sm:max-w-sm text-center">
          <DialogHeader>
            <DialogTitle>Scan & Pay</DialogTitle>
          </DialogHeader>
          <div className="py-4 flex flex-col items-center">
            {qrPaymentStatus === 'success' ? (
              <div className="animate-fade-in py-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <p className="text-lg font-bold text-slate-900">Payment Successful!</p>
                <p className="text-sm text-gray-500">Redirecting...</p>
              </div>
            ) : (
              <>
                <div className="relative bg-white p-4 rounded-xl border shadow-sm w-fit mx-auto mb-4">
                  <div className="w-48 h-48 bg-gray-50 flex items-center justify-center rounded-lg">
                    <QrCode className="w-24 h-24 text-slate-800" />
                  </div>
                  {qrPaymentStatus === 'pending' && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center rounded-xl">
                      <div className="w-10 h-10 border-4 border-[#0078D4] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
                <p className="font-semibold text-lg mb-1">₹{totalAmount}</p>
                <p className="text-sm text-gray-500 mb-4">Scan using any UPI App</p>

                <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg text-sm mb-4">
                  <span className="font-medium text-slate-700">anushaqua@upi</span>
                  <button onClick={handleCopyUPI} className="text-[#0078D4] hover:text-[#0063B1]">
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <p className="text-xs text-gray-400">Waiting for payment confirmation...</p>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
