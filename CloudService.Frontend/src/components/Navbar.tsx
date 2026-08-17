'use client';

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const navLinks = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Dịch vụ', href: '/services' },
  { label: 'Bảng giá', href: '/pricing' },
  { label: 'Tin tức', href: '/news' },
  { label: 'Đối tác', href: '/affiliate' },
  { label: 'Liên hệ', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [user, setUser] = useState<{ fullName: string; role: string } | null>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const router = useRouter()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)

    // Check click outside dropdown
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      const demoRole = localStorage.getItem('demo_role');
      if (token) {
        try {
          const res = await fetch('http://localhost:5154/api/Users/me', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (res.ok) {
            const data = await res.json();
            setUser({ fullName: data.fullName, role: data.role || 'Customer' });
          } else if (demoRole) {
            setUser({ fullName: `Demo ${demoRole}`, role: demoRole });
          } else {
            setUser(null);
          }
        } catch (e) {
          if (demoRole) setUser({ fullName: `Demo ${demoRole}`, role: demoRole });
          else setUser(null);
        }
      } else if (demoRole) {
        setUser({ fullName: `Demo ${demoRole}`, role: demoRole });
      } else {
        setUser(null);
      }
    };
    fetchUser();

    // Lắng nghe sự kiện BFCache (Khi bấm nút Back trên trình duyệt)
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        fetchUser(); // Cập nhật lại Navbar ngay lập tức
      }
    };
    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('demo_role');
    setUser(null);
    setDropdownOpen(false);
    window.location.href = '/';
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0, 0, 0, 0.1)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 rounded-lg btn-glow opacity-80 group-hover:opacity-100 transition-opacity" />
            <div className="relative w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)' }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 2L15.5 6V12L9 16L2.5 12V6L9 2Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M9 2V16M2.5 6L15.5 12M15.5 6L2.5 12" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
              </svg>
            </div>
          </div>
          <span className="text-lg font-bold tracking-tight text-primary-container">
            Nimbus<span className="text-secondary-container">Cloud</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-primary-container rounded-lg transition-all duration-200 hover:bg-black/5"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* User / CTA buttons */}
        <div className="hidden md:flex items-center gap-3 relative">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 pl-3 pr-4 py-1.5 rounded-full border transition-all duration-200 hover:bg-white/5"
                style={{ borderColor: 'rgba(99, 179, 255, 0.2)' }}
              >
                <div className="w-8 h-8 rounded-full overflow-hidden border border-[rgba(99,179,255,0.3)]">
                  <img src={`https://ui-avatars.com/api/?name=${user.fullName.replace(' ', '+')}&background=0D8ABC&color=fff`} alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-bold text-primary-container leading-tight">{user.fullName}</span>
                  <span className="text-[10px] text-secondary-container font-mono tracking-wider uppercase">{user.role}</span>
                </div>
                <svg className={`w-4 h-4 text-slate-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 glass rounded-xl border border-[rgba(99,179,255,0.15)] shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col py-2 z-50">
                  <div className="px-4 py-2 border-b border-white/5 mb-1">
                    <p className="text-xs text-slate-400">Đăng nhập dưới dạng</p>
                    <p className="text-sm font-bold text-white truncate">{user.fullName}</p>
                  </div>

                  {user.role === 'Admin' || user.role === 'Editor' ? (
                    <Link href="/admin" className="px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-blue-500/10 flex items-center gap-2 transition-colors">
                      <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      Bảng điều khiển Admin
                    </Link>
                  ) : null}

                  <Link href="/profile" className="px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 flex items-center gap-2 transition-colors">
                    <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    Hồ sơ cá nhân
                  </Link>
                  <Link href="/my-orders" className="px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 flex items-center gap-2 transition-colors">
                    <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                    Đơn hàng
                  </Link>
                  <div className="h-px bg-white/5 my-1 mx-2"></div>
                  <button onClick={handleLogout} className="px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 flex items-center gap-2 transition-colors text-left w-full">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-lg border transition-all duration-200"
                style={{ borderColor: 'rgba(99, 179, 255, 0.25)', background: 'transparent' }}
                onMouseEnter={e => {
                  ; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(99, 179, 255, 0.6)'
                    ; (e.currentTarget as HTMLElement).style.background = 'rgba(59, 130, 246, 0.08)'
                }}
                onMouseLeave={e => {
                  ; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(99, 179, 255, 0.25)'
                    ; (e.currentTarget as HTMLElement).style.background = 'transparent'
                }}
              >
                Đăng nhập
              </Link>
              <Link
                href="/register"
                className="btn-glow px-5 py-2 text-sm font-semibold text-white rounded-lg"
              >
                Đăng ký
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 text-slate-300 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            {mobileOpen ? (
              <path d="M4 4L18 18M4 18L18 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M3 6H19M3 11H19M3 16H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass border-t border-white/5">
          <div className="px-6 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-2.5 text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            {user ? (
              <>
                <Link href="/profile" className="px-4 py-2 text-sm font-medium text-slate-300 rounded-lg hover:bg-white/5 transition-colors">Hồ sơ</Link>
                <Link href="/my-orders" className="px-4 py-2 text-sm font-medium text-slate-300 rounded-lg hover:bg-white/5 transition-colors">Đơn hàng</Link>
                <button onClick={handleLogout} className="px-4 py-2 text-sm font-medium text-red-400 text-left rounded-lg hover:bg-red-500/10 transition-colors">Đăng xuất</button>
              </>
            ) : (
              <>
                <Link href="/login" className="px-4 py-2.5 text-sm font-medium text-slate-300 text-center rounded-lg border border-white/15">Đăng nhập</Link>
                <Link href="/register" className="btn-glow px-4 py-2.5 text-sm font-semibold text-white text-center rounded-lg">Đăng ký</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
