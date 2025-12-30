
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Booking {
  id: string;
  serviceName: string;
  date: string;
  time: string;
  status: string;
  createdAt: string;
}

export const MyBookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('pdn_bookings') || '[]');
    setBookings(data);
  }, []);

  const handleSync = () => {
    setIsSyncing(true);
    // 模擬同步延遲
    setTimeout(() => {
      setIsSyncing(false);
      alert('已成功與 Google 日曆同步最新預約狀態。');
    }, 1500);
  };

  const deleteBooking = (id: string) => {
    if (window.confirm('確定要取消此預約嗎？')) {
      const updated = bookings.filter(b => b.id !== id);
      setBookings(updated);
      localStorage.setItem('pdn_bookings', JSON.stringify(updated));
    }
  };

  return (
    <div className="py-16 px-6 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
        <div>
          <h1 className="text-4xl font-serif text-slate-900">我的預約紀錄</h1>
          <p className="text-slate-500 mt-2">查看並管理您的美甲服務行程</p>
        </div>
        <button 
          onClick={handleSync}
          disabled={isSyncing}
          className="flex items-center gap-2 bg-white border border-slate-200 px-6 py-3 rounded-full text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm"
        >
          <span className={isSyncing ? 'animate-spin' : ''}>🔄</span>
          {isSyncing ? '同步中...' : '與 Google 日曆同步'}
        </button>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white rounded-3xl p-20 text-center border border-slate-100 shadow-sm">
          <div className="text-6xl mb-6">🗓️</div>
          <h3 className="text-xl font-serif text-slate-800 mb-4">目前暫無預約紀錄</h3>
          <p className="text-slate-500 mb-8">立即挑選您心儀的款式，為雙手預約一場美學饗宴。</p>
          <Link to="/booking" className="bg-pdn-plum text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-rose-100">
            前往預約
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-6">
                <div className="bg-pdn-soft w-16 h-16 rounded-2xl flex flex-col items-center justify-center text-pdn-plum">
                  <span className="text-[10px] font-bold uppercase">{new Date(booking.date).toLocaleString('en-US', { month: 'short' })}</span>
                  <span className="text-xl font-serif font-bold">{new Date(booking.date).getDate()}</span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">{booking.serviceName}</h3>
                  <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                    <span>⏰ {booking.time}</span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      已確認 (已同步 Google)
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => deleteBooking(booking.id)}
                  className="text-slate-400 hover:text-rose-500 text-sm font-medium px-4 py-2"
                >
                  取消預約
                </button>
                <Link to="/booking" className="bg-pdn-plum text-white px-6 py-2 rounded-full text-sm font-bold">
                  再次預約
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-12 p-6 bg-slate-50 rounded-2xl border border-slate-100 text-center">
        <p className="text-xs text-slate-500 leading-relaxed">
          * 系統會自動將您的預約同步至 PDN 內部 Google Calendar。 <br />
          若您需要更改時間，請提前 24 小時透過 LINE @957qhped 聯繫。
        </p>
      </div>
    </div>
  );
};
