import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '@/shared/components/Header'
import { Footer } from '@/shared/components/Footer'
import { BottomNav } from '@/shared/components/BottomNav'

export default function RootLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
    </>
  )
}
