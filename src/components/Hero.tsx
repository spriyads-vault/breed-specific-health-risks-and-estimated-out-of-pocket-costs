import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, ChevronDown } from 'lucide-react';

interface HeroProps {
  onCalculate: (breed: string, age: string) => void;
}

const COMMON_BREEDS = [
  "French Bulldog", "Golden Retriever", "Labrador Retriever", 
  "German Shepherd", "Poodle", "Bulldog", "Beagle", "Rottweiler", 
  "Dachshund", "Corgi", "Australian Shepherd", "Yorkshire Terrier"
];

const AGES = [
  "Puppy (0-1 years)",
  "Young Adult (1-3 years)",
  "Adult (3-7 years)",
  "Senior (7+ years)"
];

export function Hero({ onCalculate }: HeroProps) {
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState(AGES[0]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredBreeds = COMMON_BREEDS.filter(b => b.toLowerCase().includes(breed.toLowerCase()));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (breed && age) {
      onCalculate(breed, age);
    }
  };

  return (
    <section className="w-full max-w-4xl mx-auto px-6 pt-24 pb-16 md:pt-32 md:pb-24 flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6 leading-[1.1]">
          Know the risks before <br className="hidden md:block" />
          <span className="text-fetch-pink">the vet bills hit.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed">
          Discover the breed-specific health risks and estimated out-of-pocket costs for your dog. Be prepared, not surprised.
        </p>
      </motion.div>

      <motion.form 
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-2xl bg-white p-2 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col md:flex-row gap-2 relative z-20"
      >
        <div className="relative flex-1 flex items-center px-4 py-3 md:py-0 border-b md:border-b-0 md:border-r border-gray-100">
          <Search className="w-5 h-5 text-gray-400 mr-3 shrink-0" />
          <input 
            type="text"
            placeholder="Enter dog breed (e.g., French Bulldog)"
            className="w-full bg-transparent outline-none text-gray-900 placeholder-gray-400 font-medium"
            value={breed}
            onChange={(e) => {
              setBreed(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            required
          />
          
          {showSuggestions && breed && filteredBreeds.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
              {filteredBreeds.slice(0, 5).map(b => (
                <button
                  key={b}
                  type="button"
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 text-gray-700 font-medium transition-colors"
                  onClick={() => {
                    setBreed(b);
                    setShowSuggestions(false);
                  }}
                >
                  {b}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative flex-1 md:max-w-[200px] flex items-center px-4 py-3 md:py-0">
          <select 
            className="w-full bg-transparent outline-none text-gray-900 font-medium appearance-none cursor-pointer pr-8"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          >
            {AGES.map(a => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 pointer-events-none" />
        </div>

        <button 
          type="submit"
          className="bg-fetch-pink hover:bg-fetch-pink-dark text-white font-semibold py-4 md:py-3 px-8 rounded-xl transition-colors duration-200 shrink-0 cursor-pointer"
        >
          Calculate
        </button>
      </motion.form>
    </section>
  );
}
