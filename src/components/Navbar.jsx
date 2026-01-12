import React, { useState } from 'react';
import { 
  Search, User, ShoppingBag, Menu, X, ChevronDown, Plus, Minus 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import images from '../assets/images';
import { categories } from '../data/data';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const { isAuthenticated, user, logout, login, signup } = useAuth();
  const navigate = useNavigate();

  // Mobile States
  const [mobileCatExpanded, setMobileCatExpanded] = useState(true); 
  const [showAllCategories, setShowAllCategories] = useState(false); 
  const [mobileMoreExpanded, setMobileMoreExpanded] = useState(false);

  const closeMobileMenu = () => setIsMenuOpen(false);
  const displayedCategories = showAllCategories ? categories : categories.slice(0, 4);

  return (
    <nav className="fixed w-full font-sans z-[99]">
      {/* TOP BAR */}
      <div className="bg-[#eff4f7] text-black py-2 text-center text-[10px] md:text-xs font-medium border-b px-4">
        Get Extra 5% Off On Prepaid Orders | Code: <span className="font-bold">HOLIDAY5</span>
      </div>

      {/* MAIN NAV */}
      <div className="bg-white px-4 md:px-10 py-4 flex items-center justify-between shadow-sm relative z-50">
        
        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <Menu className="w-6 h-6 cursor-pointer" onClick={() => setIsMenuOpen(true)} />
        </div>

        {/* Logo */}
        <Link to='/' onClick={closeMobileMenu}>
          <img 
            src="https://www.boat-lifestyle.com/cdn/shop/files/boAt_logo_bad_6c0034a7-b16a-463e-a89c-48c9df17cc90.png" 
            alt="Logo" className="w-16 md:w-20" 
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-8 font-semibold text-[14px] text-gray-800">
          <Link to="/"><li>Home</li></Link>

          <li 
            className="relative py-2 cursor-pointer flex items-center gap-1 group"
            onMouseEnter={() => setIsCategoriesOpen(true)}
            onMouseLeave={() => setIsCategoriesOpen(false)}
          >
            Ornaments <ChevronDown size={14} />
            {/* Invisible bridge to prevent gap */}
            <div className="absolute top-full left-0 right-0 h-2 bg-transparent" />
          </li>

          <Link to="/god-dresses"><li>God Dresses</li></Link>
          <Link to="/home-decor"><li>Home Decor</li></Link>
          <Link to="/god-statues"><li>Statues/Idols</li></Link>

          {/* Fest Dropdown */}
          <li 
            className="relative py-2 cursor-pointer flex items-center gap-1"
            onMouseEnter={() => setIsMoreOpen(true)}
            onMouseLeave={() => setIsMoreOpen(false)}
          >
            Fest Items <ChevronDown size={14} />
            <AnimatePresence>
              {isMoreOpen && (
                <motion.div className="absolute top-full left-0 w-48 bg-white shadow-xl border rounded-lg py-2 mt-1">
                  <ul className="text-sm font-medium">
                    <Link to="/pooja-thali"><li className="px-4 py-2 hover:bg-gray-100">Pooja Thali</li></Link>
                    <Link to="/diya-lamps"><li className="px-4 py-2 hover:bg-gray-100">Diyas & Lamps</li></Link>
                    <Link to="/mandir"><li className="px-4 py-2 hover:bg-gray-100">Mandir</li></Link>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        </ul>

        {/* RIGHT ICONS */}
        <div className="flex items-center space-x-4 md:space-x-6">

          {/* Search */}
          <div className="hidden lg:flex items-center bg-gray-100 rounded-full px-4 py-2 w-64">
            <Search size={18} className="text-gray-400" />
            <input className="bg-transparent ml-2 text-sm w-full outline-none" placeholder="Search products..." />
          </div>

          <Search size={20} className="lg:hidden" />

          {/* AUTH DESKTOP */}
          {!isAuthenticated ? (
            <div className="hidden md:flex items-center gap-3">
              <button 
                onClick={() => {
                  setAuthMode('login');
                  setShowAuthModal(true);
                }} 
                className="text-sm font-semibold hover:text-[#88013C] transition"
              >
                Login
              </button>
              <button 
                onClick={() => {
                  setAuthMode('signup');
                  setShowAuthModal(true);
                }} 
                className="bg-[#88013C] text-white text-sm px-4 py-2 rounded-full hover:bg-[#6a0129] transition"
              >
                Sign Up
              </button>
            </div>
          ) : (
            <Link to="/profile" className="relative group">
              <User className="cursor-pointer" />
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  {user?.name || 'Profile'}
                </div>
              </div>
            </Link>
          )}

          {/* Cart */}
          <Link to="/cart" className="relative">
            <ShoppingBag />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#88013C] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* DESKTOP MEGA MENU */}
      <AnimatePresence>
        {isCategoriesOpen && (
          <motion.div 
            className="hidden md:block absolute top-full left-0 w-full bg-white border-t shadow-2xl z-40 pt-2"
            onMouseEnter={() => setIsCategoriesOpen(true)}
            onMouseLeave={() => setIsCategoriesOpen(false)}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="max-w-7xl mx-auto p-10 grid grid-cols-4 gap-8">
              {categories.map((cat) => (
                <Link key={cat.slug} to={`/category${cat.slug}`}>
                  <div className="flex items-center space-x-4 cursor-pointer">
                    <img src={cat.img} alt={cat.name} className="w-12 h-12 rounded-full" />
                    <span>{cat.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE SIDEBAR */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <div onClick={closeMobileMenu} className="fixed inset-0 bg-black/60 z-[60]" />
            <motion.div className="fixed top-0 left-0 h-full w-[85%] bg-white z-[70] shadow-xl overflow-y-auto">

              <div className="p-4 border-b flex justify-between items-center">
                <img src="https://www.boat-lifestyle.com/cdn/shop/files/boAt_logo_bad_6c0034a7-b16a-463e-a89c-48c9df17cc90.png" className="w-14" />
                <X onClick={closeMobileMenu} />
              </div>

              <div className="p-4">

                {/* AUTH MOBILE */}
                {!isAuthenticated ? (
                  <div className="flex gap-3 mb-4">
                    <button 
                      onClick={() => {
                        setAuthMode('login');
                        setShowAuthModal(true);
                        closeMobileMenu();
                      }} 
                      className="w-full border border-[#88013C] text-[#88013C] py-2 rounded-full font-bold hover:bg-[#88013C] hover:text-white transition"
                    >
                      Login
                    </button>
                    <button 
                      onClick={() => {
                        setAuthMode('signup');
                        setShowAuthModal(true);
                        closeMobileMenu();
                      }} 
                      className="w-full bg-[#88013C] text-white py-2 rounded-full font-bold hover:bg-[#6a0129] transition"
                    >
                      Sign Up
                    </button>
                  </div>
                ) : (
                  <Link 
                    to="/profile" 
                    onClick={closeMobileMenu}
                    className="flex items-center justify-between border p-3 rounded-lg mb-4 hover:bg-gray-50 transition"
                  >
                    <div className="flex items-center gap-3">
                      <User />
                      <span className="font-bold">{user?.name || 'My Account'}</span>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        logout();
                        closeMobileMenu();
                      }} 
                      className="text-red-500 text-sm hover:text-red-700"
                    >
                      Logout
                    </button>
                  </Link>
                )}

                {/* ORNAMENTS */}

                <Link to="/" onClick={closeMobileMenu}><li className="py-4 border-b font-bold list-none">Home</li></Link>

                <div className="flex justify-between items-center py-4 border-b">
                  <span className="font-bold text-md uppercase">Ornaments</span>
                  <button onClick={() => setMobileCatExpanded(!mobileCatExpanded)}>
                    {mobileCatExpanded ? <Minus /> : <Plus />}
                  </button>
                </div>

                <AnimatePresence>
                  {mobileCatExpanded && (
                    <motion.div className="overflow-hidden">
                      <div className="grid grid-cols-2 gap-3 py-4">
                        {displayedCategories.map((cat) => (
                          <Link key={cat.slug} to={`/category${cat.slug}`} onClick={closeMobileMenu}>
                            <div className="flex flex-col items-center p-3 border rounded-lg">
                              <img src={cat.img} className="w-10 h-10" />
                              <span className="text-[10px] font-bold">{cat.name}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <button onClick={() => setShowAllCategories(!showAllCategories)} className="text-[#88013C] font-bold text-xs">
                        {showAllCategories ? "Show Less -" : "Show More +"}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* LINKS */}
                <ul className="mt-4 space-y-2">
                  <Link to="/god-dresses" onClick={closeMobileMenu}><li className="py-4 border-b font-bold">God Dresses</li></Link>
                  <Link to="/home-decor" onClick={closeMobileMenu}><li className="py-4 border-b font-bold">Home Decor</li></Link>
                  <Link to="/god-statues" onClick={closeMobileMenu}><li className="py-4 border-b font-bold">Statues/Idols</li></Link>

                  <li className="border-b">
                    <button onClick={() => setMobileMoreExpanded(!mobileMoreExpanded)} className="w-full flex justify-between py-4 font-bold">
                      Fest Items {mobileMoreExpanded ? <Minus /> : <Plus />}
                    </button>
                    {mobileMoreExpanded && (
                      <ul className="pl-4 pb-4 space-y-3 text-sm">
                        <Link to="/pooja-thali" onClick={closeMobileMenu}><li>Pooja Thali</li></Link>
                        <Link to="/diya-lamps" onClick={closeMobileMenu}><li>Diyas & Lamps</li></Link>
                        <Link to="/mandir" onClick={closeMobileMenu}><li>Mandir</li></Link>
                      </ul>
                    )}
                  </li>
                </ul>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* AUTH MODAL */}
      <AnimatePresence>
        {showAuthModal && (
          <>
            <div 
              className="fixed inset-0 bg-black/60 z-[100]"
              onClick={() => setShowAuthModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 z-[101] flex items-center justify-center p-4"
              onClick={() => setShowAuthModal(false)}
            >
              <motion.div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative"
              >
                <button
                  onClick={() => setShowAuthModal(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
                >
                  <X className="w-6 h-6" />
                </button>

                {authMode === 'login' ? (
                  <div>
                    <div className="text-center mb-8">
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                      <p className="text-gray-600">Sign in to your account</p>
                    </div>
                    <form 
                      onSubmit={async (e) => {
                        e.preventDefault();
                        const formData = new FormData(e.target);
                        const email = formData.get('email');
                        const password = formData.get('password');
                        try {
                          await login(email, password);
                          setShowAuthModal(false);
                        } catch (error) {
                          alert('Login failed. Please try again.');
                        }
                      }}
                      className="space-y-6"
                    >
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#88013C] focus:border-transparent outline-none transition"
                          placeholder="Enter your email"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#88013C] focus:border-transparent outline-none transition"
                          placeholder="Enter your password"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-[#88013C] text-white py-3 rounded-full font-semibold hover:bg-[#6a0129] transition"
                      >
                        Sign In
                      </button>
                    </form>
                    <div className="mt-6 text-center">
                      <p className="text-gray-600 text-sm">
                        Don't have an account?{' '}
                        <button
                          onClick={() => setAuthMode('signup')}
                          className="text-[#88013C] font-semibold hover:underline"
                        >
                          Sign Up
                        </button>
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-center mb-8">
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
                      <p className="text-gray-600">Join us and start shopping</p>
                    </div>
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        const formData = new FormData(e.target);
                        const name = formData.get('name');
                        const email = formData.get('email');
                        const password = formData.get('password');
                        const confirmPassword = formData.get('confirmPassword');
                        
                        if (password !== confirmPassword) {
                          alert('Passwords do not match');
                          return;
                        }
                        
                        try {
                          await signup(name, email, password);
                          setShowAuthModal(false);
                        } catch (error) {
                          alert('Sign up failed. Please try again.');
                        }
                      }}
                      className="space-y-5"
                    >
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#88013C] focus:border-transparent outline-none transition"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#88013C] focus:border-transparent outline-none transition"
                          placeholder="Enter your email"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#88013C] focus:border-transparent outline-none transition"
                          placeholder="Create a password"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          name="confirmPassword"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#88013C] focus:border-transparent outline-none transition"
                          placeholder="Confirm your password"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-[#88013C] text-white py-3 rounded-full font-semibold hover:bg-[#6a0129] transition"
                      >
                        Sign Up
                      </button>
                    </form>
                    <div className="mt-6 text-center">
                      <p className="text-gray-600 text-sm">
                        Already have an account?{' '}
                        <button
                          onClick={() => setAuthMode('login')}
                          className="text-[#88013C] font-semibold hover:underline"
                        >
                          Sign In
                        </button>
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
