'use client';

import type React from 'react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  CubeIcon,
  ChartBarIcon,
  UserIcon,
  ShoppingCartIcon,
  ShieldCheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';

const navItems = [
  { name: 'Dashboard', icon: HomeIcon, path: '/' },
  { name: 'Categories', icon: CubeIcon, path: '/categories' },
  { name: 'Products', icon: CubeIcon, path: '/products' },
  { name: 'Statistics', icon: ChartBarIcon, path: '/statistics' },
  { name: 'Accounts', icon: UserIcon, path: '/accounts' },
  { name: 'Orders', icon: ShoppingCartIcon, path: '/orders' },
  { name: 'Roles & Permissions', icon: ShieldCheckIcon, path: '/roles' },
];

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div
      className={`bg-gray-900 text-white transition-all duration-300 ease-in-out ${
        collapsed ? 'w-20' : 'w-64'
      } min-h-screen`}
    >
      <div className='p-4 flex justify-between items-center'>
        {!collapsed && <h1 className='text-2xl font-bold'>Admin</h1>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className='p-2 rounded-full hover:bg-gray-800 transition-colors duration-200'
        >
          {collapsed ? (
            <ChevronRightIcon className='w-6 h-6' />
          ) : (
            <ChevronLeftIcon className='w-6 h-6' />
          )}
        </button>
      </div>
      <nav className='mt-8'>
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center px-4 py-3 transition-colors duration-200 ${
              location.pathname === item.path
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <item.icon
              className={`w-6 h-6 ${collapsed ? 'mx-auto' : 'mr-4'}`}
            />
            {!collapsed && <span>{item.name}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
