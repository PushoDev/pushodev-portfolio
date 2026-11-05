import { HashRouter, Route, Routes } from 'react-router'
import { Analytics } from '@vercel/analytics/react'
import HomePage from './pages/Home'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Analytics />
    </HashRouter>
  )
}
