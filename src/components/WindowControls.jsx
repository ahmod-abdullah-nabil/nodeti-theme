import { motion } from 'framer-motion'

function WindowControls({ onClose, onMinimize, onMaximize }) {
  return (
    <div className="flex items-center gap-2 z-10">
      <motion.button
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
        className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-red-900 text-xs opacity-0 group-hover:opacity-100">×</span>
      </motion.button>
      <motion.button
        onClick={(e) => {
          e.stopPropagation()
          onMinimize()
        }}
        className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors flex items-center justify-center group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-yellow-900 text-xs opacity-0 group-hover:opacity-100">−</span>
      </motion.button>
      <motion.button
        onClick={(e) => {
          e.stopPropagation()
          onMaximize()
        }}
        className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors flex items-center justify-center group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-green-900 text-xs opacity-0 group-hover:opacity-100">+</span>
      </motion.button>
    </div>
  )
}

export default WindowControls
