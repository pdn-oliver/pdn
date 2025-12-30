
import React from 'react';
import { Service, ServiceCategory, Artist } from './types';

export const SERVICES: Service[] = [
  {
    id: 's1',
    name: '精緻手繪藝術 (吉卜力/聖誕系列)',
    category: ServiceCategory.ART,
    price: 1800,
    duration: 120,
    description: '擅長細膩的人物彩繪與節慶設計，如無臉男、聖誕麋鹿等手繪創作。',
    imageUrl: 'https://images.unsplash.com/photo-1604243126514-945761a297e2?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 's2',
    name: '頂級貓眼/晶石凝膠',
    category: ServiceCategory.GEL,
    price: 1500,
    duration: 90,
    description: '如寶石般流動的貓眼光澤，搭配石紋暈染，展現低調奢華感。',
    imageUrl: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 's3',
    name: '英倫格紋設計',
    category: ServiceCategory.ART,
    price: 1600,
    duration: 100,
    description: '經典格紋線條，搭配愛心或金箔點綴，充滿氣質與個性。',
    imageUrl: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 's4',
    name: '氣質暈染/琥珀設計',
    category: ServiceCategory.GEL,
    price: 1400,
    duration: 90,
    description: '層次豐富的暈染技術，營造如琥珀或雲石般的自然質感。',
    imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1000&auto=format&fit=crop'
  }
];

export const ARTISTS: Artist[] = [
  {
    id: 'a1',
    name: 'Eating',
    specialty: ['吉卜力彩繪', '精緻手繪', '格紋設計'],
    avatar: 'https://picsum.photos/seed/eating/150/150',
    bio: 'PDN 主理人，擅長將藝術靈感融入指尖，打造獨一無二的個人風格。',
    rating: 5.0
  }
];

export const GALLERY_IMAGES = [
  { id: 1, title: '粉嫩跳色法式', url: 'https://images.unsplash.com/photo-1634712282287-14ed57b9cc89?q=80&w=1000&auto=format&fit=crop', tag: '法式' },
  { id: 2, title: '童趣聖誕系列', url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1000&auto=format&fit=crop', tag: '手繪' },
  { id: 3, title: '藍色格紋愛心', url: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?q=80&w=1000&auto=format&fit=crop', tag: '格紋' },
  { id: 4, title: '吉卜力無臉男', url: 'https://images.unsplash.com/photo-1510005727932-51e913a85b9b?q=80&w=1000&auto=format&fit=crop', tag: '手繪' },
  { id: 5, title: '銀河灰色貓眼', url: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=1000&auto=format&fit=crop', tag: '貓眼' },
  { id: 6, title: '冰河藍石紋', url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1000&auto=format&fit=crop', tag: '暈染' },
  { id: 7, title: '可可亮粉凝膠', url: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?q=80&w=1000&auto=format&fit=crop', tag: '單色' },
  { id: 8, title: '抹茶格紋暈染', url: 'https://images.unsplash.com/photo-1599406161414-0677a28e9324?q=80&w=1000&auto=format&fit=crop', tag: '格紋' },
  { id: 9, title: '琥珀焦糖貓眼', url: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=1000&auto=format&fit=crop', tag: '貓眼' },
  { id: 10, title: '酒紅蝴蝶結格紋', url: 'https://images.unsplash.com/photo-1634712282287-14ed57b9cc89?q=80&w=1000&auto=format&fit=crop', tag: '節慶' },
  { id: 11, title: '莫蘭迪藍暈染', url: 'https://images.unsplash.com/photo-1604243126514-945761a297e2?q=80&w=1000&auto=format&fit=crop', tag: '暈染' },
];

export const TIME_SLOTS = [
  '10:00', '11:30', '13:00', '14:30', '16:00', '17:30'
];
