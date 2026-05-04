import React from "react";
import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import notes from "../notes";

function App() {
  const [noteItems, setNoteItems] = useState(notes);

  function deleteNote(key) {
    setNoteItems(previousNotes => previousNotes.filter(note => note.key !== key));
  }

  return (
    <div>
      <Header />
      {noteItems.map(noteItem => (
        <Note
          key={noteItem.key}
          title={noteItem.title}
          content={noteItem.content}
          onDelete={() => deleteNote(noteItem.key)}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
