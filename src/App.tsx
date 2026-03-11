import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { LoadingState } from './components/LoadingState';
import { Timeline } from './components/Timeline';
import { WhyFetch } from './components/WhyFetch';
import { GlobalPresence } from './components/GlobalPresence';
import { BottomCTA } from './components/BottomCTA';
import { Footer } from './components/Footer';
import { Login } from './components/Login';
import { getBreedRisks, RiskAssessment } from './services/gemini';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, ArrowRight, AlertCircle } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'login'>('home');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [assessment, setAssessment] = useState<RiskAssessment | null>(null);
  const [currentBreed, setCurrentBreed] = useState<string>('');

  const handleCalculate = async (breed: string, age: string) => {
    setLoading(true);
    setError(null);
    setCurrentBreed(breed);
    
    try {
      const data = await getBreedRisks(breed, age);
      setAssessment(data);
    } catch (err) {
      console.error(err);
      setError("We couldn't analyze this breed right now. Please try again or check your connection.");
    } finally {
      setLoading(false);
    }
  };

  if (currentView === 'login') {
    return <Login onBack={() => setCurrentView('home')} />;
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans relative">
      {/* Navigation */}
      <nav className="w-full px-6 py-4 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setAssessment(null); setError(null); }}>
          <div className="w-8 h-8 bg-fetch-pink rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">Fetch</span>
        </div>
        <button 
          onClick={() => setCurrentView('login')}
          className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
        >
          Log in
        </button>
      </nav>

      <main>
        <AnimatePresence mode="wait">
          {!assessment && !loading && (
            <motion.div
              key="hero"
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Hero onCalculate={handleCalculate} />
            </motion.div>
          )}

          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <LoadingState />
            </motion.div>
          )}

          {error && !loading && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-2xl mx-auto mt-12 p-6 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-4"
            >
              <AlertCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-red-800 mb-1">Analysis Failed</h3>
                <p className="text-red-600">{error}</p>
                <button 
                  onClick={() => setError(null)}
                  className="mt-4 text-sm font-medium text-red-700 hover:text-red-800 underline cursor-pointer"
                >
                  Try again
                </button>
              </div>
            </motion.div>
          )}

          {assessment && !loading && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Timeline risks={assessment.risks} breed={currentBreed} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Always show these sections below the fold */}
        <WhyFetch />
        <GlobalPresence />
        <BottomCTA />
      </main>

      <Footer />

      {/* Sticky CTA (Only shows when results are visible) */}
      <AnimatePresence>
        {assessment && !loading && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
            className="fixed bottom-0 left-0 right-0 p-4 md:p-6 z-50 pointer-events-none"
          >
            <div className="max-w-4xl mx-auto bg-gray-900 rounded-2xl shadow-2xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 pointer-events-auto border border-gray-800">
              <div className="text-center md:text-left">
                <h4 className="text-white font-bold text-lg md:text-xl mb-1">
                  Fetch covers up to 90% of eligible vet bills.
                </h4>
                <p className="text-gray-400 text-sm">
                  Don't let {currentBreed} health risks catch you off guard.
                </p>
              </div>
              <button className="w-full md:w-auto bg-fetch-pink hover:bg-fetch-pink-dark text-white font-semibold py-3 px-8 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer">
                Get a quote in 2 mins
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
