import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { geoPath, geoMercator } from 'd3-geo';

const REGIONS = [
  {
    id: 'aus',
    name: 'Australia',
    role: 'Global Hub',
    coordinates: [133.7751, -25.2744] as [number, number],
    description: 'Global Headquarters & Primary Operations Center.',
    stats: '24/7 Claims Processing'
  },
  {
    id: 'eu',
    name: 'European Union',
    role: 'Destination',
    coordinates: [10.4515, 51.1657] as [number, number],
    description: 'Expanding coverage across 15+ European countries.',
    stats: '1.8M Pets Protected'
  },
  {
    id: 'na',
    name: 'North America',
    role: 'Destination',
    coordinates: [-95.7129, 37.0902] as [number, number],
    description: 'Full coverage across the United States and Canada.',
    stats: '2.4M Pets Protected'
  }
];

export function GlobalPresence() {
  const [geographies, setGeographies] = useState<any[]>([]);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson')
      .then(res => res.json())
      .then(data => setGeographies(data.features))
      .catch(err => console.error("Failed to load map data", err));
  }, []);

  const projection = geoMercator()
    .scale(150)
    .translate([500, 320]);
  
  const pathGenerator = geoPath().projection(projection);

  const ausPos = projection(REGIONS[0].coordinates) || [0, 0];
  const euPos = projection(REGIONS[1].coordinates) || [0, 0];
  const naPos = projection(REGIONS[2].coordinates) || [0, 0];

  const euCp = [(ausPos[0] + euPos[0]) / 2, Math.min(ausPos[1], euPos[1]) - 150];
  const naCp = [(ausPos[0] + naPos[0]) / 2, Math.max(ausPos[1], naPos[1]) + 200];

  const activeRegion = REGIONS.find(r => r.id === hoveredRegion);
  const tooltipPos = activeRegion ? projection(activeRegion.coordinates) : [0, 0];

  return (
    <section className="w-full py-24 md:py-32 bg-[#FAFAFA] overflow-hidden border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Global Protection. <br className="md:hidden" />
            <span className="text-fetch-pink">Australian Hub.</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Headquartered in Sydney, protecting pets across the globe. Our network spans across the EU, UK, and North America.
          </p>
        </div>

        <div className="relative w-full max-w-5xl mx-auto aspect-[2/1] mt-12 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-4 md:p-8 overflow-visible">
          
          {/* Tooltip Layer */}
          <AnimatePresence>
            {activeRegion && tooltipPos && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute z-50 bg-gray-900 text-white p-4 rounded-xl shadow-xl border border-gray-800 w-64 pointer-events-none"
                style={{
                  left: `calc(${(tooltipPos[0] / 1000) * 100}% + 2rem)`, // +2rem accounts for container padding
                  top: `calc(${(tooltipPos[1] / 500) * 100}% + 2rem)`,
                  transform: 'translate(-50%, -100%)',
                  marginTop: '-24px'
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-2 h-2 rounded-full ${activeRegion.id === 'aus' ? 'bg-fetch-pink' : 'bg-blue-400'}`}></div>
                  <span className="font-bold text-sm">{activeRegion.name}</span>
                  <span className="text-xs text-gray-400 ml-auto">{activeRegion.role}</span>
                </div>
                <p className="text-xs text-gray-300 mb-3 leading-relaxed">
                  {activeRegion.description}
                </p>
                <div className="pt-3 border-t border-gray-800">
                  <span className="text-xs font-semibold text-fetch-pink">{activeRegion.stats}</span>
                </div>
                
                {/* Tooltip Arrow */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-gray-900 rotate-45 border-b border-r border-gray-800"></div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* SVG Map */}
          <svg viewBox="0 0 1000 500" className="w-full h-full text-gray-100" fill="currentColor">
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#FF3366" />
              </marker>
            </defs>

            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
              {geographies.map((d, i) => (
                <path 
                  key={i} 
                  d={pathGenerator(d) || ''} 
                  fill="#F3F4F6" 
                  stroke="#FFFFFF" 
                  strokeWidth={0.5} 
                  className="transition-colors duration-300 hover:fill-gray-200"
                />
              ))}
            </motion.g>

            {geographies.length > 0 && (
              <>
                {/* Animated Arrow to EU */}
                <path 
                  d={`M ${ausPos[0]} ${ausPos[1]} Q ${euCp[0]} ${euCp[1]} ${euPos[0]} ${euPos[1]}`} 
                  fill="none" 
                  stroke="#FF3366" 
                  strokeWidth="2" 
                  strokeDasharray="6,6" 
                  markerEnd="url(#arrowhead)"
                  className="animate-[dash_20s_linear_infinite] opacity-60"
                />

                {/* Animated Arrow to NA */}
                <path 
                  d={`M ${ausPos[0]} ${ausPos[1]} Q ${naCp[0]} ${naCp[1]} ${naPos[0]} ${naPos[1]}`} 
                  fill="none" 
                  stroke="#FF3366" 
                  strokeWidth="2" 
                  strokeDasharray="6,6"
                  markerEnd="url(#arrowhead)"
                  className="animate-[dash_25s_linear_infinite] opacity-60"
                />

                {/* Interactive Markers */}
                {REGIONS.map(region => {
                  const [x, y] = projection(region.coordinates) || [0, 0];
                  const isHub = region.id === 'aus';
                  
                  return (
                    <g 
                      key={region.id} 
                      transform={`translate(${x}, ${y})`}
                      onMouseEnter={() => setHoveredRegion(region.id)}
                      onMouseLeave={() => setHoveredRegion(null)}
                      className="cursor-pointer"
                    >
                      {/* Invisible larger hit area for easier hovering */}
                      <circle cx="0" cy="0" r="30" fill="transparent" />
                      
                      {isHub && <circle cx="0" cy="0" r="24" fill="#FF3366" opacity="0.15" className="animate-ping" />}
                      <circle 
                        cx="0" cy="0" 
                        r={isHub ? 8 : 6} 
                        fill={isHub ? "#FF3366" : "#111827"} 
                        className="transition-transform duration-300 hover:scale-125" 
                      />
                      {isHub && <circle cx="0" cy="0" r="4" fill="#FFF" />}
                    </g>
                  );
                })}
              </>
            )}
          </svg>

          <style dangerouslySetInnerHTML={{__html: `
            @keyframes dash {
              to {
                stroke-dashoffset: -1000;
              }
            }
          `}} />
        </div>
      </div>
    </section>
  );
}
