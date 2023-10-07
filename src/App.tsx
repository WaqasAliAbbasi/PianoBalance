import { useState, useEffect, useRef } from "react";
import "./App.css";
import { WebMidi, Note, NoteMessageEvent } from "webmidi";
import { Notes } from "./Notes";

export default function App() {
  const [notes, _setNotes] = useState<Array<Note>>([]);
  const split = new Note("C4");

  const onListen = ({ note }: NoteMessageEvent) => {
    setNotes([note, ...(notesRef.current || [])].slice(0, 500));
  };

  useEffect(() => {
    WebMidi.enable({ sysex: false }).then(() => {
      WebMidi.inputs.forEach((device) =>
        device.addListener("noteon", onListen)
      );
    });

    return () => {
      WebMidi.inputs.forEach((device) =>
        device.removeListener("noteon", onListen)
      );
    };
  }, []);

  const notesRef = useRef(notes);

  const setNotes = (payload: Array<Note>) => {
    notesRef.current = payload;
    _setNotes(payload);
  };

  const lessThanSplit = notes
    .filter((note) => {
      return note.number < split.number;
    })
    .slice(0, 10);

  const moreThanSplit = notes
    .filter((note) => {
      return note.number >= split.number;
    })
    .slice(0, 10);

  return (
    <>
      <h1>Piano Balance</h1>
      <br />
      <div className="notes-container">
        <Notes notes={lessThanSplit} />
        <Notes notes={moreThanSplit} />
      </div>
    </>
  );
}
