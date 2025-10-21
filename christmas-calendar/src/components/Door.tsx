import type { Door } from "../data/doors";

interface DoorProps {
  door: Door;
  onClick: (door: Door) => void;
  isUnlocked: boolean;
  isToday: boolean;
}

export function DoorCard({ door, onClick, isUnlocked, isToday }: DoorProps) {
  return (
    <button
      onClick={() => isUnlocked && onClick(door)}
      className={`relative w-16 sm:w-20 md:w-24 lg:w-28 h-20 sm:h-24 md:h-28 lg:h-32 
                  rounded-xl shadow-md transition transform hover:-translate-y-1 hover:scale-105 font-bold text-2xl
                  ${
                    isUnlocked
                      ? "bg-red-500 hover:bg-red-400"
                      : "bg-green-900 cursor-not-allowed"
                  }
                  ${isToday ? "ring-4 ring-yellow-400 animate-pulse" : ""}`} // highlight today
    >
      <span className="absolute inset-0 flex items-center justify-center">
        {door.day}
      </span>
      {!isUnlocked && (
        <span className="absolute bottom-1 text-xs text-gray-200">Låst</span>
      )}
    </button>
  );
}
