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

  const currentMonth = today.getMonth(); // 0 = Jan … 11 = Dec
  const currentDay = today.getDate();

  const isDecember = currentMonth === 11;
  const currentDecemberDay = isDecember ? currentDay : 0;

  // Countdown logic
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
    <div className="relative w-screen h-screen bg-blue-800 flex flex-col items-center justify-start overflow-hidden pt-10">
      {/* Title */}
      <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mt-4 mb-6 text-white drop-shadow-lg z-10 text-center">
        🎅 Familien Reiestads Julekalender 🎅
      </h1>

      {/* Countdown */}
      {countdownText && (
        <p className="mb-6 text-lg font-semibold text-yellow-200 text-center z-10">
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

      {/* Tree using CSS triangles */}
      <div className="absolute bottom-0 w-0 h-0 border-l-[180px] border-l-transparent border-r-[180px] border-r-transparent border-b-[300px] border-b-green-700"></div>
      <div className="absolute bottom-40 w-0 h-0 border-l-[140px] border-l-transparent border-r-[140px] border-r-transparent border-b-[240px] border-b-green-600"></div>
      <div className="absolute bottom-80 w-0 h-0 border-l-[100px] border-l-transparent border-r-[100px] border-r-transparent border-b-[180px] border-b-green-500"></div>

      {/* Calendar grid */}
      <div className="relative z-10 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 justify-items-center w-full max-w-[800px] px-4 mt-6">
        {doors.map((door) => (
          <DoorCard
            key={door.day}
            door={door}
            onClick={onDoorClick}
            isUnlocked={isDecember && door.day <= currentDecemberDay}
            isToday={isDecember && door.day === currentDecemberDay}
          />
        ))}
      </div>
    </div>
  );
}
