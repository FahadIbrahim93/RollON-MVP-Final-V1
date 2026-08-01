import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import * as Sentry from '@sentry/react'
import App from './App'
import './index.css'
import { QueryProvider } from './lib/queryProvider'

import './lib/env-validation'

// Initialize Sentry only when DSN is configured
if (import.meta.env.VITE_SENTRY_DSN && import.meta.env.VITE_SENTRY_DSN !== 'your_sentry_dsn_here') {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [Sentry.browserTracingIntegration()],
    tracesSampleRate: 1.0,
  })
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryProvider>
        <App />
      </QueryProvider>
    </BrowserRouter>
  </React.StrictMode>,
)