import './Sidebar.css'

function Sidebar() {
  return (
    <div className="sidebar">
      <ul className="nav-links">
        <li className='active'>Dashboard</li>
        <li>Planner</li>
        <li>Notes</li>
        <li>Doubt Solver</li>
        <li>Profile</li>
      </ul>
    </div>
  )
}

export default Sidebar
