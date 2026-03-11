import React from 'react';
import { motion } from 'motion/react';
import { Zap, HeartPulse, ShieldCheck } from 'lucide-react';

const FEATURES = [
  {
    icon: <Zap className="w-6 h-6 text-fetch-pink" />,
    title: "Lightning Fast Claims",
    description: "We process 90% of claims within 24 hours. No more waiting weeks to get your money back."
  },
  {
    icon: <HeartPulse className="w-6 h-6 text-fetch-pink" />,
    title: "Any Vet, Anywhere",
    description: "Visit any licensed veterinarian, specialist, or emergency clinic in the country. We've got you covered."
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-fetch-pink" />,
    title: "Comprehensive Coverage",
    description: "From hereditary conditions to unexpected accidents, our plans are designed to protect your pet's future."
  }
];

export function WhyFetch() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-white overflow-hidden">
      {/* Faded Pet SVG Background */}
      <div className="absolute -right-32 -top-32 opacity-[0.02] pointer-events-none transform rotate-12 text-gray-900">
        <svg width="800" height="800" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM15 10C15 11.1 14.1 12 13 12C11.9 12 11 11.1 11 10C11 8.9 11.9 8 13 8C14.1 8 15 8.9 15 10ZM9 10C9 11.1 8.1 12 7 12C5.9 12 5 11.1 5 10C5 8.9 5.9 8 7 8C8.1 8 9 8.9 9 10ZM12 17C13.66 17 15.14 16.16 16 14.86L14.27 13.86C13.73 14.67 12.91 15.2 12 15.2C11.09 15.2 10.27 14.67 9.73 13.86L8 14.86C8.86 16.16 10.34 17 12 17Z" />
        </svg>
      </div>
      
      <div className="absolute -left-32 bottom-0 opacity-[0.02] pointer-events-none transform -rotate-12 text-gray-900">
        <svg width="600" height="600" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C10.9 2 10 2.9 10 4C10 5.1 10.9 6 12 6C13.1 6 14 5.1 14 4C14 2.9 13.1 2 12 2ZM7 6C5.9 6 5 6.9 5 8C5 9.1 5.9 10 7 10C8.1 10 9 9.1 9 8C9 6.9 8.1 6 7 6ZM17 6C15.9 6 15 6.9 15 8C15 9.1 15.9 10 17 10C18.1 10 19 9.1 19 8C19 6.9 18.1 6 17 6ZM12 8C9.24 8 7 10.24 7 13C7 15.76 9.24 18 12 18C14.76 18 17 15.76 17 13C17 10.24 14.76 8 12 8ZM12 16C10.34 16 9 14.66 9 13C9 11.34 10.34 10 12 10C13.66 10 15 11.34 15 13C15 14.66 13.66 16 12 16Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Why choose <span className="text-fetch-pink">Fetch</span>?
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            We're rebuilding pet insurance from the ground up. Transparent pricing, lightning-fast claims, and coverage you can actually trust.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {FEATURES.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-[#FAFAFA] rounded-3xl p-8 border border-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
