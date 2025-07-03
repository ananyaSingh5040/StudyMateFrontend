import "./Dashboard.css";
import BannerSlider from "../components/BannerSlider";

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="rectangle slideshow">
        <BannerSlider />
      </div>
      <div className="square-section">
        <a href="/notes" className="card square-link notes-square">
          <div className="notes-label">Recent Notes</div>
          <div className="notes-preview">
            <div className="mini-note">
              <p className="mini-title">React Setup</p>
              <p className="mini-desc">Router config & layout done.</p>
            </div>
            <div className="mini-note">
              <p className="mini-title">Sidebar Fix</p>
              <p className="mini-desc">Clickable links & active tabs.</p>
            </div>
          </div>
        </a>

       <a href="/planner" className="card square-link notes-square">
          <div className="notes-label">Your Schedule</div>
          <div className="notes-preview">
            <div className="mini-note">
              <p className="mini-title">11:00 am</p>
              <p className="mini-desc">Do DSA Practice.</p>
            </div>
            <div className="mini-note">
              <p className="mini-title">4:00 pm</p>
              <p className="mini-desc">Revise React Props.</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}

export default Dashboard;
