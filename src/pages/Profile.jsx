
import './Profile.css'

function Profile() {
  return (
    <div className="profile-page">
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
        <div className="detail-row">
          <span>Status:</span>
          <select defaultValue="active">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <button className="delete-account">Delete Account</button>
    </div>
  )
}

export default Profile
