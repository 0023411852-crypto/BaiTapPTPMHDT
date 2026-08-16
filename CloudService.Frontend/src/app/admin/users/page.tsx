'use client';
import React, { useEffect, useState } from 'react';

export default function UserManager() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showLockDialog, setShowLockDialog] = useState<string | null>(null);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5154/api/Users?PageNumber=1&PageSize=50', {
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
      const res = await fetch(`http://localhost:5154/api/Users/${userId}/status`, {
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

  return (
    <div className="max-w-7xl mx-auto w-full flex flex-col gap-8">
      <div className="flex items-center justify-between mt-8 mb-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-1">
            Quản lý Người dùng
          </h2>
          <p className="text-slate-400">Kiểm soát truy cập, vai trò và trạng thái tài khoản hệ thống.</p>
        </div>
        <button className="px-4 py-2 rounded bg-[#1a2c47] border border-[rgba(99,179,255,0.12)] hover:bg-white/5 hover:border-blue-400 transition-all flex items-center gap-2 text-sm font-medium text-white shadow-sm">
          <span className="material-symbols-outlined text-[18px]">person_add</span>
          Thêm Người dùng
        </button>
      </div>

      <div className="bg-[#0f1d35]/80 backdrop-blur-xl border border-[rgba(99,179,255,0.12)] rounded-xl flex-1 flex flex-col relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
        <div className="overflow-x-auto min-h-[300px]">
          {isLoading ? (
            <div className="flex items-center justify-center h-full text-slate-400">Đang tải dữ liệu...</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[rgba(99,179,255,0.12)] text-slate-400 font-mono text-xs uppercase bg-[#0a1628]/50 tracking-wider">
                  <th className="px-6 py-4 font-medium">Họ tên</th>
                  <th className="px-6 py-4 font-medium">Email</th>
                  <th className="px-6 py-4 font-medium">Vai trò</th>
                  <th className="px-6 py-4 font-medium">Trạng thái (Khóa)</th>
                  <th className="px-6 py-4 font-medium text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(99,179,255,0.12)] text-sm">
                {users.length === 0 ? (
                  <tr><td colSpan={5} className="text-center py-8 text-slate-400">Không có người dùng nào.</td></tr>
                ) : (
                  users.map((u: any) => (
                    <tr key={u.id} className="hover:bg-white/5 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold text-xs uppercase">
                            {u.fullName?.substring(0, 2)}
                          </div>
                          <span className="font-medium text-white">{u.fullName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-400">{u.email}</td>
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
                          <div className={`w-9 h-5 bg-[#1a2c47] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all ${u.isActive ? 'peer-checked:bg-blue-600' : 'bg-red-500/50'} ${u.role === 'Admin' ? 'opacity-50 cursor-not-allowed' : ''}`}></div>
                        </label>
                        
                        {showLockDialog === u.id && (
                          <div className="absolute left-16 top-1/2 -translate-y-1/2 z-20 bg-[#1a2c47]/90 backdrop-blur-xl border border-[rgba(99,179,255,0.15)] shadow-[0_0_15px_rgba(99,179,255,0.3)] rounded-lg p-3 w-56 animate-in fade-in zoom-in-95 origin-left duration-200">
                            <div className="flex items-start gap-2 mb-2">
                              <span className="material-symbols-outlined text-red-500 text-[18px]">warning</span>
                              <p className="text-xs text-white font-medium leading-tight">Bạn có chắc muốn {u.isActive ? 'khóa' : 'mở khóa'} tài khoản này?</p>
                            </div>
                            <div className="flex gap-2 justify-end mt-3">
                              <button onClick={() => setShowLockDialog(null)} className="px-2 py-1 rounded text-xs text-slate-400 hover:text-white hover:bg-[#2a3b5c]">Hủy</button>
                              <button onClick={() => handleUpdateStatus(u.id, u.isActive)} className="px-2 py-1 rounded text-xs bg-red-500/20 text-red-500 border border-red-500/30 hover:bg-red-500/30">Xác nhận</button>
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-1 rounded text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 transition-colors opacity-0 group-hover:opacity-100">
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
        <div className="mt-auto border-t border-[rgba(99,179,255,0.12)] p-4 bg-[#0a1628]/50 flex items-center justify-between text-sm">
          <span className="text-slate-400">Hiển thị danh sách</span>
        </div>
      </div>
    </div>
  );
}
