export interface Course {
  id: number;
  title: string;
  instructor: string;
  imageUrl: string;
  videoUrl: string;
  price: number;
  description: string;
  curriculum: { module: string, lessons: { title: string; duration: string }[] }[];
  instructorBio: string;
  instructorImage: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  frequency: string;
  features: string[];
  isPopular: boolean;
  ctaText: string;
  courseDiscount?: number;
}

export interface CartContextType {
  cartItems: Course[];
  addToCart: (course: Course) => void;
  removeFromCart: (courseId: number) => void;
  clearCart: () => void;
  isCourseInCart: (courseId: number) => boolean;
}

export interface WishlistContextType {
  wishlistItems: Course[];
  addToWishlist: (course: Course) => void;
  removeFromWishlist: (courseId: number) => void;
  isCourseInWishlist: (courseId: number) => boolean;
}

export interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export type ActiveSubscription = {
  planName: string;
  courseDiscount: number;
} | null;

export interface SubscriptionContextType {
  activeSubscription: ActiveSubscription;
  setActiveSubscription: (plan: PricingPlan | null) => void;
}

export interface User {
  email: string;
}

export interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
