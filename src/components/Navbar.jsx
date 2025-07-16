import { useNavigate } from 'react-router-dom';
import './Navbar.css'
import { toast } from "react-toastify";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
  
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    toast.info("Logged out successfully!");

   
    navigate("/login");
  };
  return (
    <div className="navbar">
      <div className="brand">StudyMate</div>
      <div className="nav-actions">
        <button className="nav-btn" onClick={() => navigate('/profile')}>Profile</button>
        <button className="nav-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default Navbar
