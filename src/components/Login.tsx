import React from 'react';
import { motion } from 'motion/react';
import { Shield, ArrowLeft } from 'lucide-react';

interface LoginProps {
  onBack: () => void;
}

export function Login({ onBack }: LoginProps) {
  return (
    <div className="min-h-screen w-full flex bg-white">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col px-8 md:px-16 lg:px-24 py-12 relative">
        <button 
          onClick={onBack}
          className="absolute top-8 left-8 md:left-12 flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </button>

        <div className="flex-1 flex flex-col justify-center max-w-md w-full mx-auto">
          <div className="flex items-center gap-2 mb-12">
            <div className="w-10 h-10 bg-fetch-pink rounded-xl flex items-center justify-center shadow-sm">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-gray-900">Fetch</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
              Welcome back
            </h1>
            <p className="text-gray-500 mb-8">
              Log in to manage your pet's coverage and submit claims.
            </p>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-fetch-pink focus:ring-2 focus:ring-fetch-pink/20 outline-none transition-all text-gray-900"
                  placeholder="you@example.com"
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <a href="#" className="text-sm font-medium text-fetch-pink hover:text-fetch-pink-dark">Forgot password?</a>
                </div>
                <input 
                  type="password" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-fetch-pink focus:ring-2 focus:ring-fetch-pink/20 outline-none transition-all text-gray-900"
                  placeholder="••••••••"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-fetch-pink hover:bg-fetch-pink-dark text-white font-semibold py-3.5 rounded-xl transition-colors duration-200 mt-4 shadow-sm cursor-pointer"
              >
                Log in
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-8">
              Don't have an account? <a href="#" className="font-semibold text-fetch-pink hover:text-fetch-pink-dark">Get a quote</a>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative bg-gray-100 overflow-hidden">
        <img 
          src="https://picsum.photos/seed/puppy-fetch/1200/1600" 
          alt="Happy dog" 
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        <div className="absolute bottom-12 left-12 right-12">
          <blockquote className="text-white text-2xl font-medium leading-snug mb-6">
            "Fetch made claiming for Bella's surgery completely stress-free. The money was in my account the next day."
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white font-bold">
              S
            </div>
            <div className="text-white">
              <p className="font-semibold">Sarah Jenkins</p>
              <p className="text-white/80 text-sm">Bella's Mom</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
