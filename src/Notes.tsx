import React from "react";
import { Note } from "webmidi";

export const Notes: React.FC<{ notes: Array<Note> }> = ({ notes }) => {
  return (
    <div className="notes">
      {notes.map((note, key) => (
        <div key={`${note.identifier}${key}`}>
          {note.identifier} {note.attack.toFixed(2)}
        </div>
      ))}
    </div>
  );
};
