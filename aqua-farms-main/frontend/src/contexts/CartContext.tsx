import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { CartItem, Product, Order, Address } from '@/types';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  deliveryFee: number;
  FREE_DELIVERY_THRESHOLD: number;
  
  // Order flow
  selectedAddress: Address | null;
  setSelectedAddress: (address: Address | null) => void;
  selectedDate: string | null;
  setSelectedDate: (date: string | null) => void;
  selectedSlot: string | null;
  setSelectedSlot: (slot: string | null) => void;
  isRecurring: boolean;
  setIsRecurring: (recurring: boolean) => void;
  recurringFrequency: 'daily' | 'weekly' | 'biweekly' | 'monthly' | null;
  setRecurringFrequency: (freq: 'daily' | 'weekly' | 'biweekly' | 'monthly' | null) => void;
  
  // Orders
  orders: Order[];
  addOrder: (order: Order) => void;
  
  // Quick reorder
  reorder: (orderId: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const FREE_DELIVERY_THRESHOLD = 500;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringFrequency, setRecurringFrequency] = useState<'daily' | 'weekly' | 'biweekly' | 'monthly' | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  const addToCart = useCallback((product: Product, quantity: number) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const cartTotal = useMemo(() => 
    cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [cartItems]
  );

  const cartCount = useMemo(() => 
    cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const deliveryFee = useMemo(() => 
    cartTotal >= FREE_DELIVERY_THRESHOLD ? 0 : 50,
    [cartTotal]
  );

  const addOrder = useCallback((order: Order) => {
    setOrders(prev => [order, ...prev]);
  }, []);

  const reorder = useCallback((orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      order.items.forEach(item => {
        addToCart(item.product, item.quantity);
      });
    }
  }, [orders, addToCart]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        deliveryFee,
        FREE_DELIVERY_THRESHOLD,
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
        orders,
        addOrder,
        reorder
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
