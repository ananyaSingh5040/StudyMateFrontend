import './App.css'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="main-area">
        <Sidebar />
        <Dashboard />
      </div>
    </div>
  )
}

export default App
