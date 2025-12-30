
import React, { useState } from 'react';
import { GALLERY_IMAGES } from '../constants';

export const GalleryPage: React.FC = () => {
  const [filter, setFilter] = useState('全部');
  const tags = ['全部', ...Array.from(new Set(GALLERY_IMAGES.map(img => img.tag)))];
  
  const filteredImages = filter === '全部' 
    ? GALLERY_IMAGES 
    : GALLERY_IMAGES.filter(img => img.tag === filter);

  return (
    <div className="bg-white min-h-screen py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif mb-4 text-slate-900">PDN 作品集</h1>
          <p className="text-slate-500 max-w-lg mx-auto leading-relaxed">
            每一款設計都是 Eating 精心雕琢的指尖藝術。<br />
            從細膩的人物手繪到質感的石紋暈染，為您呈現最純粹的美學。
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                filter === tag 
                ? 'bg-pdn-plum text-white shadow-lg' 
                : 'bg-slate-100 text-slate-600 hover:bg-rose-50'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
            <div 
              key={image.id} 
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-slate-100 shadow-sm hover:shadow-xl transition-all"
            >
              <img 
                src={image.url} 
                alt={image.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-rose-200 text-xs font-bold uppercase tracking-widest mb-1">{image.tag}</span>
                <h3 className="text-white font-serif text-lg">{image.title}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-pdn-soft rounded-3xl p-12 text-center border border-rose-100">
          <h2 className="text-3xl font-serif mb-6 text-pdn-plum">尋找您的專屬風格</h2>
          <p className="text-slate-600 mb-8">立即透過 LINE 或系統預約，讓 PDN 為您創造指尖上的藝術。</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#/booking" 
              className="bg-pdn-plum text-white px-10 py-4 rounded-full font-bold hover:bg-[#6e2a3a] transition-all shadow-xl shadow-rose-100"
            >
              線上系統預約
            </a>
            <a 
              href="https://line.me/R/ti/p/@957qhped?oat__id=4910615#~" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-pdn-plum border border-pdn-plum px-10 py-4 rounded-full font-bold hover:bg-rose-50 transition-all"
            >
              LINE 客服預約
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
