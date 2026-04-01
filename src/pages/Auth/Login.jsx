import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, CheckCircle2, ArrowRight, Smartphone, ShieldCheck } from 'lucide-react';
import images from '../../assets/images';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('login'); // 'login' | 'otp'
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { loginRequestOtp, loginVerifyOtp } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (phone.length < 10) {
      setError('Enter a valid phone number');
      return;
    }

    setIsLoading(true);

    try {
      await loginRequestOtp(phone);
      setStep('otp');
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');

    if (otp.length !== 6) {
      setError('OTP must be 6 digits');
      return;
    }

    setIsLoading(true);

    try {
      await loginVerifyOtp(phone, otp);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9E6] flex items-center justify-center relative overflow-hidden font-sans">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#88013C]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full bg-[#D4AF37]/20 blur-sm animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-6 h-6 rounded-full bg-[#88013C]/10 blur-sm animate-pulse" />
      </div>

      <div className="container max-w-6xl mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
        
        {/* Left Side: Brand Image/Text (Desktop Only) */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:flex flex-col items-start max-w-md"
        >
          <img 
            src={images.madhavGopal} 
            alt="Madhav Gopal Logo" 
            className="w-48 h-auto mb-10 drop-shadow-sm" 
          />
          <h1 className="text-6xl font-black text-[#88013C] leading-tight mb-6">
            Your Divine <br/>
            <span className="text-[#D4AF37]">Journey</span> Begins
          </h1>
          <p className="text-xl text-[#4A2C2A]/70 leading-relaxed font-medium mb-8">
            Experience the essence of devotion with our handcrafted treasures. Sign in to continue your spiritual voyage.
          </p>
          <div className="flex items-center gap-4 text-[#88013C] font-bold">
            <div className="flex -space-x-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#FFF9E6] bg-[#D4AF37]/20 overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" />
                </div>
              ))}
            </div>
            <span>Trusted by 5000+ Seekers</span>
          </div>
        </motion.div>

        {/* Right Side: Login Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg"
        >
          <div className="bg-white/70 backdrop-blur-2xl rounded-[3rem] p-8 md:p-12 shadow-[0_50px_100px_-20px_rgba(136,1,60,0.15)] border border-white/50 relative overflow-hidden">
            
            {/* Form Header */}
            <div className="text-center mb-10">
              <div className="lg:hidden flex justify-center mb-6">
                <img src={images.madhavGopal} alt="Logo" className="w-32 h-auto" />
              </div>
              <h2 className="text-4xl font-black text-[#88013C] mb-3">
                {step === 'login' ? 'Welcome Back' : 'Verify Security'}
              </h2>
              <p className="text-[#4A2C2A]/60 font-medium">
                {step === 'login' 
                  ? 'Sign in with your phone to explore' 
                  : `Enter the secret code sent to ${phone}`}
              </p>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-xl text-sm font-medium flex items-center gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                {error}
              </motion.div>
            )}

            <AnimatePresence mode="wait">
              {step === 'login' ? (
                <motion.form
                  key="login-form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleLogin}
                  className="space-y-6"
                >
                  <div className="relative group">
                    <label className="text-xs font-black uppercase tracking-widest text-[#88013C]/60 ml-4 mb-2 block">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#88013C] opacity-40 group-focus-within:opacity-100 transition-opacity" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-14 pr-6 py-5 bg-[#F0F4F0]/50 border-2 border-transparent rounded-2xl focus:border-[#D4AF37]/30 focus:bg-white outline-none transition-all font-bold text-[#4A2C2A] text-lg"
                        placeholder="000 000 0000"
                        required
                      />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isLoading}
                    className="w-full bg-[#88013C] hover:bg-[#6f012f] text-white py-5 rounded-2xl font-black text-xl shadow-[0_20px_40px_-12px_rgba(136,1,60,0.3)] transition-all flex items-center justify-center gap-3 disabled:opacity-70"
                  >
                    {isLoading ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Get Divine Access <ArrowRight className="w-6 h-6" />
                      </>
                    )}
                  </motion.button>
                </motion.form>
              ) : (
                <motion.form
                  key="otp-form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleVerify}
                  className="space-y-6 text-center"
                >
                  <div className="flex justify-center mb-4">
                    <ShieldCheck className="w-16 h-16 text-[#D4AF37]" />
                  </div>
                  
                  <div className="relative group">
                    <label className="text-xs font-black uppercase tracking-widest text-[#88013C]/60 mb-2 block">
                      Verification Code
                    </label>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full px-6 py-6 bg-[#F0F4F0]/50 border-2 border-transparent rounded-2xl focus:border-[#D4AF37]/30 focus:bg-white outline-none transition-all font-black text-[#88013C] text-4xl text-center tracking-[0.5em] placeholder:tracking-normal placeholder:font-light"
                      placeholder="XXXXXX"
                      maxLength={6}
                      required
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isLoading}
                    className="w-full bg-[#D4AF37] hover:bg-[#c4a132] text-[#4A2C2A] py-5 rounded-2xl font-black text-xl shadow-[0_20px_40px_-12px_rgba(212,175,55,0.3)] transition-all flex items-center justify-center gap-3 disabled:opacity-70"
                  >
                    {isLoading ? (
                      <div className="w-6 h-6 border-2 border-[#4A2C2A]/30 border-t-[#4A2C2A] rounded-full animate-spin" />
                    ) : (
                      <>
                        Verify & Enter <CheckCircle2 className="w-6 h-6" />
                      </>
                    )}
                  </motion.button>

                  <button
                    type="button"
                    onClick={() => setStep('login')}
                    className="text-[#88013C] font-bold text-sm hover:underline flex items-center justify-center gap-2 mx-auto mt-4"
                  >
                    Wrong number? Change it here
                  </button>
                </motion.form>
              )}
            </AnimatePresence>

            <div className="mt-10 pt-8 border-t border-[#4A2C2A]/5 text-center">
              <p className="text-[#4A2C2A]/70 font-medium">
                New seeker?{' '}
                <Link to="/signup" className="text-[#D4AF37] font-black hover:text-[#88013C] transition-colors decoration-2 underline-offset-4 hover:underline">
                  Create Your Sanctuary
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
