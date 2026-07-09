/**
 * The site mark: a heavy six-arm asterisk (✱), drawn once as an SVG so it
 * renders identically everywhere. `variant="light"` is the thin math-asterisk
 * (∗) counterpart for small/secondary uses (list markers, dividers).
 */
export function Mark({
  size = 16,
  variant = "heavy",
  className,
}: {
  size?: number;
  variant?: "heavy" | "light";
  className?: string;
}) {
  const stroke = variant === "heavy" ? 17 : 7;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {[0, 60, 120].map((deg) => (
        <line
          key={deg}
          x1="50"
          y1="9"
          x2="50"
          y2="91"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          transform={`rotate(${deg} 50 50)`}
        />
      ))}
    </svg>
  );
}
