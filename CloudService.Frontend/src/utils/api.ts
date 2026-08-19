export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5154';

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  let token = localStorage.getItem('token');
  const headers = {
    ...options.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  let response = await fetch(url, { ...options, headers });

  if (response.status === 401 && token) {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      try {
        const refreshRes = await fetch(`${API_BASE_URL}/api/Auth/refresh`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token, refreshToken }),
        });

        if (refreshRes.ok) {
          const data = await refreshRes.json();
          localStorage.setItem('token', data.token);
          localStorage.setItem('refreshToken', data.refreshToken);
          token = data.token;

          // Retry
          const newHeaders = {
            ...options.headers,
            Authorization: `Bearer ${token}`,
          };
          response = await fetch(url, { ...options, headers: newHeaders });
        } else {
          // Refresh failed
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('demo_role');
          window.location.href = '/login';
        }
      } catch (e) {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('demo_role');
        window.location.href = '/login';
      }
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('demo_role');
      window.location.href = '/login';
    }
  }

  return response;
};
