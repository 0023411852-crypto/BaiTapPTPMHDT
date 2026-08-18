'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Register() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (password !== confirmPassword) {
      setError('Mật khẩu nhập lại không khớp.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5154'}/api/Auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Đăng ký thất bại');
      }
      
      setSuccess('Đăng ký thành công! Đang chuyển hướng...');
      setTimeout(() => {
        router.push('/login');
      }, 1500);
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function syncSize() {
      const w = canvas?.clientWidth || 1280;
      const h = canvas?.clientHeight || 720;
      if (canvas && (canvas.width !== w || canvas.height !== h)) {
        canvas.width = w;
        canvas.height = h;
      }
    }
    
    const resizeObserver = new ResizeObserver(syncSize);
    resizeObserver.observe(canvas);
    syncSize();

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext;
    if (!gl) return;

    const vs = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;
    const fs = `precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
varying vec2 v_texCoord;

void main() {
    vec2 uv = v_texCoord;
    vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
    
    float t = u_time * 0.2;
    
    vec3 bg = vec3(0.97, 0.98, 1.0); // Nền sáng
    vec3 finalColor = bg;
    
    vec2 orb1_pos = vec2(sin(t * 0.7), cos(t * 0.5)) * 0.6;
    float orb1 = 0.5 / (length(p - orb1_pos) + 0.5);
    vec3 col1 = vec3(0.2, 0.6, 1.0);
    
    vec2 orb2_pos = vec2(cos(t * 0.4), sin(t * 0.8)) * 0.6;
    float orb2 = 0.5 / (length(p - orb2_pos) + 0.5);
    vec3 col2 = vec3(0.0, 0.8, 1.0);
    
    finalColor = mix(finalColor, col1, orb1 * 0.15);
    finalColor = mix(finalColor, col2, orb2 * 0.15);
    
    float grain = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
    finalColor += (grain - 0.5) * 0.03;
    
    gl_FragColor = vec4(finalColor, 1.0);
}`;

    function cs(type: number, src: string) {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    }

    const prog = gl.createProgram();
    if (!prog) return;
    const vShader = cs(gl.VERTEX_SHADER, vs);
    const fShader = cs(gl.FRAGMENT_SHADER, fs);
    if (vShader) gl.attachShader(prog, vShader);
    if (fShader) gl.attachShader(prog, fShader);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    
    const pos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
    
    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes = gl.getUniformLocation(prog, 'u_resolution');
    const uMouse = gl.getUniformLocation(prog, 'u_mouse');

    const mouse = { x: canvas.width / 2, y: canvas.height / 2 };
    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        const nx = (event.clientX - rect.left) / rect.width;
        const ny = 1.0 - (event.clientY - rect.top) / rect.height;
        mouse.x = nx * canvas.width;
        mouse.y = ny * canvas.height;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;
    function render(t: number) {
      if (typeof ResizeObserver === 'undefined') syncSize();
      gl.viewport(0, 0, canvas!.width, canvas!.height);
      if (uTime) gl.uniform1f(uTime, t * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas!.width, canvas!.height);
      if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    }
    render(0);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col font-sans overflow-hidden bg-background">
      {/* WebGL Background */}
      <div className="absolute inset-0 z-0">
        <canvas ref={canvasRef} className="w-full h-full block pointer-events-none" />
      </div>
      
      <div className="absolute inset-0 bg-white/40 -z-10 backdrop-blur-[2px]"></div>
      
      {/* Header */}
      <header className="flex justify-between items-center w-full px-6 md:px-16 py-4 bg-transparent backdrop-blur-md relative z-10 hidden md:flex">
        <div className="text-2xl font-bold text-on-surface font-display">NovaCloud</div>
        <div className="flex gap-6"></div>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-300">
            Quay lại Trang chủ
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col md:flex-row items-center justify-center w-full max-w-7xl mx-auto px-4 md:px-16 relative z-10 py-12 gap-12">
        
        {/* Left Column */}
        <div className="hidden md:flex flex-col flex-1 items-start justify-center pr-12 animate-float">
          <div className="w-24 h-24 mb-6 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)' }}>
            <svg width="48" height="48" viewBox="0 0 18 18" fill="none">
              <path d="M9 2L15.5 6V12L9 16L2.5 12V6L9 2Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M9 2V16M2.5 6L15.5 12M15.5 6L2.5 12" stroke="white" strokeWidth="1" strokeOpacity="0.5"/>
            </svg>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight font-display">
            Chào mừng trở lại<br/>tương lai của Cloud
          </h1>
          <p className="text-lg text-gray-600 max-w-md">
            Hạ tầng được thiết kế chính xác cho kỷ nguyên số. Tốc độ, đáng tin cậy và linh hoạt.
          </p>
        </div>

        {/* Right Column: Register Form */}
        <div className="w-full max-w-md flex-1">
          <div className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2 font-display">Đăng ký</h2>
              <p className="text-sm text-gray-500">Tạo tài khoản mới để trải nghiệm dịch vụ.</p>
            </div>
            
            <form className="space-y-4 flex flex-col" onSubmit={handleRegister}>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg">
                  {error}
                </div>
              )}
              {success && (
                <div className="bg-green-50 border border-green-200 text-green-600 text-sm p-3 rounded-lg">
                  {success}
                </div>
              )}

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-600 tracking-wide uppercase mb-1" htmlFor="fullName">Họ và Tên</label>
                <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 flex items-center gap-3 relative focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                  <input className="w-full bg-transparent border-none focus:ring-0 text-gray-900 placeholder:text-gray-400 outline-none" id="fullName" placeholder="Nguyễn Văn A" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-600 tracking-wide uppercase mb-1" htmlFor="email">Email</label>
                <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 flex items-center gap-3 relative focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  <input className="w-full bg-transparent border-none focus:ring-0 text-gray-900 placeholder:text-gray-400 outline-none" id="email" placeholder="name@company.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
              </div>
              
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-gray-600 tracking-wide uppercase" htmlFor="password">Mật khẩu</label>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 flex items-center gap-3 relative focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                  <input className="w-full bg-transparent border-none focus:ring-0 text-gray-900 placeholder:text-gray-400 outline-none" id="password" placeholder="••••••••" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-gray-600 transition-colors">
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>
                    )}
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-gray-600 tracking-wide uppercase" htmlFor="confirmPassword">Nhập lại mật khẩu</label>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 flex items-center gap-3 relative focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                  <input className="w-full bg-transparent border-none focus:ring-0 text-gray-900 placeholder:text-gray-400 outline-none" id="confirmPassword" placeholder="••••••••" type={showPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>
              </div>
              
              <div className="flex items-center gap-2 mt-2">
                <input className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" id="terms" type="checkbox" required/>
                <label className="text-sm font-medium text-gray-600" htmlFor="terms">Đồng ý với điều khoản dịch vụ</label>
              </div>
              
              <button disabled={isLoading} className="bg-blue-600 text-white w-full py-4 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-all duration-300 disabled:opacity-50 mt-4" type="submit">
                {isLoading ? 'Đang xử lý...' : 'Tạo tài khoản'}
              </button>
            </form>
            
            <div className="mt-8 flex items-center gap-4">
              <div className="h-px bg-gray-200 flex-1"></div>
              <span className="text-xs text-gray-400">Hoặc tiếp tục với</span>
              <div className="h-px bg-gray-200 flex-1"></div>
            </div>
            
            <div className="mt-6 flex gap-4">
              <button className="flex-1 bg-white hover:bg-gray-50 transition-all duration-300 py-3 rounded-xl flex items-center justify-center gap-2 border border-gray-200 shadow-sm">
                <svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path></svg>
                <span className="text-sm font-medium text-gray-700">GitHub</span>
              </button>
              <button className="flex-1 bg-white hover:bg-gray-50 transition-all duration-300 py-3 rounded-xl flex items-center justify-center gap-2 border border-gray-200 shadow-sm">
                <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path></svg>
                <span className="text-sm font-medium text-gray-700">Google</span>
              </button>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">Đã có tài khoản? <Link className="text-blue-600 hover:text-blue-700 transition-colors font-bold" href="/login">Đăng nhập</Link></p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="flex flex-col md:flex-row justify-between items-center w-full px-6 md:px-16 py-6 gap-6 bg-transparent border-t border-white/5 relative z-10 mt-auto">
        <p className="text-sm text-on-surface-variant text-center md:text-left">© 2024 NovaCloud Infrastructure. Thiết kế chính xác cho Kỷ nguyên số.</p>
        <div className="flex gap-6">
          <a className="text-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#">Chính sách bảo mật</a>
          <a className="text-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#">Điều khoản dịch vụ</a>
        </div>
      </footer>
    </div>
  );
}
