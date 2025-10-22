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

  // Countdown
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
    <div className="relative w-full min-h-screen bg-blue-800 text-white overflow-y-auto">
      {/* Title */}
      <div className="relative z-10 text-center pt-8 mb-2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold drop-shadow-lg">
          🎄 Familien Reiestads Julekalender 🎄
        </h1>
        {countdownText && (
          <p className="text-md sm:text-lg font-semibold text-yellow-200 mt-4">
            🎁 {countdownText} 🎁
          </p>
        )}
      </div>

      {/* ❄️ Snowflakes */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full w-1.5 h-1.5 opacity-80 animate-fall"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${6 + Math.random() * 6}s`,
            }}
          />
        ))}
      </div>

      {/* 📦 Door grid */}
      <div className="relative z-10 pb-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 justify-items-center max-w-[1400px] mx-auto py-4">
          {doors.map((door) => (
            <div
              key={door.day}
              className="w-[38vw] sm:w-[18vw] md:w-[11vw] aspect-square flex items-center justify-center"
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

      {/* 🎄 Mobile/Tablet Tree */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-0 scale-[1.4] lg:hidden">
        <div className="relative z-40 w-0 h-0 border-l-[7vw] border-l-transparent border-r-[7vw] border-r-transparent border-b-[9vh] border-b-green-400"></div>
        <div className="relative z-30 -mt-[5vh] w-0 h-0 border-l-[9vw] border-l-transparent border-r-[9vw] border-r-transparent border-b-[10vh] border-b-green-500"></div>
        <div className="relative z-20 -mt-[6vh] w-0 h-0 border-l-[11vw] border-l-transparent border-r-[11vw] border-r-transparent border-b-[11vh] border-b-green-600"></div>
        <div className="relative z-10 -mt-[7vh] w-0 h-0 border-l-[13vw] border-l-transparent border-r-[13vw] border-r-transparent border-b-[12vh] border-b-green-700"></div>
        <div className="w-[3vw] h-[6vh] bg-amber-800"></div>
      </div>
    </div>
  );
}
