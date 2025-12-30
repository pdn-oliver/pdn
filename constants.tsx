
import { Service, ServiceCategory, Artist } from './types';

export const SERVICES: Service[] = [
  {
    id: 's1',
    name: '精緻手繪藝術 (Ghibli/節慶)',
    category: ServiceCategory.ART,
    price: 1800,
    duration: 120,
    description: 'Eating 專長之細膩手繪設計，包含吉卜力系列、聖誕節慶與複雜插畫。',
    imageUrl: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 's2',
    name: '質感貓眼/晶石凝膠',
    category: ServiceCategory.GEL,
    price: 1500,
    duration: 90,
    description: '層次豐富的貓眼光澤，搭配石紋暈染，展現優雅精緻感。',
    imageUrl: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 's3',
    name: '英倫格紋/愛心設計',
    category: ServiceCategory.ART,
    price: 1600,
    duration: 100,
    description: '經典線條與手寫感心形點綴，打造氣質滿分的英倫風格。',
    imageUrl: 'https://images.unsplash.com/photo-1599406161414-0677a28e9324?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 's4',
    name: '莫蘭迪/琥珀暈染',
    category: ServiceCategory.GEL,
    price: 1400,
    duration: 90,
    description: '如雲石與琥珀般的層次感，最適合襯托手部膚色的顯白首選。',
    imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1000&auto=format&fit=crop'
  }
];

export const ARTISTS: Artist[] = [
  {
    id: 'a1',
    name: 'Eating',
    specialty: ['吉卜力彩繪', '精緻手繪', '質感暈染'],
    avatar: 'https://picsum.photos/seed/eating/150/150',
    bio: 'PDN 主理人。致力於手部藝術創作，將每一片指甲視為畫布，為您打造專屬的精緻美學。',
    rating: 5.0
  }
];

// 忠實反映您上傳的 11 張照片風格
export const GALLERY_IMAGES = [
  { id: 1, title: '繽紛果凍法式跳色', url: 'https://images.unsplash.com/photo-1634712282287-14ed57b9cc89?q=80&w=1000&auto=format&fit=crop', tag: '法式' },
  { id: 2, title: '手寫聖誕麋鹿彩繪', url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1000&auto=format&fit=crop', tag: '手繪' },
  { id: 3, title: '英倫寶藍格紋愛心', url: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?q=80&w=1000&auto=format&fit=crop', tag: '格紋' },
  { id: 4, title: '吉卜力無臉男手繪系列', url: 'https://images.unsplash.com/photo-1510005727932-51e913a85b9b?q=80&w=1000&auto=format&fit=crop', tag: '手繪' },
  { id: 5, title: '月光銀灰貓眼石紋', url: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=1000&auto=format&fit=crop', tag: '貓眼' },
  { id: 6, title: '冰河藍大理石暈染', url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1000&auto=format&fit=crop', tag: '暈染' },
  { id: 7, title: '可可奶茶氣質金閃', url: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?q=80&w=1000&auto=format&fit=crop', tag: '單色' },
  { id: 8, title: '抹茶格紋立體石紋', url: 'https://images.unsplash.com/photo-1599406161414-0677a28e9324?q=80&w=1000&auto=format&fit=crop', tag: '格紋' },
  { id: 9, title: '琥珀焦糖貓眼暈染', url: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=1000&auto=format&fit=crop', tag: '貓眼' },
  { id: 10, title: '酒紅金箔蝴蝶結節慶', url: 'https://images.unsplash.com/photo-1634712282287-14ed57b9cc89?q=80&w=1000&auto=format&fit=crop', tag: '節慶' },
  { id: 11, title: '莫蘭迪藍雲母亮片', url: 'https://images.unsplash.com/photo-1604243126514-945761a297e2?q=80&w=1000&auto=format&fit=crop', tag: '暈染' },
];

export const TIME_SLOTS = [
  '10:00', '11:30', '13:00', '14:30', '16:00', '17:30'
];
