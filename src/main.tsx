import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

import RootLayout from './layouts/RootLayout'
import Home from './modules/home'
import Services from './modules/services'
import Store from './modules/store'
import Academy from './modules/academy'
import Careers from './modules/careers'
import About from './modules/about'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/dich-vu" element={<Services />} />
          <Route path="/store" element={<Store />} />
          <Route path="/academy" element={<Academy />} />
          <Route path="/tuyen-dung" element={<Careers />} />
          <Route path="/ve-chung-toi" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
