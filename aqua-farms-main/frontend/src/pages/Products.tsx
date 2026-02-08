import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Grid3X3, List, ChevronDown, Check, Search, ShoppingCart, Plus, Edit, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { api } from '@/lib/api';
import { useCart } from '@/contexts/CartContext';
import type { Product } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const categories = [
  { id: 'all', label: 'All Products' },
  { id: 'pocket', label: 'Pocket Size' },
  { id: 'small', label: 'Small Bottles' },
  { id: 'medium', label: 'Medium Bottles' },
  { id: 'large', label: 'Large Bottles' },
  { id: 'jar', label: 'Water Jars' },
  { id: 'can', label: 'Dispenser Cans' },
  { id: 'bulk', label: 'Bulk Supply' }
];

const useCases = [
  { id: 'all', label: 'All' },
  { id: 'individual', label: 'Individual' },
  { id: 'family', label: 'Family' },
  { id: 'office', label: 'Office' },
  { id: 'event', label: 'Events' }
];

const sortOptions = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-low', label: 'Price: Low to High' },
  { id: 'price-high', label: 'Price: High to Low' },
  { id: 'name', label: 'Name: A-Z' }
];

interface ProductsProps {
  adminView?: boolean;
}

export function Products({ adminView = false }: ProductsProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart, cartItems } = useCart();

  const searchQuery = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || 'all';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedUseCase, setSelectedUseCase] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [addedProducts, setAddedProducts] = useState<Set<string>>(new Set());
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Admin State
  const [showProductDialog, setShowProductDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState<Partial<Product>>({
    category: 'small',
    useCase: 'individual',
    inStock: true,
    returnable: false,
    tags: []
  });

  // Fetch products from API
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const data = await api.getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  // Update category from URL
  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tags.some(tag => tag.toLowerCase().includes(query)) ||
        p.size.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Use case filter
    if (selectedUseCase !== 'all') {
      result = result.filter(p => p.useCase === selectedUseCase || p.useCase === 'all');
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [products, searchQuery, selectedCategory, selectedUseCase, sortBy]); // products added to dep array

  const handleAddToCart = (product: Product) => {
    addToCart(product, product.minOrder);
    setAddedProducts(prev => new Set(prev).add(product.id));
    setTimeout(() => {
      setAddedProducts(prev => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }, 2000);
  };

  const getCartQuantity = (productId: string) => {
    const item = cartItems.find(item => item.product.id === productId);
    return item?.quantity || 0;
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    if (categoryId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', categoryId);
    }
    setSearchParams(searchParams);
  };

  // Admin Handlers
  const handleAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      category: 'small',
      useCase: 'individual',
      inStock: true,
      returnable: false,
      tags: []
    });
    setShowProductDialog(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductForm({ ...product });
    setShowProductDialog(true);
  };

  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await api.deleteProduct(id);
      fetchProducts();
    } catch (error) {
      alert('Failed to delete product');
    }
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...productForm,
        price: Number(productForm.price),
        minOrder: Number(productForm.minOrder),
        // ensure tags is array
        tags: Array.isArray(productForm.tags) ? productForm.tags : ((productForm.tags as unknown as string) || '').split(',').map((t: string) => t.trim()).filter(Boolean)
      };

      if (editingProduct) {
        await api.updateProduct(editingProduct.id, payload);
      } else {
        await api.createProduct(payload);
      }
      setShowProductDialog(false);
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert('Failed to save product');
    }
  };


  return (
    <main className="min-h-screen bg-gray-50 pt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Header */}
        <div className="py-2 flex justify-between items-start">
          <div>
            {searchQuery && (
              <div className="mb-4 flex items-center gap-2 text-sm text-gray-600">
                <Search className="w-4 h-4" />
                <span>Search results for &quot;</span>
                <span className="font-medium text-[#0078D4]">{searchQuery}</span>
                <span>&quot;</span>
                <button
                  onClick={() => {
                    searchParams.delete('search');
                    setSearchParams(searchParams);
                  }}
                  className="ml-2 text-gray-400 hover:text-red-500"
                >
                  ✕
                </button>
              </div>
            )}
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1E293B]">
              {searchQuery ? 'Search Results' : 'Our Products'}
            </h1>
            <p className="text-gray-600 mt-1 text-sm">
              {filteredProducts.length} products available
            </p>
          </div>
          {adminView && (
            <Button onClick={handleAddProduct} className="bg-[#0078D4] hover:bg-[#0063B1]">
              <Plus className="w-4 h-4 mr-2" /> Add Product
            </Button>
          )}
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {/* Filters Bar */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
              <div className="flex flex-wrap items-center gap-4">
                {/* Category Filter */}
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="appearance-none bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 pr-10 text-sm font-medium text-gray-700 focus:outline-none focus:border-[#0078D4] cursor-pointer"
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>

                {/* Use Case Filter */}
                <div className="relative">
                  <select
                    value={selectedUseCase}
                    onChange={(e) => setSelectedUseCase(e.target.value)}
                    className="appearance-none bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 pr-10 text-sm font-medium text-gray-700 focus:outline-none focus:border-[#0078D4] cursor-pointer"
                  >
                    {useCases.map(uc => (
                      <option key={uc.id} value={uc.id}>{uc.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>

                {/* Sort */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 pr-10 text-sm font-medium text-gray-700 focus:outline-none focus:border-[#0078D4] cursor-pointer"
                  >
                    {sortOptions.map(opt => (
                      <option key={opt.id} value={opt.id}>{opt.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>

                <div className="flex-1" />

                {/* View Mode */}
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-[#0078D4]' : 'text-gray-500'
                      }`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-[#0078D4]' : 'text-gray-500'
                      }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    cartQuantity={getCartQuantity(product.id)}
                    isAdded={addedProducts.has(product.id)}
                    onAddToCart={() => handleAddToCart(product)}
                    adminView={adminView}
                    onEdit={() => handleEditProduct(product)}
                    onDelete={() => handleDeleteProduct(product.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <ProductListItem
                    key={product.id}
                    product={product}
                    cartQuantity={getCartQuantity(product.id)}
                    isAdded={addedProducts.has(product.id)}
                    onAddToCart={() => handleAddToCart(product)}
                    adminView={adminView}
                    onEdit={() => handleEditProduct(product)}
                    onDelete={() => handleDeleteProduct(product.id)}
                  />
                ))}
              </div>
            )}

            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your filters or search query.</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Product Dialog */}
      <Dialog open={showProductDialog} onOpenChange={setShowProductDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProduct ? 'Edit Product' : 'Add Product'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleProductSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={productForm.name || ''} onChange={e => setProductForm({ ...productForm, name: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input id="price" type="number" value={productForm.price || ''} onChange={e => setProductForm({ ...productForm, price: Number(e.target.value) })} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="volume">Volume</Label>
                <Input id="volume" value={productForm.volume || ''} onChange={e => setProductForm({ ...productForm, volume: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unit">Unit</Label>
                <Input id="unit" value={productForm.unit || ''} onChange={e => setProductForm({ ...productForm, unit: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={productForm.category} onValueChange={v => setProductForm({ ...productForm, category: v as Product['category'] })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {categories.filter(c => c.id !== 'all').map(c => (
                      <SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="useCase">Use Case</Label>
                <Select value={productForm.useCase} onValueChange={v => setProductForm({ ...productForm, useCase: v as Product['useCase'] })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {useCases.filter(c => c.id !== 'all').map(c => (
                      <SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="minOrder">Min Order</Label>
                <Input id="minOrder" type="number" value={productForm.minOrder || 1} onChange={e => setProductForm({ ...productForm, minOrder: Number(e.target.value) })} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="size">Size Name</Label>
                <Input id="size" value={productForm.size || ''} onChange={e => setProductForm({ ...productForm, size: e.target.value })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" value={productForm.description || ''} onChange={e => setProductForm({ ...productForm, description: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input id="image" value={productForm.image || ''} onChange={e => setProductForm({ ...productForm, image: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input id="tags" value={Array.isArray(productForm.tags) ? productForm.tags.join(', ') : productForm.tags || ''} onChange={e => setProductForm({ ...productForm, tags: e.target.value.split(',').map(s => s.trim()) })} />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowProductDialog(false)}>Cancel</Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

    </main>
  );
}

function ProductCard({
  product,
  cartQuantity,
  isAdded,
  onAddToCart,
  adminView,
  onEdit,
  onDelete
}: {
  product: Product;
  cartQuantity: number;
  isAdded: boolean;
  onAddToCart: () => void;
  adminView?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group overflow-hidden border border-gray-100 flex flex-col h-full">
      {/* Image */}
      <div className="relative aspect-square bg-gradient-to-b from-blue-50 to-white overflow-hidden">
        <img
          src={product.image || '/images/bottle-330ml.png'}
          alt={product.name}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.src = '/images/bottle-330ml.png';
          }}
        />
        {product.badge && (
          <Badge className="absolute top-3 left-3 bg-[#0078D4] text-white text-xs">
            {product.badge}
          </Badge>
        )}
        {product.returnable && (
          <Badge variant="outline" className="absolute top-3 right-3 bg-white/90 text-xs">
            Returnable
          </Badge>
        )}
        {cartQuantity > 0 && !adminView && (
          <div className="absolute bottom-3 right-3 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full">
            {cartQuantity} in cart
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-grow">
        <div className="flex flex-wrap gap-1 mb-2">
          {product.tags.slice(0, 2).map((tag, i) => (
            <span key={i} className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        <h3 className="font-bold text-sm text-gray-900 mb-0.5 leading-tight">{product.name}</h3>
        <p className="text-xs text-gray-500 mb-2">{product.volume}</p>

        <div className="mt-auto flex items-end justify-between">
          <div className="flex items-baseline gap-1">
            <p className="text-lg font-bold text-[#0078D4]">₹{product.price}</p>
            <p className="text-xs text-gray-400">/{product.unit}</p>
          </div>
          {adminView ? (
            <div className="flex gap-1">
              <Button size="sm" variant="outline" onClick={onEdit} className="h-8 w-8 p-0 border-blue-200 text-blue-600 hover:bg-blue-50">
                <Edit className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" onClick={onDelete} className="h-8 w-8 p-0 border-red-200 text-red-600 hover:bg-red-50">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <Button
              onClick={onAddToCart}
              disabled={!product.inStock}
              size="sm"
              className={`rounded-full px-4 h-8 transition-all flex items-center gap-1.5 ${isAdded
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-[#0078D4] hover:bg-[#0063B1]'
                } text-white`}
            >
              {isAdded ? (
                <><Check className="w-3.5 h-3.5" /> <span className="text-[10px] font-semibold">Added</span></>
              ) : cartQuantity > 0 ? (
                <><ShoppingCart className="w-3.5 h-3.5" /> <span className="text-[10px] font-semibold">Add More</span></>
              ) : (
                <><ShoppingCart className="w-3.5 h-3.5" /> <span className="text-[10px] font-semibold">Add</span></>
              )}
            </Button>
          )}
        </div>

        <p className="text-[10px] text-gray-400 mt-2">Min order: {product.minOrder} {product.unit}s</p>
      </div>
    </div>
  );
}

function ProductListItem({
  product,
  cartQuantity,
  isAdded,
  onAddToCart,
  adminView,
  onEdit,
  onDelete
}: {
  product: Product;
  cartQuantity: number;
  isAdded: boolean;
  onAddToCart: () => void;
  adminView?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all p-4 flex gap-4">
      {/* Image */}
      <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-b from-blue-50 to-white rounded-xl overflow-hidden flex-shrink-0">
        <img
          src={product.image || '/images/bottle-330ml.png'}
          alt={product.name}
          className="w-full h-full object-contain p-4"
          onError={(e) => {
            e.currentTarget.src = '/images/bottle-330ml.png';
          }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex flex-wrap gap-1 mb-2">
            {product.tags.map((tag, i) => (
              <span key={i} className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                {tag}
              </span>
            ))}
            {product.returnable && (
              <span className="text-[10px] px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full">
                Returnable
              </span>
            )}
          </div>

          <h3 className="font-semibold text-gray-900 text-lg">{product.name}</h3>
          <p className="text-sm text-gray-500">{product.volume}</p>
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">{product.description}</p>
        </div>

        <div className="flex items-end justify-between mt-4">
          <div>
            <p className="text-2xl font-bold text-[#0078D4]">₹{product.price}</p>
            <p className="text-xs text-gray-400">per {product.unit} • Min: {product.minOrder}</p>
          </div>
          <div className="flex items-center gap-3">
            {adminView ? (
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={onEdit} className="text-blue-600 border-blue-200 hover:bg-blue-50">
                  <Edit className="w-4 h-4 mr-2" /> Edit
                </Button>
                <Button size="sm" variant="outline" onClick={onDelete} className="text-red-600 border-red-200 hover:bg-red-50">
                  <Trash2 className="w-4 h-4 mr-2" /> Delete
                </Button>
              </div>
            ) : (
              <>
                {cartQuantity > 0 && (
                  <span className="text-sm text-green-600 font-medium">
                    {cartQuantity} in cart
                  </span>
                )}
                <Button
                  onClick={onAddToCart}
                  disabled={!product.inStock}
                  className={`rounded-full px-6 transition-all ${isAdded
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-[#0078D4] hover:bg-[#0063B1]'
                    } text-white`}
                >
                  {isAdded ? (
                    <><Check className="w-4 h-4 mr-2" /> Added</>
                  ) : (
                    <><ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart</>
                  )}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
