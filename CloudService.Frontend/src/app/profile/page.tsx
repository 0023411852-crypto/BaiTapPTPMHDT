'use client';
import React, { useEffect, useState } from 'react';

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
          }
          setIsLoading(false);
          return;
        }

        const res = await fetch('http://localhost:5154/api/Users/me', {
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
      const res = await fetch('http://localhost:5154/api/Users/me/password', {
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
    <div className="container mx-auto px-4 py-20 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Hồ sơ cá nhân</h1>
          <p className="text-lg text-slate-400">Quản lý thông tin tài khoản và bảo mật của bạn.</p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* Cột trái: Thông tin cá nhân */}
          <div className="xl:col-span-7 bg-[#0f1d35]/80 backdrop-blur-xl border border-[rgba(99,179,255,0.12)] rounded-xl overflow-hidden relative shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none"></div>
            
            <div className="p-8 relative z-10 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-[rgba(99,179,255,0.12)]">
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                  <span className="material-symbols-outlined">person</span>
                </div>
                <h2 className="text-2xl font-bold text-white">Thông tin cá nhân</h2>
              </div>
              
              <form className="flex-1 flex flex-col gap-6">
                {/* Avatar Section */}
                <div className="flex items-center gap-6 mb-4">
                  <div className="relative w-24 h-24 rounded-full border-2 border-[rgba(99,179,255,0.3)] overflow-hidden group">
                    <img alt="Avatar" className="w-full h-full object-cover" src={`https://ui-avatars.com/api/?name=${user.fullName.replace(' ', '+')}&background=0D8ABC&color=fff&size=128`} />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <span className="material-symbols-outlined text-white">photo_camera</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">Ảnh đại diện</h3>
                    <p className="text-slate-400 text-sm mb-3">PNG, JPG tối đa 2MB. Tỉ lệ 1:1.</p>
                    <button type="button" className="px-4 py-2 rounded-lg border border-[rgba(99,179,255,0.3)] hover:bg-white/5 text-sm font-semibold text-blue-400 transition-colors">
                      Tải ảnh lên
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-400 uppercase mb-2" htmlFor="fullName">Họ và tên</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-[20px]">badge</span>
                    <input className="w-full bg-[#0a1628]/50 border border-[rgba(99,179,255,0.12)] rounded-lg pl-12 pr-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors" id="fullName" placeholder="Nhập họ và tên" type="text" defaultValue={user.fullName} readOnly />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-slate-400 uppercase mb-2" htmlFor="email">Địa chỉ Email</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 material-symbols-outlined text-[20px]">mail</span>
                    <input className="w-full bg-[#050c1a]/80 border border-[rgba(99,179,255,0.05)] rounded-lg pl-12 pr-4 py-3 text-slate-500 cursor-not-allowed" id="email" placeholder="Nhập email" readOnly type="email" defaultValue={user.email} />
                  </div>
                  <p className="text-xs text-slate-500 mt-2 font-mono">* Email không thể thay đổi để đảm bảo bảo mật tài khoản.</p>
                </div>
              </form>
            </div>
          </div>

          {/* Cột phải: Đổi mật khẩu */}
          <div className="xl:col-span-5 bg-[#0f1d35]/80 backdrop-blur-xl border border-[rgba(99,179,255,0.12)] rounded-xl overflow-hidden relative shadow-2xl">
            <div className="p-8 relative z-10 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-[rgba(99,179,255,0.12)]">
                <div className="w-12 h-12 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-500 border border-pink-500/20">
                  <span className="material-symbols-outlined">lock_reset</span>
                </div>
                <h2 className="text-2xl font-bold text-white">Đổi mật khẩu</h2>
              </div>
              
              <form className="flex-1 flex flex-col gap-5" onSubmit={handleChangePassword}>
                {error && <div className="text-red-500 bg-red-500/10 p-3 rounded">{error}</div>}
                {message && <div className="text-green-500 bg-green-500/10 p-3 rounded">{message}</div>}

                <div>
                  <label className="block text-sm font-bold text-slate-400 uppercase mb-2" htmlFor="oldPassword">Mật khẩu hiện tại</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-[20px]">key</span>
                    <input className="w-full bg-[#0a1628]/50 border border-[rgba(99,179,255,0.12)] rounded-lg pl-12 pr-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors" id="oldPassword" placeholder="••••••••" type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} required />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-slate-400 uppercase mb-2" htmlFor="newPassword">Mật khẩu mới</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-[20px]">lock</span>
                    <input className="w-full bg-[#0a1628]/50 border border-[rgba(99,179,255,0.12)] rounded-lg pl-12 pr-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors" id="newPassword" placeholder="Nhập mật khẩu mới" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-slate-400 uppercase mb-2" htmlFor="confirmPassword">Xác nhận mật khẩu mới</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-[20px]">lock</span>
                    <input className="w-full bg-[#0a1628]/50 border border-[rgba(99,179,255,0.12)] rounded-lg pl-12 pr-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors" id="confirmPassword" placeholder="Nhập lại mật khẩu mới" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                  </div>
                </div>
                
                <div className="mt-auto pt-6 flex justify-end">
                  <button type="submit" className="w-full md:w-auto px-6 py-3 rounded-lg border border-[rgba(99,179,255,0.3)] bg-white/5 hover:bg-white/10 text-blue-400 font-bold transition-colors flex items-center justify-center gap-2">
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
  );
}
