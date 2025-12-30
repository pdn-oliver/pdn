
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
          <h2 className="text-4xl font-serif mb-4 text-slate-900">精選服務</h2>
          <p className="text-slate-500">PDN 專業手部美甲技術，滿足您所有的需求</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map(service => (
            <div key={service.id} className="group cursor-pointer">
              <div className="overflow-hidden rounded-2xl mb-4 h-64 shadow-sm group-hover:shadow-xl transition-all">
                <img 
                  src={service.imageUrl} 
                  alt={service.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
              </div>
              <h3 className="font-serif text-xl mb-1 text-slate-800">{service.name}</h3>
              <p className="text-pdn-plum font-semibold mb-2">NT$ {service.price}</p>
              <p className="text-slate-500 text-sm line-clamp-2">{service.description}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/services" className="text-pdn-plum font-bold hover:underline">查看所有服務 →</Link>
        </div>
      </section>

      <section className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <img 
              src="https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=2070&auto=format&fit=crop" 
              alt="PDN Studio Interior" 
              className="rounded-3xl shadow-2xl"
            />
          </div>
          <div className="flex-1 space-y-6">
            <h2 className="text-4xl font-serif text-slate-900">極致舒適的環境</h2>
            <p className="text-slate-600 leading-relaxed">
              PDN 在台中北屯為您保留一片寧靜。柔和的燈光、優雅的音樂、與高品質的專業凝膠產品，讓美甲不再只是服務，而是一場專屬於您的美學旅程。
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-slate-700">
                <span className="text-pdn-plum">✔</span> 全店使用高品質無毒凝膠
              </li>
              <li className="flex items-center gap-2 text-slate-700">
                <span className="text-pdn-plum">✔</span> 嚴格執行工具高溫消毒
              </li>
              <li className="flex items-center gap-2 text-slate-700">
                <span className="text-pdn-plum">✔</span> 全預約制，提供完整專屬時段
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};
