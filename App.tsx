import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CourseDetail from './components/CourseDetail';
import CoursesPage from './pages/CoursesPage';
import PricingPage from './pages/PricingPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import { AuthProvider } from './contexts/AuthContext';
import { DiscountProvider } from './contexts/DiscountContext';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { SearchProvider } from './contexts/SearchContext';
import { SubscriptionProvider } from './contexts/SubscriptionContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <SearchProvider>
        <SubscriptionProvider>
          <DiscountProvider>
            <CartProvider>
              <WishlistProvider>
                <div className="bg-brand-black text-white min-h-screen font-sans">
                  <Header />
                  <main>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/courses" element={<CoursesPage />} />
                      <Route path="/pricing" element={<PricingPage />} />
                      <Route path="/course/:id" element={<CourseDetail />} />
                      <Route path="/cart" element={<CartPage />} />
                      <Route path="/wishlist" element={<WishlistPage />} />
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/signup" element={<SignUpPage />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              </WishlistProvider>
            </CartProvider>
          </DiscountProvider>
        </SubscriptionProvider>
      </SearchProvider>
    </AuthProvider>
  );
};

export default App;
