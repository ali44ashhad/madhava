import './App.css'
import { useState, useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Bell } from "lucide-react";
import { motion } from 'framer-motion';

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

import Home from './pages/homePage/Home'
import Personalize from './pages/GodDresses/Personalize'
import ShopByCategories from './pages/homeDecor/ShopByCategories'
import GiftHero from './pages/statues/GiftHero'
import CommonLayout from './components/CommonLayout'
import Mandir from './pages/fest/mandir'
import ProductDetails from './components/productDetails'
import PoojaThali from './pages/fest/PoojaThali'
import DiyaLamps from './pages/fest/DiyaLamps'
import Cart from './pages/Cart'
import PageNotFound from './components/PageNotFound'
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import Orders from './pages/Orders/Orders'
import OrderDetails from './pages/Orders/OrderDetails'  
import Profile from './pages/Profile/Profile'
import TermsAndConditions from './pages/policies/TermsAndConditions'
import PrivacyPolicy from './pages/policies/PrivacyPolicy'

import CircleLoader from "react-spinners/CircleLoader"

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
  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-[99999]">
        <CircleLoader color="#88013c" size={70} />
      </div>
    )
  }

  return (
    <>
      {/* 🔔 Audio */}
      <audio ref={audioRef} src="/bell.mp3" preload="auto" />

      {/* 🔔 Bell Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-[9999]"
        animate={!isPlaying ? { rotate: [0, -15, 15, -15, 0] } : { rotate: 0 }}
        transition={{
          repeat: !isPlaying ? Infinity : 0,
          duration: 1,
          ease: "easeInOut"
        }}
      >
        <motion.button
          onClick={toggleBell}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          className="
            relative
            bg-gradient-to-br from-[#a3004a] to-[#88013c]
            text-white
            p-5
            rounded-full
            shadow-[0_0_25px_rgba(136,1,60,0.6)]
            flex items-center justify-center
          "
        >
          {/* 🌊 Wave ONLY when song is NOT playing */}
          {!isPlaying && (
            <span className="absolute inset-0 rounded-full animate-ping bg-[#88013c]/40"></span>
          )}

          <Bell size={34} className="text-white relative z-10" />
        </motion.button>
      </motion.div>

      <ScrollToTop />
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/god-dresses' element={<Personalize />} />
        <Route path='/home-decor' element={<ShopByCategories />} />
        <Route path='/god-statues' element={<GiftHero />} />
        <Route path='/category/:slug' element={<CommonLayout />} />
        <Route path='/product/:slug' element={<ProductDetails/>}/>

        <Route path='/pooja-thali' element={<PoojaThali />}/>
        <Route path='/pooja-thali/:slug' element={<ProductDetails />}/>

        <Route path="/diya-lamps" element={<DiyaLamps />}/>
        <Route path='/diya-lamps/:slug' element={<ProductDetails />}/>

        <Route path="/mandir" element={<Mandir />}/>
        <Route path='/mandir/:slug' element={<ProductDetails />}/>

        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/orders/:id' element={<OrderDetails />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/terms-and-conditions' element={<TermsAndConditions />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
