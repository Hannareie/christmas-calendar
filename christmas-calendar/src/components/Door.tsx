import type { Door } from "../data/doors";

interface DoorCardProps {
  door: Door;
  onClick: (door: Door) => void;
  isUnlocked: boolean;
  isToday: boolean;
}

export function DoorCard({
  door,
  onClick,
  isUnlocked,
  isToday,
}: DoorCardProps) {
  return (
    <button
      onClick={() => isUnlocked && onClick(door)}
      disabled={!isUnlocked}
      className={`
        relative flex items-center justify-center font-bold text-xl sm:text-2xl md:text-3xl 
        rounded-lg shadow-md aspect-square w-[85%] sm:w-[70%] 
        transition-all duration-300 ease-in-out transform hover:scale-105 
        ${
          isUnlocked
            ? "bg-yellow-400 hover:bg-yellow-300"
            : "bg-green-700 opacity-90"
        }
        ${isToday ? "ring-4 ring-red-500" : ""}
      `}
    >
      {/* Vertical ribbon */}
      <div
        className={`absolute w-[15%] h-full ${
          isUnlocked ? "bg-red-600" : "bg-yellow-400"
        } left-1/2 transform -translate-x-1/2 rounded-sm`}
      ></div>

      {/* Horizontal ribbon */}
      <div
        className={`absolute h-[15%] w-full ${
          isUnlocked ? "bg-red-600" : "bg-yellow-400"
        } top-1/2 transform -translate-y-1/2 rounded-sm`}
      ></div>

      {/* Bow */}
      <div
        className={`absolute top-[18%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center`}
      >
        <div
          className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${
            isUnlocked ? "bg-red-500" : "bg-yellow-500"
          }`}
        ></div>
      </div>

      {/* Door number */}
      <span
        className={`relative z-10 text-3xl ${
          isUnlocked ? "text-red-900" : "text-yellow-100"
        } drop-shadow-md`}
      >
        {door.day}
      </span>

      {/* Lock overlay */}
      {!isUnlocked && (
        <div className="absolute inset-0 flex items-center justify-center text-yellow-200 text-3xl font-bold bg-black/20 rounded-lg">
          🔒
        </div>
      )}
    </button>
  );
}
