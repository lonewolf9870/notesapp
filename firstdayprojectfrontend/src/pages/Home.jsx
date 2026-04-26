import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function Home() {
  const [notes, setNotes] = useState([]);
  const [addNote, setAddNote] = useState("");
  const [addDescription, setAddDescription] = useState("");
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  const navigate = useNavigate();

  const fetchNotes = (url = "/notes/") => {
    api.get(url)
      .then((res) => {
        setNotes(res.data.results);
        setNextPage(res.data.next);
        setPrevPage(res.data.previous);
        console.log(res.data.results);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetchNotes();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const addingNotes = (e) => {
    e.preventDefault();

    if (!addNote.trim() || !addDescription.trim()) {
      alert("fields cannot be empty");
      return;
    }

    api.post("/notes/", {
      title: addNote,
      description: addDescription,
    })
      .then(() => {
        alert("notes added successfully");
        setAddNote("");
        setAddDescription("");
        fetchNotes(); // reload first page after adding
      })
      .catch((err) => console.log(err));
  };

  const deletefunction = (id) => {
    api.delete(`/notes/${id}/`)
      .then((res) => {
        alert(res.data.message);
        fetchNotes(); // reload current/latest data
      })
      .catch((err) => console.log(err));
  };

  const updateNote = (id) => {
    const newTitle = prompt("Enter new title");
    const newDesc = prompt("Enter new description");

    if (!newTitle || !newDesc) {
      alert("Fields cannot be empty");
      return;
    }

    api.put(`/notes/${id}/`, {
      title: newTitle,
      description: newDesc,
    })
      .then(() => {
        alert("notes updated successfully");
        fetchNotes(); // reload updated data
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={logout}>Logout</button>

      {notes.map((note) => (
        <div key={note.id}>
          <h3>{note.title}</h3>
          <p>{note.description}</p>
          <button onClick={() => deletefunction(note.id)}>Delete</button>
          <button onClick={() => updateNote(note.id)}>Edit</button>
        </div>
      ))}

      <button disabled={!prevPage} onClick={() => fetchNotes(prevPage)}>
        Previous
      </button>

      <button disabled={!nextPage} onClick={() => fetchNotes(nextPage)}>
        Next
      </button>

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