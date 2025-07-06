import { useEffect, useState } from "react";
import "./Dashboard.css";
import BannerSlider from "../components/BannerSlider";
import { getRecentNotes } from "../services/noteAPI";
import { getPlanner } from "../services/plannerAPI"; // 💡 make sure this exists!

const userId = "64ccf6f0cabcde1234567890"; // Replace later with auth ID

function Dashboard() {
  const [recentNotes, setRecentNotes] = useState([]);
  const [recentTasks, setRecentTasks] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const notes = await getRecentNotes(userId);
      const sorted = notes
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 2);
      setRecentNotes(sorted);
    };

    const fetchPlanner = async () => {
      try {
        const data = await getPlanner(userId);
        const tasks = data.tasks || [];

        const sortedTasks = tasks
          .sort((a, b) => a.time.localeCompare(b.time)) // simple time sort
          .slice(0, 2);

        setRecentTasks(sortedTasks);
      } catch (err) {
        console.error("Planner fetch failed");
      }
    };

    fetchNotes();
    fetchPlanner();
  }, []);

  return (
    <div className="dashboard">
      <div className="rectangle slideshow">
        <BannerSlider />
      </div>

      <div className="square-section">
        {/* Notes Card */}
        <a href="/notes" className="card square-link notes-square">
          <div className="notes-label">Recent Notes</div>
          <div className="notes-preview">
            {recentNotes.length > 0 ? (
              recentNotes.map((note) => (
                <div key={note._id} className="mini-note">
                  <p className="mini-title">{note.title}</p>
                  <p className="mini-desc">{note.description}</p>
                </div>
              ))
            ) : (
              <>
                <div className="mini-note">
                  <p className="mini-title">No notes yet</p>
                  <p className="mini-desc">Start creating your first note now!</p>
                </div>
                <div className="mini-note">
                  <p className="mini-title">Write your thoughts!</p>
                  <p className="mini-desc">Your recent notes will show up here.</p>
                </div>
              </>
            )}
          </div>
        </a>

        {/* Schedule Card */}
        <a href="/planner" className="card square-link notes-square">
          <div className="notes-label">Your Schedule</div>
          <div className="notes-preview">
            {recentTasks.length > 0 ? (
              recentTasks.map((task, index) => (
                <div key={index} className="mini-note">
                  <p className="mini-title">{task.time}</p>
                  <p className="mini-desc">{task.task}</p>
                </div>
              ))
            ) : (
              <>
                <div className="mini-note">
                  <p className="mini-title">No tasks yet</p>
                  <p className="mini-desc">Start scheduling your day!</p>
                </div>
                <div className="mini-note">
                  <p className="mini-title">Stay organized!</p>
                  <p className="mini-desc">Your planner tasks will show here.</p>
                </div>
              </>
            )}
          </div>
        </a>
      </div>
    </div>
  );
}

export default Dashboard;
