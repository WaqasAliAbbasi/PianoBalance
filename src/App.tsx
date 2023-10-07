import { useState, useEffect, useRef } from "react";
import "./App.css";
import { WebMidi, Note, NoteMessageEvent } from "webmidi";
import { Notes } from "./Notes";
import { AttackCompare } from "./AttackCompare";

export default function App() {
  const [leftHandNotes, _setLeftHandNotes] = useState<Array<Note>>([]);
  const leftHandNotesRef = useRef(leftHandNotes);

  const [rightHandNotes, _setRightHandNotes] = useState<Array<Note>>([]);
  const rightHandNotesRef = useRef(rightHandNotes);

  const setLeftHandNotes = (notes: Array<Note>) => {
    leftHandNotesRef.current = notes;
    _setLeftHandNotes(notes);
  };

  const setRightHandNotes = (notes: Array<Note>) => {
    rightHandNotesRef.current = notes;
    _setRightHandNotes(notes);
  };

  const split = new Note("C4");

  const onListen = ({ note }: NoteMessageEvent) => {
    if (note.number < split.number) {
      setLeftHandNotes(
        [note, ...(leftHandNotesRef.current || [])].slice(0, 20)
      );
    } else {
      setRightHandNotes(
        [note, ...(rightHandNotesRef.current || [])].slice(0, 20)
      );
    }
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

  useEffect(() => {
    if (
      rightHandNotes.length >= 3 &&
      rightHandNotes.slice(0, 3).every((note) => note.identifier === "C8")
    ) {
      reset();
    }
  }, [rightHandNotes]);

  const reset = () => {
    setLeftHandNotes([]);
    setRightHandNotes([]);
  };

  return (
    <>
      <h1>Piano Balance</h1>
      <AttackCompare
        leftHandNotes={leftHandNotes}
        rightHandNotes={rightHandNotes}
      />
      <br />
      <div className="notes-container">
        <Notes notes={leftHandNotes} />
        <Notes notes={rightHandNotes} />
      </div>
      <br />
      <button onClick={() => reset()}>Reset</button>
    </>
  );
}
