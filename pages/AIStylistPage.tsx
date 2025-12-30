
import React, { useState, useRef } from 'react';
import { getAIStylistRecommendation } from '../services/geminiService';
import { AIRecommendation } from '../types';

export const AIStylistPage: React.FC = () => {
  const [input, setInput] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<AIRecommendation | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!input && !image) return;
    setLoading(true);
    try {
      const result = await getAIStylistRecommendation(input, image || undefined);
      setRecommendation(result);
    } catch (error) {
      console.error(error);
      alert('AI 暫時無法連線，請稍後再試。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-pdn-soft min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif mb-4 text-slate-900">PDN AI 智慧美甲師</h1>
          <p className="text-slate-600">上傳您的穿搭照片或輸入心情，讓 AI 為您推薦最適合的風格。</p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl space-y-8 border border-rose-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-slate-700">上傳參考照片 (選填)</label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-rose-200 rounded-2xl h-64 flex flex-col items-center justify-center cursor-pointer hover:bg-rose-50 transition-all overflow-hidden"
              >
                {image ? (
                  <img src={image} className="w-full h-full object-cover" alt="Preview" />
                ) : (
                  <div className="text-center p-4">
                    <span className="text-4xl mb-2 block">📸</span>
                    <p className="text-sm text-slate-400">點擊上傳穿搭、手部或參考圖</p>
                  </div>
                )}
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                className="hidden" 
                accept="image/*"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-semibold text-slate-700">描述您的需求</label>
              <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="例如：我這週末要去參加戶外婚禮，穿著淡藍色洋裝，想要清新自然的風格..."
                className="w-full h-64 p-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-rose-200 focus:border-pdn-plum outline-none resize-none text-slate-700"
              ></textarea>
            </div>
          </div>

          <button 
            onClick={handleSubmit}
            disabled={loading || (!input && !image)}
            className="w-full bg-pdn-plum text-white py-4 rounded-full font-bold text-lg hover:bg-[#6e2a3a] transition-all disabled:bg-slate-300 shadow-lg shadow-rose-100"
          >
            {loading ? '正在為您設計中...' : '開始 AI 分析'}
          </button>
        </div>

        {recommendation && (
          <div className="mt-12 bg-white p-8 rounded-3xl shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500 border border-rose-100">
            <h2 className="text-2xl font-serif text-pdn-plum mb-6 border-b pb-4">AI 設計提案</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h3 className="font-bold text-slate-800 mb-2">建議風格</h3>
                  <p className="text-xl font-serif italic text-pdn-plum">{recommendation.style}</p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-2">設計師的話</h3>
                  <p className="text-slate-600 leading-relaxed italic">「{recommendation.advice}」</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recommendation.matchingOccasions.map((occ, idx) => (
                    <span key={idx} className="bg-rose-50 text-pdn-plum px-3 py-1 rounded-full text-xs font-semibold">
                      #{occ}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-bold text-slate-800">推薦色系</h3>
                <div className="flex flex-wrap gap-4">
                  {recommendation.colors.map((color, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <div 
                        className="w-16 h-16 rounded-full shadow-inner mb-2 border border-slate-100" 
                        style={{ backgroundColor: color }}
                      ></div>
                      <span className="text-[10px] text-slate-400 uppercase">{color}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
