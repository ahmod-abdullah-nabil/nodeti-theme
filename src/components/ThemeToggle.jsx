import { motion } from 'framer-motion'

function ThemeToggle({ theme, toggleTheme }) {
  return (
    <motion.button
      onClick={toggleTheme}
      className="absolute top-8 right-6 z-50 w-12 h-12 rounded-full bg-white/40 dark:bg-gray-800/60 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 flex items-center justify-center text-2xl shadow-xl hover:shadow-2xl transition-all"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      style={{
        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
      }}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </motion.button>
  )
}

export default ThemeToggle
