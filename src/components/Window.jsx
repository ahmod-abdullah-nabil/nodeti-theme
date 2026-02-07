import { useState, useRef, useEffect } from 'react'
import Draggable from 'react-draggable'
import WindowControls from './WindowControls'

function Window({ window, onClose, onMinimize, onMaximize, onBringToFront, theme, toggleTheme, language, changeLanguage, t }) {
  const [size, setSize] = useState(window.size)
  const nodeRef = useRef(null)
  const savedTransformRef = useRef('')

  useEffect(() => {
    if (nodeRef.current) {
      if (window.isMaximized) {
        // Save current transform before maximizing
        const currentTransform = nodeRef.current.style.transform
        if (currentTransform && currentTransform !== 'translate(0px, 0px)') {
          savedTransformRef.current = currentTransform
        }
        // Reset transform when maximized
        nodeRef.current.style.transform = 'translate(0px, 0px)'
      } else if (savedTransformRef.current && savedTransformRef.current !== 'translate(0px, 0px)') {
        // Restore transform when unmaximizing
        nodeRef.current.style.transform = savedTransformRef.current
      }
    }
  }, [window.isMaximized])

  const windowStyle = window.isMaximized ? {
    width: '100vw',
    height: 'calc(100vh - 7rem)', // Account for menu bar (28px/1.75rem) and dock
    top: '28px', // Menu bar height
    left: '0',
    position: 'fixed',
    borderRadius: '0'
  } : {
    width: `${size.width}px`,
    height: `${size.height}px`,
  }

  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".window-header"
      defaultPosition={window.position}
      onStart={onBringToFront}
      disabled={window.isMaximized}
    >
      <div
        ref={nodeRef}
        onClick={onBringToFront}
        className={`absolute overflow-hidden transition-all duration-300 ${window.isMaximized ? 'rounded-none' : 'rounded-2xl'}`}
        style={{ 
          ...windowStyle,
          zIndex: window.zIndex,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Window */}
        <div className="flex flex-col h-full bg-white/85 dark:bg-gray-900/85 backdrop-blur-3xl border border-white/40 dark:border-gray-700/40">
          {/* Title Bar */}
          <div className="window-header flex items-center justify-between px-4 py-2.5 bg-gradient-to-b from-white/70 to-white/50 dark:from-gray-800/90 dark:to-gray-900/70 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 cursor-move">
            <WindowControls 
              onClose={onClose}
              onMinimize={onMinimize}
              onMaximize={onMaximize}
            />
            <div className="absolute left-1/2 transform -translate-x-1/2 text-sm font-semibold text-gray-800 dark:text-gray-200">
              {window.title}
            </div>
          </div>

          {/* Window Content */}
          <div className="flex-1 overflow-auto p-6">
            {window.app.id === 'settings' ? (
              // Settings Content
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {window.app.icon} {t.settings.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {t.settings.description}
                </p>
                <div className="space-y-4">
                  <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800/50 dark:to-slate-700/50 rounded-xl border border-blue-100 dark:border-slate-600">
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                      <span>🎨</span> {t.settings.appearance}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{t.settings.appearanceDesc}</p>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={toggleTheme}
                        className={`flex-1 px-4 py-3 rounded-lg font-medium text-sm transition-all ${
                          theme === 'light' 
                            ? 'bg-white dark:bg-blue-600 text-gray-800 dark:text-white shadow-md border-2 border-blue-500' 
                            : 'bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-gray-400 border-2 border-transparent'
                        }`}
                      >
                        ☀️ {t.settings.lightMode}
                      </button>
                      <button
                        onClick={toggleTheme}
                        className={`flex-1 px-4 py-3 rounded-lg font-medium text-sm transition-all ${
                          theme === 'dark' 
                            ? 'bg-gray-800 dark:bg-slate-900 text-white shadow-md border-2 border-purple-500' 
                            : 'bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-gray-400 border-2 border-transparent'
                        }`}
                      >
                        🌙 {t.settings.darkMode}
                      </button>
                    </div>
                  </div>
                  <div className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-800/50 dark:to-slate-700/50 rounded-xl border border-green-100 dark:border-slate-600">
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                      <span>🌐</span> {t.settings.language}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{t.settings.languageDesc}</p>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => changeLanguage('en')}
                        className={`flex-1 px-4 py-3 rounded-lg font-medium text-sm transition-all ${
                          language === 'en' 
                            ? 'bg-white dark:bg-green-600 text-gray-800 dark:text-white shadow-md border-2 border-green-500' 
                            : 'bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-gray-400 border-2 border-transparent'
                        }`}
                      >
                        🇺🇸 English
                      </button>
                      <button
                        onClick={() => changeLanguage('zh')}
                        className={`flex-1 px-4 py-3 rounded-lg font-medium text-sm transition-all ${
                          language === 'zh' 
                            ? 'bg-white dark:bg-green-600 text-gray-800 dark:text-white shadow-md border-2 border-red-500' 
                            : 'bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-gray-400 border-2 border-transparent'
                        }`}
                      >
                        🇨🇳 中文
                      </button>
                    </div>
                  </div>
                  <div className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-800/50 dark:to-slate-700/50 rounded-xl border border-purple-100 dark:border-slate-600">
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                      <span>🗄️</span> {t.settings.windowMgmt}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{t.settings.windowMgmtDesc}</p>
                  </div>
                </div>
              </div>
            ) : window.app.id === 'about' ? (
              // About Content
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {window.app.icon} {t.about.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {t.about.subtitle}
                </p>
                <div className="space-y-4">
                  <div className="p-5 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-200 dark:border-blue-800/30">
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                      <span>📦</span> {t.about.version}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">1.0.0</p>
                  </div>
                  <div className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800/30">
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                      <span>🛠️</span> {t.about.builtWith}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">React + Vite + Tailwind CSS + Framer Motion</p>
                  </div>
                  <div className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-800/30">
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                      <span>✨</span> {t.about.features}
                    </h3>
                    <ul className="list-none space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <li className="flex items-center gap-2"><span>✓</span> {t.about.feature1}</li>
                      <li className="flex items-center gap-2"><span>✓</span> {t.about.feature2}</li>
                      <li className="flex items-center gap-2"><span>✓</span> {t.about.feature3}</li>
                      <li className="flex items-center gap-2"><span>✓</span> {t.about.feature4}</li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              // Default App Content
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {window.app.icon} {window.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {t.window.demoText.replace('{appName}', window.title)}
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800/30">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Window ID</div>
                    <div className="text-lg font-semibold text-gray-800 dark:text-white">{window.id}</div>
                  </div>
                  <div className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800/30">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Status</div>
                    <div className="text-lg font-semibold text-green-600 dark:text-green-400 flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      Active
                    </div>
                  </div>
                </div>
                <div className="mt-6 p-5 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-800/30">
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                    <span>✨</span> Features:
                  </h3>
                  <ul className="list-none space-y-2 text-gray-600 dark:text-gray-300">
                    <li className="flex items-center gap-2"><span>✓</span> Draggable windows</li>
                    <li className="flex items-center gap-2"><span>✓</span> Glassmorphism design</li>
                    <li className="flex items-center gap-2"><span>✓</span> Window controls (minimize, maximize, close)</li>
                    <li className="flex items-center gap-2"><span>✓</span> Dark and light mode support</li>
                    <li className="flex items-center gap-2"><span>✓</span> Smooth animations and transitions</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Resize handle (bottom-right corner) */}
        {!window.isMaximized && (
          <div 
            className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize opacity-0 hover:opacity-100"
            onMouseDown={(e) => {
              e.preventDefault()
              const startX = e.clientX
              const startY = e.clientY
              const startWidth = size.width
              const startHeight = size.height

              const handleMouseMove = (e) => {
                const newWidth = Math.max(400, startWidth + e.clientX - startX)
                const newHeight = Math.max(300, startHeight + e.clientY - startY)
                setSize({ width: newWidth, height: newHeight })
              }

              const handleMouseUp = () => {
                document.removeEventListener('mousemove', handleMouseMove)
                document.removeEventListener('mouseup', handleMouseUp)
              }

              document.addEventListener('mousemove', handleMouseMove)
              document.addEventListener('mouseup', handleMouseUp)
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-transparent to-gray-400/50"></div>
          </div>
        )}
      </div>
    </Draggable>
  )
}

export default Window
