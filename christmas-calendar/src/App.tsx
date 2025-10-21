import { useState } from "react";
import { doors, type Door } from "./data/doors";
import { DoorGrid } from "./components/DoorGrid";
import { Modal } from "./components/Modal";

export default function App() {
  const [openDoor, setOpenDoor] = useState<Door | null>(null);

  return (
    <>
      {/* DoorGrid already handles full screen, tree, and snow */}
      <DoorGrid doors={doors} onDoorClick={setOpenDoor} />

      {/* Modal for opened door */}
      {openDoor && <Modal door={openDoor} onClose={() => setOpenDoor(null)} />}
    </>
  );
}
