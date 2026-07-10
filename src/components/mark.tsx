/**
 * The site mark (locked in SPEC round 3): "sickle six" — six curved,
 * razor-tipped blades. `variant="light"` is its companion "whirl five"
 * (hard-capped curved strokes) for small/secondary uses.
 */
const SICKLE_BLADE =
  "M 49.17 45.07 Q 53.6 26.07 77.09 15.33 Q 63.86 32.91 50.83 45.07 Z";
const WHIRL_ARM = "M 50 50 Q 74 29 50 8";

export function Mark({
  size = 16,
  variant = "heavy",
  className,
}: {
  size?: number;
  variant?: "heavy" | "light";
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      aria-hidden="true"
      className={className}
    >
      {variant === "heavy"
        ? [0, 60, 120, 180, 240, 300].map((deg) => (
            <path
              key={deg}
              d={SICKLE_BLADE}
              fill="currentColor"
              transform={`rotate(${deg} 50 50)`}
            />
          ))
        : [0, 72, 144, 216, 288].map((deg) => (
            <path
              key={deg}
              d={WHIRL_ARM}
              fill="none"
              stroke="currentColor"
              strokeWidth={12}
              strokeLinecap="butt"
              transform={`rotate(${deg} 50 50)`}
            />
          ))}
    </svg>
  );
}
