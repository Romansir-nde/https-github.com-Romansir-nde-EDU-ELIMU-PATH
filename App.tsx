
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Link, useLocation } from 'react-router-dom';
import { Phone, MessageSquare, GraduationCap, Menu, X, Terminal, ArrowLeft, ArrowUpRight, ArrowRight, ShieldCheck } from 'lucide-react';
import Landing from './pages/Landing';
import Universities from './pages/Universities';
import GradeInput from './pages/GradeInput';
import Results from './pages/Results';
import AdminDashboard from './pages/AdminDashboard';
import { CONTACT_PHONE } from './constants';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const triggerHaptic = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(40);
    }
  };

  const toggleMenu = () => {
    triggerHaptic();
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const openWhatsApp = () => {
    window.open(`https://wa.me/${CONTACT_PHONE}`, '_blank');
  };

  const isHome = location.pathname === '/';

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  return (
    <div className="min-h-screen flex flex-col bg-black overflow-x-hidden selection:bg-red-600 selection:text-white">
      <ScrollToTop />
      
      {/* SYSTEM STATUS BAR */}
      <div className="bg-red-600 text-white text-[9px] font-black py-2 px-4 md:px-6 flex justify-between items-center sticky top-0 z-[200] shadow-2xl uppercase tracking-[0.2em]">
        <div className="flex items-center gap-4 md:gap-6">
          <span className="flex items-center gap-1.5"><Phone size={10} /> {CONTACT_PHONE}</span>
          <span className="hidden sm:inline-block opacity-30">|</span>
          <span className="hidden sm:inline-block flex items-center gap-1.5"><ShieldCheck size={10} /> SAFARICOM REAL-TIME API SYNCED</span>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <Link to="/admin" className="flex items-center gap-1.5 hover:bg-white hover:text-black transition-all bg-black/20 px-3 py-1 rounded-md border border-white/10">
            <Terminal size={10} /> ADMIN
          </Link>
          <button onClick={openWhatsApp} className="hover:text-black transition-colors hidden xs:block">
            LIVE SUPPORT
          </button>
        </div>
      </div>

      {/* Navigation Header */}
      <header className="border-b border-white/5 bg-black/60 backdrop-blur-2xl sticky top-[28px] z-[190]">
        <nav className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4 md:gap-6">
            {!isHome && (
              <button 
                onClick={() => { triggerHaptic(); navigate(-1); }}
                className="p-3 bg-white/5 border border-white/10 rounded-xl text-red-600 hover:bg-red-600 hover:text-white transition-all group cursor-pointer"
                title="Go Back"
              >
                <ArrowLeft size={18} md:size={20} className="group-hover:-translate-x-1 transition-transform" />
              </button>
            )}
            <Link to="/" onClick={closeMenu} className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-600/20 group-hover:rotate-12 transition-transform">
                <GraduationCap className="text-white" size={24} />
              </div>
              <span className="text-xl md:text-2xl font-black tracking-tighter uppercase text-white">EDU <span className="text-red-600">PATH</span></span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-10 text-[11px] font-black uppercase tracking-[0.2em]">
            <Link to="/" className={`transition-all hover:text-red-500 ${location.pathname === '/' ? 'text-red-600' : 'text-gray-400'}`}>Home</Link>
            <Link to="/universities" className={`transition-all hover:text-red-500 ${location.pathname === '/universities' ? 'text-red-600' : 'text-gray-400'}`}>Universities</Link>
            <Link to="/grade-input" className={`transition-all hover:text-red-500 ${location.pathname === '/grade-input' ? 'text-red-600' : 'text-gray-400'}`}>Course Matcher</Link>
            <button 
              onClick={() => { triggerHaptic(); navigate('/grade-input'); }}
              className="bg-red-600 text-white px-6 py-3 rounded-xl font-black hover:bg-white hover:text-black transition-all shadow-xl active:scale-95 flex items-center gap-2 relative overflow-hidden group cursor-pointer"
            >
              <span className="relative z-10">GET STARTED</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <ArrowUpRight size={16} className="relative z-10" />
            </button>
          </div>

          <button 
            className="md:hidden text-white p-3 hover:bg-white/5 rounded-xl transition-all cursor-pointer z-[210]" 
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>

        {/* Mobile Menu Backdrop */}
        {isMenuOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[170] animate-in fade-in duration-300"
            onClick={closeMenu}
          />
        )}

        {/* Mobile Menu Content */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-x-0 top-[108px] bg-black/95 backdrop-blur-3xl border-b border-white/5 p-6 md:p-10 flex flex-col gap-4 animate-in slide-in-from-top-10 duration-500 z-[180] h-auto rounded-b-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <Link 
              to="/" 
              onClick={closeMenu} 
              className={`text-2xl font-black uppercase tracking-tighter py-5 border-b border-white/5 flex justify-between items-center group transition-colors ${location.pathname === '/' ? 'text-red-600' : 'text-white'}`}
            >
              Home <ArrowRight size={20} className="text-red-600 group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link 
              to="/universities" 
              onClick={closeMenu} 
              className={`text-2xl font-black uppercase tracking-tighter py-5 border-b border-white/5 flex justify-between items-center group transition-colors ${location.pathname === '/universities' ? 'text-red-600' : 'text-white'}`}
            >
              Registry <ArrowRight size={20} className="text-red-600 group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link 
              to="/grade-input" 
              onClick={closeMenu} 
              className={`text-2xl font-black uppercase tracking-tighter py-5 border-b border-white/5 flex justify-between items-center group transition-colors ${location.pathname === '/grade-input' ? 'text-red-600' : 'text-white'}`}
            >
              Merit Matcher <ArrowRight size={20} className="text-red-600 group-hover:translate-x-2 transition-transform" />
            </Link>
            <button 
              onClick={() => { triggerHaptic(); navigate('/grade-input'); closeMenu(); }}
              className="bg-red-600 text-white w-full py-5 rounded-2xl font-black text-lg mt-6 shadow-2xl shadow-red-600/20 active:scale-95 transition-all cursor-pointer"
            >
              ANALYZE MY MERIT NOW
            </button>
            <p className="text-center text-[8px] font-black text-gray-700 uppercase tracking-[0.5em] mt-4">EDU PATH SECURITY CORE 2025</p>
          </div>
        )}
      </header>

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/universities" element={<Universities />} />
          <Route path="/grade-input" element={<GradeInput />} />
          <Route path="/results" element={<Results />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>

      <footer className="bg-black border-t border-white/5 pt-20 md:pt-32 pb-12 md:pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-10">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
                  <GraduationCap className="text-white" size={24} />
                </div>
                <span className="text-2xl font-black tracking-tighter uppercase text-white">EDU <span className="text-red-600">PATH</span></span>
             </div>
             <p className="text-gray-600 font-black text-[9px] md:text-[10px] uppercase tracking-[0.4em] max-w-xs md:max-w-none">Kenya National Admissions Authority Independent Hub</p>
             <div className="flex gap-6 md:gap-8 text-[10px] font-black text-gray-500 uppercase tracking-widest">
               <Link to="/admin" className="hover:text-red-600">Admin</Link>
               <a href="#" className="hover:text-red-600">Privacy</a>
               <a href="#" className="hover:text-red-600">Support</a>
             </div>
          </div>
          <div className="mt-12 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[8px] font-black text-gray-800 uppercase tracking-[0.3em]">
             <span>© 2025 EDU PATH KENYA. ALL RIGHTS RESERVED.</span>
             <span>POWERED BY GEMINI 2.5 NATIVE MULTIMODAL ENGINE</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
