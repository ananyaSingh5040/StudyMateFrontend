import "./Planner.css";
import { useState, useEffect } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';

import {
  fetchPlanner,
  savePlanner,
  updateTask,
  deleteTask,
} from "../services/plannerAPI";

const userId = "64ccf6f0cabcde1234567890"; // replace with dynamic later

function Planner() {
  const [rows, setRows] = useState([]);
  

  useEffect(() => {
    fetchPlanner(userId).then(setRows);
  }, []);

  const handleChange = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  const addRow = () => {
    setRows([
      ...rows,
      { date: "", time: "", task: "", topic: "", status: "pending" },
    ]);
  };

 const saveAll = async () => {
  const isRowValid = (row) =>
    row.date.trim() && row.time.trim() && row.task.trim();

  const hasInvalidRow = rows.some((row) => !isRowValid(row));

  if (hasInvalidRow) {
    toast.warning("Please fill all attributes!");
    return;
  }

  try {
    const result = await savePlanner(userId, rows);
    setRows(result);
    toast.success("Task Saved!");
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong!");
  }
};


  const handleUpdate = async (i) => {
    const task = rows[i];
    if (!task._id) return alert("This task is not yet saved");
    await updateTask(userId, task._id, task);
    toast.success("Task Updated!");

  };

  const handleDelete = async (i) => {
    const task = rows[i];
    if (task._id) await deleteTask(userId, task._id);
    const updated = [...rows];
    updated.splice(i, 1);
    setRows(updated);
    toast.success("Task Deleted!")
  };


  return (
    <div className="planner-container">
      <h2>Study Planner</h2>
      <div className="table-wrapper">
        <table className="planner-table">
          <thead>
            <tr> 
              <th>Date</th>
              <th>Time Slot</th>
              <th>Task Description</th>
              <th>Topic</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row._id || i}>
                <td>
                  <input
                    type="date"
                    value={row.date}
                    onChange={(e) => handleChange(i, "date", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={row.time}
                    onChange={(e) => handleChange(i, "time", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={row.task}
                    onChange={(e) => handleChange(i, "task", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={row.topic}
                    onChange={(e) => handleChange(i, "topic", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={row.status}
                    onChange={(e) => handleChange(i, "status", e.target.value)}
                  />
                </td>
                <td>
                  {row._id ? (
                    <div className="action-buttons">
                      <button onClick={() => handleUpdate(i)}><MdModeEditOutline/></button>
                      <button onClick={() => handleDelete(i)}><MdDelete /></button>
                    </div>
                  ) : (
                    <span>New</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="add-row-btn" onClick={addRow}>
        Add Row
      </button>
      <button className="add-row-btn" onClick={saveAll}>
        Save
      </button>
    </div>
  );
}

export default Planner;
