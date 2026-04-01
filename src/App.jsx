import './App.css'
import { useState, useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion';
import images from './assets/images'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

// import Home from './pages/homePage/Home'
import NewHome from './pages/homePage/NewHome'
import CommonLayout from './components/CommonLayout'
import ProductDetails from './components/productDetails'
import Cart from './pages/Cart'
import PageNotFound from './components/PageNotFound'
import Unauthenticated from './components/Unauthenticated'
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import Orders from './pages/Orders/Orders'
import OrderDetails from './pages/Orders/OrderDetails'
import Profile from './pages/Profile/Profile'
import Checkout from './pages/Checkout/Checkout'
import Payment from './pages/Payment/Payment'
import CircleLoader from "react-spinners/CircleLoader"




// policies
import TermsAndConditions from './pages/policies/TermsAndConditions'
import PrivacyPolicy from './pages/policies/PrivacyPolicy'
import Shipping from './pages/policies/Shipping'
import ReturnAndRefund from './pages/policies/ReturnAndRefund'
import Cancellation from './pages/policies/Cancellation'
import Disclaimer from './pages/policies/Disclaimer'

// products
import Categories from './pages/categories/Categories';
import ContactUs from './pages/ContactUs/ContactUs';
import AboutUs from './pages/AboutUs/AboutUs';
import FAQ from './pages/FAQ/FAQ';


import Products from './components/Products';

import ProtectedRoute from './components/ProtectedRoute';
import ApiErrorHandler from './components/ApiErrorHandler';

function App() {
  const location = useLocation()

  const [loading, setLoading] = useState(true)

  // 🔔 Audio
  const audioRef = useRef(null)

  // 🔊 Is song playing?
  const [isPlaying, setIsPlaying] = useState(false)

  // 🔁 Toggle handler
  const toggleBell = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      // STOP SONG → START ANIMATION
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setIsPlaying(false)
    } else {
      // PLAY SONG → STOP ANIMATION
      audioRef.current.currentTime = 0
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  // ✅ First load loader
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  // ✅ Route change loader
  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [location.pathname])

  // ✅ Loader screen
    const isAuthPage = location.pathname === '/login' || location.pathname === '/signup'

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-[99999]">
        <CircleLoader color="#88013c" size={70} />
      </div>
    )
  }

  return (
    <>
      {!isAuthPage && <Navbar />}
      <ApiErrorHandler />


      {/* 🔔 Audio */}
      <audio ref={audioRef} src="/bell.mp3" preload="auto" />

      {/* 🔔 Bell Button */}
      <motion.div
        className="
        fixed z-[9999]
        bottom-[-5px] right-[-30px]        /* mobile */
        sm:bottom-[-10px] sm:right-[-30px]            /* small screens */
        md:bottom-[-10] md:right-[-50]            /* tablets */
        lg:bottom-[-10px] lg:right-[-45px]           /* desktop */
      "

        animate={!isPlaying ? { rotate: [-10, 10] } : { rotate: 0 }}
        transition={{
          repeat: !isPlaying ? Infinity : 0,
          repeatType: "mirror",
          duration: 1.2,   // ⬅️ Increase = slower
          ease: "easeInOut"
        }}
      >
        <motion.button
          onClick={toggleBell}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          className="
            relative
             flex items-center justify-center
          "
        >
          {/* 🌊 Wave ONLY when song is NOT playing */}
          {!isPlaying && (
            <span className="absolute"></span>
          )}

          <img
            src={images.krishnaFlute}
            alt="bell"
            className="
    relative z-10
    w-30 h-30        /* mobile default */
    sm:w-30 sm:h-30   
    md:w-30 md:h-30  /* tablets */
    lg:w-40 lg:h-40  /* desktop */
    object-contain
  "
          />
        </motion.button>
      </motion.div>

      <ScrollToTop />

      <main className={isAuthPage ? "" : "pt-[100px] md:pt-[120px] lg:pt-[140px]"}>
        <Routes>
          <Route path='/' element={<NewHome />} />
          <Route path='/home' element={<NewHome />} />

          <Route path='/category/:slug' element={<CommonLayout />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/product/:id' element={<ProductDetails />} />

          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path='/cart' element={<Cart />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/payment' element={<Payment />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/orders/:id' element={<OrderDetails />} />
          </Route>


          <Route path="/unauthenticated" element={<Unauthenticated />} />
          <Route path="*" element={<PageNotFound />} />

          {/* policies */}
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/terms-and-conditions' element={<TermsAndConditions />} />
          <Route path='/shipping-policy' element={<Shipping />} />
          <Route path='/return-policy' element={<ReturnAndRefund />} />
          <Route path='/cancellation-policy' element={<Cancellation />} />
          <Route path='/disclaimer' element={<Disclaimer />} />


          {/* product coommon page */}
          <Route path='/products' element={<Products />} />
          <Route path='/contact-us' element={<ContactUs />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/faq' element={<FAQ />} />



        </Routes>
      </main>

      {!isAuthPage && <Footer />}
    </>
  )
}

export default App
