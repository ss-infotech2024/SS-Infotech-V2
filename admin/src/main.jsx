import './lib/api.js'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import './index.css'
import App from './App.jsx'
import { Toaster } from './components/ui/toast.jsx'
import { ConfirmHost } from './components/ui/confirm.jsx'
import TooltipLayer from './components/ui/TooltipLayer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Animations follow the user's reduced-motion preference. */}
    <MotionConfig reducedMotion="user">
      <App />
      <Toaster />
      <ConfirmHost />
      <TooltipLayer />
    </MotionConfig>
  </StrictMode>,
)
