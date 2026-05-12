import { Outlet } from 'react-router-dom'
import { Header, Footer, BottomNav } from './components/shared'

export default function Layout() {
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
