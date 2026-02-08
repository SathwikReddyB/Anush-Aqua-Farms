const API_URL = 'http://localhost:5000';

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
};

export const api = {
    // Auth
    login: async (email: string, password: string) => {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        if (!res.ok) throw new Error((await res.json()).message || 'Login failed');
        return res.json();
    },

    register: async (userData: any) => {
        const res = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });
        if (!res.ok) throw new Error((await res.json()).message || 'Registration failed');
        return res.json();
    },

    getMe: async () => {
        const res = await fetch(`${API_URL}/auth/me`, {
            headers: getHeaders(),
        });
        if (!res.ok) return null;
        return res.json();
    },

    // Products
    getProducts: async () => {
        const res = await fetch(`${API_URL}/products`);
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
    },

    // Orders
    createOrder: async (orderData: any) => {
        const res = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(orderData),
        });
        if (!res.ok) throw new Error('Failed to create order');
        return res.json();
    },

    getMyOrders: async () => {
        const res = await fetch(`${API_URL}/orders/my-orders`, {
            headers: getHeaders(),
        });
        if (!res.ok) throw new Error('Failed to fetch orders');
        return res.json();
    },

    // Admin
    getAllOrders: async () => {
        const res = await fetch(`${API_URL}/orders/all`, {
            headers: getHeaders(),
        });
        if (!res.ok) throw new Error('Failed to fetch orders');
        return res.json();
    },

    updateOrderStatus: async (orderId: string, status: string) => {
        const res = await fetch(`${API_URL}/orders/${orderId}/status`, {
            method: 'PATCH',
            headers: {
                ...getHeaders(),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status }),
        });
        if (!res.ok) throw new Error('Failed to update order status');
        return res.json();
    },

    getAllUsers: async () => {
        const res = await fetch(`${API_URL}/users`, {
            headers: getHeaders(),
        });
        if (!res.ok) throw new Error('Failed to fetch users');
        return res.json();
    },

    // Product Admin
    createProduct: async (productData: any) => {
        const res = await fetch(`${API_URL}/products`, {
            method: 'POST',
            headers: {
                ...getHeaders(),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        });
        if (!res.ok) throw new Error('Failed to create product');
        return res.json();
    },

    updateProduct: async (id: string, productData: any) => {
        const res = await fetch(`${API_URL}/products/${id}`, {
            method: 'PUT',
            headers: {
                ...getHeaders(),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        });
        if (!res.ok) throw new Error('Failed to update product');
        return res.json();
    },

    deleteProduct: async (id: string) => {
        const res = await fetch(`${API_URL}/products/${id}`, {
            method: 'DELETE',
            headers: getHeaders(),
        });
        if (!res.ok) throw new Error('Failed to delete product');
        return res.json();
    },

    // Addresses
    getAddresses: async () => {
        const res = await fetch(`${API_URL}/addresses`, {
            headers: getHeaders(),
        });
        if (!res.ok) throw new Error('Failed to fetch addresses');
        return res.json();
    },

    addAddress: async (addressData: any) => {
        const res = await fetch(`${API_URL}/addresses`, {
            method: 'POST',
            headers: {
                ...getHeaders(),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(addressData),
        });
        if (!res.ok) throw new Error('Failed to add address');
        return res.json();
    },

    updateAddress: async (id: string, addressData: any) => {
        const res = await fetch(`${API_URL}/addresses/${id}`, {
            method: 'PUT',
            headers: {
                ...getHeaders(),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(addressData),
        });
        if (!res.ok) throw new Error('Failed to update address');
        return res.json();
    },

    deleteAddress: async (id: string) => {
        const res = await fetch(`${API_URL}/addresses/${id}`, {
            method: 'DELETE',
            headers: getHeaders(),
        });
        if (!res.ok) throw new Error('Failed to delete address');
        return res.json();
    },

    // Site Settings
    getSiteSettings: async () => {
        const res = await fetch(`${API_URL}/settings`);
        if (!res.ok) throw new Error('Failed to fetch site settings');
        return res.json();
    },

    updateSiteSettings: async (settings: any) => {
        const res = await fetch(`${API_URL}/settings`, {
            method: 'POST',
            headers: {
                ...getHeaders(),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(settings),
        });
        if (!res.ok) throw new Error('Failed to update site settings');
        return res.json();
    },
};
