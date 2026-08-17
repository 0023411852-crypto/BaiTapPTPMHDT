'use client';
import React, { useEffect, useState } from 'react';

interface AuditLogDto {
  id: string;
  userId: string;
  userFullName: string;
  action: string;
  entityName: string;
  entityId: string;
  details: string;
  timestamp: string;
}

export default function LogsManager() {
  const [logs, setLogs] = useState<AuditLogDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const pageSize = 15;

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:5154/api/AuditLogs?PageNumber=${page}&PageSize=${pageSize}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          setLogs(data.items || []);
          setTotalPages(data.totalPages || 1);
          setTotalItems(data.totalCount || 0);
        }
      } catch (error) {
        console.error('Failed to fetch audit logs:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLogs();
  }, [page]);

  return (
    <div className="max-w-[1280px] mx-auto w-full flex flex-col h-full relative pb-16">
      {/* Page Header */}
      <div className="pt-8 pb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Nhật ký hệ thống</h2>
            <p className="text-gray-500 mt-2 max-w-2xl">Theo dõi và kiểm tra các hoạt động trên hệ thống hạ tầng NovaCloud. Dữ liệu chỉ đọc.</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setPage(1)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-900 hover:border-blue-500 hover:text-blue-600 transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">refresh</span>
              <span className="font-medium text-sm">Làm mới</span>
            </button>
          </div>
        </div>
      </div>

      {/* Controls / Filters Area */}
      <div className="py-4">
        <div className="bg-white backdrop-blur-xl border border-gray-200 rounded-xl p-4 flex flex-col lg:flex-row gap-4 items-end lg:items-center">
          
          {/* Search */}
          <div className="w-full lg:w-1/3 relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">search</span>
            <input 
              type="text" 
              className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-purple-500 focus:outline-none transition-shadow placeholder-slate-400" 
              placeholder="Tìm kiếm theo ID, Resource hoặc User..." 
            />
          </div>
        </div>
      </div>

      {/* Data Table Area */}
      <div className="py-4 flex-1 flex flex-col">
        <div className="bg-white backdrop-blur-xl rounded-xl overflow-hidden border border-gray-200 relative shadow-2xl flex-1 flex flex-col">
          
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-200 bg-white font-mono text-xs text-gray-500 uppercase tracking-wider shrink-0">
            <div className="col-span-3">Người thực hiện</div>
            <div className="col-span-2">Hành động</div>
            <div className="col-span-2">Bảng dữ liệu</div>
            <div className="col-span-3">Chi tiết (Details)</div>
            <div className="col-span-2 text-right">Thời gian</div>
          </div>
          
          {/* Table Body */}
          <div className="divide-y divide-gray-100 overflow-y-auto custom-scrollbar flex-1">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
              </div>
            ) : logs.length === 0 ? (
              <div className="text-center py-20 text-gray-500">
                Không có bản ghi nhật ký nào.
              </div>
            ) : (
              logs.map((log) => {
                const dateObj = new Date(log.timestamp);
                const dateStr = `${dateObj.toLocaleDateString('vi-VN')} ${dateObj.toLocaleTimeString('vi-VN')}`;
                
                let actionStyle = 'bg-gray-100 text-gray-700 border-gray-200';
                let dotColor = 'bg-gray-500';
                if (log.action.toUpperCase().includes('CREATE') || log.action.toUpperCase().includes('ADD')) {
                  actionStyle = 'bg-emerald-50 text-emerald-700 border-emerald-200';
                  dotColor = 'bg-emerald-500';
                } else if (log.action.toUpperCase().includes('UPDATE') || log.action.toUpperCase().includes('EDIT')) {
                  actionStyle = 'bg-blue-50 text-blue-700 border-blue-200';
                  dotColor = 'bg-blue-500';
                } else if (log.action.toUpperCase().includes('DELETE') || log.action.toUpperCase().includes('REMOVE')) {
                  actionStyle = 'bg-red-50 text-red-700 border-red-200';
                  dotColor = 'bg-red-500';
                } else if (log.action.toUpperCase().includes('LOGIN') || log.action.toUpperCase().includes('AUTH')) {
                  actionStyle = 'bg-purple-50 text-purple-700 border-purple-200';
                  dotColor = 'bg-purple-500';
                }

                return (
                  <div key={log.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors group">
                    <div className="col-span-3 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full border border-gray-200 bg-gray-100 flex items-center justify-center text-gray-600 font-bold shrink-0">
                        {log.userFullName.charAt(0).toUpperCase()}
                      </div>
                      <div className="overflow-hidden">
                        <div className="font-medium text-gray-900 text-sm truncate" title={log.userFullName}>{log.userFullName}</div>
                        <div className="font-mono text-[10px] text-gray-400 truncate" title={log.userId}>{log.userId.substring(0, 8)}...</div>
                      </div>
                    </div>
                    
                    <div className="col-span-2">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md border font-mono text-[10px] ${actionStyle}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`}></span>
                        {log.action}
                      </span>
                    </div>
                    
                    <div className="col-span-2 font-mono text-xs text-blue-600 truncate" title={log.entityName}>
                      {log.entityName || '-'}
                    </div>
                    
                    <div className="col-span-3 text-xs text-gray-600 truncate" title={log.details}>
                      {log.details || '-'}
                    </div>
                    
                    <div className="col-span-2 font-mono text-xs text-gray-500 text-right">
                      {dateStr}
                    </div>
                  </div>
                )
              })
            )}
          </div>

          {/* Pagination Footer */}
          {!loading && totalPages > 0 && (
            <div className="px-6 py-4 border-t border-gray-200 bg-white flex items-center justify-between shrink-0">
              <div className="text-sm text-gray-500">
                Hiển thị trang <span className="font-medium text-gray-900">{page}</span> / <span className="font-medium text-gray-900">{totalPages}</span> (Tổng: {totalItems} bản ghi)
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-1 rounded bg-gray-50 border border-gray-200 text-gray-500 hover:text-blue-600 disabled:opacity-50 transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                </button>
                <button 
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="p-1 rounded bg-gray-50 border border-gray-200 text-gray-500 hover:text-blue-600 disabled:opacity-50 transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


