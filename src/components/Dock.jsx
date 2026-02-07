import { motion } from 'framer-motion'
import { useState } from 'react'

function Dock({ apps, onAppClick, windows, onWindowRestore }) {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const getScale = (index) => {
    if (hoveredIndex === null) return 1
    if (hoveredIndex === index) return 1.3
    return 1
  }

  return (
    <div className="fixed bottom-1 left-1/2 transform -translate-x-1/2 z-50">
      <motion.div 
        className="flex items-end gap-3 px-3 py-2 rounded-[20px] bg-white/60 dark:bg-gray-900/80 backdrop-blur-3xl border border-white/50 dark:border-white/20"
        initial={{ y: 100, scale: 0.8, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.1 }}
        style={{
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3), 0 0 0 0.5px rgba(255, 255, 255, 0.3) inset, 0 1px 0 rgba(255, 255, 255, 0.5) inset'
        }}
      >
        {apps.map((app, index) => {
          const minimizedWindow = windows.find(w => w.app.id === app.id && w.isMinimized)
          const scale = getScale(index)
          
          return (
            <motion.div
              key={app.id}
              className="relative origin-bottom"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <motion.button
                onClick={() => minimizedWindow ? onWindowRestore(minimizedWindow.id) : onAppClick(app)}
                className={`w-12 h-12 rounded-[16px] ${app.color} flex items-center justify-center text-3xl shadow-2xl relative overflow-hidden`}
                animate={{ 
                  scale: scale,
                  y: hoveredIndex === index ? -10 : 0
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                whileTap={{ scale: scale * 0.9 }}
                style={{
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.35), 0 0 0 0.5px rgba(255, 255, 255, 0.1) inset, 0 1px 0 rgba(255, 255, 255, 0.4) inset'
                }}
              >
                {app.iconImage ? (
                  <img src={app.iconImage} alt={app.name} className="w-full h-full object-cover rounded-[16px]" />
                ) : (
                  <span className="relative z-10 drop-shadow-lg">{app.icon}</span>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10 rounded-[16px]"></div>
              </motion.button>
              
              {/* App name tooltip */}
              <motion.div 
                className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900/95 dark:bg-gray-950/95 text-white text-xs font-medium rounded-lg whitespace-nowrap backdrop-blur-sm shadow-2xl border border-white/10"
                animate={{ 
                  opacity: hoveredIndex === index ? 1 : 0, 
                  y: hoveredIndex === index ? 0 : 8,
                  scale: hoveredIndex === index ? 1 : 0.9
                }}
                transition={{ duration: 0.2 }}
                style={{ pointerEvents: 'none' }}
              >
                {app.name}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-gray-900/95 dark:bg-gray-950/95 rotate-45 border-r border-b border-white/10"></div>
              </motion.div>

              {/* Active indicator */}
              {windows.some(w => w.app.id === app.id && !w.isMinimized) && (
                <motion.div 
                  className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gray-700 dark:bg-gray-300 rounded-full"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  style={{
                    boxShadow: '0 0 8px currentColor'
                  }}
                />
              )}
              
              {/* Minimized indicator */}
              {minimizedWindow && (
                <motion.div 
                  className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-amber-500 rounded-full"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  style={{
                    boxShadow: '0 0 10px currentColor'
                  }}
                />
              )}
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}

export default Dock
