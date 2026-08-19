'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { API_BASE_URL } from '@/utils/api';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[]; // VD: ['Admin', 'Editor']
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Xử lý BFCache của trình duyệt (Ngăn chặn việc back lại thấy nội dung cũ khi đã đăng xuất)
  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        const token = localStorage.getItem('token');
        const demoRole = localStorage.getItem('demo_role');
        if (!token && !demoRole) {
          window.location.replace('/');
        }
      }
    };
    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      const demoRole = localStorage.getItem('demo_role');

      // 1. Nếu không có token và không có demo_role, chuyển về trang chủ
      if (!token && !demoRole) {
        router.push('/');
        return;
      }

      let userRole = 'Customer';
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          userRole = payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || payload.role || 'Customer';
        } catch (e) {
          console.error("Lỗi xác thực:", e);
        }
      }

      // 2. Nếu có token, fetch API để lấy role (Nếu cần thiết, có thể bỏ qua nếu decode trực tiếp JWT)
      if (token) {
        try {
          const res = await fetch(`${API_BASE_URL}/api/Users/me`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (res.ok) {
            const data = await res.json();
            userRole = data.role || 'Customer';
          }
        } catch (e) {
          console.error("Lỗi xác thực:", e);
        }
      }

      // 3. Kiểm tra phân quyền
      if (allowedRoles && allowedRoles.length > 0) {
        if (!allowedRoles.includes(userRole)) {
          // Nếu không đủ quyền, đá ra trang chủ hoặc trang 403
          router.push('/');
          return;
        }
      }

      setIsAuthorized(true);
      setIsLoading(false);
    };

    checkAuth();
  }, [router, allowedRoles]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050c1a] text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p>Đang kiểm tra phân quyền...</p>
        </div>
      </div>
    );
  }

  return isAuthorized ? <>{children}</> : null;
}
