# ZiWei - The Forbidden City AI Guide

An immersive, interactive web application featuring a beautiful macOS-style desktop interface for exploring the Forbidden City with AI assistance. Built with React, Vite, and modern web technologies with draggable windows, functional dock, glassmorphism design, and dark/light mode support.

![ZiWei - The Forbidden City AI Guide](https://img.shields.io/badge/React-18.3.1-blue) ![Vite](https://img.shields.io/badge/Vite-6.0.3-purple) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-cyan)

## ✨ Features

- 🖥️ **Fullscreen Desktop Layout** - Immersive macOS-inspired interface
- 🎨 **Glassmorphism Design** - Modern translucent UI elements with backdrop blur
- 🪟 **Draggable Windows** - Click and drag windows anywhere on the desktop
- 📐 **Resizable Windows** - Resize windows from the bottom-right corner
- 🎯 **Window Controls** - macOS-style close, minimize, and maximize buttons
- 🌊 **Bottom Dock** - Interactive dock with app icons and hover effects
- 🌙 **Dark/Light Mode** - Toggle between themes with smooth transitions
- ✨ **Smooth Animations** - Powered by Framer Motion for fluid interactions
- 📱 **Responsive Design** - Scales beautifully across different screen sizes

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The optimized build will be output to the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 🛠️ Tech Stack

- **[React](https://react.dev/)** - UI library for building component-based interfaces
- **[Vite](https://vitejs.dev/)** - Next-generation frontend build tool
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library for React
- **[react-draggable](https://github.com/react-grid-layout/react-draggable)** - Drag functionality for windows

## 📁 Project Structure

```
ziwei-macos-web/
├── src/
│   ├── components/
│   │   ├── Desktop.jsx       # Main desktop background
│   │   ├── Dock.jsx          # Bottom dock with app icons
│   │   ├── Window.jsx        # Draggable window component
│   │   ├── WindowControls.jsx # Window control buttons
│   │   └── ThemeToggle.jsx   # Dark/light mode toggle
│   ├── App.jsx               # Main application component
│   ├── main.jsx              # Application entry point
│   └── index.css             # Global styles with Tailwind
├── public/                   # Static assets
├── index.html                # HTML template
├── package.json              # Dependencies and scripts
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── postcss.config.js         # PostCSS configuration
└── README.md                 # This file
```

## 🎮 Usage

### Opening Windows

Click on any icon in the dock to open a new window. Each window is:
- **Draggable** - Click and drag the title bar
- **Resizable** - Drag from the bottom-right corner
- **Stackable** - Multiple windows can be open simultaneously

### Window Controls

- **🔴 Red Button** - Close window
- **🟡 Yellow Button** - Minimize window to dock
- **🟢 Green Button** - Maximize/restore window

### Theme Toggle

Click the sun/moon button in the top-right corner to switch between light and dark modes.

### Dock Interactions

- **Hover** - Icons lift up with smooth animation
- **Click** - Open new window or restore minimized window
- **Active Indicator** - Dot appears under active app icons

## 🎨 Customization

### Adding New Apps

Edit the `dockApps` array in `src/App.jsx`:

```javascript
const dockApps = [
  { id: 1, name: 'Your App', icon: '🎯', color: 'bg-blue-500' },
  // Add more apps...
]
```

### Customizing Colors

Modify the Tailwind configuration in `tailwind.config.js` or use Tailwind's utility classes directly in components.

### Adjusting Animations

Tweak Framer Motion animation parameters in component files:

```javascript
transition={{ type: "spring", stiffness: 300, damping: 25 }}
```

## 🐛 Troubleshooting

### Port Already in Use

If port 5173 is already in use, Vite will automatically try the next available port. Check the terminal output for the correct URL.

### Dependencies Not Installing

Try clearing the npm cache:
```bash
npm cache clean --force
npm install
```

### Build Errors

Ensure you're using Node.js v18 or higher:
```bash
node --version
```

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 👤 Author

**Ziwei**

- Project: ziwei-macos-web

## 🌟 Show Your Support

Give a ⭐️ if you like this project!

## 📝 Notes

- This is a demonstration project showcasing modern React patterns and UI techniques
- Window content is placeholder-based and can be customized for real applications
- The project uses emoji icons for simplicity; replace with SVG icons for production use

---

Built with ❤️ using React and Vite
