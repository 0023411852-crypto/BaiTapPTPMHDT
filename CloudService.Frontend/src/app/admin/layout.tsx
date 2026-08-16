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

  // Load role from localStorage on mount (optional integration with login)
  useEffect(() => {
    const savedRole = localStorage.getItem('demo_role');
    if (savedRole === 'Editor' || savedRole === 'Admin') {
      setRole(savedRole);
    }
  }, []);

  // Define menu items and their allowed roles
  const menuItems = [
    { name: 'Tổng quan', path: '/admin', icon: 'dashboard', roles: ['Admin'] },
    { name: 'Dịch vụ', path: '/admin/services', icon: 'cloud_queue', roles: ['Admin'] },
    { name: 'Người dùng', path: '/admin/users', icon: 'group', roles: ['Admin'] },
    { name: 'Đơn hàng', path: '/admin/orders', icon: 'receipt_long', roles: ['Admin', 'Editor'] },
    { name: 'Tin tức', path: '/admin/news', icon: 'article', roles: ['Admin', 'Editor'] },
    { name: 'Đối tác (Affiliate)', path: '/admin/affiliates', icon: 'handshake', roles: ['Admin', 'Editor'] },
    { name: 'Khuyến mãi', path: '/admin/promotions', icon: 'local_offer', roles: ['Admin'] },
    { name: 'Nhật ký hệ thống', path: '/admin/logs', icon: 'manage_search', roles: ['Admin'] },
  ];

  const filteredMenu = menuItems.filter(item => item.roles.includes(role));

  return (
    <ProtectedRoute allowedRoles={['Admin', 'Editor']}>
    <div className="flex h-screen overflow-hidden bg-[#02050A] text-slate-300 font-sans">
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      
      {/* SideNavBar */}
      <nav className="h-screen w-64 fixed left-0 top-0 border-r border-[rgba(99,179,255,0.12)] bg-[#0a1628]/80 backdrop-blur-xl shadow-lg flex flex-col py-4 z-50">
        <div className="px-6 mb-6">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-blue-500" data-icon="cloud">cloud</span>
            NovaCloud
          </h1>
          <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-semibold">Console</p>
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
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${highlight ? 'bg-blue-500/10 text-blue-400 border-l-4 border-blue-500' : 'text-slate-400 hover:text-white hover:bg-white/5 border-l-4 border-transparent'}`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                {item.name}
              </Link>
            )
          })}
        </div>
        
        <div className="px-4 mt-auto pt-4 border-t border-[rgba(99,179,255,0.12)]">
          <Link href="/login" className="flex items-center gap-3 px-4 py-2 text-red-400 hover:bg-red-500/10 transition-colors duration-200 rounded-lg text-sm font-bold">
            <span className="material-symbols-outlined text-[20px]">logout</span>
            Đăng xuất
          </Link>
        </div>
      </nav>

      {/* Main Content Wrapper */}
      <div className="flex-1 ml-64 flex flex-col h-screen relative">
        {/* TopNavBar */}
        <header className="h-16 fixed top-0 right-0 left-64 border-b border-[rgba(99,179,255,0.12)] backdrop-blur-xl bg-[#0a1628]/80 flex justify-between items-center px-6 z-40">
          <div className="flex items-center gap-4">
            <span className="text-xl font-bold text-white">Quản trị Hệ thống</span>
          </div>
          
          <div className="flex items-center gap-4">
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${role === 'Admin' ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400'}`}>
              Quyền: {role}
            </span>
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 overflow-hidden border border-[rgba(99,179,255,0.12)]">
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
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 8px; height: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.02); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.2); }
      `}} />
    </div>
    </ProtectedRoute>
  );
}
