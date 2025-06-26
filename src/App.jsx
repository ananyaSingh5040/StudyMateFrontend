import { Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Planner from './pages/Planner'

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="main-area">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/planner" element={<Planner />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
