
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVICES, ARTISTS, TIME_SLOTS } from '../constants';

export const BookingPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    serviceId: '',
    artistId: '',
    date: '',
    time: '',
    name: '',
    phone: '',
    notes: ''
  });

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const generateGoogleCalendarLink = (data: any, serviceName: string) => {
    const startTime = `${data.date.replace(/-/g, '')}T${data.time.replace(':', '')}00`;
    const endDate = new Date(`${data.date}T${data.time}`);
    endDate.setHours(endDate.getHours() + 2);
    const endTime = endDate.toISOString().replace(/-|:|\.\d\d\d/g, '');
    
    const details = `預約項目：${serviceName}\n美甲師：Eating\n備註：${data.notes || '無'}\n\n查看系統預約：https://pdn-nails.web.app/#/my-bookings`;
    const location = `PDN 專業美甲 (臺中市北屯區軍福七路36號)`;
    
    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('PDN 美甲預約 - ' + serviceName)}&dates=${startTime}/${endTime}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedService = SERVICES.find(s => s.id === formData.serviceId);
    
    const newBooking = {
      ...formData,
      id: `BK-${Date.now()}`,
      serviceName: selectedService?.name,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };
    
    const existingBookings = JSON.parse(localStorage.getItem('pdn_bookings') || '[]');
    localStorage.setItem('pdn_bookings', JSON.stringify([newBooking, ...existingBookings]));

    const gCalLink = generateGoogleCalendarLink(formData, selectedService?.name || '');
    
    alert('預約已送出！系統行事曆已同步更新。');
    
    if (window.confirm('是否要額外將此預約加入您的個人 Google 日曆？')) {
      window.open(gCalLink, '_blank');
    }
    
    navigate('/my-bookings');
  };

  const selectedService = SERVICES.find(s => s.id === formData.serviceId);
  const selectedArtist = ARTISTS.find(a => a.id === formData.artistId);

  return (
    <div className="py-12 px-6 max-w-5xl mx-auto">
      <div className="flex justify-center mb-12">
        <div className="flex items-center space-x-4">
          {[1, 2, 3].map(num => (
            <React.Fragment key={num}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                step >= num ? 'bg-pdn-plum text-white shadow-lg' : 'bg-slate-200 text-slate-500'
              }`}>
                {num}
              </div>
              {num < 3 && <div className={`w-16 h-1 rounded ${step > num ? 'bg-pdn-plum' : 'bg-slate-200'}`}></div>}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
        <div className="p-8">
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
              <div>
                <h2 className="text-2xl font-serif mb-6 text-slate-900">1. 選擇服務與美甲師</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="block font-semibold text-slate-700">服務項目</label>
                    <div className="grid grid-cols-1 gap-3">
                      {SERVICES.map(s => (
                        <button 
                          key={s.id}
                          onClick={() => setFormData({...formData, serviceId: s.id})}
                          className={`p-4 rounded-xl text-left border-2 transition-all ${
                            formData.serviceId === s.id ? 'border-pdn-plum bg-rose-50' : 'border-slate-100 hover:border-rose-200'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-slate-800">{s.name}</span>
                            <span className="text-pdn-plum font-bold">NT$ {s.price}</span>
                          </div>
                          <span className="text-xs text-slate-500">{s.duration} 分鐘</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="block font-semibold text-slate-700">專業美甲師</label>
                    <div className="grid grid-cols-1 gap-4">
                      {ARTISTS.map(a => (
                        <button 
                          key={a.id}
                          onClick={() => setFormData({...formData, artistId: a.id})}
                          className={`p-4 rounded-xl text-center border-2 transition-all ${
                            formData.artistId === a.id ? 'border-pdn-plum bg-rose-50' : 'border-slate-100 hover:border-rose-200'
                          }`}
                        >
                          <img src={a.avatar} className="w-16 h-16 rounded-full mx-auto mb-2 border-2 border-white shadow-sm" alt={a.name} />
                          <div className="font-bold text-slate-800">{a.name}</div>
                          <div className="text-[10px] text-slate-400">{a.specialty.join(' | ')}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <button 
                onClick={nextStep}
                disabled={!formData.serviceId || !formData.artistId}
                className="w-full bg-pdn-plum text-white py-4 rounded-full font-bold hover:bg-[#6e2a3a] transition-all disabled:bg-slate-200 shadow-lg shadow-rose-100"
              >
                下一步：選擇時間
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
              <h2 className="text-2xl font-serif mb-6 text-slate-900">2. 選擇日期與時段</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block font-semibold mb-4 text-slate-700">預約日期</label>
                  <input 
                    type="date" 
                    className="w-full p-4 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-rose-200"
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-4 text-slate-700">預約時段</label>
                  <div className="grid grid-cols-3 gap-3">
                    {TIME_SLOTS.map(t => (
                      <button 
                        key={t}
                        onClick={() => setFormData({...formData, time: t})}
                        className={`p-3 rounded-lg text-sm transition-all border ${
                          formData.time === t ? 'bg-pdn-plum text-white border-pdn-plum' : 'bg-white text-slate-600 border-slate-200 hover:border-pdn-plum'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <button onClick={prevStep} className="flex-1 bg-slate-100 text-slate-700 py-4 rounded-full font-bold">返回</button>
                <button 
                  onClick={nextStep}
                  disabled={!formData.date || !formData.time}
                  className="flex-[2] bg-pdn-plum text-white py-4 rounded-full font-bold hover:bg-[#6e2a3a] disabled:bg-slate-200 shadow-lg shadow-rose-100"
                >
                  下一步：填寫資料
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
              <h2 className="text-2xl font-serif mb-6 text-slate-900">3. 確認預約資訊</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-pdn-soft p-6 rounded-2xl flex items-center justify-between mb-8 border border-rose-100">
                  <div>
                    <p className="text-xs text-pdn-plum uppercase tracking-widest font-bold">Booking Summary</p>
                    <p className="font-serif text-xl text-slate-800">{selectedService?.name} with {selectedArtist?.name}</p>
                    <p className="text-slate-500">{formData.date} at {formData.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-pdn-plum">NT$ {selectedService?.price}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-slate-700">姓名</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="請輸入真實姓名"
                      className="w-full p-4 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-rose-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-slate-700">電話</label>
                    <input 
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="09xx-xxx-xxx"
                      className="w-full p-4 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-rose-200"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-2 text-slate-700">備註</label>
                    <textarea 
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                      className="w-full p-4 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-rose-200 h-32"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-6">
                  <button type="button" onClick={prevStep} className="flex-1 bg-slate-100 text-slate-700 py-4 rounded-full font-bold">返回</button>
                  <button type="submit" className="flex-[2] bg-pdn-plum text-white py-4 rounded-full font-bold hover:bg-[#6e2a3a] shadow-xl shadow-rose-100">
                    確認送出預約
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
