import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Search, User, ShoppingBag, Menu, X, ChevronDown, Plus, Minus, MapPin, Heart, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import images from '../assets/images';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { getStoreCategories, getStoreProducts } from '../utils/storeApi';

const SELECTED_ADDRESS_STORAGE_KEY = 'selectedAddress';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const [selectedAddressLabel, setSelectedAddressLabel] = useState('Select Address');
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  // Mobile States
  const [mobileCatExpanded, setMobileCatExpanded] = useState(true);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [mobileMoreExpanded, setMobileMoreExpanded] = useState(false);

  const closeMobileMenu = () => setIsMenuOpen(false);

  // Backend categories for Ornaments menu
  const [storeCategories, setStoreCategories] = useState([]);

  // Search
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [allProductsForSearch, setAllProductsForSearch] = useState([]);
  const desktopSearchBoxRef = useRef(null);
  const mobileInlineSearchBoxRef = useRef(null);
  const sidebarSearchBoxRef = useRef(null);

  useEffect(() => {
    // Categories in Ornaments menu (from backend)
    (async () => {
      try {
        const cats = await getStoreCategories();
        setStoreCategories(Array.isArray(cats) ? cats : []);
      } catch {
        setStoreCategories([]);
      }
    })();
  }, []);

  // Address label for Navbar (saved from Profile/Addresses)
  useEffect(() => {
    const computeLabel = () => {
      try {
        const raw = localStorage.getItem(SELECTED_ADDRESS_STORAGE_KEY);
        if (!raw) return 'Select Address';
        const a = JSON.parse(raw);
        if (!a || typeof a !== 'object') return 'Select Address';
        const line1 = a.line1 || '';
        const line2 = a.line2 ? `, ${a.line2}` : '';
        const city = a.city ? `, ${a.city}` : '';
        const state = a.state ? `, ${a.state}` : '';
        const label = `${line1}${line2}${city}${state}`.trim();
        return label || 'Select Address';
      } catch {
        return 'Select Address';
      }
    };

    setSelectedAddressLabel(computeLabel());

    const onStorage = (e) => {
      if (e.key === SELECTED_ADDRESS_STORAGE_KEY) {
        setSelectedAddressLabel(computeLabel());
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const isAddressSelected =
    selectedAddressLabel && selectedAddressLabel !== 'Select Address';

  const displayedCategories = showAllCategories
    ? storeCategories
    : storeCategories.slice(0, 4);

  const filteredSearchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return (allProductsForSearch || [])
      .filter((p) => (p?.name || '').toLowerCase().includes(q))
      .slice(0, 8);
  }, [allProductsForSearch, searchQuery]);

  const loadProductsForSearchIfNeeded = async () => {
    if (allProductsForSearch.length > 0 || searchLoading) return;
    setSearchLoading(true);
    try {
      const res = await getStoreProducts({ page: 1, limit: 100 });
      setAllProductsForSearch(Array.isArray(res?.products) ? res.products : []);
    } catch {
      setAllProductsForSearch([]);
    } finally {
      setSearchLoading(false);
    }
  };

  useEffect(() => {
    const onDocClick = (e) => {
      const inDesktop = desktopSearchBoxRef.current?.contains(e.target);
      const inMobileInline = mobileInlineSearchBoxRef.current?.contains(e.target);
      const inSidebar = sidebarSearchBoxRef.current?.contains(e.target);
      if (!inDesktop && !inMobileInline && !inSidebar) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  return (
    <nav className="fixed w-full font-sans z-[99]">
      {/* TOP BAR */}
      <div className="bg-[#88013c] text-white py-2 text-center text-[10px] md:text-xs font-medium border-b px-4">
        Get Extra 5% Off On Prepaid Orders | Code: <span className="font-bold">HOLIDAY5</span>
      </div>

      {/* MAIN NAV */}
      <div className="bg-[#F2EDF0] px-4 md:px-10 py-1">
        <div className="flex flex-col ">
          {/* Address BAR – desktop only */}
          <div className="hidden min-[992px]:flex w-full items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => navigate('/profile')}
              className="flex items-center gap-2 text-left max-w-[80%]"
              aria-label="Selected address"
            >
              <MapPin size={18} className="text-[#88013C] shrink-0" />
              <span className="text-sm text-gray-800 leading-4 line-clamp-2">
                {selectedAddressLabel}
              </span>
            </button>
          </div>

          {/* Row: Hamburger / Logo / Wishlist / Cart (mobile) | Full menu (desktop) */}
          <div className="flex items-center justify-between gap-3">
            {/* Mobile: Hamburger */}
            <div className="min-[992px]:hidden flex items-center shrink-0">
              <Menu className="w-6 h-6 cursor-pointer text-gray-800" onClick={() => setIsMenuOpen(true)} aria-label="Menu" />
            </div>

            {/* Logo – centered on mobile, left on desktop */}
            <Link to='/' onClick={closeMobileMenu} className="min-[992px]:mr-auto flex justify-left min-[992px]:justify-start shrink-0">
              <img
                src={images.madhavGopal}
                alt="Logo"
                className="w-14 sm:w-16 md:w-20 h-auto z-[99]"
              />
            </Link>

            {/* Mobile: Inline search between logo and icons */}
            <div
              ref={mobileInlineSearchBoxRef}
              className="min-[992px]:hidden flex-1 relative"
            >
              <div className="flex items-center bg-white rounded-lg border border-gray-200 px-3 py-2 shadow-sm">
                <Search size={18} className="text-gray-400 shrink-0" />
                <input
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSearchOpen(true);
                  }}
                  onFocus={async () => {
                    setSearchOpen(true);
                    await loadProductsForSearchIfNeeded();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const q = searchQuery.trim();
                      setSearchOpen(false);
                      if (!q) return;
                      navigate(`/products?q=${encodeURIComponent(q)}`);
                    }
                  }}
                  className="bg-transparent ml-2 text-sm w-full outline-none placeholder:text-gray-400"
                  placeholder="Search products..."
                />
              </div>

              <AnimatePresence>
                {searchOpen && searchQuery.trim().length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-xl shadow-xl overflow-hidden z-[80]"
                  >
                    {searchLoading ? (
                      <div className="p-4 text-sm text-gray-500">Searching…</div>
                    ) : filteredSearchResults.length === 0 ? (
                      <div className="p-4 text-sm text-gray-500">No products found</div>
                    ) : (
                      <ul className="py-2 max-h-64 overflow-y-auto">
                        {filteredSearchResults.map((p) => (
                          <li key={p.id}>
                            <button
                              type="button"
                              className="w-full text-left px-4 py-2.5 hover:bg-gray-50 text-sm"
                              onClick={() => {
                                const q = searchQuery.trim();
                                setSearchOpen(false);
                                if (!q) return;
                                navigate(`/products?q=${encodeURIComponent(q)}`);
                              }}
                            >
                              {p.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Desktop Menu */}
            <ul className="hidden min-[992px]:flex items-center space-x-8 font-semibold text-[14px] text-gray-800">
              <Link to="/"><li>Home</li></Link>

              <li
                className="relative py-2 cursor-pointer flex items-center gap-1 group select-none"
                onClick={() => setIsCategoriesOpen((v) => !v)}
              >
                Ornaments <ChevronDown size={14} />
              </li>

              <Link to="/god-dresses"><li>God Dresses</li></Link>
              <Link to="/home-decor"><li>Home Decor</li></Link>
              <Link to="/god-statues"><li>Statues/Idols</li></Link>
              <Link to="/categories"><li className="text-[#88013C]">All Categories</li></Link>

              {/* Fest Dropdown */}
              <li
                className="relative py-2 cursor-pointer flex items-center gap-1"
                onMouseEnter={() => setIsMoreOpen(true)}
                onMouseLeave={() => setIsMoreOpen(false)}
              >
                Fest Items <ChevronDown size={14} />
                <AnimatePresence>
                  {isMoreOpen && (
                    <motion.div
                      className="absolute top-full left-0 w-48 bg-white shadow-xl border rounded-lg py-2 mt-1"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                    >
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

            {/* RIGHT ICONS: Wishlist (mobile) + Search (desktop) + Auth + Cart */}
            <div className="flex items-center gap-3 sm:gap-4 min-[992px]:gap-6">
              {/* Mobile: Wishlist */}
              <Link to="/profile" className="min-[992px]:hidden text-red-500 hover:text-red-600 transition" aria-label="Wishlist">
                <Heart size={22} strokeWidth={2} />
              </Link>
              {/* Search – desktop only (mobile has full-width search below) */}
              <div
                ref={desktopSearchBoxRef}
                className="hidden min-[992px]:flex items-center bg-gray-100 rounded-full px-4 py-2 w-40 sm:w-64 relative"
              >
                <Search size={18} className="text-gray-400" />
                <input
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSearchOpen(true);
                  }}
                  onFocus={async () => {
                    setSearchOpen(true);
                    await loadProductsForSearchIfNeeded();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const q = searchQuery.trim();
                      setSearchOpen(false);
                      if (!q) return;
                      navigate(`/products?q=${encodeURIComponent(q)}`);
                    }
                  }}
                  className="bg-transparent ml-2 text-sm w-full outline-none"
                  placeholder="Search products..."
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
                      ) : filteredSearchResults.length === 0 ? (
                        <div className="p-4 text-sm text-gray-500">No products found</div>
                      ) : (
                        <ul className="py-2">
                          {filteredSearchResults.map((p) => (
                            <li key={p.id}>
                              <button
                                type="button"
                                className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm"
                                onClick={() => {
                                  const q = searchQuery.trim();
                                  setSearchOpen(false);
                                  if (!q) return;
                                  navigate(`/products?q=${encodeURIComponent(q)}`);
                                }}
                              >
                                {p.name}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* AUTH DESKTOP */}
              {!isAuthenticated ? (
                <div className="hidden md:flex items-center gap-3">
                  <Link
                    to="/login"
                    className="text-sm font-semibold hover:text-[#88013C] transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-[#88013C] text-white text-sm px-4 py-2 rounded-full hover:bg-[#6a0129] transition"
                  >
                    Sign Up
                  </Link>
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

          {/* Mobile: Delivery location banner */}
          <button
            type="button"
            onClick={() => navigate('/profile')}
            className="min-[992px]:hidden w-full flex items-center justify-between gap-1 px-1 text-left"
          >
            <span className="flex items-center gap-2 text-xs text-gray-700 bg-white">
              <MapPin size={16} className="text-blue-600 shrink-0" />
              {isAddressSelected ? (
                <span className="flex flex-col">
                  <span className="line-clamp-2">{selectedAddressLabel}</span>
                </span>
              ) : (
                'Add delivery location to check extra discount'
              )}
            </span>

          </button>
        </div>
      </div>

      {/* DESKTOP MEGA MENU (Ornaments → Category → Products → Product Details) */}
      <AnimatePresence>
        {isCategoriesOpen && (
          <motion.div
            className="hidden min-[992px]:block absolute top-full left-0 w-full bg-white border-t shadow-2xl z-40 pt-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="max-w-7xl mx-auto p-10 grid grid-cols-4 gap-8">
              {storeCategories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/category/${cat.slug}`}
                >
                  <div className="flex items-center space-x-4 cursor-pointer">
                    <img
                      src={cat.imageUrl || 'https://placehold.co/48x48'}
                      alt={cat.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
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
                <img src={images.madhavGopal} className="w-14" alt="Logo" />
                <X onClick={closeMobileMenu} />
              </div>

              <div className="p-4">
                {/* SEARCH (MOBILE) */}
                <div className="mb-4" ref={sidebarSearchBoxRef}>
                  <div className="flex items-center bg-gray-100 rounded-full px-4 py-3">
                    <Search size={18} className="text-gray-400" />
                    <input
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setSearchOpen(true);
                      }}
                      onFocus={async () => {
                        setSearchOpen(true);
                        await loadProductsForSearchIfNeeded();
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          const q = searchQuery.trim();
                          setSearchOpen(false);
                          closeMobileMenu();
                          if (!q) return;
                          navigate(`/products?q=${encodeURIComponent(q)}`);
                        }
                      }}
                      className="bg-transparent ml-2 text-sm w-full outline-none"
                      placeholder="Search products..."
                    />
                  </div>

                  <AnimatePresence>
                    {searchOpen && searchQuery.trim().length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        className="mt-2 bg-white border rounded-xl shadow-xl overflow-hidden"
                      >
                        {searchLoading ? (
                          <div className="p-4 text-sm text-gray-500">Searching…</div>
                        ) : filteredSearchResults.length === 0 ? (
                          <div className="p-4 text-sm text-gray-500">No products found</div>
                        ) : (
                          <ul className="py-2">
                            {filteredSearchResults.map((p) => (
                              <li key={p.id}>
                                <button
                                  type="button"
                                  className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm"
                                  onClick={() => {
                                    const q = searchQuery.trim();
                                    setSearchOpen(false);
                                    closeMobileMenu();
                                    if (!q) return;
                                    navigate(`/products?q=${encodeURIComponent(q)}`);
                                  }}
                                >
                                  {p.name}
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* AUTH MOBILE */}
                {!isAuthenticated ? (
                  <div className="flex gap-3 mb-4">
                    <Link
                      to="/login"
                      onClick={closeMobileMenu}
                      className="w-full border border-[#88013C] text-[#88013C] py-2 rounded-full font-bold hover:bg-[#88013C] hover:text-white transition text-center"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={closeMobileMenu}
                      className="w-full bg-[#88013C] text-white py-2 rounded-full font-bold hover:bg-[#6a0129] transition text-center"
                    >
                      Sign Up
                    </Link>
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

                {/* HOME LINK */}
                <Link to="/" onClick={closeMobileMenu}>
                  <li className="py-4 border-b font-bold list-none">Home</li>
                </Link>

                {/* ORNAMENTS */}
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
                          <Link
                            key={cat.id}
                            to={`/category/${cat.slug}`}
                            onClick={closeMobileMenu}
                          >
                            <div className="flex flex-col items-center p-3 border rounded-lg">
                              <img
                                src={cat.imageUrl || 'https://placehold.co/40x40'}
                                className="w-10 h-10 object-cover rounded"
                                alt={cat.name}
                              />
                              <span className="text-[10px] font-bold text-center">{cat.name}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <button
                        onClick={() => setShowAllCategories(!showAllCategories)}
                        className="text-[#88013C] font-bold text-xs"
                      >
                        {showAllCategories ? "Show Less -" : "Show More +"}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* LINKS */}
                <ul className="mt-4 space-y-2">
                  <Link to="/god-dresses" onClick={closeMobileMenu}>
                    <li className="py-4 border-b font-bold">God Dresses</li>
                  </Link>
                  <Link to="/home-decor" onClick={closeMobileMenu}>
                    <li className="py-4 border-b font-bold">Home Decor</li>
                  </Link>
                  <Link to="/god-statues" onClick={closeMobileMenu}>
                    <li className="py-4 border-b font-bold">Statues/Idols</li>
                  </Link>
                  <Link to="/categories" onClick={closeMobileMenu}>
                    <li className="py-4 border-b font-bold text-[#88013C]">All Categories</li>
                  </Link>

                  <li className="border-b">
                    <button
                      onClick={() => setMobileMoreExpanded(!mobileMoreExpanded)}
                      className="w-full flex justify-between py-4 font-bold"
                    >
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

      {/* AUTH MODAL (unchanged) */}
      <AnimatePresence>
        {/* {showAuthModal && (
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
        )} */}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;