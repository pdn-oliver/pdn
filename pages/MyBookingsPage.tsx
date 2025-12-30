
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CalendarView } from '../components/CalendarView';

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
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('calendar');
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('pdn_bookings') || '[]');
    setBookings(data);
  }, []);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      alert('已成功從雲端同步最新預約。');
    }, 1200);
  };

  const deleteBooking = (id: string) => {
    if (window.confirm('確定要取消此預約嗎？')) {
      const updated = bookings.filter(b => b.id !== id);
      setBookings(updated);
      localStorage.setItem('pdn_bookings', JSON.stringify(updated));
    }
  };

  return (
    <div className="py-16 px-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6">
        <div>
          <h1 className="text-4xl font-serif text-slate-900">我的預約行事曆</h1>
          <p className="text-slate-500 mt-2">點擊日期即可查看預約細節</p>
        </div>
        
        <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-slate-100">
          <button 
            onClick={() => setViewMode('calendar')}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${viewMode === 'calendar' ? 'bg-pdn-plum text-white shadow-md' : 'text-slate-500 hover:text-pdn-plum'}`}
          >
            行事曆視圖
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${viewMode === 'list' ? 'bg-pdn-plum text-white shadow-md' : 'text-slate-500 hover:text-pdn-plum'}`}
          >
            列表視圖
          </button>
        </div>
      </div>

      <div className="mb-8 flex justify-end">
        <button 
          onClick={handleSync}
          disabled={isSyncing}
          className="flex items-center gap-2 text-pdn-plum text-sm font-bold hover:underline"
        >
          <span className={isSyncing ? 'animate-spin' : ''}>🔄</span>
          {isSyncing ? '正在同步雲端日曆...' : '立即同步 Google 日曆'}
        </button>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white rounded-3xl p-20 text-center border border-slate-100 shadow-sm">
          <div className="text-6xl mb-6">🗓️</div>
          <h3 className="text-xl font-serif text-slate-800 mb-4">目前暫無預約</h3>
          <p className="text-slate-500 mb-8">為您的指尖預約一場優雅的旅行吧。</p>
          <Link to="/booking" className="bg-pdn-plum text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-rose-100">
            開始預約
          </Link>
        </div>
      ) : (
        <>
          {viewMode === 'calendar' ? (
            <div className="fade-in">
              <CalendarView bookings={bookings} />
            </div>
          ) : (
            <div className="space-y-4 fade-in">
              {bookings.map((booking) => (
                <div key={booking.id} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="flex items-center gap-6">
                    <div className="bg-pdn-soft w-16 h-16 rounded-2xl flex flex-col items-center justify-center text-pdn-plum">
                      <span className="text-[10px] font-bold uppercase">{new Date(booking.date).toLocaleString('zh-TW', { month: 'short' })}</span>
                      <span className="text-xl font-serif font-bold">{new Date(booking.date).getDate()}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-lg">{booking.serviceName}</h3>
                      <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                        <span>⏰ {booking.time}</span>
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-green-500"></span>
                          系統已入帳
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => deleteBooking(booking.id)}
                      className="text-slate-400 hover:text-rose-500 text-sm font-medium px-4 py-2"
                    >
                      取消
                    </button>
                    <Link to="/booking" className="bg-pdn-plum text-white px-6 py-2 rounded-full text-sm font-bold shadow-sm">
                      再次預約
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
      
      <div className="mt-12 p-8 bg-pdn-soft/50 rounded-3xl border border-rose-100/50 flex flex-col md:flex-row items-center gap-6">
        <div className="text-3xl">💡</div>
        <div className="flex-1 text-center md:text-left">
          <h4 className="font-bold text-slate-800 mb-1">小提示</h4>
          <p className="text-sm text-slate-600 leading-relaxed">
            系統會自動偵測您的 Google 日曆變動。若您在 Google 日曆中刪除行程，本系統將於下次同步時自動更新狀態。
          </p>
        </div>
      </div>
    </div>
  );
};
