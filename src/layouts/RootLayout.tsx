import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from '@/shared/components/Header'
import { Footer } from '@/shared/components/Footer'
import { BottomNav } from '@/shared/components/BottomNav'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function RootLayout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
    </>
  )
}
