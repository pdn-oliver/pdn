
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { label: '首頁', path: '/' },
    { label: '服務項目', path: '/services' },
    { label: '作品集', path: '/gallery' },
    { label: 'AI 美甲師', path: '/ai-stylist' },
    { label: '預約記錄', path: '/my-bookings' }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-rose-100 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex flex-col items-start">
          <span className="text-2xl font-serif font-bold text-pdn-plum tracking-tighter leading-none">
            PDN <span className="font-sans font-medium text-lg">專業美甲</span>
          </span>
          <span className="text-[10px] font-sans font-light uppercase tracking-[0.2em] text-slate-400 mt-1">
            Since 2023
          </span>
        </Link>
        <div className="hidden md:flex space-x-8">
          {navItems.map(item => (
            <Link 
              key={item.path} 
              to={item.path}
              className={`text-sm font-medium transition-colors hover:text-pdn-plum ${
                location.pathname === item.path ? 'text-pdn-plum border-b-2 border-pdn-plum' : 'text-slate-600'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <Link 
          to="/booking" 
          className="bg-pdn-plum text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-[#6e2a3a] transition-all shadow-lg shadow-rose-100"
        >
          立即預約
        </Link>
      </div>
    </nav>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-slate-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-xl font-serif mb-2">PDN 專業美甲</h3>
            <p className="text-xs text-rose-300 italic mb-4">指尖上的藝術，由我們為您創造</p>
            <p className="text-slate-400 text-sm leading-relaxed">
              自 2023 年創立以來，PDN 致力於提供最精緻的手部美甲藝術，讓每一位顧客都能在優雅的環境中感受自信與美麗。
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">營業資訊</h4>
            <p className="text-slate-400 text-sm italic mb-2">全店採用預約制</p>
            <p className="text-slate-400 text-sm">週一至週日 10:00 - 19:00</p>
            <p className="text-slate-400 text-sm mt-2 font-medium text-white">406臺中市北屯區軍福七路36號</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">追蹤我們</h4>
            <div className="flex flex-col space-y-3">
              <a href="https://www.instagram.com/eating_ce/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm">
                <span className="w-5">📸</span> Instagram: eating_ce
              </a>
              <a href="https://line.me/R/ti/p/@957qhped?oat__id=4910615#~" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm">
                <span className="w-5">💬</span> LINE: @957qhped
              </a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-slate-500 text-xs">
          © 2023-2024 PDN 專業美甲. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};
