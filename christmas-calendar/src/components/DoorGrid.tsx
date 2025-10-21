import type { Door } from "../data/doors";
import { DoorCard } from "./Door";

interface DoorGridProps {
  doors: Door[];
  onDoorClick: (door: Door) => void;
  simulatedDay?: number;
}

export function DoorGrid({ doors, onDoorClick, simulatedDay }: DoorGridProps) {
  const today = simulatedDay
    ? new Date(new Date().getFullYear(), 11, simulatedDay)
    : new Date();

  const currentMonth = today.getMonth();
  const currentDay = today.getDate();
  const isDecember = currentMonth === 11;
  const currentDecemberDay = isDecember ? currentDay : 0;

  // Countdown text
  let countdownText = "";
  if (!isDecember) {
    const decFirst = new Date(today.getFullYear(), 11, 1);
    const diffMs = decFirst.getTime() - today.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    countdownText = `${diffDays} dager til 1. desember`;
  } else {
    const nextDoor = doors.find((d) => d.day > currentDecemberDay);
    if (nextDoor) {
      const nextDoorDate = new Date(today.getFullYear(), 11, nextDoor.day);
      const diffMs = nextDoorDate.getTime() - today.getTime();
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffHours / 24);
      const hours = diffHours % 24;
      countdownText = `Neste luke om ${diffDays} dag${
        diffDays !== 1 ? "er" : ""
      } og ${hours} time${hours !== 1 ? "r" : ""}`;
    }
  }

  return (
    <div className="relative w-screen h-screen bg-blue-800 flex flex-col items-center justify-start overflow-hidden lg:overflow-hidden text-white">
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-6 mb-2 text-center drop-shadow-lg z-10 px-2">
        🎄 Familien Reiestads Julekalender 🎄
      </h1>

      {/* Countdown */}
      {countdownText && (
        <p className="text-md sm:text-lg font-semibold text-yellow-200 text-center z-10 mb-2">
          🎁 {countdownText} 🎁
        </p>
      )}

      {/* Snowflakes */}
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-white rounded-full w-1.5 h-1.5 opacity-80 animate-fall"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 5}s`,
          }}
        />
      ))}

      {/* Tree */}
      <div className="absolute bottom-0 w-0 h-0 border-l-[25vw] border-l-transparent border-r-[25vw] border-r-transparent border-b-[40vh] border-b-green-700"></div>
      <div className="absolute bottom-[25vh] w-0 h-0 border-l-[20vw] border-l-transparent border-r-[20vw] border-r-transparent border-b-[30vh] border-b-green-600"></div>
      <div className="absolute bottom-[45vh] w-0 h-0 border-l-[15vw] border-l-transparent border-r-[15vw] border-r-transparent border-b-[20vh] border-b-green-500"></div>

      {/* Grid */}
      <div className="relative z-10 w-full overflow-y-auto lg:overflow-hidden pb-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 gap-1 sm:gap-2 md:gap-2 lg:gap-2 justify-items-center px-2 sm:px-4 py-2 max-w-[1400px] mx-auto">
          {doors.map((door) => (
            <div
              key={door.day}
              className="w-[40vw] sm:w-[20vw] md:w-[12vw] lg:w-[12vw] aspect-square flex items-center justify-center"
            >
              <DoorCard
                door={door}
                onClick={onDoorClick}
                isUnlocked={isDecember && door.day <= currentDecemberDay}
                isToday={isDecember && door.day === currentDecemberDay}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
