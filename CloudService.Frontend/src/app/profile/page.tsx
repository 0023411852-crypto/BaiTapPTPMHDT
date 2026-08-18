'use client';
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function ProfilePage() {
  const [user, setUser] = useState<{ fullName: string; email: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const demoRole = localStorage.getItem('demo_role');
        
        if (!token) {
          if (demoRole) {
            setUser({ fullName: `Khách hàng (Demo ${demoRole})`, email: 'demo@novacloud.vn' });
          } else {
            window.location.replace('/');
            return;
          }
          setIsLoading(false);
          return;
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5154'}/api/Users/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else if (demoRole) {
          setUser({ fullName: `Khách hàng (Demo ${demoRole})`, email: 'demo@novacloud.vn' });
        }
      } catch (err) {
        console.error('Lỗi khi lấy thông tin:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const [editFullName, setEditFullName] = useState('');
  const [profileMessage, setProfileMessage] = useState('');
  const [profileError, setProfileError] = useState('');
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  useEffect(() => {
    if (user && user.fullName) {
      setEditFullName(user.fullName);
    }
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileMessage('');
    setProfileError('');
    setIsUpdatingProfile(true);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5154'}/api/Users/me/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ fullName: editFullName })
      });

      if (res.ok) {
        setProfileMessage('Cập nhật thông tin thành công!');
        setUser(prev => prev ? { ...prev, fullName: editFullName } : prev);
      } else {
        const data = await res.json();
        setProfileError(data.message || 'Lỗi khi cập nhật thông tin.');
      }
    } catch (err: any) {
      setProfileError('Lỗi kết nối server.');
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5154'}/api/Users/me/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ currentPassword: oldPassword, newPassword })
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('Đổi mật khẩu thành công!');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setError(data.message || 'Lỗi khi đổi mật khẩu.');
      }
    } catch (err: any) {
      setError('Lỗi kết nối server.');
    }
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center text-white">Đang tải...</div>;
  }

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center text-white">Vui lòng đăng nhập để xem thông tin.</div>;
  }

  return (
    <>
      <Navbar />
      <div className="bg-background min-h-screen pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <header className="mb-10 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-primary-container mb-4 tracking-tight">Hồ sơ cá nhân</h1>
              <p className="text-lg text-on-surface-variant">Quản lý thông tin tài khoản và bảo mật của bạn.</p>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* Cột trái: Thông tin cá nhân */}
          <div className="xl:col-span-7 bg-white border border-gray-200 rounded-xl overflow-hidden relative shadow-lg">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-[80px] pointer-events-none"></div>
            
            <div className="p-8 relative z-10 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">
                  <span className="material-symbols-outlined">person</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Thông tin cá nhân</h2>
              </div>
              
              <form className="flex-1 flex flex-col gap-6" onSubmit={handleUpdateProfile}>
                {profileError && <div className="text-red-600 bg-red-50 border border-red-200 p-3 rounded-lg text-sm">{profileError}</div>}
                {profileMessage && <div className="text-green-600 bg-green-50 border border-green-200 p-3 rounded-lg text-sm">{profileMessage}</div>}
                
                {/* Avatar Section */}
                <div className="flex items-center gap-6 mb-4">
                  <div className="relative w-24 h-24 rounded-full border-2 border-gray-200 overflow-hidden group">
                    <img alt="Avatar" className="w-full h-full object-cover" src={`https://ui-avatars.com/api/?name=${user.fullName.replace(' ', '+')}&background=EBF5FF&color=2563EB&size=128`} />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <span className="material-symbols-outlined text-white">photo_camera</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-semibold text-lg">Ảnh đại diện</h3>
                    <p className="text-gray-500 text-sm mb-3">PNG, JPG tối đa 2MB. Tỉ lệ 1:1.</p>
                    <button type="button" className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-sm font-semibold text-blue-600 transition-colors">
                      Tải ảnh lên
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 uppercase mb-2" htmlFor="fullName">Họ và tên</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 material-symbols-outlined text-[20px]">badge</span>
                    <input className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-12 pr-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors" id="fullName" placeholder="Nhập họ và tên" type="text" value={editFullName} onChange={(e) => setEditFullName(e.target.value)} required />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 uppercase mb-2" htmlFor="email">Địa chỉ Email</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 material-symbols-outlined text-[20px]">mail</span>
                    <input className="w-full bg-gray-100 border border-gray-200 rounded-lg pl-12 pr-4 py-3 text-gray-500 cursor-not-allowed" id="email" placeholder="Nhập email" readOnly type="email" defaultValue={user.email} />
                  </div>
                  <p className="text-xs text-gray-500 mt-2 font-mono">* Email không thể thay đổi để đảm bảo bảo mật tài khoản.</p>
                </div>
                
                <div className="mt-auto pt-6 flex justify-end border-t border-gray-100">
                  <button type="submit" disabled={isUpdatingProfile} className="w-full md:w-auto px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-70">
                    <span className="material-symbols-outlined text-[18px]">save</span>
                    {isUpdatingProfile ? 'Đang lưu...' : 'Lưu thông tin'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Cột phải: Đổi mật khẩu */}
          <div className="xl:col-span-5 bg-white border border-gray-200 rounded-xl overflow-hidden relative shadow-lg">
            <div className="p-8 relative z-10 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
                <div className="w-12 h-12 rounded-lg bg-pink-50 flex items-center justify-center text-pink-500 border border-pink-100">
                  <span className="material-symbols-outlined">lock_reset</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Đổi mật khẩu</h2>
              </div>
              
              <form className="flex-1 flex flex-col gap-5" onSubmit={handleChangePassword}>
                {error && <div className="text-red-600 bg-red-50 border border-red-200 p-3 rounded-lg text-sm">{error}</div>}
                {message && <div className="text-green-600 bg-green-50 border border-green-200 p-3 rounded-lg text-sm">{message}</div>}

                <div>
                  <label className="block text-sm font-bold text-gray-700 uppercase mb-2" htmlFor="oldPassword">Mật khẩu hiện tại</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 material-symbols-outlined text-[20px]">key</span>
                    <input className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-12 pr-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors" id="oldPassword" placeholder="••••••••" type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} required />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 uppercase mb-2" htmlFor="newPassword">Mật khẩu mới</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 material-symbols-outlined text-[20px]">lock</span>
                    <input className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-12 pr-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors" id="newPassword" placeholder="Nhập mật khẩu mới" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 uppercase mb-2" htmlFor="confirmPassword">Xác nhận mật khẩu mới</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 material-symbols-outlined text-[20px]">lock</span>
                    <input className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-12 pr-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors" id="confirmPassword" placeholder="Nhập lại mật khẩu mới" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                  </div>
                </div>
                
                <div className="mt-auto pt-6 flex justify-end">
                  <button type="submit" className="w-full md:w-auto px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors flex items-center justify-center gap-2 shadow-sm">
                    <span className="material-symbols-outlined text-[18px]">update</span>
                    Cập nhật mật khẩu
                  </button>
                </div>
              </form>
            </div>
          </div>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
}
