'use client';
import React, { useEffect, useState } from 'react';

export default function AffiliateManager() {
  const [applications, setApplications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5154/api/AffiliateApplications?PageNumber=1&PageSize=50', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setApplications(data.data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      const token = localStorage.getItem('token');
      const statusInt = status === 'Approved' ? 1 : status === 'Rejected' ? 2 : 0;
      const res = await fetch(`http://localhost:5154/api/AffiliateApplications/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: statusInt })
      });
      if (res.ok) {
        alert(`Đã cập nhật trạng thái thành ${status}`);
        fetchApplications();
      } else {
        alert('Cập nhật thất bại');
      }
    } catch (err) {
      console.error(err);
      alert('Lỗi kết nối');
    }
  };

  return (
    <div className="max-w-[1280px] mx-auto w-full flex flex-col h-full relative">
      <div className="mb-8 flex justify-between items-end mt-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Quản lý đăng ký Affiliate</h2>
          <p className="text-gray-500">Xét duyệt và quản lý các đối tác tham gia chương trình tiếp thị liên kết.</p>
        </div>
      </div>

      <div className="bg-white backdrop-blur-xl border border-gray-200 rounded-xl overflow-hidden shadow-2xl flex-1 flex flex-col">
        <div className="overflow-x-auto flex-1 min-h-[300px]">
          {isLoading ? (
            <div className="flex items-center justify-center h-full text-gray-500">Đang tải dữ liệu...</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-white">
                  <th className="py-4 px-6 font-mono text-xs text-gray-500 uppercase tracking-wider">Khách hàng</th>
                  <th className="py-4 px-6 font-mono text-xs text-gray-500 uppercase tracking-wider">Website / Kênh</th>
                  <th className="py-4 px-6 font-mono text-xs text-gray-500 uppercase tracking-wider">Trạng thái</th>
                  <th className="py-4 px-6 font-mono text-xs text-gray-500 uppercase tracking-wider">Ngày đăng ký</th>
                  <th className="py-4 px-6 font-mono text-xs text-gray-500 uppercase tracking-wider text-right">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(167,139,250,0.15)] text-sm">
                {applications.length === 0 ? (
                  <tr><td colSpan={5} className="text-center py-8 text-gray-500">Không có đơn đăng ký nào.</td></tr>
                ) : (
                  applications.map(app => (
                    <tr key={app.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-blue-600 font-bold text-xs border border-gray-200">
                            {app.userName ? app.userName.substring(0, 2).toUpperCase() : 'U'}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{app.userName || 'Unknown'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <a href={app.websiteUrl} target="_blank" className="text-blue-600 hover:underline">{app.websiteUrl || 'N/A'}</a>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-mono text-[10px] border ${app.status?.toLowerCase() === 'approved' ? 'bg-green-500/10 text-green-400 border-green-500/20' : app.status?.toLowerCase() === 'rejected' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'}`}>
                          {app.status || 'Pending'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-500">{new Date(app.createdAt).toLocaleDateString('vi-VN')}</td>
                      <td className="py-4 px-6 text-right">
                        {app.status?.toLowerCase() === 'pending' ? (
                          <div className="flex justify-end gap-2">
                            <button onClick={() => handleUpdateStatus(app.id, 'Approved')} className="px-3 py-1.5 rounded-md bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20 transition-colors text-xs font-medium flex items-center gap-1">
                              <span className="material-symbols-outlined text-[14px]">check</span> Duyệt
                            </button>
                            <button onClick={() => handleUpdateStatus(app.id, 'Rejected')} className="px-3 py-1.5 rounded-md bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 transition-colors text-xs font-medium flex items-center gap-1">
                              <span className="material-symbols-outlined text-[14px]">close</span> Từ chối
                            </button>
                          </div>
                        ) : (
                          <span className="text-gray-400 italic">Đã xử lý</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
        <div className="border-t border-gray-200 p-4 flex items-center justify-between bg-white">
          <span className="text-sm text-gray-500">Hiển thị danh sách đăng ký Affiliate</span>
        </div>
      </div>
    </div>
  );
}

