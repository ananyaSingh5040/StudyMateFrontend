import { Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Planner from './pages/Planner'
import Notes from './pages/Notes'
import DoubtSolver from './pages/DoubtSolver'
import Profile from './pages/Profile'

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="main-area">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/doubts" element={<DoubtSolver />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
