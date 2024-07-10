import React, { useState, useEffect } from 'react';
import styles from './style/NotesStyle.module.css';
import UserNavBar from '../Components/UserNavBar';
import NotesService from '../service/NotesService';
import getUserID from "../service/GetUserID";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [userId, setuserId] = useState();

  useEffect(() => {
    const userID = getUserID();
    setuserId(userID);
  }, []);

  useEffect(() => {
    NotesService.getAllNotes(userId).then(response => {
      setNotes(response.data);
    });
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNote({
      ...newNote,
      [name]: value,
    });
  };

  const addNote = () => {
    if (newNote.title && newNote.content) {
      NotesService.addNote(newNote, userId).then(response => {
        setNotes([...notes, response.data]);
        setNewNote({ title: '', content: '' });
      });
    }
  };

  const deleteNote = (id) => {
    NotesService.deleteNoteById(id).then(() => {
      setNotes(notes.filter(note => note.id !== id));
    });
  };

  const editNote = (note) => {
    setEditingNote(note);
    setNewNote({ title: note.title, content: note.content });
  };

  const updateNote = () => {
    if (newNote.title && newNote.content) {
      NotesService.updateNote({ id: editingNote.id, ...newNote }).then(response => {
        setNotes(notes.map(note => note.id === editingNote.id ? response.data : note));
        setEditingNote(null);
        setNewNote({ title: '', content: '' });
      });
    }
  };

  return (
    <>
      <UserNavBar />
      <div className={styles.NotesPage}>
        <div className={styles.NotesContainer}>
          <div className={styles.addNotes}>
            <input
              type="text"
              name="title"
              placeholder="Note Title"
              value={newNote.title}
              onChange={handleInputChange}
              className={styles.inputField}
            />
            <textarea
              name="content"
              placeholder="Note Content"
              value={newNote.content}
              onChange={handleInputChange}
              className={styles.textareaField}
            />
            <button onClick={editingNote ? updateNote : addNote} className={styles.button}>
              {editingNote ? 'Update Note' : 'Add Note'}
            </button>
          </div>
          {notes.map(note => (
            <div key={note.id} className={styles.Note}>
              <div className={styles.NoteHeader}>
                <div className={styles.NoteTitle}>{note.title}</div>
                <div className={styles.NoteActions}>
                  <button onClick={() => editNote(note)} className={styles.button}>Edit</button>
                  <button onClick={() => deleteNote(note.id)} className={styles.button}>Delete</button>
                </div>
              </div>
              <div className={styles.NoteContent}>{note.content}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Notes;