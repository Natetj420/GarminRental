
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import App from './App'
import Contact from './pages/contact' 
import './index.css'
import Checkout from "./pages/checkout";
import Terms from "./pages/terms";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/contact" element={<Contact />} />
         <Route path="/checkout" element={<Checkout />} />
         <Route path="/terms" element={<Terms />} />
      </Routes>
    </Router>
  </React.StrictMode>
)
