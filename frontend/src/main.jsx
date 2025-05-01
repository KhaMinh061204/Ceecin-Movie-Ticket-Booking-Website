// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { BookingProvider } from './BookingFlow_components/Context.jsx'
import React from 'react';

createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <BrowserRouter>
      <BookingProvider>
         <App />
      </BookingProvider>
    </BrowserRouter>
      
  // </React.StrictMode>
)
