'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ProtectedRoute from '../../components/ProtectedRoute';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [role, setRole] = useState<'Admin' | 'Editor'>('Admin');
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userRole = payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || payload.role || 'Admin';
        if (userRole === 'Editor' || userRole === 'Admin') {
          setRole(userRole as any);
        }
      } catch(e) {
        console.error('Invalid token', e);
      }
    }
  }, []);

  // Define menu items and their allowed roles
  const menuItems = [
    { name: 'Tổng quan', path: '/admin', icon: 'dashboard', roles: ['Admin'] },
    { name: 'Dịch vụ', path: '/admin/services', icon: 'cloud_queue', roles: ['Admin'] },
    { name: 'Người dùng', path: '/admin/users', icon: 'group', roles: ['Admin'] },
    { name: 'Đơn hàng', path: '/admin/orders', icon: 'receipt_long', roles: ['Admin', 'Editor'] },
    { name: 'Tin tức', path: '/admin/news', icon: 'article', roles: ['Admin', 'Editor'] },
    { name: 'Đối tác', path: '/admin/affiliates', icon: 'handshake', roles: ['Admin', 'Editor'] },
    { name: 'Nhật ký hệ thống', path: '/admin/logs', icon: 'manage_search', roles: ['Admin'] },
    { name: 'Liên hệ', path: '/admin/contacts', icon: 'contact_support', roles: ['Admin', 'Editor'] },
  ];

  const filteredMenu = menuItems.filter(item => item.roles.includes(role));

  return (
    <ProtectedRoute allowedRoles={['Admin', 'Editor']}>
      <div className="flex h-screen overflow-hidden bg-gray-50 text-gray-600 font-sans">
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

        {/* SideNavBar */}
        <nav className="h-screen w-64 fixed left-0 top-0 border-r border-gray-200 bg-white backdrop-blur-xl shadow-sm flex flex-col py-4 z-50">
          <div className="px-6 mb-6">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-600" data-icon="cloud">cloud</span>
              NovaCloud
            </h1>
            <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-semibold">Console</p>
          </div>

          <div className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar">
            {filteredMenu.map((item) => {
              const isActive = pathname === item.path || pathname?.startsWith(`${item.path}/`);
              // Exact match for dashboard to avoid highlighting it for every /admin/* route
              const isExactlyActive = pathname === item.path;
              const highlight = item.path === '/admin' ? isExactlyActive : isActive;

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${highlight ? 'bg-purple-500/15 text-purple-300 border-l-4 border-blue-500 shadow-sm' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50 border-transparent'}`}
                >
                  <span className="material-symbols-outlined">{item.icon}</span>
                  {item.name}
                </Link>
              )
            })}
          </div>

          <div className="px-4 mt-auto pt-4 border-t border-gray-200">
            <button 
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
              }}
              className="flex items-center w-full gap-3 px-4 py-2 text-red-400 hover:bg-red-500/10 transition-colors duration-200 rounded-lg text-sm font-bold"
            >
              <span className="material-symbols-outlined text-[20px]">logout</span>
              Đăng xuất
            </button>
          </div>
        </nav>

        {/* Main Content Wrapper */}
        <div className="flex-1 ml-64 flex flex-col h-screen relative">
          {/* TopNavBar */}
          <header className="h-16 fixed top-0 right-0 left-64 border-b border-gray-200 backdrop-blur-xl bg-white flex justify-between items-center px-6 z-40">
            <div className="flex items-center gap-4">
              <span className="text-xl font-bold text-gray-900">Quản trị Hệ thống</span>
            </div>

            <div className="flex items-center gap-4">
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${role === 'Admin' ? 'bg-purple-500/10 border-blue-500 text-blue-600' : 'bg-cyan-50 border-cyan-200 text-cyan-700'}`}>
                Quyền: {role}
              </span>
              <div className="h-8 w-8 rounded-full bg-blue-600 overflow-hidden border border-gray-200 shadow-sm">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBI20lgjZSuFKNQZ3YaHpAw67JTowQbfU2YNWk27a3rNmkHdbtG6olA3my0bQzAikKxaXunHQnKsrnIcoN0XZUooEeR_Ai0Xn7HUs1LVtUrvEUCiUkcHFWmJ32lCX4ua1EAKwb2mkWgFizdephVFaBsV6MzzYF0I8nobr-y6FZATZN23WAF32mdYTwdk_uOPq0eo_S0ajyOsemOvsxFhlaULPeXbUCksOOEbQeT9mVq1Dw7uUQF1LHXLw"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </header>

          {/* Main Scrollable Area */}
          <main className="flex-1 overflow-y-auto pt-16 pb-8 px-6 relative z-10 custom-scrollbar">
            {children}
          </main>
        </div>

        <style dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 8px; height: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.02); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0, 0, 0, 0.1); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(0, 0, 0, 0.2); }
      `}} />
      </div>
    </ProtectedRoute>
  );
}

