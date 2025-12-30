
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CalendarView } from '../components/CalendarView';
import { databaseService } from '../services/databaseService';
import { Booking } from '../types';

export const MyBookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('calendar');

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = () => {
    const data = databaseService.getMyBookings();
    // 只顯示未取消的預約
    setBookings(data.filter(b => b.status !== 'cancelled'));
  };

  const handleCancel = (id: string) => {
    if (window.confirm('確定要取消此筆預約嗎？')) {
      databaseService.cancelBooking(id);
      loadBookings();
      alert('預約已取消。');
    }
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'pending': return { label: '待處理', color: 'text-amber-600 bg-amber-50' };
      case 'confirmed': return { label: '已確認', color: 'text-green-600 bg-green-50' };
      case 'completed': return { label: '服務完成', color: 'text-slate-400 bg-slate-50' };
      default: return { label: '已取消', color: 'text-rose-600 bg-rose-50' };
    }
  };

  return (
    <div className="py-16 px-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-serif text-slate-900">我的預約記錄</h1>
          <p className="text-slate-500 mt-2">您可以在此查看所有與 PDN 預定的指尖藝術行程。</p>
        </div>
        
        <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-slate-100">
          <button 
            onClick={() => setViewMode('calendar')}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${viewMode === 'calendar' ? 'bg-pdn-plum text-white shadow-md' : 'text-slate-500 hover:text-pdn-plum'}`}
          >
            日曆視圖
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${viewMode === 'list' ? 'bg-pdn-plum text-white shadow-md' : 'text-slate-500 hover:text-pdn-plum'}`}
          >
            列表視圖
          </button>
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white rounded-3xl p-20 text-center border border-slate-100 shadow-sm">
          <div className="text-6xl mb-6">🗓️</div>
          <h3 className="text-xl font-serif text-slate-800 mb-4">目前尚無預約</h3>
          <p className="text-slate-500 mb-8">今天，給指尖一個改變的機會吧。</p>
          <Link to="/booking" className="bg-pdn-plum text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-rose-100 transition-transform active:scale-95">
            立即開始預約
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
              {bookings.map((booking) => {
                const status = getStatusLabel(booking.status);
                return (
                  <div key={booking.id} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-6 flex-1">
                      <div className="bg-pdn-soft w-16 h-16 rounded-2xl flex flex-col items-center justify-center text-pdn-plum border border-rose-100">
                        <span className="text-[10px] font-bold uppercase">{new Date(booking.date).toLocaleString('zh-TW', { month: 'short' })}</span>
                        <span className="text-xl font-serif font-bold">{new Date(booking.date).getDate()}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-slate-800 text-lg">{booking.serviceName}</h3>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${status.color}`}>
                            {status.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                          <span>📅 {booking.date}</span>
                          <span>⏰ {booking.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button 
                        onClick={() => handleCancel(booking.id)}
                        className="text-slate-400 hover:text-rose-500 text-xs font-medium px-4 py-2 transition-colors"
                      >
                        取消預約
                      </button>
                      <Link to="/booking" className="bg-pdn-plum text-white px-6 py-2 rounded-full text-sm font-bold shadow-sm active:scale-95 transition-all">
                        再次預約
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
      
      <div className="mt-12 p-8 bg-pdn-soft/50 rounded-3xl border border-rose-100 flex flex-col md:flex-row items-center gap-6">
        <div className="text-3xl">💡</div>
        <div className="flex-1 text-center md:text-left">
          <h4 className="font-bold text-slate-800 mb-1 tracking-tight">預約小提醒</h4>
          <p className="text-sm text-slate-600 leading-relaxed">
            PDN 的系統會自動為您鎖定時段，確保您的權益。若您需要臨時取消或更改時間，請務必透過 LINE 與 Eating 直接溝通，以免造成時段浪費。
          </p>
        </div>
      </div>
    </div>
  );
};
