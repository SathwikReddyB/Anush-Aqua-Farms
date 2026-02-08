import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, Check, RefreshCcw, Package, Droplets, Home, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { api } from '@/lib/api';
// import { products } from '@/data/mockData';
import { useCart } from '@/contexts/CartContext';
import type { Product } from '@/types';

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { addToCart, cartItems } = useCart();
  const [quantity, setQuantity] = useState(0);
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const products = await api.getProducts();
        const found = products.find((p: Product) => p.id === id);
        setProduct(found || null);

        if (found) {
          setRelatedProducts(products
            .filter((p: Product) => p.category === found.category && p.id !== found.id)
            .slice(0, 3));
        }
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#F4F6FA] pt-24 lg:pt-28 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0C8DE8]"></div>
      </main>
    )
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-[#F4F6FA] pt-24 lg:pt-28">
        <div className="px-6 lg:px-[7vw] pb-20 text-center">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[#101827] mb-2">Product Not Found</h1>
          <p className="text-[#6B7280] mb-6">The product you're looking for doesn't exist.</p>
          <Link to="/products">
            <Button className="bg-[#0C8DE8] hover:bg-[#0a7bc8] text-white rounded-full">
              Browse Products
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  const cartItem = cartItems.find(item => item.product.id === id);
  const cartQuantity = cartItem?.quantity || 0;

  const effectiveQuantity = quantity || product.minOrder;
  const totalPrice = product.price * effectiveQuantity;

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, effectiveQuantity);
    }
  };

  // const relatedProducts = products
  //  .filter(p => p.category === product.category && p.id !== product.id)
  //  .slice(0, 3);

  return (
    <main className="min-h-screen bg-[#F4F6FA] pt-24 lg:pt-28">
      <div className="px-6 lg:px-[7vw] pb-20">
        {/* Back Link */}
        <Link to="/products" className="inline-flex items-center gap-2 text-[#6B7280] hover:text-[#0C8DE8] mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </Link>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {/* Image */}
          <div className="bg-white rounded-[28px] overflow-hidden card-shadow">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[400px] lg:h-[500px] object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="outline" className="capitalize">
                {product.category.replace('-', ' ')}
              </Badge>
              {product.returnable && (
                <Badge className="bg-[#0C8DE8] text-white">
                  <RefreshCcw className="w-3 h-3 mr-1" />
                  Returnable
                </Badge>
              )}
            </div>

            <h1 className="text-[clamp(32px,3vw,48px)] font-bold text-[#101827] mb-2">
              {product.name}
            </h1>

            <p className="text-[#6B7280] text-lg mb-6">{product.description}</p>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-[#0C8DE8]/10 flex items-center justify-center">
                  {product.useCase === 'family' ? (
                    <Home className="w-5 h-5 text-[#0C8DE8]" />
                  ) : product.useCase === 'office' ? (
                    <Building2 className="w-5 h-5 text-[#0C8DE8]" />
                  ) : (
                    <Droplets className="w-5 h-5 text-[#0C8DE8]" />
                  )}
                </div>
                <div>
                  <p className="text-sm text-[#6B7280]">Best For</p>
                  <p className="font-medium capitalize">{product.useCase === 'all' ? 'Home & Office' : product.useCase}</p>
                </div>
              </div>
              <div className="w-px h-12 bg-gray-200" />
              <div>
                <p className="text-sm text-[#6B7280]">Volume</p>
                <p className="font-medium">{product.volume}</p>
              </div>
              <div className="w-px h-12 bg-gray-200" />
              <div>
                <p className="text-sm text-[#6B7280]">Min Order</p>
                <p className="font-medium">{product.minOrder} {product.unit}s</p>
              </div>
            </div>

            <div className="border-t pt-6 mb-6">
              <p className="text-sm text-[#6B7280] mb-2">Price per {product.unit}</p>
              <p className="text-4xl font-bold text-[#0C8DE8]">₹{product.price}</p>
            </div>

            {/* Quantity Selector */}
            <div className="bg-gray-50 rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium text-[#101827]">Select Quantity</span>
                <span className="text-sm text-[#6B7280]">Min: {product.minOrder}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(product.minOrder, effectiveQuantity - product.minOrder))}
                    className="w-12 h-12 rounded-full bg-white card-shadow flex items-center justify-center hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="text-2xl font-semibold w-16 text-center">{effectiveQuantity}</span>
                  <button
                    onClick={() => setQuantity(effectiveQuantity + product.minOrder)}
                    className="w-12 h-12 rounded-full bg-white card-shadow flex items-center justify-center hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="text-right">
                  <p className="text-sm text-[#6B7280]">Total</p>
                  <p className="text-2xl font-bold text-[#0C8DE8]">₹{totalPrice}</p>
                </div>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-4">
              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-[#0C8DE8] hover:bg-[#0a7bc8] text-white rounded-full py-6"
              >
                {cartQuantity > 0 ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Added ({cartQuantity})
                  </>
                ) : (
                  'Add to Order'
                )}
              </Button>
              {cartQuantity > 0 && (
                <Link to="/cart">
                  <Button className="bg-[#FF6A3D] hover:bg-[#e55a2f] text-white rounded-full py-6 px-8">
                    View Cart
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-[#101827] mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((related) => (
                <Link
                  key={related.id}
                  to={`/product/${related.id}`}
                  className="bg-white rounded-[28px] overflow-hidden card-shadow group"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={related.image}
                      alt={related.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-[#101827] mb-1">{related.name}</h3>
                    <p className="text-sm text-[#6B7280] mb-2">{related.volume}</p>
                    <p className="text-[#0C8DE8] font-semibold">₹{related.price}/{related.unit}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
