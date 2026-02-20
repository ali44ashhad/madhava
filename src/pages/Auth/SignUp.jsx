import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

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
    <div className="min-h-screen bg-gradient-to-br from-[#eff4f7] to-white flex items-center justify-center px-4 pt-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl"
      >
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
          {step === 'signup' ? 'Create Account' : 'Verify Phone'}
        </h1>
        <p className="text-center text-gray-600 mb-6">
          {step === 'signup'
            ? 'Sign up to get started'
            : `Enter OTP sent to ${formData.phone}`}
        </p>

        {error && (
          <div className="mb-4 p-3 text-sm bg-red-50 text-red-700 border border-red-200 rounded-lg">
            {error}
          </div>
        )}

        {step === 'signup' ? (
          <form onSubmit={handleSignup} className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#88013C]"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#88013C]"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number (10 digits)"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#88013C]"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#88013C] text-white py-3 rounded-full font-semibold hover:bg-[#6a0129] transition disabled:opacity-50"
            >
              {loading ? 'Sending OTP...' : 'Continue'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="space-y-5">
            <input
              type="text"
              name="otp"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#88013C] text-center tracking-widest text-lg"
              maxLength={6}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#88013C] text-white py-3 rounded-full font-semibold hover:bg-[#6a0129] transition disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify & Sign Up'}
            </button>

            <button
              type="button"
              onClick={() => setStep('signup')}
              className="w-full text-gray-600 text-sm hover:underline mt-2"
            >
              Change Phone Number
            </button>
          </form>
        )}

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-[#88013C] font-semibold">
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignUp;
