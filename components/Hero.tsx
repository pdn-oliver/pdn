
import React from 'react';
import { Link } from 'react-router-dom';

export const Hero: React.FC = () => {
  return (
    <div className="relative h-[80vh] flex items-center overflow-hidden bg-pdn-soft">
      <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block">
        <img 
          src="https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1974&auto=format&fit=crop" 
          alt="PDN Nail Art" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-pdn-soft"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="max-w-2xl">
          <span className="text-pdn-plum font-semibold tracking-widest uppercase text-sm mb-4 block">PDN PROFESSIONAL NAIL ART</span>
          <h1 className="text-5xl md:text-7xl font-serif text-slate-900 leading-tight mb-6">
            指尖上的 <br />
            <span className="italic text-pdn-plum">藝術</span>
          </h1>
          <p className="text-slate-600 text-lg mb-8 max-w-lg leading-relaxed">
            由我們為您創造。將美學與護理完美結合，為您打造專屬的精緻美甲，在細節中展現獨特品味。
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/booking" 
              className="bg-pdn-plum text-white px-8 py-4 rounded-full font-bold hover:bg-[#6e2a3a] transition-all text-center shadow-xl shadow-rose-100"
            >
              預約服務
            </Link>
            <Link 
              to="/ai-stylist" 
              className="bg-white text-pdn-plum border border-pdn-plum px-8 py-4 rounded-full font-bold hover:bg-rose-50 transition-all text-center flex items-center justify-center gap-2"
            >
              ✨ AI 風格建議
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
