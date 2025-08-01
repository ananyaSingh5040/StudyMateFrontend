import { useState, useEffect } from "react";
import "./Profile.css";
import { getUserInfo } from "../services/userAPI"; 
 import { useNavigate } from "react-router-dom";
 import { deleteUserAccount } from "../services/userAPI";
 import { Navigate } from "react-router-dom";

function Profile() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [status, setStatus] = useState("Active");

  const [user, setUser] = useState(null);

  const userId = localStorage.getItem("userId");
 if (!userId) {
  return <Navigate to="/signup" />;
}


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserInfo(userId);
        setUser(data);
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };
    fetchUser();
  }, [userId]);


const navigate = useNavigate();

const confirmDelete = async () => {
  try {
    await deleteUserAccount(userId);

    // 🧹 Clear all stored info
    localStorage.clear();

    // ✅ Redirect before the component remounts with stale userId
    navigate("/signup");
  } catch (err) {
    console.error("Failed to delete account:", err);
  }
};


  const handleDelete = () => {
    setShowConfirm(true);
  };

 
  

  if (!user) return <div className="profile-page">Loading profile...</div>;

  return (
    <div className="profile-page">
      {showSuccess && (
        <div className="success-toast">Account deleted successfully!</div>
      )}

      <div className="profile-header">
        <img
  src={`https://i.pravatar.cc/150?u=${userId}`}
  alt="profile"
  className="profile-img"
/>

        <div className="profile-info">
          <input className="profile-name" defaultValue={user.name} />
          <p className="profile-role">Student | Developer</p>
        </div>
      </div>

      <div className="profile-details">
        <div className="detail-row">
          <span>Email:</span>
          <input type="email" defaultValue={user.email} />
        </div>
        <div className="detail-row">
          <span>Location:</span>
          <input type="text" defaultValue={user.location || "India"} />
        </div>
        <div className="detail-row">
          <span>Joined:</span>
          <input
            type="text"
            defaultValue={new Date(user.createdAt).toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
            disabled
          />
        </div>

        <div className="detail-row status">
          <span>Status:</span>
          <div className="status-toggle">
            <div
              className={`status-option ${
                status === "Active" ? "active" : ""
              }`}
              onClick={() => setStatus("Active")}
            >
              Active
            </div>
            <div
              className={`status-option ${
                status === "Busy" ? "active" : ""
              }`}
              onClick={() => setStatus("Busy")}
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
              <button className="confirm-yes" onClick={confirmDelete}>
                Yes
              </button>
              <button
                className="confirm-no"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
