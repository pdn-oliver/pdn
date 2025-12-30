
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVICES, ARTISTS, TIME_SLOTS } from '../constants';
import { databaseService } from '../services/databaseService';

export const BookingPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    serviceId: '',
    artistId: ARTISTS[0].id,
    date: '',
    time: '',
    name: '',
    phone: '',
    notes: ''
  });

  const selectedService = SERVICES.find(s => s.id === formData.serviceId);
  const selectedArtist = ARTISTS.find(a => a.id === formData.artistId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !selectedArtist) return;

    // 1. 儲存至系統資料庫 (LocalStorage)
    databaseService.addBooking({
      serviceId: formData.serviceId,
      serviceName: selectedService.name,
      price: selectedService.price,
      artistId: formData.artistId,
      artistName: selectedArtist.name,
      date: formData.date,
      time: formData.time,
      customerName: formData.name,
      customerPhone: formData.phone,
      notes: formData.notes,
      createdAt: new Date().toISOString(),
      status: 'pending'
    } as any);

    // 2. 顯示成功訊息 (不再發送郵件)
    alert('預約已送出！主理人 Eating 將會盡快與您聯繫確認。');
    
    // 3. 導向我的預約紀錄頁面
    navigate('/my-bookings');
  };

  return (
    <div className="bg-pdn-soft min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-serif text-slate-900 mb-2">預約 PDN 服務</h1>
          <div className="flex items-center justify-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-4">
            <span className={step === 1 ? 'text-pdn-plum underline underline-offset-4' : ''}>01. 選擇方案</span>
            <span className="opacity-30">/</span>
            <span className={step === 2 ? 'text-pdn-plum underline underline-offset-4' : ''}>02. 挑選時間</span>
            <span className="opacity-30">/</span>
            <span className={step === 3 ? 'text-pdn-plum underline underline-offset-4' : ''}>03. 顧客資料</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-rose-100 overflow-hidden min-h-[500px] flex flex-col">
          <div className="p-8 md:p-12 flex-grow">
            {step === 1 && (
              <div className="space-y-6 fade-in">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-serif font-bold text-slate-800">請選擇美甲服務項目</h2>
                  <span className="text-xs text-slate-400">目前預約：{selectedArtist?.name}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {SERVICES.map(s => (
                    <button 
                      key={s.id}
                      onClick={() => setFormData({...formData, serviceId: s.id})}
                      className={`p-6 rounded-2xl border-2 text-left transition-all relative ${
                        formData.serviceId === s.id 
                        ? 'border-pdn-plum bg-rose-50 ring-4 ring-rose-50' 
                        : 'border-slate-100 hover:border-rose-200 bg-white'
                      }`}
                    >
                      {formData.serviceId === s.id && (
                        <div className="absolute top-4 right-4 text-pdn-plum">✓</div>
                      )}
                      <div className="flex justify-between items-start mb-2 pr-6">
                        <span className="font-bold text-slate-800">{s.name}</span>
                      </div>
                      <p className="text-xs text-slate-500 mb-3">{s.duration} 分鐘 | {s.category}</p>
                      <p className="text-sm font-bold text-pdn-plum">NT$ {s.price}</p>
                    </button>
                  ))}
                </div>
                <div className="pt-8">
                  <button 
                    disabled={!formData.serviceId}
                    onClick={() => setStep(2)}
                    className="w-full bg-pdn-plum text-white py-4 rounded-full font-bold shadow-lg shadow-rose-100 mt-4 disabled:bg-slate-200 transition-all hover:scale-[1.02]"
                  >
                    下一步：挑選日期與時段
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8 fade-in">
                <h2 className="text-xl font-serif font-bold text-slate-800 mb-6">挑選您方便的時間</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <label className="block font-bold text-slate-700 mb-4 text-sm">1. 選擇預約日期</label>
                    <input 
                      type="date" 
                      className="w-full p-4 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-rose-200 text-slate-700"
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.date}
                      onChange={e => setFormData({...formData, date: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-4 text-sm">2. 選擇時段</label>
                    <div className="grid grid-cols-3 gap-2">
                      {TIME_SLOTS.map(t => (
                        <button 
                          key={t}
                          type="button"
                          onClick={() => setFormData({...formData, time: t})}
                          className={`p-3 rounded-xl text-xs font-bold transition-all border ${
                            formData.time === t 
                            ? 'bg-pdn-plum text-white border-pdn-plum shadow-md' 
                            : 'bg-white text-slate-500 border-slate-100 hover:border-pdn-plum hover:text-pdn-plum'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 mt-12">
                  <button onClick={() => setStep(1)} className="flex-1 bg-slate-50 py-4 rounded-full font-bold text-slate-400 hover:bg-slate-100 transition-colors">返回</button>
                  <button 
                    disabled={!formData.date || !formData.time}
                    onClick={() => setStep(3)}
                    className="flex-[2] bg-pdn-plum text-white py-4 rounded-full font-bold shadow-lg shadow-rose-100 disabled:bg-slate-200 transition-all hover:scale-[1.02]"
                  >
                    下一步：確認顧客資料
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-6 fade-in">
                <div className="bg-pdn-soft/50 p-6 rounded-2xl mb-8 border border-rose-100/50">
                  <div className="flex justify-between items-start mb-4">
                    <p className="text-xs font-bold text-pdn-plum uppercase tracking-widest">預約細節確認</p>
                    <button type="button" onClick={() => setStep(1)} className="text-xs text-slate-400 hover:text-pdn-plum underline">修改項目</button>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <h3 className="font-bold text-slate-800 text-lg">{selectedService?.name}</h3>
                      <p className="text-sm text-slate-500 mt-1">
                        🗓️ {formData.date} {formData.time} <br/>
                        👩‍🎨 美甲師：{selectedArtist?.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-serif text-pdn-plum">NT$ {selectedService?.price}</p>
                      <p className="text-[10px] text-slate-400 mt-1">預計時長：{selectedService?.duration} min</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">真實姓名</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="請輸入姓名" 
                      className="w-full p-4 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-rose-200 outline-none" 
                      value={formData.name} 
                      onChange={e => setFormData({...formData, name: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">聯絡電話</label>
                    <input 
                      type="tel" 
                      required 
                      placeholder="09xx-xxx-xxx" 
                      className="w-full p-4 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-rose-200 outline-none" 
                      value={formData.phone} 
                      onChange={e => setFormData({...formData, phone: e.target.value})} 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">備註事項 (如：需卸甲、特殊需求)</label>
                  <textarea 
                    className="w-full p-4 border border-slate-100 rounded-2xl h-24 focus:ring-2 focus:ring-rose-200 outline-none resize-none" 
                    placeholder="若有需要卸甲，請務必在此註明..."
                    value={formData.notes} 
                    onChange={e => setFormData({...formData, notes: e.target.value})}
                  ></textarea>
                </div>

                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setStep(2)} className="flex-1 bg-slate-50 py-4 rounded-full font-bold text-slate-400">返回重選時間</button>
                  <button type="submit" className="flex-[2] bg-pdn-plum text-white py-4 rounded-full font-bold shadow-xl transition-all hover:scale-[1.02] active:scale-95">
                    確認預約並存入系統
                  </button>
                </div>
              </form>
            )}
          </div>
          
          <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
            <p className="text-[10px] text-slate-400 tracking-widest uppercase">
              Professional Nail Design by Eating • Since 2023
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
