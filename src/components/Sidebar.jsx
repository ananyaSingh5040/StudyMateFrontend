import { Link, useLocation } from 'react-router-dom'
import './Sidebar.css'

function Sidebar() {
  const location = useLocation()

  const isActive = (path) => location.pathname === path ? 'active' : ''

  return (
    <div className="sidebar">
      <ul className="nav-links">
        <li className={isActive('/')}>
          <Link to="/">Dashboard</Link>
        </li>
        <li className={isActive('/planner')}>
          <Link to="/planner">Planner</Link>
        </li>
         <li className={isActive('/notes')}>
          <Link to="/notes">Notes</Link>
        </li>
        <li className={isActive('/doubts')}>
          <Link to="/doubts">Doubt Solver</Link>
        </li>
        <li className={isActive('/profile')}>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
