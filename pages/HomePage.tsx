
import React from 'react';
import { Hero } from '../components/Hero';
import { SERVICES } from '../constants';
import { Link } from 'react-router-dom';

export const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif mb-4 text-slate-900">Eating 的精選手部藝術</h2>
          <p className="text-slate-500 italic">每一款設計均由主理人親自操刀，專注於手部凝膠美學</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map(service => (
            <div key={service.id} className="group cursor-pointer">
              <div className="overflow-hidden rounded-2xl mb-4 h-64 shadow-sm group-hover:shadow-xl transition-all border border-slate-100">
                <img 
                  src={service.imageUrl} 
                  alt={service.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100" 
                />
              </div>
              <h3 className="font-serif text-xl mb-1 text-slate-800">{service.name}</h3>
              <p className="text-pdn-plum font-semibold mb-2">NT$ {service.price} 起</p>
              <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/gallery" className="text-pdn-plum font-bold hover:underline tracking-widest text-sm">查看作品集 GALLERY →</Link>
        </div>
      </section>

      <section className="bg-pdn-soft py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <img 
              src="https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=2070&auto=format&fit=crop" 
              alt="PDN Studio Interior" 
              className="rounded-3xl shadow-2xl grayscale-[20%] hover:grayscale-0 transition-all duration-700"
            />
          </div>
          <div className="flex-1 space-y-6">
            <h2 className="text-4xl font-serif text-slate-900">專屬於您的美學空間</h2>
            <p className="text-slate-600 leading-relaxed">
              位於台中北屯，PDN 提供一對一預約制的安靜環境。我們專精於【手部凝膠美甲】，不分心於足部或 SPA，只為將手部藝術做到極致。
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-slate-700">
                <span className="text-pdn-plum">✦</span> 100% 預約制，保障您的專屬時段
              </li>
              <li className="flex items-center gap-2 text-slate-700">
                <span className="text-pdn-plum">✦</span> 嚴選高品質無毒凝膠品牌
              </li>
              <li className="flex items-center gap-2 text-slate-700">
                <span className="text-pdn-plum">✦</span> 主理人 Eating 親自溝通設計
              </li>
            </ul>
            <div className="pt-4">
               <p className="text-sm font-semibold text-slate-800">地址：406臺中市北屯區軍福七路36號</p>
               <p className="text-sm text-slate-500">營業時間：週一至週日 10:00 - 19:00</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
