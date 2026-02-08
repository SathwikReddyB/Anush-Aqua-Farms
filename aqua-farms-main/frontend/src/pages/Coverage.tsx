import { useState } from 'react';
import { MapPin, Check, X, Search, Clock, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { coverageAreas } from '@/data/mockData';

const deliveryInfo = [
  {
    icon: Clock,
    title: 'Same Day Delivery',
    description: 'Order before 10 AM for delivery on the same day'
  },
  {
    icon: Truck,
    title: 'Free Delivery',
    description: 'No delivery charges on orders above ₹500'
  },
  {
    icon: MapPin,
    title: 'Real-time Tracking',
    description: 'Track your delivery from packing to doorstep'
  }
];

const popularPincodes = [
  { code: '110001', area: 'Connaught Place', available: true },
  { code: '110003', area: 'Chanakyapuri', available: true },
  { code: '110011', area: 'Rashtrapati Bhavan', available: true },
  { code: '110024', area: 'Lajpat Nagar', available: true },
  { code: '110048', area: 'Greater Kailash', available: true },
  { code: '110060', area: 'Paharganj', available: true },
  { code: '110085', area: 'Rohini', available: true },
  { code: '110092', area: 'Mayur Vihar', available: true },
  { code: '201301', area: 'Noida Sector 1', available: true },
  { code: '122001', area: 'Gurgaon', available: true },
  { code: '121001', area: 'Faridabad', available: true },
  { code: '999999', area: 'Test Area', available: false }
];

export function Coverage() {
  const [pincode, setPincode] = useState('');
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<{ available: boolean; area?: string } | null>(null);

  const checkPincode = () => {
    if (pincode.length !== 6) return;
    
    setChecking(true);
    setTimeout(() => {
      const found = popularPincodes.find(p => p.code === pincode);
      if (found) {
        setResult({ available: found.available, area: found.area });
      } else {
        // Random result for demo
        setResult({ available: Math.random() > 0.3, area: 'Your Area' });
      }
      setChecking(false);
    }, 800);
  };

  return (
    <main className="min-h-screen bg-[#F4F6FA] pt-24 lg:pt-28">
      <div className="px-6 lg:px-[7vw] pb-20">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-[clamp(36px,4vw,56px)] font-bold text-[#101827] mb-4">
            Delivery Coverage
          </h1>
          <p className="text-[#6B7280] text-lg">
            We deliver across Delhi NCR. Check if we serve your area.
          </p>
        </div>

        {/* Pincode Checker */}
        <div className="bg-white rounded-2xl p-8 card-shadow max-w-xl mx-auto mb-16">
          <label className="block text-sm font-medium text-[#101827] mb-3">
            Enter your pincode
          </label>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="110001"
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0C8DE8] text-lg"
              />
            </div>
            <Button
              onClick={checkPincode}
              disabled={pincode.length !== 6 || checking}
              className="bg-[#0C8DE8] hover:bg-[#0a7bc8] text-white rounded-xl px-8"
            >
              {checking ? 'Checking...' : 'Check'}
            </Button>
          </div>

          {result && (
            <div className={`mt-6 p-4 rounded-xl ${result.available ? 'bg-green-50' : 'bg-red-50'}`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  result.available ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {result.available ? (
                    <Check className="w-5 h-5 text-green-600" />
                  ) : (
                    <X className="w-5 h-5 text-red-600" />
                  )}
                </div>
                <div>
                  <p className={`font-medium ${result.available ? 'text-green-700' : 'text-red-700'}`}>
                    {result.available ? 'We deliver to your area!' : 'Sorry, we don\'t deliver there yet'}
                  </p>
                  {result.area && (
                    <p className="text-sm text-gray-500">{result.area}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Delivery Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {deliveryInfo.map((info) => (
            <div key={info.title} className="bg-white rounded-2xl p-6 card-shadow text-center">
              <div className="w-14 h-14 rounded-full bg-[#0C8DE8]/10 flex items-center justify-center mx-auto mb-4">
                <info.icon className="w-6 h-6 text-[#0C8DE8]" />
              </div>
              <h3 className="font-semibold text-[#101827] mb-2">{info.title}</h3>
              <p className="text-sm text-[#6B7280]">{info.description}</p>
            </div>
          ))}
        </div>

        {/* Coverage Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Areas List */}
          <div className="bg-white rounded-2xl p-8 card-shadow">
            <h2 className="text-xl font-semibold text-[#101827] mb-6">Areas We Serve</h2>
            <div className="space-y-3">
              {coverageAreas.map((area, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 rounded-full bg-[#0C8DE8]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-[#0C8DE8]" />
                  </div>
                  <span className="text-[#101827]">{area.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Map Visual */}
          <div className="bg-white rounded-2xl overflow-hidden card-shadow">
            <div className="relative h-full min-h-[400px]">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=600&fit=crop"
                alt="Coverage map"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C8DE8]/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#0C8DE8] flex items-center justify-center">
                      <Truck className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-[#101827]">Expanding Soon</p>
                      <p className="text-sm text-[#6B7280]">More areas coming next month</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
