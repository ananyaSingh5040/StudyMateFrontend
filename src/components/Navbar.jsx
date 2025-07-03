import { useNavigate } from 'react-router-dom';
import './Navbar.css'

function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <div className="brand">StudyMate</div>
      <div className="nav-actions">
        <button className="nav-btn" onClick={() => navigate('/profile')}>Profile</button>
        <button className="nav-btn" onClick={() => navigate('/')}>Logout</button>
      </div>
    </div>
  )
}

export default Navbar
