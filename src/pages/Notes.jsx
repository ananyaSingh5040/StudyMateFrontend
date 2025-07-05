import { useState, useEffect } from 'react';
import './Notes.css';
import { getNotes, saveNote, updateNote, deleteNote } from '../services/noteAPI';
import { toast } from 'react-toastify';

const userId = "64ccf6f0cabcde1234567890"; // Replace with real user ID from auth later

function Notes() {
  const [notes, setNotes] = useState([]);

  // Fetch notes on mount
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const data = await getNotes(userId);
        setNotes(data.notes || []);
        toast.success("Notes loaded!");
      } catch (err) {
        toast.error("Failed to load notes");
      }
    };
    fetchNotes();
  }, []);

 const handleAddNote = async () => {
  try {
    const newNoteData = {
      userId, // already defined above
      date: new Date().toISOString().split('T')[0],
      title: '',
      description: '',
    };

    const savedNote = await saveNote(newNoteData);

   
    const noteWithEditState = {
      ...savedNote,
      isEditing: true,
    };

    setNotes([...notes, noteWithEditState]);
    toast.success("New note created!");
  } catch (err) {
    toast.error("Failed to create note");
    console.error("Note creation error:", err);
  }
};


  // Save new or updated note
  const handleSaveNote = async (id) => {
    const noteToSave = notes.find(note => note.id === id || note._id === id);

    if (!noteToSave.title.trim() || !noteToSave.description.trim()) {
      toast.error("Title and description can't be empty!");
      return;
    }

    try {
      let savedNote;

      if (noteToSave.isNew) {
        const newNote = await saveNote({
          userId,
          date: noteToSave.date,
          title: noteToSave.title,
          description: noteToSave.description
        });
        savedNote = { ...newNote, isEditing: false };
        toast.success("Note created!");
      } else {
        const updated = await updateNote(userId, noteToSave._id, {
          title: noteToSave.title,
          description: noteToSave.description,
          date: noteToSave.date
        });
        savedNote = { ...updated, isEditing: false };
        toast.success("Note updated!");
      }

      setNotes(notes.map(note =>
        (note.id === id || note._id === id) ? savedNote : note
      ));
    } catch (err) {
      toast.error("Failed to save note");
    }
  };

  // Update input while editing
  const handleChange = (id, field, value) => {
    setNotes(notes.map(note =>
      (note._id === id || note.id === id) ? { ...note, [field]: value } : note
    ));
  };

  // Enable edit mode on double click
  const handleDoubleClick = (id) => {
    setNotes(notes.map(note =>
      (note._id === id || note.id === id) ? { ...note, isEditing: true } : note
    ));
  };

  // Delete note
  const handleDelete = async (id) => {
    const note = notes.find(n => n._id === id);
    if (!note) return;

    try {
      await deleteNote(userId, id);
      setNotes(notes.filter(note => note._id !== id));
      toast.success("Note deleted!");
    } catch (err) {
      toast.error("Failed to delete note");
    }
  };

  return (
    <div className="notes-page">
      {notes.map(note => (
        <div
          className="note-card"
          key={note._id || note.id}
          onDoubleClick={() => handleDoubleClick(note._id || note.id)}
        >
          {note.isEditing ? (
            <>
              <input
                type="date"
                value={note.date}
                onChange={(e) => handleChange(note._id || note.id, 'date', e.target.value)}
                className="note-date"
              />
              <input
                type="text"
                value={note.title}
                onChange={(e) => handleChange(note._id || note.id, 'title', e.target.value)}
                className="note-title"
                placeholder="Enter title..."
              />
              <textarea
                value={note.description}
                onChange={(e) => handleChange(note._id || note.id, 'description', e.target.value)}
                className="note-desc"
                placeholder="Enter description..."
              />
              <button
                className="save-btn"
                onClick={() => handleSaveNote(note._id || note.id)}
              >
                Save
              </button>
            </>
          ) : (
            <>
              <p className="note-date">{note.date}</p>
              <h3 className="note-title">{note.title}</h3>
              <p className="note-desc">{note.description}</p>
              <button
                className="delete-btn"
                onClick={() => handleDelete(note._id)}
              >
                🗑
              </button>
            </>
          )}
        </div>
      ))}

      <div className="note-card add-note" onClick={handleAddNote}>
        <div className="plus">+</div>
        <p>Add Note</p>
      </div>
    </div>
  );
}

export default Notes;
