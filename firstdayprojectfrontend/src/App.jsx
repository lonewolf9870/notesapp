import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);
  const [addNote, setAddNote] = useState("");
  const [addDescription,setAddDescription] = useState("")

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/notes/")
      .then((res) => {
        setNotes(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const addingNotes = (e) => {
    e.preventDefault();
    if (!addNote.trim()||!addDescription.trim()) {
      alert("fields cannot be empty");
      return;
    }

    axios.post("http://127.0.0.1:8000/api/notes/", {
      title: addNote,
      description: addDescription
    })
      .then((res) => {
        alert("notes added successfully")
        setNotes([...notes, res.data]);
        setAddNote("");
        setAddDescription("");
      })
      .catch((err) => console.log(err));
  };
  const deletefunction = (id) => {
  axios.delete(`http://127.0.0.1:8000/api/notes/${id}/`)
    .then((res) => {
      setNotes(notes.filter(note => note.id !== id));
      alert(res.data.message)
    })
    .catch(err => console.log(err));
  };
  
  const updateNote = (id) => {
  const newTitle = prompt("Enter new title");
  const newDesc = prompt("Enter new description");

  axios.put(`http://127.0.0.1:8000/api/notes/${id}/`, {
    title: newTitle,
    description: newDesc
  })
  .then((res) => {
    setNotes(notes.map(note =>
      note.id === id ? res.data : note
    ));
    alert("notes updated succesfully")
  })
  .catch(err => console.log(err));
};

  return (
    <div>
      <h1>Notes</h1>

      {notes.map((note) => (
        <div key={note.id}>
          <h3>{note.title}</h3>
          <button onClick={() => deletefunction(note.id)}>Delete</button>
          <button onClick={() => updateNote(note.id)}>Edit</button>
          <p>{note.description}</p>
        </div>
      ))}

      <form onSubmit={addingNotes}>
        <input
          type="text"
          placeholder="enter your note"
          value={addNote}
          onChange={(e) => setAddNote(e.target.value)}
        />
        <input
          type="text"
          placeholder="enter your description"
          value={addDescription}
          onChange={(e) => setAddDescription(e.target.value)}
        />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
}

export default App;