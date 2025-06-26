import './Planner.css'
import { useState } from 'react'

function Planner() {
  const [rows, setRows] = useState([
    { date: '', time: '', task: '', topic: '', status: '' },
  ])

  const handleChange = (index, field, value) => {
    const updated = [...rows]
    updated[index][field] = value
    setRows(updated)
  }

  const addRow = () => {
    setRows([...rows, { date: '', time: '', task: '', topic: '', status: ''}])
  }

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
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                <td><input type="date" value={row.date} onChange={e => handleChange(i, 'date', e.target.value)} /></td>
                <td><input type="text" value={row.time} onChange={e => handleChange(i, 'time', e.target.value)} /></td>
                <td><input type="text" value={row.task} onChange={e => handleChange(i, 'task', e.target.value)} /></td>
                <td><input type="text" value={row.topic} onChange={e => handleChange(i, 'topic', e.target.value)} /></td>
                <td><input type="text" value={row.status} onChange={e => handleChange(i, 'status', e.target.value)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="add-row-btn" onClick={addRow}>+ Add Row</button>
    </div>
  )
}

export default Planner
