import { useState, useEffect } from 'react'
import Desktop from './components/Desktop'
import Dock from './components/Dock'
import Window from './components/Window'
import Launchpad from './components/Launchpad'

function App() {
  const [theme, setTheme] = useState('light')
  const [language, setLanguage] = useState('en')
  const [windows, setWindows] = useState([])
  const [nextZIndex, setNextZIndex] = useState(10)
  const [isLaunchpadOpen, setIsLaunchpadOpen] = useState(false)

  // Translations
  const translations = {
    en: {
      menuBar: {
        finder: 'Finder',
        file: 'File',
        edit: 'Edit',
        view: 'View',
        go: 'Go',
        window: 'Window',
        help: 'Help',
        lightMode: 'Switch to Dark Mode',
        darkMode: 'Switch to Light Mode'
      },
      apps: {
        launchpad: 'Launchpad',
        settings: 'System Settings',
        about: 'About',
        finder: 'Finder',
        safari: 'Safari',
        mail: 'Mail',
        messages: 'Messages',
        photos: 'Photos',
        music: 'Music',
        calendar: 'Calendar',
        notes: 'Notes',
        maps: 'Maps',
        facetime: 'FaceTime',
        contacts: 'Contacts',
        reminders: 'Reminders'
      },
      launchpad: {
        productivity: 'Productivity',
        communication: 'Communication',
        entertainment: 'Entertainment',
        utilities: 'Utilities'
      },
      settings: {
        title: 'System Settings',
        description: 'Configure your ZiWei experience and personalize your interface.',
        appearance: 'Appearance',
        appearanceDesc: 'Choose between light and dark mode.',
        lightMode: 'Light Mode',
        darkMode: 'Dark Mode',
        language: 'Language',
        languageDesc: 'Select your preferred language.',
        windowMgmt: 'Window Management',
        windowMgmtDesc: 'Drag windows by their title bar, resize them from the bottom-right corner.'
      },
      about: {
        title: 'About',
        subtitle: 'ZiWei - The Forbidden City AI Guide',
        version: 'Version',
        builtWith: 'Built With',
        features: 'Features',
        feature1: 'Interactive macOS-inspired interface',
        feature2: 'Bilingual support (English & Chinese)',
        feature3: 'Beautiful glassmorphism design',
        feature4: 'AI-powered Forbidden City exploration'
      },
      window: {
        demoText: 'This is a demo window for {appName}. You can drag this window around, minimize it, maximize it, or close it using the controls in the top-left corner.'
      }
    },
    zh: {
      menuBar: {
        finder: '访边器',
        file: '文件',
        edit: '编辑',
        view: '查看',
        go: '前往',
        window: '窗口',
        help: '帮助',
        lightMode: '切换到深色模式',
        darkMode: '切换到浅色模式'
      },
      apps: {
        launchpad: '启动台',
        settings: '系统设置',
        about: '关于',
        finder: '访边器',
        safari: 'Safari 浏览器',
        mail: '邮件',
        messages: '信息',
        photos: '照片',
        music: '音乐',
        calendar: '日历',
        notes: '备忘录',
        maps: '地图',
        facetime: 'FaceTime 通话',
        contacts: '通讯录',
        reminders: '提醒事项'
      },
      launchpad: {
        productivity: '生产力',
        communication: '通讯',
        entertainment: '娱乐',
        utilities: '实用工具'
      },
      settings: {
        title: '系统设置',
        description: '配置您的紫微体验并个性化您的界面。',
        appearance: '外观',
        appearanceDesc: '在浅色和深色模式之间选择。',
        lightMode: '浅色模式',
        darkMode: '深色模式',
        language: '语言',
        languageDesc: '选择您的首选语言。',
        windowMgmt: '窗口管理',
        windowMgmtDesc: '通过标题栏拖动窗口，从右下角调整大小。'
      },
      about: {
        title: '关于',
        subtitle: '紫微 - 故宫人工智能向导',
        version: '版本',
        builtWith: '构建工具',
        features: '功能特点',
        feature1: '交互式 macOS 风格界面',
        feature2: '双语支持（中英文）',
        feature3: '精美的玻璃拟态设计',
        feature4: 'AI 驱动的故宫探索体验'
      },
      window: {
        demoText: '这是 {appName} 的演示窗口。您可以拖动此窗口，最小化、最大化或使用左上角的控件关闭它。'
      }
    }
  }

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const changeLanguage = (lang) => {
    setLanguage(lang)
  }

  const t = translations[language]

  const handleAppClick = (app) => {
    // Check if window with this app is already open
    const existingWindow = windows.find(w => w.app.id === app.id)
    if (existingWindow) {
      // If window exists, restore it (if minimized) and bring to front
      if (existingWindow.isMinimized) {
        restoreWindow(existingWindow.id)
      }
      bringToFront(existingWindow.id)
    } else {
      // If window doesn't exist, create new one
      openWindow(app)
    }
  }

  const handleDockClick = (app) => {
    if (app.id === 'app-center') {
      setIsLaunchpadOpen(true)
    } else {
      handleAppClick(app)
    }
  }

  const openWindow = (app) => {
    const newWindow = {
      id: Date.now(),
      title: app.name,
      app: app,
      isMinimized: false,
      isMaximized: false,
      zIndex: nextZIndex,
      position: { x: 100 + windows.length * 30, y: 80 + windows.length * 30 },
      size: { width: 800, height: 600 }
    }
    setWindows([...windows, newWindow])
    setNextZIndex(nextZIndex + 1)
  }

  const closeWindow = (id) => {
    setWindows(windows.filter(w => w.id !== id))
  }

  const minimizeWindow = (id) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, isMinimized: true } : w
    ))
  }

  const maximizeWindow = (id) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
    ))
  }

  const bringToFront = (id) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, zIndex: nextZIndex } : w
    ))
    setNextZIndex(nextZIndex + 1)
  }

  const restoreWindow = (id) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, isMinimized: false } : w
    ))
  }

  // All available applications
  const allApps = [
    { id: 1, name: t.apps.finder, icon: '🗂️', color: 'bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-600' },
    { id: 2, name: t.apps.safari, icon: '🧭', color: 'bg-gradient-to-br from-blue-400 via-cyan-500 to-blue-500' },
    { id: 3, name: t.apps.mail, icon: '✉️', color: 'bg-gradient-to-br from-blue-500 via-indigo-500 to-blue-600' },
    { id: 4, name: t.apps.messages, icon: '💬', color: 'bg-gradient-to-br from-green-400 via-emerald-500 to-green-600' },
    { id: 5, name: t.apps.photos, icon: '🌅', color: 'bg-gradient-to-br from-pink-400 via-rose-500 to-orange-500' },
    { id: 6, name: t.apps.music, icon: '🎵', color: 'bg-gradient-to-br from-red-500 via-pink-600 to-purple-600' },
    { id: 7, name: t.apps.calendar, icon: '📆', color: 'bg-gradient-to-br from-red-400 via-red-500 to-red-600' },
    { id: 8, name: t.apps.notes, icon: '📋', color: 'bg-gradient-to-br from-yellow-300 via-amber-400 to-yellow-500' },
    { id: 9, name: t.apps.maps, icon: '🗺️', color: 'bg-gradient-to-br from-teal-400 via-green-500 to-emerald-600' },
    { id: 10, name: t.apps.facetime, icon: '📱', color: 'bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700' },
    { id: 11, name: t.apps.contacts, icon: '👤', color: 'bg-gradient-to-br from-slate-400 via-gray-500 to-slate-600' },
    { id: 12, name: t.apps.reminders, icon: '✅', color: 'bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700' },
  ]

  // Dock applications (only 3 items)
  const dockApps = [
    { id: 'app-center', name: t.apps.launchpad, icon: '◉', iconImage: '/src/icons/launchpad.jpg', color: 'bg-gradient-to-br from-fuchsia-600 via-purple-700 to-indigo-800', isSpecial: true },
    { id: 'settings', name: t.apps.settings, icon: '⚙️', color: 'bg-gradient-to-br from-slate-600 via-gray-700 to-zinc-800' },
    { id: 'about', name: t.apps.about, icon: 'ℹ️', color: 'bg-gradient-to-br from-cyan-600 via-blue-700 to-indigo-800' },
  ]

  // Combine dock apps with running apps (like macOS)
  const getDisplayedDockApps = () => {
    // Get unique running apps that are not already in dock
    const runningApps = windows
      .map(w => w.app)
      .filter((app, index, self) => 
        // Remove duplicates
        self.findIndex(a => a.id === app.id) === index &&
        // Remove apps already in permanent dock
        !dockApps.some(dockApp => dockApp.id === app.id)
      )
    return [...dockApps, ...runningApps]
  }

  return (
    <div className="relative w-full h-full overflow-visible">
      <Desktop theme={theme} toggleTheme={toggleTheme} language={language} changeLanguage={changeLanguage} t={t}>
        {windows.map(window => (
          !window.isMinimized && (
            <Window
              key={window.id}
              window={window}
              onClose={() => closeWindow(window.id)}
              onMinimize={() => minimizeWindow(window.id)}
              onMaximize={() => maximizeWindow(window.id)}
              onBringToFront={() => bringToFront(window.id)}
              theme={theme}
              toggleTheme={toggleTheme}
              language={language}
              changeLanguage={changeLanguage}
              t={t}
            />
          )
        ))}
      </Desktop>

      <Dock 
        apps={getDisplayedDockApps()} 
        onAppClick={handleDockClick}
        windows={windows}
        onWindowRestore={restoreWindow}
      />

      <Launchpad
        isOpen={isLaunchpadOpen}
        onClose={() => setIsLaunchpadOpen(false)}
        apps={allApps}
        onAppClick={handleAppClick}
        t={t}
      />
    </div>
  )
}

export default App
