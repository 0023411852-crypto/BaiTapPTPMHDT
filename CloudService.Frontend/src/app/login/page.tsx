'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Login() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    
    vec2 orb1_pos = vec2(sin(t * 0.7), cos(t * 0.5)) * 0.5;
    float orb1 = 0.2 / length(p - orb1_pos);
    vec3 col1 = vec3(0.13, 0.83, 0.93) * orb1;
    
    vec2 orb2_pos = vec2(cos(t * 0.4), sin(t * 0.8)) * 0.5;
    float orb2 = 0.2 / length(p - orb2_pos);
    vec3 col2 = vec3(0.31, 0.27, 0.9) * orb2;
    
    vec3 bg = vec3(0.02, 0.05, 0.1);
    vec3 finalColor = bg + col1 * 0.4 + col2 * 0.4;
    
    float grain = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
    finalColor += (grain - 0.5) * 0.02;
    
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
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col relative overflow-hidden font-body-md antialiased dark">
      {/* Background Shader */}
      <div className="absolute inset-0 w-full h-full -z-10" style={{ display: 'block' }}>
        <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }}></canvas>
      </div>
      
      <div className="absolute inset-0 bg-background/80 -z-10"></div>
      
      {/* TopNavBar */}
      <header className="flex justify-between items-center w-full px-8 md:px-16 py-6 max-w-none bg-transparent backdrop-blur-md relative z-10">
        <Link href="/" className="text-2xl font-bold text-on-surface">NovaCloud</Link>
        <div className="flex gap-6"></div>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-300">Quay lại Trang chủ</Link>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow flex flex-col md:flex-row items-center justify-center w-full max-w-7xl mx-auto px-6 md:px-16 relative z-10 py-12 gap-12">
        {/* Left Column: Branding */}
        <div className="hidden md:flex flex-col flex-1 items-start justify-center pr-12 animate-float">
          <div className="w-24 h-24 mb-6 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)' }}>
            <svg width="48" height="48" viewBox="0 0 18 18" fill="none">
              <path d="M9 2L15.5 6V12L9 16L2.5 12V6L9 2Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M9 2V16M2.5 6L15.5 12M15.5 6L2.5 12" stroke="white" strokeWidth="1" strokeOpacity="0.5"/>
            </svg>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4 leading-tight font-display">
            Chào mừng trở lại<br/>tương lai của Cloud
          </h1>
          <p className="text-lg text-on-surface-variant max-w-md">
            Hạ tầng được thiết kế chính xác cho kỷ nguyên số. Tốc độ, đáng tin cậy và linh hoạt.
          </p>
        </div>
        
        {/* Right Column: Login Form */}
        <div className="w-full max-w-md flex-1">
          <div className="glass-panel rounded-2xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-2 font-display">Đăng nhập</h2>
              <p className="text-sm text-on-surface-variant">Nhập thông tin của bạn để truy cập bảng điều khiển.</p>
            </div>
            
            <form className="space-y-6 flex flex-col">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-on-surface-variant tracking-wide uppercase mb-1" htmlFor="email">Email</label>
                <div className="input-field rounded-t-lg px-4 py-3 flex items-center gap-3 relative">
                  <svg className="w-5 h-5 text-outline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  <input className="w-full bg-transparent border-none focus:ring-0 text-white placeholder:text-outline-variant outline-none" id="email" placeholder="name@company.com" type="email"/>
                </div>
              </div>
              
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-on-surface-variant tracking-wide uppercase" htmlFor="password">Mật khẩu</label>
                  <a className="text-xs font-semibold text-primary hover:text-primary-fixed transition-colors" href="#">Quên mật khẩu?</a>
                </div>
                <div className="input-field rounded-t-lg px-4 py-3 flex items-center gap-3 relative">
                  <svg className="w-5 h-5 text-outline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                  <input className="w-full bg-transparent border-none focus:ring-0 text-white placeholder:text-outline-variant outline-none" id="password" placeholder="••••••••" type="password"/>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <input className="rounded bg-surface-container border-outline-variant text-primary focus:ring-primary/50" id="remember" type="checkbox"/>
                <label className="text-sm font-medium text-on-surface-variant" htmlFor="remember">Ghi nhớ đăng nhập</label>
              </div>
              
              <button className="accent-gradient text-white w-full py-4 rounded-xl font-bold shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:scale-[1.02] hover:-translate-y-[2px] transition-all duration-300" type="button">
                Đăng nhập
              </button>
            </form>
            
            <div className="mt-8 flex items-center gap-4">
              <div className="h-px bg-white/10 flex-1"></div>
              <span className="text-xs text-outline font-semibold uppercase">Hoặc tiếp tục với</span>
              <div className="h-px bg-white/10 flex-1"></div>
            </div>
            
            <div className="mt-6 flex gap-4">
              <button className="flex-1 glass-panel hover:bg-white/10 transition-colors py-2.5 rounded-xl flex items-center justify-center gap-2 border border-outline-variant">
                <svg aria-hidden="true" className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" fillRule="evenodd"></path>
                </svg>
                <span className="text-sm font-semibold text-on-surface">GitHub</span>
              </button>
              <button className="flex-1 glass-panel hover:bg-white/10 transition-colors py-2.5 rounded-xl flex items-center justify-center gap-2 border border-outline-variant">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                </svg>
                <span className="text-sm font-semibold text-on-surface">Google</span>
              </button>
            </div>
            
            <p className="mt-8 text-center text-sm font-medium" style={{ color: 'var(--color-on-surface-variant)' }}>
              Chưa có tài khoản? <Link href="/register" className="font-bold hover:underline transition-all" style={{ color: 'var(--color-primary)' }}>Đăng ký ngay</Link>
            </p>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="flex justify-between items-center w-full px-6 md:px-16 py-6 border-t border-white/5 relative z-10 mt-auto">
        <p className="text-xs text-on-surface-variant">© 2026 NovaCloud Infrastructure.</p>
        <div className="flex gap-4">
          <a className="text-xs text-on-surface-variant hover:text-on-surface transition-colors" href="#">Privacy</a>
          <a className="text-xs text-on-surface-variant hover:text-on-surface transition-colors" href="#">Terms</a>
        </div>
      </footer>
    </div>
  );
}
