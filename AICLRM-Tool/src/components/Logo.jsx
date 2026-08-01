/**
 * Brand mark: a square "document" with a folded top-right corner
 * (referencing a letter/page) holding the CL monogram.
 *
 * Pure SVG so it stays crisp at any size and uses only semantic
 * design tokens — no hardcoded colors.
 */
function Logo({ className = '' }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={`h-full w-full ${className}`}
      role="img"
      aria-label="CoverLetter logo"
    >
      {/* Base shape: rounded square with the top-right corner cut
          diagonally to read as a folded page corner */}
      <path
        d="M8 0 H28 L40 12 V32 A8 8 0 0 1 32 40 H8 A8 8 0 0 1 0 32 V8 A8 8 0 0 1 8 0 Z"
        fill="var(--secondary)"
      />

      {/* Folded flap — the "dog-ear" that makes the square read as paper */}
      <path d="M28 0 L40 12 H32 A4 4 0 0 1 28 8 Z" fill="var(--secondary-text)" fillOpacity="0.22" />
      <path d="M28 0 L40 12 H28 Z" fill="var(--secondary-text)" fillOpacity="0.1" />

      {/* Monogram */}
      <text
        x="17"
        y="26"
        textAnchor="middle"
        fontFamily="var(--heading)"
        fontWeight="700"
        fontSize="15"
        fill="var(--secondary-text)"
      >
        CL
      </text>
    </svg>
  )
}

export default Logo