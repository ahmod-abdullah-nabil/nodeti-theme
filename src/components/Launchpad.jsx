import { motion, AnimatePresence } from 'framer-motion'

function Launchpad({ isOpen, onClose, apps, onAppClick, t }) {
  // Organize apps by category using app IDs instead of names
  const categories = {
    [t.launchpad.productivity]: apps.filter(app => [8, 7, 12, 3].includes(app.id)), // Notes, Calendar, Reminders, Mail
    [t.launchpad.communication]: apps.filter(app => [4, 10, 11].includes(app.id)), // Messages, FaceTime, Contacts
    [t.launchpad.entertainment]: apps.filter(app => [6, 5, 2].includes(app.id)), // Music, Photos, Safari
    [t.launchpad.utilities]: apps.filter(app => [1, 9].includes(app.id)), // Finder, Maps
  }

  const handleAppClick = (app) => {
    onAppClick(app)
    onClose()
  }

  const handleBackgroundClick = () => {
    onClose()
  }

  const handleAppClickInternal = (e, app) => {
    e.stopPropagation()
    onAppClick(app)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ opacity: 1, backdropFilter: 'blur(40px)' }}
          exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-gradient-to-br from-purple-950/70 via-fuchsia-950/80 to-indigo-950/70 backdrop-blur-3xl cursor-pointer"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(217, 70, 239, 0.15), transparent 50%), radial-gradient(circle at 80% 80%, rgba(99, 102, 241, 0.15), transparent 50%)'
          }}
          onClick={handleBackgroundClick}
        >
        <div className="w-full h-full overflow-y-auto px-20 py-12">
          <div className="max-w-7xl mx-auto space-y-8 cursor-default">
            {Object.entries(categories).map(([category, categoryApps]) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + (Object.keys(categories).indexOf(category) * 0.05), duration: 0.4 }}
              >
                <h3 className="text-xl font-bold text-white/95 mb-6 px-4 drop-shadow-lg">
                  {category}
                </h3>
                <div className="grid grid-cols-8 gap-6">
                  {categoryApps.map((app, index) => (
                    <motion.button
                      key={app.id}
                      onClick={(e) => handleAppClickInternal(e, app)}
                      className="flex flex-col items-center gap-2 p-2 rounded-lg transition-colors relative group"
                      initial={{ scale: 0, opacity: 0, y: 20 }}
                      animate={{ 
                        scale: 1, 
                        opacity: 1, 
                        y: 0,
                        transition: { 
                          delay: 0.15 + (Object.keys(categories).indexOf(category) * 0.05) + (index * 0.03),
                          type: "spring",
                          stiffness: 300,
                          damping: 20
                        }
                      }}
                      whileHover={{ 
                        scale: 1.15, 
                        y: -12,
                        rotateY: 5,
                        rotateX: -5,
                        transition: { type: "spring", stiffness: 500, damping: 25 }
                      }}
                      whileTap={{ 
                        scale: 0.85,
                        transition: { duration: 0.1 }
                      }}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {/* Glow effect on hover */}
                      <motion.div
                        className="absolute inset-0 rounded-lg blur-xl pointer-events-none"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ 
                          opacity: 0.4,
                          scale: 1.2,
                          transition: { duration: 0.3 }
                        }}
                        style={{
                          background: `radial-gradient(circle, ${app.color.replace('bg-gradient-to-br', '').split(' ')[0].replace('from-', '')} 0%, transparent 70%)`
                        }}
                      />
                      
                      <motion.div 
                        className={`w-14 h-14 rounded-[16px] ${app.color} flex items-center justify-center text-3xl shadow-2xl relative overflow-hidden`}
                        style={{
                          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                          transformStyle: 'preserve-3d'
                        }}
                        whileHover={{
                          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
                        }}
                      >
                        <motion.span
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        >
                          {app.icon}
                        </motion.span>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/20 rounded-[16px] group-hover:from-black/10 group-hover:to-white/40 transition-all"></div>
                        
                        {/* Shimmer effect on hover */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-[16px]"
                          initial={{ x: '-100%', opacity: 0 }}
                          whileHover={{ 
                            x: '100%',
                            opacity: 1,
                            transition: { duration: 0.6, ease: "easeInOut" }
                          }}
                        />
                      </motion.div>
                      
                      <motion.span 
                        className="text-xs font-semibold text-white text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] relative z-10"
                        whileHover={{ scale: 1.05 }}
                      >
                        {app.name}
                      </motion.span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

          {/* Close hint */}
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-white/70 text-sm"
            >
              Click anywhere to close
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Launchpad
