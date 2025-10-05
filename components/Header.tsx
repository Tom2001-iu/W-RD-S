
import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import useCart from '../hooks/useCart';
import useWishlist from '../hooks/useWishlist';
import useSearch from '../hooks/useSearch';
import useAuth from '../hooks/useAuth';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  const { searchQuery, setSearchQuery } = useSearch();
  const { currentUser, logout } = useAuth();
  const [inputValue, setInputValue] = useState(searchQuery);
  const navigate = useNavigate();

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      // Only update search query and navigate if the debounced value is different
      if (inputValue !== searchQuery) {
        setSearchQuery(inputValue);
        if (inputValue) {
          navigate('/courses');
        }
      }
    }, 300); // 300ms delay

    return () => {
      clearTimeout(timer);
    };
  }, [inputValue, searchQuery, setSearchQuery, navigate]);
  
  // Sync local input value if global search query changes from elsewhere
  useEffect(() => {
    if (searchQuery !== inputValue) {
       setInputValue(searchQuery);
    }
  }, [searchQuery]);


  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/courses', label: 'All Courses' },
    { to: '/pricing', label: 'Pricing Plans' },
  ];
  
  const activeLinkClass = 'text-white font-medium';
  const inactiveLinkClass = 'text-brand-light-gray hover:text-white';

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 bg-brand-black/80 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-white tracking-wider">
            MLearn
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <NavLink 
                key={link.label} 
                to={link.to} 
                end={link.to === '/'}
                className={({ isActive }) =>
                  `text-sm transition-colors duration-300 ${isActive ? activeLinkClass : inactiveLinkClass}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                </span>
                <input
                    type="search"
                    placeholder="Search..."
                    value={inputValue}
                    onChange={handleSearchChange}
                    className="block w-48 bg-brand-gray border border-gray-700 rounded-md py-1.5 pl-9 pr-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition"
                />
              </div>
            </div>
            <Link to="/wishlist" className="relative text-brand-light-gray hover:text-white transition-colors duration-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
              {wishlistItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-brand-black text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>
            <Link to="/cart" className="relative text-brand-light-gray hover:text-white transition-colors duration-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-brand-black text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <div className='hidden md:flex items-center space-x-4'>
              {currentUser ? (
                <button onClick={handleLogout} className="text-sm text-brand-light-gray hover:text-white transition-colors duration-300">
                  Log Out
                </button>
              ) : (
                <>
                  <Link to="/login" className="text-sm text-brand-light-gray hover:text-white transition-colors duration-300">
                    Log In
                  </Link>
                  <Link to="/signup" className="bg-white text-brand-black font-semibold py-1.5 px-3 rounded-md hover:bg-gray-200 transition-colors duration-300 text-sm">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
              </svg>
            </button>
          </div>
        </div>
        <div className={`md:hidden mt-3 transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
             <div className="relative mb-3">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                </span>
                <input
                    type="search"
                    placeholder="Search courses..."
                    value={inputValue}
                    onChange={handleSearchChange}
                    className="block w-full bg-brand-gray border border-gray-700 rounded-md py-1.5 pl-9 pr-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition"
                />
            </div>
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <NavLink 
                  key={link.label} 
                  to={link.to} 
                  end={link.to === '/'}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base transition-colors duration-300 ${isActive ? 'bg-gray-800 text-white font-medium' : 'text-brand-light-gray hover:bg-gray-800/50 hover:text-white'}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
               <div className="pt-3 mt-2 border-t border-gray-700 flex flex-col space-y-3">
                {currentUser ? (
                    <button onClick={handleLogout} className="block px-3 py-2 rounded-md text-base text-left text-brand-light-gray hover:bg-gray-800/50 hover:text-white">
                      Log Out
                    </button>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base text-brand-light-gray hover:bg-gray-800/50 hover:text-white">
                      Log In
                    </Link>
                    <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="bg-white text-brand-black font-semibold py-2 px-4 rounded-md hover:bg-gray-200 transition-colors duration-300 text-center">
                      Sign Up
                    </Link>
                  </>
                )}
               </div>
            </nav>
          </div>
      </div>
    </header>
  );
};

export default Header;
