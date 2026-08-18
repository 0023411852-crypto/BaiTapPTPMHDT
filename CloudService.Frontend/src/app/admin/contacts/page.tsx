'use client';
import React, { useEffect, useState } from 'react';

interface ContactDto {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function ContactsManager() {
  const [contacts, setContacts] = useState<ContactDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<ContactDto | null>(null);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5154'}/api/Contacts`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        // Backend returns Ok(contacts) directly or ApiResponse depending on wrapping.
        // As per task instructions, we should check if data.data exists or just use data
        setContacts(data.data || data || []);
      }
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const openDrawer = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5154'}/api/Contacts/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setSelectedContact(data.data || data);
      }
    } catch (error) {
      console.error('Failed to fetch contact details:', error);
    }
  };

  const closeDrawer = () => {
    setSelectedContact(null);
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5154'}/api/Contacts/${id}/mark-as-read`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        alert('Đã đánh dấu là đã đọc!');
        fetchContacts();
        if (selectedContact?.id === id) {
          setSelectedContact(prev => prev ? { ...prev, isRead: true } : prev);
        }
      }
    } catch (error) {
      console.error('Lỗi khi đánh dấu đã đọc:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa liên hệ này?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5154'}/api/Contacts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        alert('Xóa liên hệ thành công!');
        fetchContacts();
        if (selectedContact?.id === id) {
          closeDrawer();
        }
      }
    } catch (error) {
      console.error('Lỗi khi xóa liên hệ:', error);
    }
  };

  return (
    <div className="max-w-[1280px] mx-auto w-full flex flex-col h-full relative">
      {/* Header Section */}
      <div className="pt-8 pb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Yêu cầu Liên hệ</h2>
            <p className="text-gray-500 mt-2 max-w-2xl">Quản lý và phản hồi các yêu cầu hỗ trợ từ khách hàng.</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={fetchContacts} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-900 hover:border-blue-500 hover:text-blue-600 transition-colors">
              <span className="material-symbols-outlined text-[20px]">refresh</span>
              <span className="font-medium text-sm">Làm mới</span>
            </button>
          </div>
        </div>
      </div>

      {/* Data Table Area */}
      <div className="py-4 flex-1 flex flex-col">
        <div className="bg-white backdrop-blur-xl rounded-xl overflow-hidden border border-gray-200 relative shadow-2xl flex-1 flex flex-col">
          
          <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-200 bg-white font-mono text-xs text-gray-500 uppercase tracking-wider shrink-0">
            <div className="col-span-3">Khách hàng</div>
            <div className="col-span-3">Chủ đề</div>
            <div className="col-span-2">Ngày gửi</div>
            <div className="col-span-2">Trạng thái</div>
            <div className="col-span-2 text-right">Hành động</div>
          </div>
          
          <div className="divide-y divide-gray-100 overflow-y-auto custom-scrollbar flex-1">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
              </div>
            ) : contacts.length === 0 ? (
              <div className="text-center py-20 text-gray-500">
                Không có liên hệ nào.
              </div>
            ) : (
              contacts.map(contact => (
                <div 
                  key={contact.id}
                  className={`grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors group ${!contact.isRead ? 'bg-blue-50/20' : ''}`}
                >
                  <div className="col-span-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full border border-gray-200 bg-gray-100 flex items-center justify-center text-gray-600 font-bold shrink-0">
                      {contact.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="overflow-hidden">
                      <div className="font-medium text-gray-900 text-sm truncate" title={contact.name}>{contact.name}</div>
                      <div className="font-mono text-[10px] text-gray-400 truncate" title={contact.email}>{contact.email}</div>
                    </div>
                  </div>
                  
                  <div className="col-span-3">
                    <div className="font-medium text-sm text-gray-700 truncate" title={contact.subject || 'Không có chủ đề'}>
                      {contact.subject || 'Không có chủ đề'}
                    </div>
                  </div>
                  
                  <div className="col-span-2 font-mono text-xs text-gray-500">
                    {new Date(contact.createdAt).toLocaleDateString('vi-VN')}
                  </div>

                  <div className="col-span-2">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md border font-mono text-[10px] ${contact.isRead ? 'bg-gray-100 text-gray-700 border-gray-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${contact.isRead ? 'bg-gray-400' : 'bg-yellow-500'}`}></span>
                      {contact.isRead ? 'Đã đọc' : 'Chưa đọc'}
                    </span>
                  </div>
                  
                  <div className="col-span-2 flex justify-end gap-2">
                    <button onClick={() => openDrawer(contact.id)} className="text-gray-500 hover:text-blue-600 p-1 bg-gray-50 border border-gray-200 rounded shadow-sm hover:border-blue-500 transition-colors">
                      <span className="material-symbols-outlined text-[16px]">visibility</span>
                    </button>
                    <button onClick={() => handleDelete(contact.id)} className="text-gray-500 hover:text-red-600 p-1 bg-gray-50 border border-gray-200 rounded shadow-sm hover:border-red-500 transition-colors">
                      <span className="material-symbols-outlined text-[16px]">delete</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Drawer Details */}
      {selectedContact && (
        <div className="fixed inset-0 z-50 pointer-events-none flex justify-end">
          <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm pointer-events-auto" onClick={closeDrawer}></div>
          <div className="relative w-[550px] max-w-[90vw] bg-white backdrop-blur-3xl border-l border-gray-200 shadow-2xl flex flex-col pointer-events-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-start shrink-0">
              <div>
                <h3 className="text-xl text-gray-900 font-bold mb-1">Chi tiết liên hệ</h3>
                <p className="font-mono text-gray-500 text-sm">#{selectedContact.id.substring(0,8).toUpperCase()}</p>
              </div>
              <button onClick={closeDrawer} className="w-8 h-8 rounded-full bg-gray-50 text-gray-500 hover:text-gray-900 flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-mono text-gray-400 uppercase text-[10px] mb-1">Người gửi</h4>
                    <p className="font-medium text-gray-900">{selectedContact.name}</p>
                  </div>
                  <div>
                    <h4 className="font-mono text-gray-400 uppercase text-[10px] mb-1">Thời gian</h4>
                    <p className="text-gray-900 text-sm">{new Date(selectedContact.createdAt).toLocaleString('vi-VN')}</p>
                  </div>
                  <div className="col-span-2">
                    <h4 className="font-mono text-gray-400 uppercase text-[10px] mb-1">Email liên hệ</h4>
                    <p className="text-blue-600 font-mono text-sm">{selectedContact.email}</p>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="font-mono text-gray-400 uppercase text-[10px] mb-2">Chủ đề</h4>
                  <p className="font-semibold text-gray-900">{selectedContact.subject || 'N/A'}</p>
                </div>
                
                <div>
                  <h4 className="font-mono text-gray-400 uppercase text-[10px] mb-2">Nội dung tin nhắn</h4>
                  <div className="bg-white border border-gray-200 rounded-lg p-4 text-gray-700 text-sm whitespace-pre-wrap leading-relaxed">
                    {selectedContact.message}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 bg-white flex gap-3 justify-end shrink-0">
              <button onClick={() => handleDelete(selectedContact.id)} className="px-5 py-2.5 rounded-lg border border-red-500/50 text-red-500 text-sm hover:bg-red-500/10 transition-colors font-medium">
                Xóa liên hệ
              </button>
              {!selectedContact.isRead && (
                <button onClick={() => handleMarkAsRead(selectedContact.id)} className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-colors">
                  Đánh dấu đã đọc
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
