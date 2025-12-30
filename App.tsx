
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { BookingPage } from './pages/BookingPage';
import { AIStylistPage } from './pages/AIStylistPage';
import { GalleryPage } from './pages/GalleryPage';
import { MyBookingsPage } from './pages/MyBookingsPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/ai-stylist" element={<AIStylistPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/my-bookings" element={<MyBookingsPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/services" element={<div className="p-20 text-center"><h2 className="text-4xl font-serif">服務項目開發中</h2></div>} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
