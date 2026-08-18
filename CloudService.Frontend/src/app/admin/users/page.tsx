'use client';
import React, { useEffect, useState } from 'react';

export default function UserManager() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showLockDialog, setShowLockDialog] = useState<string | null>(null);
  
  // Add User State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({ fullName: '', email: '', password: '', role: 'Customer' });
  const [isAdding, setIsAdding] = useState(false);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5154'}/api/Users?PageNumber=1&PageSize=50`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUsers(data.data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUpdateStatus = async (userId: string, currentIsActive: boolean) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5154'}/api/Users/${userId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ isActive: !currentIsActive })
      });
      if (res.ok) {
        alert('Cập nhật trạng thái thành công');
        setShowLockDialog(null);
        fetchUsers();
      } else {
        alert('Cập nhật thất bại');
      }
    } catch (err) {
      console.error(err);
      alert('Lỗi kết nối');
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdding(true);
    try {
      // Gọi API đăng ký (Auth/register)
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5154'}/api/Auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName: newUser.fullName, email: newUser.email, password: newUser.password })
      });
      
      if (res.ok) {
        alert('Thêm người dùng thành công!');
        setShowAddModal(false);
        setNewUser({ fullName: '', email: '', password: '', role: 'Customer' });
        fetchUsers();
      } else {
        const data = await res.json();
        alert(data.message || 'Thêm thất bại');
      }
    } catch (err) {
      console.error(err);
      alert('Lỗi kết nối');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto w-full flex flex-col gap-8">
      <div className="flex items-center justify-between mt-8 mb-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-1">
            Quản lý Người dùng
          </h2>
          <p className="text-gray-500">Kiểm soát truy cập, vai trò và trạng thái tài khoản hệ thống.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded bg-gray-300 border border-gray-200 hover:bg-gray-50 hover:border-blue-400 transition-all flex items-center gap-2 text-sm font-medium text-gray-900 shadow-sm"
        >
          <span className="material-symbols-outlined text-[18px]">person_add</span>
          Thêm Người dùng
        </button>
      </div>

      <div className="bg-white backdrop-blur-xl border border-gray-200 rounded-xl flex-1 flex flex-col relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
        <div className="overflow-x-auto min-h-[300px]">
          {isLoading ? (
            <div className="flex items-center justify-center h-full text-gray-500">Đang tải dữ liệu...</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500 font-mono text-xs uppercase bg-white tracking-wider">
                  <th className="px-6 py-4 font-medium">Họ tên</th>
                  <th className="px-6 py-4 font-medium">Email</th>
                  <th className="px-6 py-4 font-medium">Vai trò</th>
                  <th className="px-6 py-4 font-medium">Trạng thái (Khóa)</th>
                  <th className="px-6 py-4 font-medium text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(167,139,250,0.15)] text-sm">
                {users.length === 0 ? (
                  <tr><td colSpan={5} className="text-center py-8 text-gray-500">Không có người dùng nào.</td></tr>
                ) : (
                  users.map((u: any) => (
                    <tr key={u.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-blue-600 font-bold text-xs uppercase">
                            {u.fullName?.substring(0, 2)}
                          </div>
                          <span className="font-medium text-gray-900">{u.fullName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500">{u.email}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2 py-1 rounded bg-indigo-500/10 text-indigo-400 font-mono text-[10px] border border-indigo-500/20">
                          {u.role || 'Customer'}
                        </span>
                      </td>
                      <td className="px-6 py-4 relative">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={u.isActive} 
                            onChange={() => setShowLockDialog(u.id)}
                            disabled={u.role === 'Admin'}
                          />
                          <div className={`w-9 h-5 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all ${u.isActive ? 'peer-checked:bg-blue-600' : 'bg-red-500/50'} ${u.role === 'Admin' ? 'opacity-50 cursor-not-allowed' : ''}`}></div>
                        </label>
                        
                        {showLockDialog === u.id && (
                          <div className="absolute left-16 top-1/2 -translate-y-1/2 z-20 bg-gray-300/90 backdrop-blur-xl border border-gray-200 shadow-sm rounded-lg p-3 w-56 animate-in fade-in zoom-in-95 origin-left duration-200">
                            <div className="flex items-start gap-2 mb-2">
                              <span className="material-symbols-outlined text-red-500 text-[18px]">warning</span>
                              <p className="text-xs text-gray-900 font-medium leading-tight">Bạn có chắc muốn {u.isActive ? 'khóa' : 'mở khóa'} tài khoản này?</p>
                            </div>
                            <div className="flex gap-2 justify-end mt-3">
                              <button onClick={() => setShowLockDialog(null)} className="px-2 py-1 rounded text-xs text-gray-500 hover:text-gray-900 hover:bg-[#2a3b5c]">Hủy</button>
                              <button onClick={() => handleUpdateStatus(u.id, u.isActive)} className="px-2 py-1 rounded text-xs bg-red-500/20 text-red-500 border border-red-500/30 hover:bg-red-500/30">Xác nhận</button>
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-1 rounded text-gray-500 hover:text-blue-600 hover:bg-purple-500/10 transition-colors opacity-0 group-hover:opacity-100">
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
        <div className="mt-auto border-t border-gray-200 p-4 bg-white flex items-center justify-between text-sm">
          <span className="text-gray-500">Hiển thị danh sách</span>
        </div>
      </div>

      {/* Modal Thêm Người Dùng */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-auto">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setShowAddModal(false)}></div>
          <div className="bg-white rounded-xl shadow-2xl border border-gray-200 w-full max-w-md relative z-10 animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50 rounded-t-xl">
              <h3 className="text-lg font-bold text-gray-900">Thêm Người dùng Mới</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-900">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleAddUser} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Họ và Tên</label>
                <input required type="text" value={newUser.fullName} onChange={e => setNewUser({...newUser, fullName: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="Nhập họ tên" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input required type="email" value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="Nhập email" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
                <input required type="password" value={newUser.password} onChange={e => setNewUser({...newUser, password: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="Mật khẩu ít nhất 6 ký tự" minLength={6} />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">Hủy</button>
                <button type="submit" disabled={isAdding} className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50">
                  {isAdding ? 'Đang tạo...' : 'Tạo tài khoản'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

