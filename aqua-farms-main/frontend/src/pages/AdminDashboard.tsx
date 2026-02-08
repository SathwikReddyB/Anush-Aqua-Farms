import { useState } from 'react';
import { UserManagement } from '@/components/admin/UserManagement';
import { OrderManagement } from '@/components/admin/OrderManagement';
import { Products } from '@/pages/Products'; // Reuse products page with admin features
import { SiteSettingsManagement } from '@/components/admin/SiteSettingsManagement';

export const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('products');

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

            <div className="flex space-x-4 border-b border-gray-200 mb-6">
                <button
                    onClick={() => setActiveTab('products')}
                    className={`pb-4 px-2 font-medium text-sm transition-colors relative ${activeTab === 'products' ? 'text-[#0078D4]' : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    Products
                    {activeTab === 'products' && (
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#0078D4]" />
                    )}
                </button>
                <button
                    onClick={() => setActiveTab('orders')}
                    className={`pb-4 px-2 font-medium text-sm transition-colors relative ${activeTab === 'orders' ? 'text-[#0078D4]' : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    Orders
                    {activeTab === 'orders' && (
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#0078D4]" />
                    )}
                </button>
                <button
                    onClick={() => setActiveTab('users')}
                    className={`pb-4 px-2 font-medium text-sm transition-colors relative ${activeTab === 'users' ? 'text-[#0078D4]' : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    Users
                    {activeTab === 'users' && (
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#0078D4]" />
                    )}
                </button>
                <button
                    onClick={() => setActiveTab('settings')}
                    className={`pb-4 px-2 font-medium text-sm transition-colors relative ${activeTab === 'settings' ? 'text-[#0078D4]' : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    Settings
                    {activeTab === 'settings' && (
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#0078D4]" />
                    )}
                </button>
            </div>

            <div className="min-h-[400px]">
                {activeTab === 'products' && <Products adminView />}
                {activeTab === 'orders' && <OrderManagement />}
                {activeTab === 'users' && <UserManagement />}
                {activeTab === 'settings' && <SiteSettingsManagement />}
            </div>
        </div>
    );
};
