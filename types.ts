
export enum ServiceCategory {
  MANICURE = '基礎手部護理',
  GEL = '手部凝膠指甲',
  EXTENSION = '手部水晶延甲',
  ART = '精緻手繪藝術'
}

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  price: number;
  duration: number; // in minutes
  description: string;
  imageUrl: string;
}

export interface Artist {
  id: string;
  name: string;
  specialty: string[];
  avatar: string;
  bio: string;
  rating: number;
}

export interface Booking {
  id: string;
  serviceId: string;
  artistId: string;
  date: string;
  time: string;
  customerName: string;
  customerPhone: string;
  notes?: string;
}

export interface AIRecommendation {
  colors: string[];
  style: string;
  advice: string;
  matchingOccasions: string[];
}
