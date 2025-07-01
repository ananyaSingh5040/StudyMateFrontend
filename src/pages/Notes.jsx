import { useState } from 'react'
import './Notes.css'

function Notes() {
  const [notes, setNotes] = useState([])

  const handleAddNote = () => {
    const newNote = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      title: 'Untitled Note',
      description: 'New note description...',
      isEditing: true,
    }
    setNotes([...notes, newNote])
  }

  const handleChange = (id, field, value) => {
    setNotes(notes.map(note =>
      note.id === id ? { ...note, [field]: value } : note
    ))
  }

  const handleBlur = (id) => {
    setNotes(notes.map(note =>
      note.id === id ? { ...note, isEditing: false } : note
    ))
  }

  const handleDoubleClick = (id) => {
    setNotes(notes.map(note =>
      note.id === id ? { ...note, isEditing: true } : note
    ))
  }

  return (
    <div className="notes-page">
      {notes.map(note => (
        <div
          className="note-card"
          key={note.id}
          onDoubleClick={() => handleDoubleClick(note.id)}
        >
          {note.isEditing ? (
            <>
              <input
                type="date"
                value={note.date}
                onChange={(e) => handleChange(note.id, 'date', e.target.value)}
                onBlur={() => handleBlur(note.id)}
                className="note-date"
              />
              <input
                type="text"
                value={note.title}
                onChange={(e) => handleChange(note.id, 'title', e.target.value)}
                onBlur={() => handleBlur(note.id)}
                className="note-title"
              />
              <textarea
                value={note.description}
                onChange={(e) => handleChange(note.id, 'description', e.target.value)}
                onBlur={() => handleBlur(note.id)}
                className="note-desc"
              />
            </>
          ) : (
            <>
              <p className="note-date">{note.date}</p>
              <h3 className="note-title">{note.title}</h3>
              <p className="note-desc">{note.description}</p>
            </>
          )}
        </div>
      ))}

      <div className="note-card add-note" onClick={handleAddNote}>
        <div className="plus">+</div>
        <p>Add Note</p>
      </div>
    </div>
  )
}

export default Notes
