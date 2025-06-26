import './Dashboard.css'

function Dashboard() {
  return (
    <div className="dashboard">

      <div className="rectangle slideshow">Slideshow Banner</div>

      <div className="square-section">
        <a href="/notes" className="card square-link">Your Notes</a>
        <a href="/planner" className="card square-link">Your Schedule</a>
      </div>
    </div>
  )
}

export default Dashboard
