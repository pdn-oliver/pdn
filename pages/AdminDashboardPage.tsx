
import React, { useState, useEffect } from 'react';
import { databaseService } from '../services/databaseService';
import { Booking } from '../types';
import { GOOGLE_BOOKING_URL } from '../constants';

export const AdminDashboardPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [stats, setStats] = useState({ total: 0, todayCount: 0, revenue: 0 });

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    setBookings(databaseService.getAllBookings());
    setStats(databaseService.getStats());
  };

  const handleStatusChange = (id: string, newStatus: any) => {
    databaseService.updateStatus(id, newStatus);
    refreshData();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('確定要永久刪除這筆資料嗎？(此操作不可恢復)')) {
      databaseService.deleteBooking(id);
      refreshData();
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: 'bg-amber-100 text-amber-700',
      confirmed: 'bg-green-100 text-green-700',
      completed: 'bg-slate-100 text-slate-500',
      cancelled: 'bg-rose-100 text-rose-700'
    };
    const labels: Record<string, string> = {
      pending: '待確認',
      confirmed: '已確認',
      completed: '已完成',
      cancelled: '已取消'
    };
    return <span className={`px-3 py-1 rounded-full text-xs font-bold ${styles[status]}`}>{labels[status]}</span>;
  };

  return (
    <div className="bg-slate-50 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h1 className="text-3xl font-serif font-bold text-slate-800">PDN 後台管理系統</h1>
            <p className="text-slate-500">歡迎回來，Eating。這裡是您的店務控制中心。</p>
          </div>
          <div className="flex gap-4">
            <a 
              href="https://calendar.google.com/" 
              target="_blank" 
              className="bg-white border border-blue-200 text-blue-600 px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-blue-50 transition-all"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg" className="w-4 h-4" />
              查看 Google 日曆
            </a>
            <button onClick={refreshData} className="bg-pdn-plum text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-[#6e2a3a] transition-all">
              🔄 重新整理清單
            </button>
          </div>
        </div>

        {/* 數據概覽 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">今日預約</p>
            <p className="text-4xl font-serif text-pdn-plum">{stats.todayCount} <span className="text-sm font-sans text-slate-400">筆</span></p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">系統總名單</p>
            <p className="text-4xl font-serif text-slate-800">{stats.total} <span className="text-sm font-sans text-slate-400">筆</span></p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">累積營收估計</p>
            <p className="text-4xl font-serif text-green-600">NT$ {stats.revenue.toLocaleString()}</p>
          </div>
        </div>

        {/* 說明文字 */}
        <div className="mb-6 bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-center gap-3">
          <span className="text-xl">💡</span>
          <p className="text-xs text-blue-700 leading-relaxed">
            系統會自動記錄客戶在網站上的預約動作。請務必與您的 <b>Google 日曆</b> 進行核對，以確保時段沒有被他人佔用。
          </p>
        </div>

        {/* 預約表格 */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-50">
            <h2 className="font-bold text-slate-700">最新系統名單</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-400 text-[10px] uppercase tracking-widest">
                  <th className="px-6 py-4">預約日期 / 時段</th>
                  <th className="px-6 py-4">客戶資訊</th>
                  <th className="px-6 py-4">服務項目</th>
                  <th className="px-6 py-4">狀態</th>
                  <th className="px-6 py-4 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-20 text-center text-slate-400">目前尚無任何紀錄</td>
                  </tr>
                ) : (
                  bookings.map(booking => (
                    <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-700">{booking.date}</p>
                        <p className="text-xs text-slate-400">{booking.time}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-800">{booking.customerName}</p>
                        <a href={`tel:${booking.customerPhone}`} className="text-xs text-pdn-plum hover:underline">{booking.customerPhone}</a>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-600">{booking.serviceName}</p>
                        <p className="text-[10px] text-slate-400">NT$ {booking.price}</p>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(booking.status)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <select 
                            className="text-xs border rounded-lg p-1 outline-none"
                            value={booking.status}
                            onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                          >
                            <option value="pending">待確認</option>
                            <option value="confirmed">確認</option>
                            <option value="completed">完成</option>
                            <option value="cancelled">取消</option>
                          </select>
                          <button onClick={() => handleDelete(booking.id)} className="text-slate-300 hover:text-rose-500 transition-colors">
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
