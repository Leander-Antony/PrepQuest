import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import AppProviders from './context/AppProviders.jsx'

// Import all global styles
import './styles/variables.css'
import './styles/globals.css'
import './styles/animations.css'
import './styles/responsive.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
)
