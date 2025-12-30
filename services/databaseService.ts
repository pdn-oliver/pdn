
import { Booking } from '../types';

const DB_KEY = 'pdn_nails_database';
const MY_BOOKINGS_KEY = 'pdn_bookings';

export const databaseService = {
  // 獲取所有預約 (管理員視角)
  getAllBookings: (): Booking[] => {
    const data = localStorage.getItem(DB_KEY);
    return data ? JSON.parse(data) : [];
  },

  // 獲取個人預約記錄 (客戶端視角)
  getMyBookings: (): Booking[] => {
    const data = localStorage.getItem(MY_BOOKINGS_KEY);
    return data ? JSON.parse(data) : [];
  },

  // 檢查特定日期與時段是否已被佔用
  isSlotAvailable: (date: string, time: string): boolean => {
    const all = databaseService.getAllBookings();
    // 檢查是否有「已確認」、「待處理」或「已完成」且時間相同的預約
    // 只有「已取消」的預約會釋放時段
    const isTaken = all.some(b => 
      b.date === date && 
      b.time === time && 
      b.status !== 'cancelled'
    );
    return !isTaken;
  },

  // 新增預約
  addBooking: (booking: Omit<Booking, 'id' | 'status' | 'createdAt'>): Booking => {
    const all = databaseService.getAllBookings();
    
    // 核心安全檢查：防止高併發或惡意重複預約
    if (!databaseService.isSlotAvailable(booking.date, booking.time)) {
      throw new Error("抱歉，此時段剛剛已被其他客人在網上預約了。請選擇其他時段！");
    }

    const newBooking = {
      ...booking,
      id: `PDN-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      status: 'pending',
      createdAt: new Date().toISOString()
    } as Booking;
    
    // 更新全域資料庫
    localStorage.setItem(DB_KEY, JSON.stringify([newBooking, ...all]));
    
    // 更新客戶端的個人清單
    const myBookings = databaseService.getMyBookings();
    localStorage.setItem(MY_BOOKINGS_KEY, JSON.stringify([newBooking, ...myBookings]));
    
    return newBooking;
  },

  // 更新預約狀態
  updateStatus: (id: string, status: string) => {
    const all = databaseService.getAllBookings();
    const updated = all.map(b => b.id === id ? { ...b, status } : b);
    localStorage.setItem(DB_KEY, JSON.stringify(updated));
    
    // 同步更新個人清單中的狀態 (如果存在)
    const myBookings = databaseService.getMyBookings();
    const myUpdated = myBookings.map(b => b.id === id ? { ...b, status } : b);
    localStorage.setItem(MY_BOOKINGS_KEY, JSON.stringify(myUpdated));
  },

  // 刪除/取消預約 (從個人清單與全域資料庫標註為取消)
  cancelBooking: (id: string) => {
    databaseService.updateStatus(id, 'cancelled');
  },

  // 獲取管理員統計數據
  getStats: () => {
    const all = databaseService.getAllBookings();
    const today = new Date().toISOString().split('T')[0];
    const activeBookings = all.filter(b => b.status !== 'cancelled');
    
    return {
      total: activeBookings.length,
      todayCount: activeBookings.filter(b => b.date === today).length,
      revenue: activeBookings.reduce((sum, b) => sum + (b.price || 0), 0)
    };
  }
};
