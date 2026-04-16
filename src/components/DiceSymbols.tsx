/**
 * Custom SVG symbols for Mutant: Year Zero dice faces.
 * Each symbol is designed to look engraved/stamped into the die surface.
 */

interface SymbolProps {
  className?: string;
  size?: number;
}

/** Radioactive/biohazard-inspired success symbol — bold, iconic */
export const SuccessSymbol = ({ className = '', size = 28 }: SymbolProps) => (
  <svg width={size} height={size} viewBox="0 0 32 32" className={className} fill="none">
    {/* Outer radiation ring */}
    <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="2.5" opacity="0.3" />
    {/* Three radiation petals */}
    <path
      d="M16 3 C18 8, 22 11, 28 12 C24 16, 24 20, 26 26 C20 23, 18 20, 16 16 Z"
      fill="currentColor"
      opacity="0.9"
    />
    <path
      d="M16 3 C14 8, 10 11, 4 12 C8 16, 8 20, 6 26 C12 23, 14 20, 16 16 Z"
      fill="currentColor"
      opacity="0.9"
    />
    <path
      d="M6 26 C10 24, 14 24, 16 28 C18 24, 22 24, 26 26 C22 22, 18 20, 16 16 Z"
      fill="currentColor"
      opacity="0.9"
    />
    {/* Center dot */}
    <circle cx="16" cy="16" r="3" fill="currentColor" />
  </svg>
);

/** Skull/biohazard trauma symbol for base die face 1 */
export const TraumaSymbol = ({ className = '', size = 28 }: SymbolProps) => (
  <svg width={size} height={size} viewBox="0 0 32 32" className={className} fill="none">
    {/* Skull shape */}
    <path
      d="M16 4 C10 4, 5 8, 5 14 C5 18, 7 20, 8 21 L8 25 L12 25 L12 23 L14 25 L18 25 L20 23 L20 25 L24 25 L24 21 C25 20, 27 18, 27 14 C27 8, 22 4, 16 4Z"
      fill="currentColor"
      opacity="0.85"
    />
    {/* Eye sockets */}
    <ellipse cx="12" cy="14" rx="2.5" ry="3" fill="hsl(var(--charcoal))" />
    <ellipse cx="20" cy="14" rx="2.5" ry="3" fill="hsl(var(--charcoal))" />
    {/* Nose */}
    <path d="M15 18 L17 18 L16 20 Z" fill="hsl(var(--charcoal))" />
  </svg>
);

/** Broken gear / shattered cog for gear die face 1 */
export const GearDamageSymbol = ({ className = '', size = 28 }: SymbolProps) => (
  <svg width={size} height={size} viewBox="0 0 32 32" className={className} fill="none">
    {/* Broken gear teeth */}
    <path
      d="M14 3L18 3L19 7L22 5L25 8L22 11L26 12L26 16L22 17L24 20L22 24L18 22L17 26L14 26L13 22L10 24L7 21L10 18L6 17L6 13L10 12L8 9L11 6L13 8Z"
      fill="currentColor"
      opacity="0.85"
    />
    {/* Center hole */}
    <circle cx="16" cy="15" r="3.5" fill="hsl(var(--charcoal))" />
    {/* Crack/break line */}
    <path
      d="M12 6 L15 13 L13 16 L16 22 L14 27"
      stroke="hsl(var(--charcoal))"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.7"
    />
  </svg>
);

/** Neutral face — a subtle, quiet mark */
export const NeutralSymbol = ({ className = '', size = 28 }: SymbolProps) => (
  <svg width={size} height={size} viewBox="0 0 32 32" className={className} fill="none">
    <circle cx="16" cy="16" r="3" fill="currentColor" opacity="0.25" />
    <circle cx="16" cy="16" r="6" stroke="currentColor" strokeWidth="1" opacity="0.12" />
  </svg>
);
