
import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { databaseService } from '../services/databaseService';
import { TIME_SLOTS, ARTISTS, SERVICES, BOOKING_STEPS } from '../constants';

export const BookingPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [formData, setFormData] = useState({ 
    name: '', 
    phone: '', 
    note: '', 
    serviceId: SERVICES[0].id 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const eating = ARTISTS[0];

  // 當日期改變時重置時間，確保邏輯一致
  useEffect(() => {
    setSelectedTime('');
  }, [selectedDate]);

  // 計算選定日期的可用時段，並進行上午/下午分組
  const groupedSlots = useMemo(() => {
    if (!selectedDate) return { morning: [], afternoon: [] };
    
    const slots = TIME_SLOTS.map(time => ({
      time,
      isAvailable: databaseService.isSlotAvailable(selectedDate, time)
    }));

    return {
      morning: slots.filter(s => parseInt(s.time.split(':')[0]) < 12),
      afternoon: slots.filter(s => parseInt(s.time.split(':')[0]) >= 12)
    };
  }, [selectedDate]);

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !formData.name || !formData.phone) {
      return alert('請填寫完整預約資訊。');
    }

    setIsSubmitting(true);
    try {
      const selectedService = SERVICES.find(s => s.id === formData.serviceId)!;
      
      databaseService.addBooking({
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        price: selectedService.price,
        artistId: eating.id,
        artistName: eating.name,
        date: selectedDate,
        time: selectedTime,
        customerName: formData.name,
        customerPhone: formData.phone,
        notes: formData.note
      });

      alert('✨ 預約申請已送出！Eating 會盡快聯繫您。');
      navigate('/my-bookings');
    } catch (err: any) {
      alert(err.message);
      setSelectedTime(''); // 重置時段讓用戶重新選擇
    } finally {
      setIsSubmitting(false);
    }
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const currentService = SERVICES.find(s => s.id === formData.serviceId);

  return (
    <div className="bg-pdn-soft min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-serif text-slate-900 mb-4 leading-tight">
            Reserve Your <span className="italic text-pdn-plum">Elegance</span>
          </h1>
          <div className="w-24 h-1 bg-pdn-plum mx-auto mb-4 opacity-20"></div>
          <p className="text-slate-500 font-medium tracking-wide">PDN 專業美甲線上預約系統</p>
        </header>

        {/* 頂部進度條 */}
        <div className="flex justify-between items-center max-w-2xl mx-auto mb-16 relative px-4">
          <div className="absolute top-6 left-12 right-12 h-[2px] bg-rose-100 -translate-y-1/2 z-0"></div>
          {BOOKING_STEPS.map((s, idx) => (
            <div key={idx} className="relative z-10 flex flex-col items-center gap-3">
              <div 
                className={`w-12 h-12 rounded-full flex items-center justify-center font-serif text-lg transition-all duration-500 border-2 ${
                  step > idx + 1 
                  ? 'bg-green-500 text-white border-green-500' 
                  : step === idx + 1 
                    ? 'bg-pdn-plum text-white border-pdn-plum shadow-2xl scale-125' 
                    : 'bg-white text-slate-300 border-rose-100'
                }`}
              >
                {step > idx + 1 ? '✓' : idx + 1}
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${step === idx + 1 ? 'text-pdn-plum' : 'text-slate-400'}`}>
                {s.title}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* 左側內容區 */}
          <div className="flex-1 w-full order-2 lg:order-1">
            <div className="bg-white rounded-[3rem] shadow-2xl border border-rose-100 p-8 md:p-12 min-h-[650px] transition-all">
              
              {step === 1 && (
                <div className="fade-in space-y-10">
                  <section>
                    <h2 className="text-2xl font-serif text-slate-800 mb-6 flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-pdn-soft text-pdn-plum flex items-center justify-center text-sm font-bold">1</span>
                      挑選美甲服務款式
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {SERVICES.map(service => (
                        <div 
                          key={service.id}
                          onClick={() => setFormData({ ...formData, serviceId: service.id })}
                          className={`group cursor-pointer p-4 rounded-3xl border-2 transition-all flex gap-4 items-center ${
                            formData.serviceId === service.id 
                            ? 'border-pdn-plum bg-rose-50/50 shadow-inner' 
                            : 'border-slate-50 bg-slate-50/30 hover:border-rose-200'
                          }`}
                        >
                          <img src={service.imageUrl} className="w-20 h-20 rounded-2xl object-cover shadow-sm group-hover:scale-105 transition-transform" />
                          <div className="flex-1">
                            <h4 className="font-bold text-slate-800 text-sm">{service.name}</h4>
                            <p className="text-pdn-plum font-serif text-xs mt-1">NT$ {service.price}</p>
                            <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">{service.description}</p>
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.serviceId === service.id ? 'border-pdn-plum bg-pdn-plum' : 'border-slate-200'}`}>
                            {formData.serviceId === service.id && <div className="w-2 h-2 rounded-full bg-white"></div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-serif text-slate-800 mb-6 flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-pdn-soft text-pdn-plum flex items-center justify-center text-sm font-bold">2</span>
                      選擇施作日期
                    </h2>
                    <input 
                      type="date" 
                      min={getMinDate()}
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full p-5 bg-slate-50 border border-slate-100 rounded-3xl outline-none focus:ring-4 focus:ring-rose-100 transition-all font-serif text-lg text-slate-700 cursor-pointer"
                    />
                  </section>

                  <div className="pt-6">
                    <button 
                      disabled={!selectedDate}
                      onClick={() => setStep(2)}
                      className="w-full bg-slate-900 text-white py-6 rounded-full font-bold shadow-xl hover:bg-black transition-all disabled:opacity-30 disabled:grayscale tracking-widest uppercase text-sm"
                    >
                      查看可用時段 Continue →
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="fade-in space-y-10">
                  <h2 className="text-2xl font-serif text-slate-800 mb-2">確認預約時段</h2>
                  <p className="text-slate-400 text-sm mb-10">選擇您在 <span className="text-pdn-plum font-bold border-b border-pdn-plum">{selectedDate}</span> 的理想時間</p>

                  <div className="space-y-12">
                    {/* 上午時段 */}
                    <div>
                      <h4 className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-bold mb-6 border-l-2 border-pdn-plum pl-4">Morning Sessions</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {groupedSlots.morning.map(slot => (
                          <button
                            key={slot.time}
                            disabled={!slot.isAvailable}
                            onClick={() => setSelectedTime(slot.time)}
                            className={`group relative p-6 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-1 ${
                              !slot.isAvailable 
                                ? 'bg-slate-50 border-slate-50 text-slate-300 cursor-not-allowed' 
                                : selectedTime === slot.time
                                  ? 'bg-pdn-plum border-pdn-plum text-white shadow-xl -translate-y-1'
                                  : 'bg-white border-slate-100 hover:border-pdn-plum text-slate-600'
                            }`}
                          >
                            <span className="text-xl font-serif">{slot.time}</span>
                            <span className="text-[9px] font-bold uppercase tracking-widest opacity-60">
                              {slot.isAvailable ? 'Available' : 'Booked'}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 下午時段 */}
                    <div>
                      <h4 className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-bold mb-6 border-l-2 border-pdn-plum pl-4">Afternoon Sessions</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {groupedSlots.afternoon.map(slot => (
                          <button
                            key={slot.time}
                            disabled={!slot.isAvailable}
                            onClick={() => setSelectedTime(slot.time)}
                            className={`group relative p-6 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-1 ${
                              !slot.isAvailable 
                                ? 'bg-slate-50 border-slate-50 text-slate-300 cursor-not-allowed' 
                                : selectedTime === slot.time
                                  ? 'bg-pdn-plum border-pdn-plum text-white shadow-xl -translate-y-1'
                                  : 'bg-white border-slate-100 hover:border-pdn-plum text-slate-600'
                            }`}
                          >
                            <span className="text-xl font-serif">{slot.time}</span>
                            <span className="text-[9px] font-bold uppercase tracking-widest opacity-60">
                              {slot.isAvailable ? 'Available' : 'Booked'}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-12">
                    <button onClick={() => setStep(1)} className="flex-1 py-6 text-slate-400 font-bold hover:text-slate-900 transition-colors uppercase text-xs tracking-widest">Back</button>
                    <button 
                      disabled={!selectedTime}
                      onClick={() => setStep(3)}
                      className="flex-[2] bg-slate-900 text-white py-6 rounded-full font-bold shadow-xl hover:bg-black transition-all disabled:opacity-30 tracking-widest uppercase text-sm"
                    >
                      確認時間 Next Step
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <form onSubmit={handleFinalSubmit} className="fade-in space-y-10">
                  <h2 className="text-2xl font-serif text-slate-800 mb-6">填寫聯絡資料</h2>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Your Name / 顧客姓名</label>
                        <input 
                          required
                          placeholder="如何稱呼您？"
                          value={formData.name}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                          className="w-full p-5 bg-slate-50 border border-slate-100 rounded-3xl outline-none focus:ring-4 focus:ring-rose-100 text-slate-800 font-medium"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Phone Number / 手機號碼</label>
                        <input 
                          required
                          type="tel"
                          placeholder="09xx-xxx-xxx"
                          value={formData.phone}
                          onChange={e => setFormData({...formData, phone: e.target.value})}
                          className="w-full p-5 bg-slate-50 border border-slate-100 rounded-3xl outline-none focus:ring-4 focus:ring-rose-100 text-slate-800 font-mono"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Special Notes / 備註事項</label>
                      <textarea 
                        placeholder="是否有卸甲需求？或任何想告訴 Eating 的話..."
                        rows={5}
                        value={formData.note}
                        onChange={e => setFormData({...formData, note: e.target.value})}
                        className="w-full p-6 bg-slate-50 border border-slate-100 rounded-3xl outline-none focus:ring-4 focus:ring-rose-100 text-slate-800 resize-none"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 pt-8">
                    <button type="button" onClick={() => setStep(2)} className="flex-1 py-6 text-slate-400 font-bold hover:text-slate-900 transition-colors uppercase text-xs tracking-widest">Back</button>
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-[2] bg-pdn-plum text-white py-6 rounded-full font-bold shadow-2xl shadow-rose-200 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all tracking-widest uppercase text-sm"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Processing...
                        </>
                      ) : 'Confirm Booking'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* 右側：即時摘要側欄 */}
          <div className="w-full lg:w-80 order-1 lg:order-2 sticky top-28">
            <div className="bg-slate-900 rounded-[2.5rem] shadow-2xl p-8 text-white overflow-hidden relative">
              {/* 背景裝飾 */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-pdn-plum/20 rounded-full blur-3xl -translate-y-12 translate-x-12"></div>
              
              <div className="relative z-10 space-y-8">
                <div className="flex items-center gap-4">
                  <img src={eating.avatar} className="w-16 h-16 rounded-2xl object-cover border-2 border-pdn-plum shadow-lg" />
                  <div>
                    <h3 className="text-lg font-serif">{eating.name}</h3>
                    <p className="text-[10px] text-pdn-plum uppercase font-bold tracking-[0.2em]">Primary Artist</p>
                  </div>
                </div>

                <div className="space-y-6 pt-4 border-t border-slate-800">
                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Service</p>
                    <p className="text-sm font-medium text-rose-100">{currentService?.name}</p>
                    <p className="text-xs text-pdn-plum font-serif italic">NT$ {currentService?.price}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Schedule</p>
                    {selectedDate ? (
                      <div className="animate-in slide-in-from-left-4 fade-in">
                        <p className="text-sm font-medium">{selectedDate}</p>
                        <p className="text-lg font-serif text-pdn-plum">{selectedTime || 'Waiting for time...'}</p>
                      </div>
                    ) : (
                      <p className="text-xs text-slate-600 italic">Select a date first</p>
                    )}
                  </div>
                  
                  {formData.name && (
                    <div className="space-y-1 animate-in fade-in">
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Customer</p>
                      <p className="text-sm font-medium">{formData.name}</p>
                    </div>
                  )}
                </div>

                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <p className="text-[9px] text-slate-500 leading-relaxed italic">
                    PDN Nails 專注於指尖美學，您的預約我們將視為最重要的委託。預約成功後請準時赴約。
                  </p>
                </div>
              </div>
            </div>
            
            <p className="mt-6 text-[10px] text-slate-400 text-center px-4 leading-relaxed">
              * 系統將實時鎖定您的時段，防止他人預約。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
