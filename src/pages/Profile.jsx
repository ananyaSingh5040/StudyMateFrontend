import { useState } from 'react'
import './Profile.css'

function Profile() {
  const [showConfirm, setShowConfirm] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [status, setStatus] = useState('Active')


  const handleDelete = () => {
    setShowConfirm(true)
  }

  const confirmDelete = () => {
    setShowConfirm(false)
    setShowSuccess(true)

    // Auto-hide message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false)
    }, 3000)
  }

  return (
    <div className="profile-page">
      {showSuccess && (
        <div className="success-toast">
          Account deleted successfully!
        </div>
      )}

      <div className="profile-header">
        <img
          src="https://i.pravatar.cc/150?img=64"
          alt="profile"
          className="profile-img"
        />
        <div className="profile-info">
          <input className="profile-name" defaultValue="Ananya Singh" />
          <p className="profile-role">Student | Developer</p>
        </div>
      </div>

      <div className="profile-details">
        <div className="detail-row">
          <span>Email:</span>
          <input type="email" defaultValue="ananya@example.com" />
        </div>
        <div className="detail-row">
          <span>Location:</span>
          <input type="text" defaultValue="India" />
        </div>
        <div className="detail-row">
          <span>Joined:</span>
          <input type="text" defaultValue="June 2025" disabled />
        </div>
        
        <div className="detail-row status">
  <span>Status:</span>
  <div className="status-toggle">
    <div
      className={`status-option ${status === 'Active' ? 'active' : ''}`}
      onClick={() => setStatus('Active')}
    >
      Active
    </div>
    <div
      className={`status-option ${status === 'Busy' ? 'active' : ''}`}
      onClick={() => setStatus('Busy')}
    >
      Busy
    </div>
  </div>
</div>

      </div>

      <button className="delete-account" onClick={handleDelete}>
        Delete Account
      </button>

      {showConfirm && (
        <div className="confirm-overlay">
          <div className="confirm-box">
            <h3>Are you sure to delete your account?</h3>
            <div className="confirm-buttons">
              <button className="confirm-yes" onClick={confirmDelete}>Yes</button>
              <button className="confirm-no" onClick={() => setShowConfirm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile
