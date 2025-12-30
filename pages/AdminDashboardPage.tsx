
import React, { useState, useEffect } from 'react';
import { databaseService } from '../services/databaseService';
import { Booking } from '../types';

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

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: 'bg-amber-100 text-amber-700',
      confirmed: 'bg-green-100 text-green-700',
      completed: 'bg-slate-100 text-slate-500',
      cancelled: 'bg-rose-100 text-rose-700'
    };
    const labels: Record<string, string> = {
      pending: '待處理',
      confirmed: '預約成功',
      completed: '服務完成',
      cancelled: '不成立'
    };
    return <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${styles[status]}`}>{labels[status]}</span>;
  };

  return (
    <div className="bg-slate-50 min-h-screen p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        {/* 頂部導航與標題 */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-8">
          <div>
            <h1 className="text-4xl font-serif font-bold text-slate-800">Shop Manager</h1>
            <p className="text-slate-500 mt-2">你好，Eating。這裡匯總了您的預約記錄與數據。</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a 
              href="https://calendar.google.com/calendar/u/0/r" 
              target="_blank" 
              className="bg-white border-2 border-slate-200 text-slate-700 px-6 py-3 rounded-2xl text-sm font-bold flex items-center gap-3 hover:border-blue-400 hover:text-blue-600 transition-all shadow-sm"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg" className="w-5 h-5" />
              進入 Google 日曆控制台
            </a>
            <button onClick={refreshData} className="bg-pdn-plum text-white px-8 py-3 rounded-2xl text-sm font-bold hover:shadow-lg active:scale-95 transition-all">
              🔄 整理資料庫
            </button>
          </div>
        </div>

        {/* 視覺化數據概覽 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex justify-between items-center group hover:border-pdn-plum transition-all cursor-default">
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Today</p>
              <p className="text-5xl font-serif text-pdn-plum">{stats.todayCount}</p>
            </div>
            <div className="text-4xl opacity-20 group-hover:opacity-100 transition-opacity">📅</div>
          </div>
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex justify-between items-center group hover:border-slate-800 transition-all cursor-default">
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Total Logs</p>
              <p className="text-5xl font-serif text-slate-800">{stats.total}</p>
            </div>
            <div className="text-4xl opacity-20 group-hover:opacity-100 transition-opacity">📝</div>
          </div>
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex justify-between items-center group hover:border-green-600 transition-all cursor-default">
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Revenue</p>
              <p className="text-5xl font-serif text-green-600">
                <span className="text-sm font-sans mr-1">NT$</span>
                {stats.revenue.toLocaleString()}
              </p>
            </div>
            <div className="text-4xl opacity-20 group-hover:opacity-100 transition-opacity">💰</div>
          </div>
        </div>

        {/* 核心功能區：日曆檢視說明 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-xl">
              <h3 className="text-xl font-serif mb-4 flex items-center gap-2">
                <span className="text-2xl">💡</span> 管理小貼士
              </h3>
              <div className="space-y-4 text-sm text-slate-400 leading-relaxed">
                <p>
                  1. <b className="text-white">防重預約</b>：
                  Google 系統會實時檢查您的行程。如果您在手機日曆手動加了一個行程，網站上的該時段會<b className="text-white">自動消失</b>。
                </p>
                <p>
                  2. <b className="text-white">核對資料</b>：
                  客戶預約後，詳細資料會存在您的 Google 日曆活動中。右側列表僅作為系統運作日誌參考。
                </p>
                <p>
                  3. <b className="text-white">更改預約</b>：
                  若客戶要求改期，建議您直接在 Google 日曆 App 中拖曳活動即可。
                </p>
              </div>
            </div>
            
            <div className="bg-pdn-soft p-8 rounded-[2.5rem] border border-rose-200">
              <h3 className="font-bold text-slate-800 mb-4">快速功能</h3>
              <div className="grid grid-cols-1 gap-3">
                <a href="https://line.me/" target="_blank" className="bg-white p-4 rounded-2xl border border-rose-100 text-sm font-bold text-center hover:bg-rose-50 transition-colors">💬 開啟 LINE 回覆</a>
                <a href="https://www.instagram.com/" target="_blank" className="bg-white p-4 rounded-2xl border border-rose-100 text-sm font-bold text-center hover:bg-rose-50 transition-colors">📸 Instagram 私訊</a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                <h2 className="font-bold text-slate-800 text-lg">System Logs <span className="text-slate-300 font-normal ml-2">系統備份清單</span></h2>
                <div className="text-[10px] text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full">Auto-Sync Enabled</div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50/50 text-slate-400 text-[10px] uppercase tracking-[0.2em]">
                      <th className="px-8 py-5">時段 / Date & Time</th>
                      <th className="px-8 py-5">客戶 / Customer</th>
                      <th className="px-8 py-5">狀態 / Status</th>
                      <th className="px-8 py-5 text-right">管理</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {bookings.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-8 py-24 text-center">
                          <div className="text-slate-300 flex flex-col items-center">
                            <span className="text-5xl mb-4">📭</span>
                            <p className="text-sm font-serif italic">尚無歷史預約紀錄</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      bookings.map(booking => (
                        <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-8 py-5">
                            <p className="font-bold text-slate-800 text-sm">{booking.date}</p>
                            <p className="text-[10px] text-pdn-plum font-bold">{booking.time}</p>
                          </td>
                          <td className="px-8 py-5">
                            <p className="font-bold text-slate-800 text-sm">{booking.customerName}</p>
                            <p className="text-xs text-slate-400 font-mono">{booking.customerPhone}</p>
                          </td>
                          <td className="px-8 py-5">
                            {getStatusBadge(booking.status)}
                          </td>
                          <td className="px-8 py-5 text-right">
                            <select 
                              className="text-[10px] border border-slate-200 rounded-xl p-2 outline-none bg-white focus:ring-2 focus:ring-pdn-plum"
                              value={booking.status}
                              onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                            >
                              <option value="pending">待處理</option>
                              <option value="confirmed">確認成功</option>
                              <option value="completed">已完成</option>
                              <option value="cancelled">取消</option>
                            </select>
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
      </div>
    </div>
  );
};
