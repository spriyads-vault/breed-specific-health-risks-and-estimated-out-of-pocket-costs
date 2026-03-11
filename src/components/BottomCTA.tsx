import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Shield } from 'lucide-react';

export function BottomCTA() {
  return (
    <section className="w-full py-24 md:py-32 bg-gray-900 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-fetch-pink opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500 opacity-10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-gray-700 shadow-lg">
            <Shield className="w-8 h-8 text-fetch-pink" />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Ready to protect your best friend?
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Join thousands of pet parents who trust Fetch. Get a personalized quote in under 2 minutes.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto bg-fetch-pink hover:bg-fetch-pink-dark text-white font-semibold py-4 px-8 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 text-lg">
              Get your free quote
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 text-white font-semibold py-4 px-8 rounded-xl transition-colors duration-200 border border-gray-700 text-lg">
              View coverage plans
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
