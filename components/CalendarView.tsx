
import React, { useState } from 'react';

interface Booking {
  id: string;
  serviceName: string;
  date: string;
  time: string;
}

interface CalendarViewProps {
  bookings: Booking[];
}

export const CalendarView: React.FC<CalendarViewProps> = ({ bookings }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const totalDays = daysInMonth(year, month);
  const firstDay = firstDayOfMonth(year, month);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const monthNames = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
  const dayLabels = ["日", "一", "二", "三", "四", "五", "六"];

  const calendarDays = [];
  // 填充月初空白
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  // 填充日期
  for (let i = 1; i <= totalDays; i++) {
    calendarDays.push(i);
  }

  const getBookingsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return bookings.filter(b => b.date === dateStr);
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-pdn-soft/30">
        <h3 className="text-xl font-serif font-bold text-slate-800">
          {year}年 {monthNames[month]}
        </h3>
        <div className="flex gap-2">
          <button onClick={prevMonth} className="p-2 hover:bg-white rounded-full transition-colors border border-transparent hover:border-slate-200">←</button>
          <button onClick={nextMonth} className="p-2 hover:bg-white rounded-full transition-colors border border-transparent hover:border-slate-200">→</button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 border-b border-slate-50">
        {dayLabels.map(label => (
          <div key={label} className="py-3 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">
            {label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {calendarDays.map((day, idx) => {
          const dayBookings = day ? getBookingsForDay(day) : [];
          const isToday = day && new Date().toDateString() === new Date(year, month, day).toDateString();
          
          return (
            <div key={idx} className={`min-h-[100px] p-2 border-b border-r border-slate-50 last:border-r-0 transition-colors ${day ? 'hover:bg-rose-50/30' : 'bg-slate-50/30'}`}>
              {day && (
                <>
                  <div className="flex justify-between items-start">
                    <span className={`text-sm font-medium ${isToday ? 'bg-pdn-plum text-white w-6 h-6 flex items-center justify-center rounded-full' : 'text-slate-600'}`}>
                      {day}
                    </span>
                  </div>
                  <div className="mt-2 space-y-1">
                    {dayBookings.map(b => (
                      <div key={b.id} className="text-[10px] bg-pdn-plum text-white p-1.5 rounded-md leading-tight shadow-sm truncate">
                        {b.time} {b.serviceName}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
