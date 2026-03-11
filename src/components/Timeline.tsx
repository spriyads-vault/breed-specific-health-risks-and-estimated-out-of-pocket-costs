import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { DollarSign, Clock, ShieldAlert } from 'lucide-react';
import { Risk } from '../services/gemini';

interface TimelineProps {
  risks: Risk[];
  breed: string;
}

export function Timeline({ risks, breed }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Sort risks roughly by life stage
  const sortedRisks = [...risks].sort((a, b) => {
    const stageOrder: Record<string, number> = { "Puppy": 1, "Adult": 2, "Senior": 3 };
    const getOrder = (stage: string) => {
      if (stage.toLowerCase().includes("puppy")) return 1;
      if (stage.toLowerCase().includes("adult")) return 2;
      if (stage.toLowerCase().includes("senior")) return 3;
      return 2;
    };
    return getOrder(a.lifeStage) - getOrder(b.lifeStage);
  });

  return (
    <section className="w-full max-w-4xl mx-auto px-6 py-16 md:py-24" ref={containerRef}>
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Health Timeline: {breed}
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Based on veterinary data, here are the most common genetic conditions and their typical onset periods.
        </p>
      </div>

      <div className="relative">
        {/* Background Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gray-200 -translate-x-1/2 rounded-full"></div>
        
        {/* Animated Fill Line */}
        <motion.div 
          className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-fetch-pink -translate-x-1/2 rounded-full origin-top"
          style={{ scaleY: pathLength }}
        ></motion.div>

        <div className="flex flex-col gap-12 md:gap-24 relative z-10">
          {sortedRisks.map((risk, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50, x: isEven ? -20 : 20 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col md:flex-row items-start md:items-center gap-8 ${isEven ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Timeline Node */}
                <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-white border-4 border-fetch-pink rounded-full -translate-x-1/2 flex items-center justify-center shadow-sm z-20">
                  <div className="w-2 h-2 bg-fetch-pink rounded-full"></div>
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                  <div className="bg-white p-6 md:p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-sm font-semibold text-gray-600 mb-4 ${isEven ? 'md:ml-auto' : ''}`}>
                      <Clock className="w-4 h-4" />
                      {risk.lifeStage} ({risk.typicalOnsetAge})
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2 justify-start md:justify-start">
                      {isEven ? (
                        <>
                          <span className="hidden md:inline-block"><ShieldAlert className="w-6 h-6 text-fetch-pink" /></span>
                          {risk.condition}
                          <span className="md:hidden"><ShieldAlert className="w-6 h-6 text-fetch-pink" /></span>
                        </>
                      ) : (
                        <>
                          <ShieldAlert className="w-6 h-6 text-fetch-pink" />
                          {risk.condition}
                        </>
                      )}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {risk.description}
                    </p>
                    
                    <div className={`flex items-center gap-4 pt-6 border-t border-gray-100 ${isEven ? 'md:justify-end' : ''}`}>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Est. Out-of-Pocket</span>
                        <div className="flex items-center text-3xl font-bold text-gray-900">
                          <DollarSign className="w-6 h-6 text-gray-400" />
                          {risk.averageCostAUD.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Disclaimer */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-16 md:mt-24 text-center border-t border-gray-200 pt-8 relative z-10"
      >
        <p className="text-xs md:text-sm text-gray-400 max-w-3xl mx-auto leading-relaxed">
          * <strong className="font-semibold text-gray-500">Disclaimer:</strong> The information provided above is an AI-generated estimate based on historical veterinary data and breed genetics. It is intended for educational purposes only and is not a substitute for professional veterinary advice, diagnosis, or treatment. Always consult your veterinarian for medical decisions regarding your pet.
        </p>
      </motion.div>
    </section>
  );
}
