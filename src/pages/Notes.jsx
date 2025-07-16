import { useState, useEffect } from "react";
import "./Notes.css";
import {
  getNotes,
  saveNote,
  updateNote,
  deleteNote,
} from "../services/noteAPI";
import { toast } from "react-toastify";

const userId = localStorage.getItem("userId"); // dynamically from auth

function Notes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const data = await getNotes(userId); // ✅ FIXED
        setNotes(data || []); // ✅ Correct response handling
      } catch (err) {
        toast.error("Failed to load notes");
      }
    };
    fetchNotes();
  }, []);

  const handleAddNote = async () => {
    try {
      const newNoteData = {
        userId,
        date: new Date().toISOString().split("T")[0],
        title: "",
        description: "",
      };

      const savedNote = await saveNote(newNoteData);
      setNotes([...notes, { ...savedNote, isEditing: true }]);
      toast.success("New note created!");
    } catch (err) {
      toast.error("Failed to create note");
      console.error("Note creation error:", err);
    }
  };

  const handleSaveNote = async (id) => {
    const noteToSave = notes.find((note) => note._id === id);

    if (!noteToSave.title.trim() || !noteToSave.description.trim()) {
      toast.error("Title and description can't be empty!");
      return;
    }

    try {
      let savedNote;

      if (!noteToSave._id) {
        const newNote = await saveNote({
          userId,
          date: noteToSave.date,
          title: noteToSave.title,
          description: noteToSave.description,
        });
        savedNote = { ...newNote, isEditing: false };
        toast.success("Note created!");
      } else {
        const updated = await updateNote(userId, noteToSave._id, {
          title: noteToSave.title,
          description: noteToSave.description,
          date: noteToSave.date,
        });
        savedNote = { ...updated, isEditing: false };
        toast.success("Note updated!");
      }

      setNotes(notes.map((note) => (note._id === id ? savedNote : note)));
    } catch (err) {
      toast.error("Failed to save note");
    }
  };

  const handleChange = (id, field, value) => {
    setNotes(
      notes.map((note) =>
        note._id === id ? { ...note, [field]: value } : note
      )
    );
  };

  const handleDoubleClick = (id) => {
    setNotes(
      notes.map((note) =>
        note._id === id ? { ...note, isEditing: true } : note
      )
    );
  };

  const handleDelete = async (id) => {
    try {
      await deleteNote(userId, id);
      setNotes(notes.filter((note) => note._id !== id));
      toast.success("Note deleted!");
    } catch (err) {
      toast.error("Failed to delete note");
    }
  };

  return (
    <div className="notes-page">
      {notes.map((note) => (
        <div
          className="note-card"
          key={note._id}
          onDoubleClick={() => handleDoubleClick(note._id)}
        >
          {note.isEditing ? (
            <>
              <input
                type="date"
                value={note.date}
                onChange={(e) => handleChange(note._id, "date", e.target.value)}
                className="note-date"
              />
              <input
                type="text"
                value={note.title}
                onChange={(e) =>
                  handleChange(note._id, "title", e.target.value)
                }
                className="note-title"
                placeholder="Enter title..."
              />
              <textarea
                value={note.description}
                onChange={(e) =>
                  handleChange(note._id, "description", e.target.value)
                }
                className="note-desc"
                placeholder="Enter description..."
              />
              <button
                className="save-btn"
                onClick={() => handleSaveNote(note._id)}
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
