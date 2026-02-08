export interface Product {
  id: string;
  name: string;
  category: 'pocket' | 'small' | 'medium' | 'large' | 'jar' | 'can' | 'bulk';
  size: string;
  volume: string;
  price: number;
  unit: string;
  useCase: 'individual' | 'family' | 'office' | 'event' | 'all';
  returnable: boolean;
  description: string;
  image: string;
  minOrder: number;
  inStock: boolean;
  badge?: string;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Address {
  id: string;
  label: string;
  fullName?: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  items: CartItem[];
  status: 'placed' | 'packed' | 'out-for-delivery' | 'delivered' | 'cancelled';
  orderDate: string;
  deliveryDate: string;
  deliverySlot: string;
  address: Address;
  totalAmount: number;
  isRecurring: boolean;
  recurringFrequency?: 'daily' | 'weekly' | 'biweekly' | 'monthly';
  trackingHistory: TrackingEvent[];
}

export interface TrackingEvent {
  status: string;
  timestamp: string;
  location?: string;
  description: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role?: 'user' | 'admin';
  phone: string;
  addresses: Address[];
  preferences: {
    defaultAddress?: string;
    notifications: boolean;
  };
  avatar?: string;
}

export interface Subscription {
  id: string;
  product: Product;
  frequency: 'daily' | 'weekly' | 'biweekly' | 'monthly';
  quantity: number;
  nextDelivery: string;
  address: Address;
  isActive: boolean;
  startDate: string;
}

export interface DeliverySlot {
  id: string;
  time: string;
  available: boolean;
}

export type OrderStatus = 'placed' | 'packed' | 'out-for-delivery' | 'delivered' | 'cancelled';

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  'placed': 'Order Placed',
  'packed': 'Packed',
  'out-for-delivery': 'Out for Delivery',
  'delivered': 'Delivered',
  'cancelled': 'Cancelled'
};

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  'placed': 'bg-blue-500',
  'packed': 'bg-yellow-500',
  'out-for-delivery': 'bg-orange-500',
  'delivered': 'bg-green-500',
  'cancelled': 'bg-red-500'
};

// Payment types
export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  description?: string;
}

export interface UPIApp {
  id: string;
  name: string;
  icon: string;
}
