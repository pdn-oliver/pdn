
import { Booking } from '../types';

const DB_KEY = 'pdn_nails_database';

export const databaseService = {
  // 獲取所有預約
  getAllBookings: (): Booking[] => {
    const data = localStorage.getItem(DB_KEY);
    return data ? JSON.parse(data) : [];
  },

  // 新增預約
  addBooking: (booking: Omit<Booking, 'id'>): Booking => {
    const all = databaseService.getAllBookings();
    const newBooking = {
      ...booking,
      id: `PDN-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      status: 'pending' // 預設狀態：待確認
    } as Booking;
    
    localStorage.setItem(DB_KEY, JSON.stringify([newBooking, ...all]));
    return newBooking;
  },

  // 更新預約狀態
  updateStatus: (id: string, status: string) => {
    const all = databaseService.getAllBookings();
    const updated = all.map(b => b.id === id ? { ...b, status } : b);
    localStorage.setItem(DB_KEY, JSON.stringify(updated));
  },

  // 刪除預約
  deleteBooking: (id: string) => {
    const all = databaseService.getAllBookings();
    const filtered = all.filter(b => b.id !== id);
    localStorage.setItem(DB_KEY, JSON.stringify(filtered));
  },

  // 獲取統計數據
  getStats: () => {
    const all = databaseService.getAllBookings();
    const today = new Date().toISOString().split('T')[0];
    return {
      total: all.length,
      todayCount: all.filter(b => b.date === today).length,
      revenue: all.reduce((sum, b) => sum + (b.price || 0), 0)
    };
  }
};
