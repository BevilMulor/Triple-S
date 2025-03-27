// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { RealAuthProvider } from './auth/realAuthContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <RealAuthProvider>  {/* Wrap your App with RealAuthProvider */}
      <App />
    </RealAuthProvider>
  </React.StrictMode>,
)