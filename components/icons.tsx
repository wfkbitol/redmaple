/**
 * Flat-style SVG icon set.
 * All icons use currentColor, 24x24 viewBox, no gradients/shadows/3D.
 */

type IconProps = {
  size?: number;
  className?: string;
};

const base = (size: number, className?: string) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  className,
  "aria-hidden": true as const,
});

/* ── Maple Leaf — flat silhouette (11-point, symmetric) ── */
export function MapleLeaf({ size = 24, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path
        d="M12 2L13.5 6.5L17 5L16 9L20 8.5L18 12L22 13L18.5 15.5L20 19L15.5 17.5L16 21.5L13 18.5L12 22L11 18.5L8 21.5L8.5 17.5L4 19L5.5 15.5L2 13L6 12L4 8.5L8 9L7 5L10.5 6.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

/* ── Sun ── */
export function SunIcon({ size = 24, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <circle cx="12" cy="12" r="4" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <line x1="12" y1="2" x2="12" y2="5" />
        <line x1="12" y1="19" x2="12" y2="22" />
        <line x1="2" y1="12" x2="5" y2="12" />
        <line x1="19" y1="12" x2="22" y2="12" />
        <line x1="4.9" y1="4.9" x2="7" y2="7" />
        <line x1="17" y1="17" x2="19.1" y2="19.1" />
        <line x1="4.9" y1="19.1" x2="7" y2="17" />
        <line x1="17" y1="7" x2="19.1" y2="4.9" />
      </g>
    </svg>
  );
}

/* ── Moon ── */
export function MoonIcon({ size = 24, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path
        d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"
        fill="currentColor"
      />
    </svg>
  );
}

/* ── Pen (blog) ── */
export function PenIcon({ size = 24, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path
        d="M14.5 3.5 20.5 9.5 9 21l-5.5 1L4.5 16.5 14.5 3.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M13 5 18 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ── Note (notes) ── */
export function NoteIcon({ size = 24, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
      <line x1="8" y1="8" x2="16" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="8" y1="16" x2="13" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/* ── Chat bubble (musings) ── */
export function ChatIcon({ size = 24, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path
        d="M4 5h16v11H9l-5 4V5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <line x1="8" y1="9" x2="16" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="8" y1="13" x2="13" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/* ── Search ── */
export function SearchIcon({ size = 24, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="2" />
      <line x1="15" y1="15" x2="20" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/* ── Image (gallery) ── */
export function ImageIcon({ size = 24, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
      <circle cx="8.5" cy="9.5" r="1.5" fill="currentColor" />
      <path
        d="M4 17l4.5-4.5L13 17l3-3 4 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ── Arrow right ── */
export function ArrowRightIcon({ size = 24, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── Arrow left ── */
export function ArrowLeftIcon({ size = 24, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path
        d="M19 12H5M11 6l-6 6 6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
