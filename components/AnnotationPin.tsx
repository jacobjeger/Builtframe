'use client';

interface AnnotationPinProps {
  x: number;
  y: number;
  number: number;
  status: string;
  isActive?: boolean;
  onClick: () => void;
}

export default function AnnotationPin({
  x,
  y,
  number,
  status,
  isActive = false,
  onClick,
}: AnnotationPinProps) {
  const resolved = status === 'resolved';

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`absolute -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all cursor-pointer z-10 ${
        resolved
          ? 'bg-green-500 border-white text-white'
          : isActive
            ? 'bg-indigo-700 border-white text-white scale-125 shadow-lg'
            : 'bg-indigo-600 border-white text-white hover:scale-110 shadow-md'
      }`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
      }}
      title={`Annotation #${number} (${status})`}
    >
      {number}
    </button>
  );
}
