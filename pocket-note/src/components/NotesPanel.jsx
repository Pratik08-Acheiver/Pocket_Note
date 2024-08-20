import React, { useState, useEffect, useRef } from 'react';
import { fetchNotes, addNote, deleteNote, updateNote } from '../apis/Api'; // Import API functions
import { FaTrash } from 'react-icons/fa'; // Import trash icon from react-icons

function NotesPanel({ groupId }) {
  const [notes, setNotes] = useState([]);
  const [noteContent, setNoteContent] = useState('');
  const [editingNote, setEditingNote] = useState(null);
  const [editedContent, setEditedContent] = useState('');
  const popupRef = useRef(null);
  

  useEffect(() => {
    if (groupId) {
      fetchNotes(groupId).then(data => setNotes(data));
    }
  }, [groupId]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        if (editingNote) {
          handleSaveEdit();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [editingNote]);

  const handleAddNote = () => {
    if (noteContent.trim() !== '') {
      addNote(groupId, noteContent).then(() => {
        setNoteContent('');
        fetchNotes(groupId).then(data => setNotes(data));
      });
    }
  };

  const handleDeleteNote = (noteId) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      deleteNote(noteId)
        .then(() => {
          fetchNotes(groupId).then(data => setNotes(data));
        })
        .catch(error => console.error('Error deleting note:', error));
    }
  };

  const handleDoubleClick = (note) => {
    setEditingNote(note);
    setEditedContent(note.content);
  };

  const handleSaveEdit = () => {
    if (editingNote && editedContent.trim() !== '') {
      updateNote(editingNote.id, editedContent).then(() => {
        setEditingNote(null);
        setEditedContent('');
        fetchNotes(groupId).then(data => setNotes(data));
      });
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-auto">
        {notes.length === 0 ? (
          <div className="p-4 text-gray-500">No notes available for this group.</div>
        ) : (
          notes.map(note => (
            <div 
              key={note.id} 
              className="p-2 mb-2 bg-white rounded shadow flex items-start justify-between"
              style={{ wordBreak: 'break-word' }}
              onDoubleClick={() => handleDoubleClick(note)}
            >
              <div style={{ flexGrow: 1 }}>
                {editingNote && editingNote.id === note.id ? (
                  <div ref={popupRef} className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow-lg w-3/4 max-w-lg">
                    <input 
                      type="text" 
                      value={editedContent} 
                      onChange={(e) => setEditedContent(e.target.value)} 
                      className="border p-2 rounded w-full" 
                    />
                    <button 
                      onClick={handleSaveEdit} 
                      className="mt-2 bg-blue-500 text-white p-2 rounded w-full"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <>
                    <div style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>{note.content}</div>
                    <div className="text-gray-500 text-sm">{new Date(note.createdAt).toLocaleString()}</div>
                  </>
                )}
              </div>
              <button
                onClick={() => handleDeleteNote(note.id)}
                className="text-gray-500 hover:text-gray-700 bg-transparent border-none p-0 ml-2"

              >
               <FaTrash className="h-6 w-6" />
              </button>
            </div>
          ))
        )}
      </div>
      <div className="flex items-center">
        <input
          type="text"
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          placeholder="Type your note..."
          className="border p-2 rounded flex-grow"
        />
        <button
          onClick={handleAddNote}
          disabled={noteContent.trim() === ''}
          className={`ml-2 p-2 rounded ${noteContent.trim() === '' ? 'bg-gray-400' : 'bg-blue-500'} text-white`}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default NotesPanel;
