import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Home() {
  const [notes, setNotes] = useState([]);
  const [addNote, setAddNote] = useState("");
    const [addDescription, setAddDescription] = useState("")
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
const config = {
  headers: {
    Authorization: `Token ${token}`
  }
    };
    
    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
      }
      axios.get("http://127.0.0.1:8000/api/notes/", {
          headers: {
            Authorization:`Token ${token}`
        }
    })
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
    },config)
      .then((res) => {
        alert("notes added successfully")
        setNotes([...notes, res.data]);
        setAddNote("");
        setAddDescription("");
      })
      .catch((err) => console.log(err));
  };
  const deletefunction = (id) => {
  axios.delete(`http://127.0.0.1:8000/api/notes/${id}/`,config)
    .then((res) => {
      setNotes(notes.filter(note => note.id !== id));
      alert(res.data.message)
    })
    .catch(err => console.log(err));
  };
  
const updateNote = (id) => {
  const newTitle = prompt("Enter new title");
  const newDesc = prompt("Enter new description");

  if (!newTitle || !newDesc) {
    alert("Fields cannot be empty");
    return;
  }

  axios.put(`http://127.0.0.1:8000/api/notes/${id}/`, {
    title: newTitle,
    description: newDesc
  }, config)
  .then((res) => {
    setNotes(notes.map(note =>
      note.id === id ? res.data : note
    ));
    alert("notes updated successfully");
  })
  .catch(err => console.log(err));
};

  return (
    <div>
      <h1>Notes</h1>
          <button onClick={logout}>logout</button>
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

export default Home;