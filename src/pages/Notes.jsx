
import './Notes.css'

function Notes() {
  
  const notes = [
    {
      id: 1,
      date: '2025-06-25',
      title: 'React Router Setup',
      description: 'Wrapped App in BrowserRouter and created Routes.',
    },
    {
      id: 2,
      date: '2025-06-24',
      title: 'Fix Sidebar',
      description: 'Made the full box clickable using styled <Link>.',
    }
  ]

  return (
    <div className="notes-page">
      {notes.map(note => (
        <div className="note-card" key={note.id}>
          <p className="note-date">{note.date}</p>
          <h3 className="note-title">{note.title}</h3>
          <p className="note-desc">{note.description}</p>
        </div>
      ))}

      <div className="note-card add-note">
        <div className="plus">+</div>
        <p>Add Note</p>
      </div>
    </div>
  )
}

export default Notes
