import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

function Desktop({ children, theme, toggleTheme, language, changeLanguage, t }) {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = () => {
    const options = { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }
    return currentTime.toLocaleString(language === 'zh' ? 'zh-CN' : 'en-US', options)
  }

  return (
    <motion.div 
      className="w-full h-full bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-600 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950 overflow-visible relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-transparent to-orange-500/20 dark:from-cyan-500/10 dark:via-transparent dark:to-fuchsia-500/10 animate-pulse" style={{ animationDuration: '8s' }}></div>
      
      {/* Subtle noise texture for realism */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`
      }}></div>
      
      {/* Menu bar at top */}
      <div className="absolute top-0 left-0 right-0 h-7 bg-gradient-to-b from-black/30 to-black/20 dark:from-black/50 dark:to-black/40 backdrop-blur-3xl border-b border-white/20 dark:border-white/10 z-40 shadow-lg">
        <div className="flex items-center h-full px-4 text-white text-xs font-medium">
          {/* Left side - Apple menu and app menus */}
          <div className="flex items-center gap-1">
            <button className="px-2 py-1 hover:bg-white/15 rounded transition-all duration-200 flex items-center">
              <span className="text-sm">🍎</span>
            </button>
            <button className="px-2.5 py-1 hover:bg-white/15 rounded transition-all duration-200 font-semibold">
              {t.menuBar.finder}
            </button>
            <button className="px-2.5 py-1 hover:bg-white/15 rounded transition-all duration-200">
              {t.menuBar.file}
            </button>
            <button className="px-2.5 py-1 hover:bg-white/15 rounded transition-all duration-200">
              {t.menuBar.edit}
            </button>
            <button className="px-2.5 py-1 hover:bg-white/15 rounded transition-all duration-200">
              {t.menuBar.view}
            </button>
            <button className="px-2.5 py-1 hover:bg-white/15 rounded transition-all duration-200">
              {t.menuBar.go}
            </button>
            <button className="px-2.5 py-1 hover:bg-white/15 rounded transition-all duration-200">
              {t.menuBar.window}
            </button>
            <button className="px-2.5 py-1 hover:bg-white/15 rounded transition-all duration-200">
              {t.menuBar.help}
            </button>
          </div>

          {/* Right side - Status icons and controls */}
          <div className="ml-auto flex items-center gap-2">
            <button 
              onClick={() => changeLanguage(language === 'en' ? 'zh' : 'en')}
              className="px-2 py-1 hover:bg-white/15 rounded transition-all duration-200 flex items-center gap-1.5 font-medium"
              title={language === 'en' ? 'Switch to Chinese' : 'Switch to English'}
            >
              <span className="text-[10px]">🌐</span>
              <span className="text-[11px] font-semibold">{language === 'en' ? 'EN' : '中文'}</span>
            </button>
            
            <button 
              onClick={toggleTheme}
              className="px-2 py-1 hover:bg-white/15 rounded transition-all duration-200"
              title={theme === 'light' ? t.menuBar.lightMode : t.menuBar.darkMode}
            >
              <span className="text-sm">{theme === 'light' ? '🌙' : '☀️'}</span>
            </button>

            <div className="w-px h-4 bg-white/20"></div>

            <button className="px-2 py-1 hover:bg-white/15 rounded transition-all duration-200">
              <span className="text-sm">🔋</span>
            </button>
            
            <button className="px-2 py-1 hover:bg-white/15 rounded transition-all duration-200">
              <span className="text-sm">📶</span>
            </button>

            <button className="px-2 py-1 hover:bg-white/15 rounded transition-all duration-200">
              <span className="text-sm">🔊</span>
            </button>

            <div className="w-px h-4 bg-white/20"></div>
            
            <button className="px-3 py-1 hover:bg-white/15 rounded transition-all duration-200">
              <span className="text-[11px] font-medium tracking-tight tabular-nums">
                {formatTime()}
              </span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="relative w-full h-full pt-7 pb-24 overflow-visible">
        {children}
      </div>
    </motion.div>
  )
}

export default Desktop
