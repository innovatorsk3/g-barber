import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

import Layout from './Layout'
import Home from './pages/Home'
import DichVu from './pages/DichVu'
import Store from './pages/Store'
import Academy from './pages/Academy'
import TuyenDung from './pages/TuyenDung'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/dich-vu" element={<DichVu />} />
          <Route path="/store" element={<Store />} />
          <Route path="/academy" element={<Academy />} />
          <Route path="/tuyen-dung" element={<TuyenDung />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
