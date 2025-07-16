import { useEffect, useState } from "react";
import "./Dashboard.css";
import BannerSlider from "../components/BannerSlider";
import { getNotes } from "../services/noteAPI";
import { getPlanner } from "../services/plannerAPI";
import { toast } from "react-toastify";

const userId = localStorage.getItem("userId"); // from login

function Dashboard() {
  const [recentNotes, setRecentNotes] = useState([]);
  const [recentTasks, setRecentTasks] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const allNotes = await getNotes(userId); // ✅ fixed
        const sorted = allNotes
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 2);
        setRecentNotes(sorted);
      } catch (err) {
        toast.error("Failed to load notes");
      }
    };

  const fetchPlanner = async () => {
  try {
    const data = await getPlanner(userId);
  

    const tasks = Array.isArray(data.tasks) ? data.tasks : [];

    // Filter out any tasks that don’t have a time or task name
    const validTasks = tasks.filter(
      (t) => typeof t.time === "string" && typeof t.task === "string"
    );

    const sortedTasks = validTasks
      .sort((a, b) => a.time.localeCompare(b.time)) // only safe if .time exists
      .slice(0, 2);

    setRecentTasks(sortedTasks);
  } catch (err) {
    console.error("Planner fetch failed:", err);
    toast.error("Failed to load planner");
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
