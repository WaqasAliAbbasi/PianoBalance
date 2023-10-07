import { useState, useEffect } from "react";
import "./app.css";
import { WebMidi, Note } from "webmidi";

export default function Notes() {
  const [notes, setNotes] = useState<Record<string, Array<Note>>>({});
 
  console.log(notes)

  const onListen = (deviceName: string, note: Note) => {
    console.log(notes[deviceName])
    setNotes({ ...notes, [deviceName]: [note, ...(notes[deviceName] || [])] });
  }

  useEffect(() => {
    WebMidi.inputs.forEach((device) =>
      device.addListener("noteon", (e) => {
        onListen(device.name, e.note)
      })
    );
  }, []);

  return (
    <>
      {JSON.stringify(notes)}
    </>
  );
}
