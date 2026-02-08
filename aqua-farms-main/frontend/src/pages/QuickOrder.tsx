import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, ShoppingCart, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { products } from '@/data/mockData';
import { useCart } from '@/contexts/CartContext';
import type { Product } from '@/types';

const categories = [
  { id: 'all', label: 'All' },
  { id: 'small-bottles', label: 'Small Bottles' },
  { id: 'big-bottles', label: 'Big Bottles' },
  { id: 'water-cans', label: 'Water Cans' },
  { id: 'bulk-supply', label: 'Bulk Supply' }
];

export function QuickOrder() {
  const { cartItems, addToCart, cartTotal, cartCount } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const getQuantity = (productId: string, minOrder: number) => {
    return quantities[productId] || minOrder;
  };

  const updateQuantity = (productId: string, delta: number, minOrder: number) => {
    setQuantities(prev => {
      const current = prev[productId] || minOrder;
      const newQty = Math.max(minOrder, current + delta);
      return { ...prev, [productId]: newQty };
    });
  };

  const handleAddToCart = (product: Product) => {
    const qty = getQuantity(product.id, product.minOrder);
    addToCart(product, qty);
  };

  const getCartQuantity = (productId: string) => {
    const item = cartItems.find(item => item.product.id === productId);
    return item?.quantity || 0;
  };

  return (
    <main className="min-h-screen bg-[#F4F6FA] pt-24 lg:pt-28">
      <div className="px-6 lg:px-[7vw] pb-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-[clamp(36px,4vw,56px)] font-bold text-[#101827]">
              Quick Order
            </h1>
            <p className="text-[#6B7280]">
              Select products and quantities, then proceed to checkout
            </p>
          </div>
          {cartCount > 0 && (
            <Link to="/cart">
              <Button className="bg-[#FF6A3D] hover:bg-[#e55a2f] text-white rounded-full px-6">
                <ShoppingCart className="w-4 h-4 mr-2" />
                View Cart ({cartCount})
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          )}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#0C8DE8] text-white'
                  : 'bg-white text-[#6B7280] hover:bg-gray-100 card-shadow'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const qty = getQuantity(product.id, product.minOrder);
            const cartQty = getCartQuantity(product.id);

            return (
              <div
                key={product.id}
                className="bg-white rounded-[28px] overflow-hidden card-shadow group"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {cartQty > 0 && (
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-green-500 text-white">
                        <Check className="w-3 h-3 mr-1" />
                        {cartQty} in cart
                      </Badge>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-[#101827] mb-1">{product.name}</h3>
                  <p className="text-sm text-[#6B7280] mb-2">{product.volume}</p>
                  <p className="text-[#0C8DE8] font-semibold mb-4">
                    ₹{product.price}/{product.unit}
                  </p>

                  {/* Quantity Selector */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-[#6B7280]">Quantity</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(product.id, -product.minOrder, product.minOrder)}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center font-medium">{qty}</span>
                      <button
                        onClick={() => updateQuantity(product.id, product.minOrder, product.minOrder)}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-[#0C8DE8] hover:bg-[#0a7bc8] text-white rounded-full"
                  >
                    {cartQty > 0 ? 'Add More' : 'Add to Order'}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating Cart Summary (Mobile) */}
        {cartCount > 0 && (
          <div className="fixed bottom-6 left-6 right-6 lg:hidden z-50">
            <Link to="/cart">
              <div className="bg-[#101827] text-white rounded-2xl p-4 flex items-center justify-between shadow-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0C8DE8] flex items-center justify-center">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">{cartCount} items</p>
                    <p className="text-sm text-gray-400">₹{cartTotal}</p>
                  </div>
                </div>
                <Button className="bg-[#FF6A3D] hover:bg-[#e55a2f] text-white rounded-full">
                  Checkout
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
