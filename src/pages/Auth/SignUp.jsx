import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Phone, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import images from '../../assets/images';

const SignUp = () => {
  const navigate = useNavigate();
  const { signupRequestOtp, signupVerifyOtp } = useAuth();

  const [step, setStep] = useState('signup'); // 'signup' | 'otp'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Step 1: Request OTP
  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    const { name, email, phone } = formData;

    if (!name || !email || !phone) {
      return setError('All fields are required');
    }

    if (phone.length < 10) {
      return setError('Enter a valid phone number');
    }

    setLoading(true);

    try {
      await signupRequestOtp({ name, email, phone });
      setStep('otp');
    } catch (err) {
      setError(
        err.response?.data?.error ||
        err.response?.data?.message ||
        'Signup failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');

    if (otp.length !== 6) {
      return setError('OTP must be 6 digits');
    }

    setLoading(true);

    try {
      await signupVerifyOtp({ phone: formData.phone, otp });
      navigate('/');
    } catch (err) {
      setError(
        err.response?.data?.error ||
        err.response?.data?.message ||
        'Verification failed. Invalid OTP.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9E6] flex items-center justify-center relative overflow-hidden font-sans">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] bg-[#88013C]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-8 h-8 rounded-full bg-[#D4AF37]/10 blur-sm animate-pulse" />
      </div>

      <div className="container max-w-6xl mx-auto px-4 relative z-10 flex flex-col lg:flex-row-reverse items-center justify-center gap-12 lg:gap-20">
        
        {/* Left Side: Brand Text (Desktop Only) */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:flex flex-col items-start max-w-md text-right lg:text-left"
        >
          <img 
            src={images.madhavGopal} 
            alt="Madhav Gopal Logo" 
            className="w-48 h-auto mb-10 drop-shadow-sm" 
          />
          <h1 className="text-6xl font-black text-[#88013C] leading-tight mb-6">
            Join the <br/>
            <span className="text-[#D4AF37]">Sacred</span> Circle
          </h1>
          <p className="text-xl text-[#4A2C2A]/70 leading-relaxed font-medium mb-8">
            Begin your journey towards spiritual elegance. Create an account to personalized your experience and cherish every divine moment.
          </p>
          <div className="flex flex-col gap-4">
             <div className="flex items-center gap-3 text-[#88013C]/80 font-bold">
                <CheckCircle2 className="w-6 h-6 text-[#D4AF37]" />
                Exclusive Festive Collections
             </div>
             <div className="flex items-center gap-3 text-[#88013C]/80 font-bold">
                <CheckCircle2 className="w-6 h-6 text-[#D4AF37]" />
                Personalized Spiritual Insights
             </div>
             <div className="flex items-center gap-3 text-[#88013C]/80 font-bold">
                <CheckCircle2 className="w-6 h-6 text-[#D4AF37]" />
                Priority Global Support
             </div>
          </div>
        </motion.div>

        {/* Right Side: SignUp Form */}
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
                {step === 'signup' ? 'Create Sanctuary' : 'Final Step'}
              </h2>
              <p className="text-[#4A2C2A]/60 font-medium">
                {step === 'signup' 
                  ? 'Start your spiritual voyage with us' 
                  : `Enter the code sent to ${formData.phone}`}
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
              {step === 'signup' ? (
                <motion.form
                  key="signup-form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleSignup}
                  className="space-y-5"
                >
                  <div className="space-y-4">
                    <div className="group">
                        <label className="text-xs font-black uppercase tracking-widest text-[#88013C]/60 ml-4 mb-2 block">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#88013C] opacity-40 group-focus-within:opacity-100 transition-opacity" />
                            <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full pl-14 pr-6 py-4 bg-[#F0F4F0]/50 border-2 border-transparent rounded-2xl focus:border-[#D4AF37]/30 focus:bg-white outline-none transition-all font-bold text-[#4A2C2A]"
                            placeholder="Shri Devadatta"
                            required
                            />
                        </div>
                    </div>

                    <div className="group">
                        <label className="text-xs font-black uppercase tracking-widest text-[#88013C]/60 ml-4 mb-2 block">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#88013C] opacity-40 group-focus-within:opacity-100 transition-opacity" />
                            <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full pl-14 pr-6 py-4 bg-[#F0F4F0]/50 border-2 border-transparent rounded-2xl focus:border-[#D4AF37]/30 focus:bg-white outline-none transition-all font-bold text-[#4A2C2A]"
                            placeholder="dev@madhavgopal.com"
                            required
                            />
                        </div>
                    </div>

                    <div className="group">
                        <label className="text-xs font-black uppercase tracking-widest text-[#88013C]/60 ml-4 mb-2 block">Phone Number</label>
                        <div className="relative">
                            <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#88013C] opacity-40 group-focus-within:opacity-100 transition-opacity" />
                            <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full pl-14 pr-6 py-4 bg-[#F0F4F0]/50 border-2 border-transparent rounded-2xl focus:border-[#D4AF37]/30 focus:bg-white outline-none transition-all font-bold text-[#4A2C2A]"
                            placeholder="000 000 0000"
                            required
                            />
                        </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loading}
                    className="w-full bg-[#88013C] hover:bg-[#6f012f] text-white py-5 rounded-2xl font-black text-xl shadow-[0_20px_40px_-12px_rgba(136,1,60,0.3)] transition-all flex items-center justify-center gap-3 disabled:opacity-70 mt-4"
                  >
                    {loading ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Begin Evolution <ArrowRight className="w-6 h-6" />
                      </>
                    )}
                  </motion.button>
                </motion.form>
              ) : (
                <motion.form
                  key="otp-form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleVerify}
                  className="space-y-6 text-center"
                >
                  <div className="flex justify-center mb-4">
                    <ShieldCheck className="w-16 h-16 text-[#D4AF37]" />
                  </div>
                  
                  <div className="relative group">
                    <label className="text-xs font-black uppercase tracking-widest text-[#88013C]/60 mb-2 block">
                      Divine Verification
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
                    disabled={loading}
                    className="w-full bg-[#D4AF37] hover:bg-[#c4a132] text-[#4A2C2A] py-5 rounded-2xl font-black text-xl shadow-[0_20px_40px_-12px_rgba(212,175,55,0.3)] transition-all flex items-center justify-center gap-3 disabled:opacity-70"
                  >
                    {loading ? (
                      <div className="w-6 h-6 border-2 border-[#4A2C2A]/30 border-t-[#4A2C2A] rounded-full animate-spin" />
                    ) : (
                      <>
                        Activate Soul <CheckCircle2 className="w-6 h-6" />
                      </>
                    )}
                  </motion.button>

                  <button
                    type="button"
                    onClick={() => setStep('signup')}
                    className="text-[#88013C] font-bold text-sm hover:underline flex items-center justify-center gap-2 mx-auto mt-4"
                  >
                    Wrong details? Back to Start
                  </button>
                </motion.form>
              )}
            </AnimatePresence>

            <div className="mt-10 pt-8 border-t border-[#4A2C2A]/5 text-center">
              <p className="text-[#4A2C2A]/70 font-medium">
                Already part of the family?{' '}
                <Link to="/login" className="text-[#D4AF37] font-black hover:text-[#88013C] transition-colors decoration-2 underline-offset-4 hover:underline">
                  Sign In to Sanctuary
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;
