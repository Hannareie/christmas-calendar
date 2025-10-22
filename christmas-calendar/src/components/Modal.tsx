import type { Door } from "../data/doors";

interface ModalProps {
  door: Door;
  onClose: () => void;
}

export function Modal({ door, onClose }: ModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white text-gray-900 p-6 sm:p-8 rounded-2xl shadow-2xl max-w-md text-center"
      >
        <h2 className="text-2xl font-bold mb-4">🎁 Luke {door.day} 🎁</h2>
        <p className="mb-6 text-lg">{door.message}</p>
        <button
          onClick={onClose}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold"
        >
          Lukk
        </button>
      </div>
    </div>
  );
}
