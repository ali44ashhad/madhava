import React, { useState } from 'react';
import AdminCategories from './AdminCategories';
import AdminSubcategories from './AdminSubcategories';
import AdminProducts from './AdminProducts';
import AdminSkus from './AdminSkus';
import AdminOrders from './AdminOrders';

const MENU_ITEMS = [
  { id: 'categories', label: 'Categories' },
  { id: 'subcategories', label: 'Sub Categories' },
  { id: 'products', label: 'Products' },
  { id: 'skus', label: 'SKU Management' },
  { id: 'orders', label: 'Orders' },
];

const AdminDashboard = () => {
  const [activeView, setActiveView] = useState('categories');

  const renderContent = () => {
    switch (activeView) {
      case 'categories':
        return <AdminCategories />;
      case 'subcategories':
        return <AdminSubcategories />;
      case 'products':
        return <AdminProducts />;
      case 'skus':
        return <AdminSkus />;
      case 'orders':
        return <AdminOrders />;
      default:
        return <AdminOrders />;
    }
  };

  return (
    <div className="pt-25 min-h-screen bg-gray-100 flex">
      {/* Fixed left menu */}
      
      <aside className="pt-15 w-56 border-r border-gray-200 shadow-sm z-10">
      <h1 className='text-2xl font-bold text-gray-900 mb-6 px-4'>Admin Dashboard</h1>
        <nav className="p-3 space-y-1">
          {MENU_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveView(item.id)}
              className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                activeView === item.id
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Right content area */}
      <main className="flex-1 pt-20 p-6 min-h-screen">
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;
