import { useState, useEffect } from "react";
import "./app.css";
import { WebMidi } from "webmidi";
import Notes from "./Notes";

export default function App() {
  const [error, setError] = useState("");
  const [devices, setDevices] = useState<Array<string>>([]);

  function onEnabled() {
    setDevices(WebMidi.inputs.map((device) => device.name));
  }

  useEffect(() => {
    WebMidi.enable({sysex:false})
      .then(onEnabled)
      .catch((err) => setError(err));
  }, []);

  return (
    <>
      <h1>Piano Balance</h1>
      <div>Error: {error}</div>
      {JSON.stringify(devices)}
      <br />
      {devices.length > 0 && <Notes />}
    </>
  );
}
