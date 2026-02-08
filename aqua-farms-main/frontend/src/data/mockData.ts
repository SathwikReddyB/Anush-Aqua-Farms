import type { Product, Order, Address, User, Subscription, DeliverySlot } from '@/types';

export const products: Product[] = [
  // Pocket Size
  {
    id: 'pocket-50ml',
    name: 'Pocket Bottle',
    category: 'pocket',
    size: '50ml',
    volume: '50 ml',
    price: 5,
    unit: 'bottle',
    useCase: 'individual',
    returnable: false,
    description: 'Tiny pocket-sized bottle perfect for a quick refresh on the go.',
    image: '/images/bottle-50ml.png',
    minOrder: 24,
    inStock: true,
    badge: 'Best Value',
    tags: ['Individual', 'Pocket Size', 'Events']
  },
  // Small Bottles
  {
    id: 'small-250ml',
    name: 'Mini Bottle',
    category: 'small',
    size: '250ml',
    volume: '250 ml',
    price: 10,
    unit: 'bottle',
    useCase: 'individual',
    returnable: false,
    description: 'Compact and convenient for on-the-go hydration.',
    image: '/images/bottle-250ml.png',
    minOrder: 12,
    inStock: true,
    badge: 'Popular',
    tags: ['Individual', 'Travel', 'Quick Refresh']
  },
  {
    id: 'small-330ml',
    name: 'Refresh Bottle',
    category: 'small',
    size: '330ml',
    volume: '330 ml',
    price: 12,
    unit: 'bottle',
    useCase: 'individual',
    returnable: false,
    description: 'Perfect size for a quick refresh during work or travel.',
    image: '/images/bottle-330ml.png',
    minOrder: 12,
    inStock: true,
    badge: 'Trending',
    tags: ['Hydration', 'Office', 'Travel']
  },
  // Medium Bottles
  {
    id: 'medium-500ml',
    name: 'Standard Bottle',
    category: 'medium',
    size: '500ml',
    volume: '500 ml',
    price: 15,
    unit: 'bottle',
    useCase: 'individual',
    returnable: false,
    description: 'Ideal for personal use, gym sessions, and short trips.',
    image: '/images/bottle-500ml.png',
    minOrder: 12,
    inStock: true,
    badge: 'Most Popular',
    tags: ['Individual', 'Gym', 'Daily Use']
  },
  {
    id: 'medium-750ml',
    name: 'Sport Bottle',
    category: 'medium',
    size: '750ml',
    volume: '750 ml',
    price: 20,
    unit: 'bottle',
    useCase: 'individual',
    returnable: false,
    description: 'Great for sports, workouts, and extended activities.',
    image: '/images/bottle-sport-750ml.png',
    minOrder: 12,
    inStock: true,
    tags: ['Sports', 'Gym', 'Active Lifestyle']
  },
  // Large Bottles
  {
    id: 'large-1l',
    name: 'Family Pack',
    category: 'large',
    size: '1L',
    volume: '1 Litre',
    price: 25,
    unit: 'bottle',
    useCase: 'family',
    returnable: false,
    description: 'Perfect for family use and small gatherings.',
    image: '/images/bottle-1l.png',
    minOrder: 6,
    inStock: true,
    tags: ['Family', 'Home', 'Small Gathering']
  },
  {
    id: 'large-1.5l',
    name: 'Party Pack',
    category: 'large',
    size: '1.5L',
    volume: '1.5 Litres',
    price: 35,
    unit: 'bottle',
    useCase: 'family',
    returnable: false,
    description: 'Ideal for parties, picnics, and family outings.',
    image: '/images/bottle-1.5l.png',
    minOrder: 6,
    inStock: true,
    tags: ['Party', 'Picnic', 'Family']
  },
  {
    id: 'large-2l',
    name: 'Mega Bottle',
    category: 'large',
    size: '2L',
    volume: '2 Litres',
    price: 40,
    unit: 'bottle',
    useCase: 'family',
    returnable: false,
    description: 'Economical choice for offices and large families.',
    image: '/images/bottle-2l.png',
    minOrder: 6,
    inStock: true,
    badge: 'Economical',
    tags: ['Family', 'Office', 'Economical']
  },
  // Water Jars
  {
    id: 'jar-3l',
    name: 'Mini Jar',
    category: 'jar',
    size: '3L',
    volume: '3 Litres',
    price: 60,
    unit: 'jar',
    useCase: 'family',
    returnable: false,
    description: 'Compact jar for small families and personal use.',
    image: '/images/jar-5l.png',
    minOrder: 2,
    inStock: true,
    tags: ['Small Family', 'Personal', 'Compact']
  },
  {
    id: 'jar-5l',
    name: 'Home Jar',
    category: 'jar',
    size: '5L',
    volume: '5 Litres',
    price: 85,
    unit: 'jar',
    useCase: 'family',
    returnable: false,
    description: 'Perfect for home use with easy-to-carry handle.',
    image: '/images/jar-5l.png',
    minOrder: 2,
    inStock: true,
    tags: ['Home', 'Family', 'Easy Carry']
  },
  {
    id: 'jar-10l',
    name: 'Office Jar',
    category: 'jar',
    size: '10L',
    volume: '10 Litres',
    price: 150,
    unit: 'jar',
    useCase: 'office',
    returnable: false,
    description: 'Ideal for small offices and commercial spaces.',
    image: '/images/jar-5l.png',
    minOrder: 1,
    inStock: true,
    tags: ['Office', 'Commercial', 'Small Business']
  },
  // Dispenser Cans
  {
    id: 'can-15l',
    name: 'Standard Can',
    category: 'can',
    size: '15L',
    volume: '15 Litres',
    price: 120,
    unit: 'can',
    useCase: 'office',
    returnable: true,
    description: 'Compact dispenser can for small offices.',
    image: '/images/can-20l.png',
    minOrder: 1,
    inStock: true,
    tags: ['Office', 'Dispenser', 'Compact']
  },
  {
    id: 'can-20l',
    name: 'Premium Can',
    category: 'can',
    size: '20L',
    volume: '20 Litres',
    price: 150,
    unit: 'can',
    useCase: 'all',
    returnable: true,
    description: 'Dispenser-ready water can for homes and offices.',
    image: '/images/can-20l.png',
    minOrder: 1,
    inStock: true,
    badge: 'Best Seller',
    tags: ['Home', 'Office', 'Dispenser', 'Returnable']
  },
  {
    id: 'can-25l',
    name: 'Jumbo Can',
    category: 'can',
    size: '25L',
    volume: '25 Litres',
    price: 180,
    unit: 'can',
    useCase: 'office',
    returnable: true,
    description: 'Large capacity can for busy offices and events.',
    image: '/images/can-20lJ.png',
    minOrder: 1,
    inStock: true,
    tags: ['Office', 'Events', 'Large Capacity']
  },
  // Bulk Supply
  {
    id: 'bulk-50l',
    name: 'Event Pack',
    category: 'bulk',
    size: '50L',
    volume: '50 Litres',
    price: 350,
    unit: 'container',
    useCase: 'event',
    returnable: false,
    description: 'Perfect for small events and gatherings.',
    image: '/images/tank-500l.png',
    minOrder: 1,
    inStock: true,
    tags: ['Events', 'Small Gathering', 'Party']
  },
  {
    id: 'bulk-100l',
    name: 'Party Pack',
    category: 'bulk',
    size: '100L',
    volume: '100 Litres',
    price: 650,
    unit: 'container',
    useCase: 'event',
    returnable: false,
    description: 'Ideal for large parties and celebrations.',
    image: '/images/tank-500l.png',
    minOrder: 1,
    inStock: true,
    tags: ['Party', 'Celebration', 'Large Event']
  },
  {
    id: 'bulk-200l',
    name: 'Commercial Pack',
    category: 'bulk',
    size: '200L',
    volume: '200 Litres',
    price: 1200,
    unit: 'container',
    useCase: 'office',
    returnable: false,
    description: 'For commercial establishments and institutions.',
    image: '/images/tank-500l.png',
    minOrder: 1,
    inStock: true,
    tags: ['Commercial', 'Institution', 'Business']
  },
  {
    id: 'bulk-500l',
    name: 'Industrial Tank',
    category: 'bulk',
    size: '500L',
    volume: '500 Litres',
    price: 2800,
    unit: 'tank',
    useCase: 'event',
    returnable: false,
    description: 'Maximum capacity for large events and industrial use.',
    image: '/images/tank-500l.png',
    minOrder: 1,
    inStock: true,
    badge: 'Bulk Order',
    tags: ['Industrial', 'Large Event', 'Maximum Capacity']
  }
];

export const addresses: Address[] = [
  {
    id: 'addr-001',
    label: 'Home',
    fullName: 'Rahul Sharma',
    street: '123 Green Valley Apartments, Sector 45',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110003',
    phone: '9876543210',
    isDefault: true
  },
  {
    id: 'addr-002',
    label: 'Office',
    fullName: 'Rahul Sharma',
    street: '456 Business Tower, Connaught Place',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110001',
    phone: '9876543211',
    isDefault: false
  }
];

export const faqs = [
  {
    question: 'What is the minimum order quantity?',
    answer: 'Minimum order quantities vary by product. Small bottles start at 12 units, while dispenser cans can be ordered individually.'
  },
  {
    question: 'How long does delivery take?',
    answer: 'We offer same-day delivery for orders placed before 2 PM. Next-day delivery is available for all other orders.'
  },
  {
    question: 'Do you offer subscription plans?',
    answer: 'Yes! You can set up recurring deliveries with daily, weekly, bi-weekly, or monthly frequencies.'
  },
  {
    question: 'What areas do you serve?',
    answer: 'We currently serve Delhi NCR including Delhi, Noida, Gurgaon, and Faridabad.'
  }
];

export const user: User = {
  id: 'user-001',
  name: 'Rahul Sharma',
  email: 'rahul.sharma@email.com',
  phone: '9876543210',
  addresses: addresses,
  preferences: {
    defaultAddress: 'addr-001',
    notifications: true
  }
};

export const deliverySlots: DeliverySlot[] = [
  { id: 'slot-1', time: '6:00 AM - 8:00 AM', available: true },
  { id: 'slot-2', time: '8:00 AM - 10:00 AM', available: true },
  { id: 'slot-3', time: '10:00 AM - 12:00 PM', available: true },
  { id: 'slot-4', time: '12:00 PM - 2:00 PM', available: false },
  { id: 'slot-5', time: '2:00 PM - 4:00 PM', available: true },
  { id: 'slot-6', time: '4:00 PM - 6:00 PM', available: true },
  { id: 'slot-7', time: '6:00 PM - 8:00 PM', available: true }
];

export const orders: Order[] = [
  {
    id: 'ORD-2024-001',
    items: [
      { product: products[12], quantity: 2 },
      { product: products[3], quantity: 12 }
    ],
    status: 'delivered',
    orderDate: '2024-01-25T10:30:00Z',
    deliveryDate: '2024-01-26',
    deliverySlot: '8:00 AM - 10:00 AM',
    address: addresses[0],
    totalAmount: 480,
    isRecurring: false,
    trackingHistory: [
      { status: 'Order Placed', timestamp: '2024-01-25T10:30:00Z', description: 'Your order has been confirmed' },
      { status: 'Packed', timestamp: '2024-01-25T14:15:00Z', description: 'Your order has been packed' },
      { status: 'Out for Delivery', timestamp: '2024-01-26T07:30:00Z', description: 'Your order is on the way', location: 'Sector 45, New Delhi' },
      { status: 'Delivered', timestamp: '2024-01-26T09:15:00Z', description: 'Your order has been delivered' }
    ]
  },
  {
    id: 'ORD-2024-002',
    items: [
      { product: products[12], quantity: 1 }
    ],
    status: 'out-for-delivery',
    orderDate: '2024-01-29T08:00:00Z',
    deliveryDate: '2024-01-30',
    deliverySlot: '10:00 AM - 12:00 PM',
    address: addresses[0],
    totalAmount: 150,
    isRecurring: true,
    recurringFrequency: 'weekly',
    trackingHistory: [
      { status: 'Order Placed', timestamp: '2024-01-29T08:00:00Z', description: 'Your order has been confirmed' },
      { status: 'Packed', timestamp: '2024-01-29T12:00:00Z', description: 'Your order has been packed' },
      { status: 'Out for Delivery', timestamp: '2024-01-30T09:30:00Z', description: 'Your order is on the way', location: 'Sector 45, New Delhi' }
    ]
  }
];

export const subscriptions: Subscription[] = [
  {
    id: 'SUB-001',
    product: products[12],
    frequency: 'weekly',
    quantity: 2,
    nextDelivery: '2024-02-05',
    address: addresses[0],
    isActive: true,
    startDate: '2024-01-01'
  },
  {
    id: 'SUB-002',
    product: products[5],
    frequency: 'biweekly',
    quantity: 6,
    nextDelivery: '2024-02-06',
    address: addresses[1],
    isActive: true,
    startDate: '2024-01-15'
  }
];

export const coverageAreas = [
  { name: 'Delhi - Central', pincodes: ['110001', '110002', '110003'] },
  { name: 'Delhi - North', pincodes: ['110007', '110033', '110034', '110035', '110036', '110039', '110040', '110041', '110042', '110047', '110052', '110053', '110084', '110085', '110086', '110087', '110088', '110089'] },
  { name: 'Delhi - South', pincodes: ['110003', '110011', '110016', '110017', '110019', '110020', '110021', '110023', '110024', '110025', '110029', '110030', '110044', '110048', '110049', '110055', '110057', '110058', '110059', '110060', '110062', '110063', '110064', '110065', '110066', '110067', '110068', '110070', '110071', '110074', '110076'] },
  { name: 'Delhi - East', pincodes: ['110031', '110032', '110051', '110053', '110054', '110061', '110091', '110092', '110093', '110094', '110095', '110096'] },
  { name: 'Delhi - West', pincodes: ['110005', '110015', '110018', '110026', '110027', '110028', '110037', '110043', '110045', '110046', '110050', '110056', '110063', '110064', '110072', '110073', '110075', '110077', '110078', '110081', '110082', '110083'] },
  { name: 'Noida', pincodes: ['201301', '201303', '201304', '201305', '201306', '201307', '201308', '201309', '201310'] },
  { name: 'Gurgaon', pincodes: ['122001', '122002', '122003', '122004', '122005', '122006', '122007', '122008', '122009', '122010', '122011', '122012', '122013', '122014', '122015', '122016', '122017', '122018'] },
  { name: 'Faridabad', pincodes: ['121001', '121002', '121003', '121004', '121005', '121006', '121007', '121008', '121009', '121010'] }
];

export const testimonials = [
  {
    id: 1,
    name: 'Ramesh K.',
    role: 'Office Manager',
    quote: 'Delivery is always on the dot. The water tastes clean, and the cans are sealed properly. Highly recommended!',
    rating: 5,
    avatar: 'https://ui-avatars.com/api/?name=Ramesh+K&background=0078D4&color=fff'
  },
  {
    id: 2,
    name: 'Priya D.',
    role: 'Resident',
    quote: 'We switched to Anush Aqua for our apartment—zero complaints, consistent quality. The app makes ordering so easy!',
    rating: 5,
    avatar: 'https://ui-avatars.com/api/?name=Priya+D&background=10B981&color=fff'
  },
  {
    id: 3,
    name: 'Sandeep R.',
    role: 'Cafe Owner',
    quote: 'Easy scheduling, polite staff, and they actually stick to the time slot. Best water supplier in Delhi NCR!',
    rating: 5,
    avatar: 'https://ui-avatars.com/api/?name=Sandeep+R&background=F59E0B&color=fff'
  },
  {
    id: 4,
    name: 'Anita Sharma',
    role: 'Homemaker',
    quote: 'The 20L cans are perfect for our family. The water quality is excellent and delivery is always punctual.',
    rating: 5,
    avatar: 'https://ui-avatars.com/api/?name=Anita+S&background=EC4899&color=fff'
  }
];

export const companyStats = {
  dailyDeliveries: 5000,
  happyCustomers: 25000,
  yearsOfTrust: 15,
  yearsInBusiness: 15,
  qualityScore: 99.8,
  plasticSaved: 150000,
  waterPurified: 5000000
};

export const purificationSteps = [
  { step: 1, title: 'Source Selection', description: 'Water sourced from protected natural springs with regular environmental monitoring.' },
  { step: 2, title: 'Sediment Filtration', description: 'Removes large particles, sand, and debris from raw water.' },
  { step: 3, title: 'Activated Carbon', description: 'Eliminates chlorine, odors, and organic compounds.' },
  { step: 4, title: 'Reverse Osmosis', description: 'Removes dissolved solids, heavy metals, and impurities.' },
  { step: 5, title: 'UV Sterilization', description: 'Kills bacteria, viruses, and microorganisms.' },
  { step: 6, title: 'Mineral Addition', description: 'Adds essential minerals for taste and health benefits.' },
  { step: 7, title: 'pH Balancing', description: 'Adjusts pH to optimal 7.0-7.5 range.' },
  { step: 8, title: 'Quality Testing', description: 'Every batch tested for purity, TDS, and microbiological safety.' },
  { step: 9, title: 'Hygienic Bottling', description: 'Bottled in sanitized environment with quality control.' },
  { step: 10, title: 'Sealed Packaging', description: 'Tamper-evident seals ensure safety until delivery.' }
];

// UPI Apps for payment
export const upiApps = [
  { id: 'gpay', name: 'Google Pay', icon: 'gpay' },
  { id: 'phonepe', name: 'PhonePe', icon: 'phonepe' },
  { id: 'paytm', name: 'Paytm', icon: 'paytm' },
  { id: 'amazonpay', name: 'Amazon Pay', icon: 'amazonpay' },
  { id: 'bhim', name: 'BHIM', icon: 'bhim' },
  { id: 'upiid', name: 'UPI ID', icon: 'upi' }
];
