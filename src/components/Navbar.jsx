import React, { useEffect, useRef, useState } from 'react';
import {
  Search, User, ShoppingBag, Menu, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import images from '../assets/images';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { getStoreProducts } from '../utils/storeApi';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const { isAuthenticated, customer, logout } = useAuth();
  const navigate = useNavigate();

  const closeMobileMenu = () => setIsMenuOpen(false);

  // Search
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const desktopSearchBoxRef = useRef(null);
  const mobileSearchBoxRef = useRef(null);
  const sidebarSearchBoxRef = useRef(null);

  useEffect(() => {
    const q = searchQuery.trim();
    if (!searchOpen || q.length === 0) {
      setSearchResults([]);
      setSearchLoading(false);
      return;
    }

    let alive = true;
    const t = window.setTimeout(async () => {
      setSearchLoading(true);
      try {
        const payload = await getStoreProducts({ page: 1, limit: 8, q });
        if (!alive) return;
        const list = Array.isArray(payload?.products)
          ? payload.products
          : Array.isArray(payload)
            ? payload
            : [];
        setSearchResults(list);
      } catch {
        if (!alive) return;
        setSearchResults([]);
      } finally {
        if (alive) setSearchLoading(false);
      }
    }, 300);

    return () => {
      alive = false;
      window.clearTimeout(t);
    };
  }, [searchOpen, searchQuery]);

  useEffect(() => {
    const onDocClick = (e) => {
      const inDesktop = desktopSearchBoxRef.current?.contains(e.target);
      const inMobile = mobileSearchBoxRef.current?.contains(e.target);
      const inSidebar = sidebarSearchBoxRef.current?.contains(e.target);
      if (!inDesktop && !inMobile && !inSidebar) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const handleSearchNavigate = (overrideQuery) => {
    const q = (overrideQuery ?? searchQuery).trim();
    setSearchOpen(false);
    if (!q) return;
    navigate(`/products?q=${encodeURIComponent(q)}`);
    setMobileSearchOpen(false);
    closeMobileMenu();
  };

  return (
    <nav className="fixed w-full font-sans z-[99]">
      {/* TOP BAR */}
      <div className="bg-[#88013c] text-white py-2 text-center text-[10px] md:text-xs font-medium border-b px-4">
        Get Extra 5% Off On Prepaid Orders | Code: <span className="font-bold">HOLIDAY5</span>
      </div>

      {/* MAIN NAV */}
      <div className="bg-[#FFF9E6] w-full transition-all duration-300">
        <div className="flex items-center justify-between gap-3 w-full px-4 md:px-10 lg:px-16 2xl:px-24 mx-auto py-3">
          {/* Mobile: Hamburger */}
          <div className="min-[992px]:hidden flex items-center shrink-0">
            <Menu className="w-6 h-6 cursor-pointer text-gray-800" onClick={() => setIsMenuOpen(true)} aria-label="Menu" />
          </div>

          {/* Logo */}
          <Link to='/' onClick={closeMobileMenu} className="flex items-center justify-start shrink-0 min-[992px]:flex-1 mr-auto min-[992px]:mr-0 gap-2">
            <img
              src={images.madhavGopal}
              alt="Logo"
              className="w-10 sm:w-12 md:w-16 lg:w-20 h-auto"
            />
            <span
              className="hidden sm:block font-bold text-[#88013C] text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-wide drop-shadow-sm"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            >
              MadhavGopal
            </span>
          </Link>

          {/* Desktop Menu - Centered using flex-[2] to give it more space than the logo/icons */}
          <ul className="hidden min-[992px]:flex items-center justify-center space-x-6 lg:space-x-10 font-semibold text-sm lg:text-base text-gray-800 flex-[2]">
            <Link to="/"><li className="hover:text-[#88013C] transition whitespace-nowrap">Home</li></Link>
            <Link to="/categories"><li className="hover:text-[#88013C] transition whitespace-nowrap">Categories</li></Link>
            <Link to="/products"><li className="hover:text-[#88013C] transition whitespace-nowrap">Products</li></Link>
            <Link to="/about"><li className="hover:text-[#88013C] transition whitespace-nowrap">About Us</li></Link>
          </ul>

          {/* RIGHT ICONS */}
          <div className="flex items-center justify-end gap-3 sm:gap-4 min-[992px]:gap-6 min-[992px]:flex-1">
            {/* Mobile Search Icon */}
            <button
              className="min-[992px]:hidden text-gray-800 hover:text-[#88013C] transition"
              onClick={() => {
                setMobileSearchOpen(!mobileSearchOpen);
                if (!mobileSearchOpen) setSearchOpen(true);
              }}
            >
              <Search size={22} />
            </button>

            {/* Desktop Search Bar */}
            <div
              ref={desktopSearchBoxRef}
              className="hidden min-[992px]:flex items-center bg-white border border-gray-200 rounded-full px-4 py-2 w-48 sm:w-64 relative shadow-sm"
            >
              <Search size={18} className="text-gray-400" />
              <input
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchOpen(true);
                }}
                onFocus={() => setSearchOpen(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearchNavigate();
                }}
                className="bg-transparent ml-2 text-sm w-full outline-none"
                placeholder="Search..."
              />

              <AnimatePresence>
                {searchOpen && searchQuery.trim().length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-xl shadow-xl overflow-hidden z-[80]"
                  >
                    {searchLoading ? (
                      <div className="p-4 text-sm text-gray-500">Searching…</div>
                    ) : searchResults.length === 0 ? (
                      <div className="p-4 text-sm text-gray-500">No products found</div>
                    ) : (
                      <ul className="py-2">
                        {searchResults.map((p) => (
                          <li key={p.id}>
                            <button
                              type="button"
                              className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm"
                              onClick={() => handleSearchNavigate(searchQuery)}
                            >
                              <div className="font-medium text-gray-900">{p.name}</div>
                              {(p?.categoryName || p?.category?.name || p?.subcategory?.name) && (
                                <div className="text-xs text-gray-500 mt-0.5">
                                  {p?.categoryName || p?.category?.name}
                                  {(p?.subcategory?.name || p?.subcategoryName) ? ` • ${p?.subcategory?.name || p?.subcategoryName}` : ''}
                                </div>
                              )}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* AUTH / USER */}
            {!isAuthenticated ? (
              <div className="flex items-center gap-2 sm:gap-3">
                <Link
                  to="/login"
                  className="text-xs sm:text-sm font-semibold hover:text-[#88013C] transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-[#88013C] text-white text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full hover:bg-[#6a0129] transition whitespace-nowrap"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div
                className="relative group flex items-center"
                onMouseEnter={() => setIsProfileDropdownOpen(true)}
                onMouseLeave={() => setIsProfileDropdownOpen(false)}
              >
                <Link to="/profile" className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#88013C] text-white rounded-full flex items-center justify-center text-sm font-bold cursor-pointer">
                    {customer?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                </Link>

                <AnimatePresence>
                  {isProfileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden"
                    >
                      <ul className="py-2 text-sm text-gray-700">
                        <li>
                          <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 transition">
                            My Profile
                          </Link>
                        </li>
                        <li className="border-t border-gray-100 my-1"></li>
                        <li>
                          <button
                            onClick={() => {
                              logout();
                              navigate('/');
                            }}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 transition"
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Cart */}
            <Link to="/cart" className="relative text-gray-800 hover:text-[#88013C] transition">
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#88013C] text-white text-[10px] min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Search Dropdown */}
        <div className="w-full px-4 md:px-10 lg:px-16 2xl:px-24 mx-auto">
          <AnimatePresence>
            {mobileSearchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="min-[992px]:hidden mt-3 relative overflow-hidden"
                ref={mobileSearchBoxRef}
              >
                <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm">
                  <Search size={18} className="text-gray-400 shrink-0" />
                  <input
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setSearchOpen(true);
                    }}
                    onFocus={() => setSearchOpen(true)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSearchNavigate();
                    }}
                    className="bg-transparent ml-2 text-sm w-full outline-none"
                    placeholder="Search products..."
                    autoFocus
                  />
                </div>

                <AnimatePresence>
                  {searchOpen && searchQuery.trim().length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-xl shadow-xl overflow-hidden z-[80] max-h-64 overflow-y-auto"
                    >
                      {searchLoading ? (
                        <div className="p-4 text-sm text-gray-500">Searching…</div>
                      ) : searchResults.length === 0 ? (
                        <div className="p-4 text-sm text-gray-500">No products found</div>
                      ) : (
                        <ul className="py-2">
                          {searchResults.map((p) => (
                            <li key={p.id}>
                              <button
                                type="button"
                                className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm"
                                onClick={() => handleSearchNavigate(searchQuery)}
                              >
                                <div className="font-medium text-gray-900">{p.name}</div>
                                {(p?.categoryName || p?.category?.name || p?.subcategory?.name) && (
                                  <div className="text-xs text-gray-500 mt-0.5">
                                    {p?.categoryName || p?.category?.name}
                                    {(p?.subcategory?.name || p?.subcategoryName) ? ` • ${p?.subcategory?.name || p?.subcategoryName}` : ''}
                                  </div>
                                )}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* MOBILE SIDEBAR */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <div onClick={closeMobileMenu} className="fixed inset-0 bg-black/60 z-[60]" />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 left-0 h-full w-[85%] max-w-[320px] bg-white z-[70] shadow-xl overflow-y-auto"
            >
              <div className="p-4 border-b flex justify-between items-center bg-[#FFF9E6]">
                <img src={images.madhavGopal} className="w-14" alt="Logo" />
                <button onClick={closeMobileMenu} className="p-2 text-gray-600 hover:text-[#88013C]">
                  <X size={24} />
                </button>
              </div>

              <div className="p-4">
                {/* AUTH MOBILE */}
                {!isAuthenticated ? (
                  <div className="flex gap-3 mb-6">
                    <Link
                      to="/login"
                      onClick={closeMobileMenu}
                      className="w-full border border-[#88013C] text-[#88013C] py-2 rounded-lg font-bold hover:bg-gray-50 transition text-center"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={closeMobileMenu}
                      className="w-full bg-[#88013C] text-white py-2 rounded-lg font-bold hover:bg-[#6a0129] transition text-center"
                    >
                      Sign Up
                    </Link>
                  </div>
                ) : (
                  <Link
                    to="/profile"
                    onClick={closeMobileMenu}
                    className="flex items-center justify-between border p-3 rounded-lg mb-6 hover:bg-gray-50 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#88013C] text-white rounded-full flex items-center justify-center text-lg font-bold">
                        {customer?.name?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                      <span className="font-bold text-gray-800">{customer?.name || 'My Account'}</span>
                    </div>
                  </Link>
                )}

                {/* LINKS */}
                <ul className="space-y-1">
                  <Link to="/" onClick={closeMobileMenu} className="block">
                    <li className="p-4 rounded-lg font-bold text-gray-800 hover:bg-gray-100 transition">Home</li>
                  </Link>
                  <Link to="/categories" onClick={closeMobileMenu} className="block">
                    <li className="p-4 rounded-lg font-bold text-gray-800 hover:bg-gray-100 transition">Categories</li>
                  </Link>
                  <Link to="/products" onClick={closeMobileMenu} className="block">
                    <li className="p-4 rounded-lg font-bold text-gray-800 hover:bg-gray-100 transition">Products</li>
                  </Link>
                  <Link to="/about" onClick={closeMobileMenu} className="block">
                    <li className="p-4 rounded-lg font-bold text-gray-800 hover:bg-gray-100 transition">About Us</li>
                  </Link>
                </ul>

                {isAuthenticated && (
                  <div className="mt-8 border-t pt-4">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        logout();
                        closeMobileMenu();
                        navigate('/');
                      }}
                      className="w-full flex items-center justify-center gap-2 p-3 text-red-600 font-bold rounded-lg hover:bg-red-50 transition"
                    >
                      <User size={18} /> Logout
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
